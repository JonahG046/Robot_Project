# Embedded System Overview (ROS2 & LiDAR)

This document describes how the embedded ROS 2 system is structured and how data flows between components.

---

## System Purpose

This embedded system is responsible for:
- Reading sensor data (LiDAR)
- Processing sensor information
- Detecting obstacles
- Providing data for robot movement decisions

---

## System Architecture

LiDAR hardware  
  ↓  
LiDAR driver (ldlidar_sl_ros2)  
  ↓  
/scan (LaserScan)  
  ↓  
lidar_front_node (custom)  
  ↓  
/lidar_front_distance (Float32)  
  ↓  
(obstacle_node - future)  
  ↓  
/movement_command  

## ROS Nodes

### lidar_front_node
- **Package**: robot_perception
- **Purpose**: Processes LiDAR scan data to determine the closest obstacle distance in front of the robot
- **Subscriptions**:
  - `/scan` (sensor_msgs/LaserScan): Raw LiDAR scan data from the ldlidar_sl_ros2 driver
- **Publications**:
  - `/lidar_front_distance` (std_msgs/Float32): Closest valid distance measurement in front of the robot
- **Algorithm**:
  - Takes a window of scan points from the front and back (first and last `min(20, total_points/8)` points)
  - Filters out invalid measurements (NaN, infinite, out of range 0-254.9m)
  - Publishes the minimum valid distance, or -1.0 if no valid measurements

### Future Nodes
- **obstacle_node**: Planned node to process distance data and detect obstacles
- **movement_command**: Planned topic for robot movement decisions based on sensor data

---

## Hardware Components

- **LiDAR Sensor**: LD14P LiDAR connected via USB (/dev/ttyUSB0)
- **Compute Platform**: Raspberry Pi running Ubuntu 24.04 and ROS 2 Jazzy

---

## Software Dependencies

- **ROS 2 Jazzy**: Base ROS 2 distribution
- **ldlidar_sl_ros2**: Third-party LiDAR driver package for LD series LiDARs
- **robot_perception**: Custom Python package for sensor processing

---

## Data Flow

1. LiDAR hardware captures 360° distance measurements
2. ldlidar_sl_ros2 driver publishes raw scan data to `/scan` topic
3. lidar_front_node subscribes to `/scan` and processes front-facing measurements
4. Processed front distance published to `/lidar_front_distance` topic
5. Future: obstacle_node will subscribe to distance topics and publish movement commands

---

## Running the System

### Start LiDAR Driver
```bash
./embedded/scripts/run_lidar.sh
```

### Start Perception Node
```bash
ros2 run robot_perception lidar_front_node
```

### Visualize Data
```bash
./embedded/scripts/run_rviz.sh
```

---

## Configuration

- **LiDAR Port**: /dev/ttyUSB0 (requires sudo chmod 666 for access)
- **ROS Domain**: Default domain (not specified)
- **QoS**: Default QoS settings (reliable, keep last 10 messages)
