#! /usr/bin/env node
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const plot_log_folder = process.env.PLOT_LOG_FOLDER;

const a = [
  "Chia k32 next-gen CUDA plotter - e161e4b",
  "Plot Format: mmx-v2.4",
  "Network Port: 8444 [chia]",
  "No. GPUs: 1",
  "No. Streams: 4",
  "Final Destination: /media/joao/farm34/",
  "Final Destination: /media/joao/farm35/",
  "Shared Memory limit: unlimited",
  "Number of Plots: 2",
  "Initialization took 0.323 sec",
  "Crafting plot 1 out of 2 (2023/02/09 15:47:55)",
  "Process ID: 186797",
  "Pool Puzzle Hash:  bf39a67edeb36bb3a909c3b5c4053d3b0e29bb34d1e1a8f6ef3ca4c7de2e9d49",
  "Farmer Public Key: 8b9a9cf3e68c9f32594dae72caf9cb9957817117fc7df73d63d9c42d5adc9b68e8175390320ebe5c948074ddeb7a1ce8",
  "Working Directory:   /media/joao/plotter3/",
  "Working Directory 2: @RAM",
  "Compression Level: C7 (xbits = 9, final table = 4)",
  "Plot Name: plot-k32-c7-2023-02-09-15-47-e063cce64d2d2265fb79fe40a0cad2c0356167bf070dc68cf5f01da167a59d5a",
  "[P1] Setup took 0.862 sec",
  "[P1] Table 1 took 27.527 sec, 4294967296 entries, 16789317 max, 66633 tmp, 0 GB/s up, 1.23516 GB/s down",
  "[P1] Table 2 took 16.557 sec, 4294876600 entries, 16787527 max, 66556 tmp, 1.93272 GB/s up, 3.08028 GB/s down",
  "[P1] Table 3 took 28.398 sec, 4294714198 entries, 16786358 max, 66757 tmp, 1.69022 GB/s up, 2.99318 GB/s down",
  "[P1] Table 4 took 33.054 sec, 4294380204 entries, 16785856 max, 66697 tmp, 2.42014 GB/s up, 3.72875 GB/s down",
  "[P1] Table 5 took 19.669 sec, 4293718163 entries, 16780870 max, 66670 tmp, 4.06676 GB/s up, 5.18584 GB/s down",
  "[P1] Table 6 took 17.36 sec, 4292336637 entries, 16778259 max, 66619 tmp, 3.68556 GB/s up, 4.89633 GB/s down",
  "[P1] Table 7 took 8.741 sec, 4289570083 entries, 16769515 max, 66810 tmp, 5.488 GB/s up, 5.34839 GB/s down",
  "Phase 1 took 152.65 sec",
  "[P2] Setup took 0.245 sec",
  "[P2] Table 7 took 2.945 sec, 10.8522 GB/s up, 0.18039 GB/s down",
  "[P2] Table 6 took 2.952 sec, 10.8335 GB/s up, 0.179963 GB/s down",
  "[P2] Table 5 took 2.947 sec, 10.8553 GB/s up, 0.180268 GB/s down",
  "Phase 2 took 9.242 sec",
  "[P3] Setup took 0.554 sec",
  "[P3] Table 4 LPSK took 5.344 sec, 3465127147 entries, 14631030 max, 57896 tmp, 6.83502 GB/s up, 9.54346 GB/s down",
  "[P3] Table 4 NSK took 6.022 sec, 3465127147 entries, 13550192 max, 57896 tmp, 6.43072 GB/s up, 9.88628 GB/s down",
  "[P3] Table 5 PDSK took 5.345 sec, 3531272391 entries, 13811928 max, 54829 tmp, 6.08455 GB/s up, 8.74654 GB/s down",
  "[P3] Table 5 LPSK took 7.338 sec, 3531272391 entries, 14248174 max, 57157 tmp, 8.44828 GB/s up, 6.95016 GB/s down",
  "[P3] Table 5 NSK took 6.11 sec, 3531272391 entries, 13804249 max, 56585 tmp, 6.45909 GB/s up, 9.74389 GB/s down",
  "[P3] Table 6 PDSK took 5.544 sec, 3710656627 entries, 14512829 max, 57667 tmp, 5.86429 GB/s up, 8.43258 GB/s down",
  "[P3] Table 6 LPSK took 7.432 sec, 3710656627 entries, 15084746 max, 60501 tmp, 8.65501 GB/s up, 6.86225 GB/s down",
  "[P3] Table 6 NSK took 6.275 sec, 3710656627 entries, 14509237 max, 59965 tmp, 6.60874 GB/s up, 9.48768 GB/s down",
  "[P3] Table 7 PDSK took 6.291 sec, 4289570083 entries, 16783483 max, 66810 tmp, 6.98533 GB/s up, 7.43129 GB/s down",
  "[P3] Table 7 LPSK took 8.308 sec, 4289570083 entries, 17198944 max, 69260 tmp, 8.61715 GB/s up, 6.13869 GB/s down",
  "[P3] Table 7 NSK took 6.847 sec, 4289570083 entries, 16769515 max, 68296 tmp, 7.00156 GB/s up, 8.69507 GB/s down",
  "Phase 3 took 71.743 sec",
  "[P4] Setup took 0.131 sec",
  "[P4] total_p7_parks = 2094517",
  "[P4] total_c3_parks = 428957, 2385 / 2457 ANS bytes",
  "Phase 4 took 4.558 sec, 7.0118 GB/s up, 4.01128 GB/s down",
  "Total plot creation time was 238.386 sec (3.97311 min)",
  "Crafting plot 2 out of 2 (2023/02/09 15:51:54)",
  "Process ID: 186797",
  "Pool Puzzle Hash:  bf39a67edeb36bb3a909c3b5c4053d3b0e29bb34d1e1a8f6ef3ca4c7de2e9d49",
  "Farmer Public Key: 8b9a9cf3e68c9f32594dae72caf9cb9957817117fc7df73d63d9c42d5adc9b68e8175390320ebe5c948074ddeb7a1ce8",
  "Working Directory:   /media/joao/plotter3/",
  "Working Directory 2: @RAM",
  "Compression Level: C7 (xbits = 9, final table = 4)",
  "Plot Name: plot-k32-c7-2023-02-09-15-51-67cd27698889c5e077da96c6767373ed0f6b45bdd165eebb8ad80e376a655e22",
  "[P1] Setup took 0.823 sec",
  "[P1] Table 1 took 3.944 sec, 4294967296 entries, 16788486 max, 66585 tmp, 0 GB/s up, 8.62075 GB/s down",
  "[P1] Table 2 took 8.222 sec, 4294789104 entries, 16789120 max, 66717 tmp, 3.892 GB/s up, 6.2029 GB/s down",
  "[P1] Table 3 took 10.038 sec, 4294411247 entries, 16785048 max, 66677 tmp, 4.78163 GB/s up, 8.46785 GB/s down",
  "Flushing to disk took 32.599 sec",
  "Started copy to /media/joao/farm34/plot-k32-c7-2023-02-09-15-47-e063cce64d2d2265fb79fe40a0cad2c0356167bf070dc68cf5f01da167a59d5a.plot",
  "[P1] Table 4 took 15.102 sec, 4293742549 entries, 16789159 max, 66645 tmp, 5.29663 GB/s up, 8.16119 GB/s down",
  "[P1] Table 5 took 13.245 sec, 4292476981 entries, 16778994 max, 66649 tmp, 6.03829 GB/s up, 7.70104 GB/s down",
  "[P1] Table 6 took 11.341 sec, 4289890519 entries, 16770964 max, 66789 tmp, 5.63997 GB/s up, 7.49495 GB/s down",
  "[P1] Table 7 took 8.701 sec, 4284767769 entries, 16749535 max, 66620 tmp, 5.51009 GB/s up, 5.37297 GB/s down",
  "Phase 1 took 71.833 sec",
  "[P2] Setup took 0.227 sec",
  "[P2] Table 7 took 2.919 sec, 10.9366 GB/s up, 0.181997 GB/s down",
  "[P2] Table 6 took 2.925 sec, 10.9272 GB/s up, 0.181624 GB/s down",
  "[P2] Table 5 took 2.918 sec, 10.9601 GB/s up, 0.18206 GB/s down",
  "Phase 2 took 9.142 sec",
  "[P3] Setup took 0.522 sec",
  "[P3] Table 4 LPSK took 5.579 sec, 3464255143 entries, 14612378 max, 57737 tmp, 6.54615 GB/s up, 9.14147 GB/s down",
  "[P3] Table 4 NSK took 6.196 sec, 3464255143 entries, 13549157 max, 57737 tmp, 6.24856 GB/s up, 9.60864 GB/s down",
  "[P3] Table 5 PDSK took 5.453 sec, 3529679673 entries, 13813065 max, 54834 tmp, 5.96235 GB/s up, 8.57331 GB/s down",
  "[P3] Table 5 LPSK took 7.459 sec, 3529679673 entries, 14247695 max, 57041 tmp, 8.30818 GB/s up, 6.83741 GB/s down",
  "[P3] Table 5 NSK took 6.32 sec, 3529679673 entries, 13800769 max, 56486 tmp, 6.24165 GB/s up, 9.42012 GB/s down",
  "[P3] Table 6 PDSK took 5.752 sec, 3707913331 entries, 14509076 max, 57800 tmp, 5.64907 GB/s up, 8.12765 GB/s down",
  "[P3] Table 6 LPSK took 7.719 sec, 3707913331 entries, 15088609 max, 60523 tmp, 8.32803 GB/s up, 6.60711 GB/s down",
  "WritePark(): ans_length (859) > max_ans_length (858) (y = 9, i = 6594)",
  "[P3] Table 6 NSK took 6.457 sec, 3707913331 entries, 14501739 max, 59974 tmp, 6.41771 GB/s up, 9.22025 GB/s down",
  "[P3] Table 7 PDSK took 6.638 sec, 4284767769 entries, 16770003 max, 66620 tmp, 6.61276 GB/s up, 7.04282 GB/s down",
  "[P3] Table 7 LPSK took 8.463 sec, 4284767769 entries, 17206151 max, 69271 tmp, 8.4511 GB/s up, 6.02626 GB/s down",
  "[P3] Table 7 NSK took 7.039 sec, 4284767769 entries, 16749535 max, 68397 tmp, 6.80296 GB/s up, 8.4579 GB/s down",
  "Phase 3 took 73.842 sec",
  "[P4] Setup took 0.127 sec",
  "[P4] total_p7_parks = 2092172",
  "[P4] total_c3_parks = 428476, 2386 / 2453 ANS bytes",
  "Phase 4 took 4.607 sec, 6.92946 GB/s up, 3.96862 GB/s down",
  "Total plot creation time was 159.556 sec (2.65926 min)",
  "Flushing to disk took 24.351 sec",
  "Started copy to /media/joao/farm35/plot-k32-c7-2023-02-09-15-51-67cd27698889c5e077da96c6767373ed0f6b45bdd165eebb8ad80e376a655e22.plot",
  "Copy to /media/joao/farm34/plot-k32-c7-2023-02-09-15-47-e063cce64d2d2265fb79fe40a0cad2c0356167bf070dc68cf5f01da167a59d5a.plot finished, took 397.439 sec, 192.208 MB/s",
  "Copy to /media/joao/farm35/plot-k32-c7-2023-02-09-15-51-67cd27698889c5e077da96c6767373ed0f6b45bdd165eebb8ad80e376a655e22.plot finished, took 300.497 sec, 254.022 MB/s",
];

a.forEach((element, index) => {
  setTimeout(function () {
    // log.write(element) + "\n";
    fs.appendFile(
      plot_log_folder + "/plots.log",
      `${element}\n`,
      function () {}
    );
  }, 100 * index);
});