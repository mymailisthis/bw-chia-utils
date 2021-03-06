#!/bin/bash

# Parameters
# $1 - chia-blockchain absolute path
# $2 - Service to start
 
# Available services:
# all
# node
# harvester
# farmer-no-wallet
# farmer-only
# timelord
# timelord-only
# timelord-launcher-only
# wallet
# introducer
# simulator
# crawler
# seeder
# seeder-only

# start chia service after 60 seconds to garantee that all disks are mounted
sleep 60
cd $1
. ./activate
chia start $2
deactivate