#Embedded System Overview (ROS2 & LiDAR)

This document describes how the embedded ROS 2 system is structured and how data flows between components.

---

## System Purpose

This embedded system is responsible for:
-Reading sensor data (LiDAR, Ultrasonic)
-Processing sensor information
-Detecting obsacles
-Providing data for robot movement decisions

---

## System Architecture

LiDAR hardware
  ↓
LiDAR driver (ldlidar_sl_ros2)
  ↓
/scan
  ↓
lidar_front_node (custom)
  ↓
/lidar_front_distance
  ↓
(obstacle_node - future)
  ↓
/movement_command

---

## ROS Nodes
