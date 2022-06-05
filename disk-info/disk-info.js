#! /usr/bin/env node

const args = require("minimist")(process.argv.slice(2));
const os = require("os");
const dotenv = require("dotenv");
dotenv.config();
const qfgets = require("qfgets");
const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const api_host = process.env.API_HOST;
const login_uri = "/api/sanctum/token";
const disk_info_uri = "/api/disks";
let api_token = "";
let logged_in = 0;
const api_email = process.env.API_EMAIL;
const api_password = process.env.API_PASSWORD;
const api_port = process.env.API_PORT;
const home_folder = process.env.HOME_FOLDER;
const this_folder = process.env.THIS_FOLDER;
const disk_data_folder = process.env.DISK_DATA_FOLDER;
const device_name = os.hostname();

let folders = [];
let devices = [];
let total_devices = 0;
let processed_devices = 0;

check_plots_folders();

function check_plots_folders() {
  exec(
    "cd " +
      home_folder +
      "/chia-blockchain; . ./activate; chia plots show > " +
      this_folder +
      "/logs/output_check_plots_folders.log 2>&1; deactivate;",
    (err, stdout, stderr) => {
      if (err) {
        let log = fs.createWriteStream("logs/check_plots_folders_errors.log", {
          flags: "a",
        });
        log.write("Not Found\n");
        // node couldn't execute the command
        return;
      }

      getDiskSmartData(
        "logs/output_check_plots_folders.log",
        "/",
        processDevices
      );
    }
  );
}

function getDiskSmartData(filename, regexp, done) {
  var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream(filename),
  });

  let i = 0;
  lineReader
    .on("line", function (line) {
      processLine(line, regexp);
      if (line.startsWith("/")) {
        i++;
      }
    })
    .on("close", function (line) {
      total_devices = i;
    });
}

function processLine(line, regexp) {
  if (line && line.match(regexp)) {
    exec("df -h " + line, (err, stdout, stderr) => {
      if (stdout) {
        let devLine = stdout.split("\n")[1];
        let parts = devLine.split(" ");
        let data = getDeviceData(parts[0], parts.pop().split("/").pop());
      }
    });
  }
}

function grepFoldersWithFs(filename, regexp, done) {
  fp = new qfgets(filename, "r");
  function loop() {
    for (i = 0; i < 40; i++) {
      line = fp.fgets();
      // if (line && line.match(regexp)) folder = line;
      if (line && line.match(regexp)) {
        // folders.push(line);
        exec("df -h " + line, (err, stdout, stderr) => {
          if (stdout) {
            let devLine = stdout.split("\n")[1];
            let parts = devLine.split(" ");
            let data = getDeviceData(parts[0]);
          }
          if (err) {
            let log = fs.createWriteStream("logs/check_devices_errors.log", {
              flags: "a",
            });
            log.write("Not Found\n");
            // node couldn't execute the command
            return;
          }
        });
      }
    }
    if (!fp.feof()) setImmediate(loop);
    else done();
  }
  loop();
}

function processDevices() {
  // nao apagar
}

function getDeviceData(d, m) {
  let p = d.split("/");
  let disk;
  let device;
  if (p[2].startsWith("sd")) {
    disk = p[2].substring(0, 3);
  } else if (p[2].startsWith("nvme")) {
    disk = p[2].substring(0, 5);
  }

  try {
    if (fs.existsSync(disk_data_folder + "/" + disk + ".json")) {
      let jsonData = require(disk_data_folder + "/" + disk + ".json");

      if (IsJsonString(jsonData)) {
        device = {
          harvester: os.hostname(),
          name: jsonData.device.name,
          label: m,
          protocol: jsonData.device.protocol,
          model_name: jsonData.model_name,
          temperature: jsonData.temperature.current,
          power_on_time: jsonData.power_on_time.hours,
          rotation_rate: jsonData.rotation_rate,
          user_capacity: jsonData.user_capacity.bytes,
          model_family: jsonData.model_family,
          all_info: jsonData,
        };

        devices.push(device);
        // console.log(device);
      } else {
        console.log("no json");
      }
    }
  } catch (err) {
    console.error("no file");
  }

  processed_devices++;

  //   console.log(d, m, processed_devices, total_devices);
  if (processed_devices === total_devices) {
    let body = JSON.stringify(devices);
    sendInfo(body);
  }
}

function IsJsonString(str) {
  try {
    return typeof str === "object";
  } catch (e) {
    return false;
  }
}

function sendInfo(b) {
  // start sending
  let sending = setInterval(function () {
    if (logged_in < 2) {
      postRequest(disk_info_uri, b).then((d) => {
        let r = JSON.parse(d);
        if (r.success >= 0 || r.already >= 0) {
          logIt(r);
          clearInterval(sending);
          logged_in = 0;
        }
      });
    } else {
      clearInterval(sending);
    }
  }, 2500);
}

function login() {
  if (login.pending) return login.pending;
  const data = JSON.stringify({
    email: api_email,
    password: api_password,
    device_name: device_name,
  });

  login.pending = postRequest(login_uri, data).then((d) => {
    api_token = JSON.parse(d);
    logged_in = 1;
    delete login.pending;
  });
}

function postRequest(uri, body) {
  const options = {
    hostname: api_host,
    port: api_port,
    path: uri,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + api_token,
    },
    method: "POST",
  };

  var resolve, reject, data;
  var promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  const req = https.request(options, (res) => {
    res.on("data", (d) => {
      data = d;
      logged_in = 2;
    });

    res.on("end", () => {
      if (res.statusCode == 401) {
        login();
      }
      resolve(data);
    });
  });
  //handling error
  req.on("error", (e) => {
    reject("problem with request: " + e.message);
  });

  req.write(body);
  req.end();

  return promise;
}

function logIt(result) {
  let log = fs.createWriteStream("logs/updated_disks.log", {
    flags: "a",
  });

  const ts = new Date().toISOString();
  log.write(ts);
  log.write("  >  ");
  log.write(result.success + " updated devices\n");
}
