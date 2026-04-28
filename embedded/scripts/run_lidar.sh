#!/bin/bash

source /opt/ros/jazzy/setup.bash
source ~/robo_project/Robot_Project/embedded/ros2_ws/install/setup.bash

sudo chmod 666 /dev/ttyUSB0

ros2 launch ldlidar_sl_ros2 ld14p.launch.py