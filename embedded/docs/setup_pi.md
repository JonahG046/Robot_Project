# Raspberry Pi Setup (ROS 2 Jazzy + LiDAR + RViz)

This guide rebuilds the full embedded system from scratch.

---

## 🧱 1. System Requirements

- Raspberry Pi (Pi 4 or Pi 5 recommended)
- Ubuntu 24.04 (recommended for ROS 2 Jazzy)
- Internet connection
- LiDAR connected via USB
- At least 32GB microSD card (64GB recommended for ROS 2 with RViz)

---

## 🆙 1.5. System Preparation (Recommended)

Before starting, ensure your system is up to date:

```bash
# Update package lists and upgrade existing packages
sudo apt update && sudo apt upgrade -y

# Install basic development tools
sudo apt install -y build-essential curl wget git

# Reboot if kernel was updated
sudo reboot
```

---

## 📂 2. Project Structure

Ensure your project is cloned to `~/robo_project/Robot_Project`:

```bash
cd ~
mkdir -p robo_project
cd robo_project
git clone https://github.com/JonahG046/Robot_Project.git
```

Expected structure:
```
~/robo_project/Robot_Project/
├── embedded/
│   ├── docs/
│   │   ├── setup_pi.md
│   │   └── system_overview.md
│   ├── ros2_ws/           # Already in repo
│   │   └── src/
│   │       └── robot_perception/  # Already in repo
│   └── scripts/
│       ├── run_lidar.sh      # Already in repo
│       └── run_rviz.sh       # Already in repo
```

---

## 📦 3. Install ROS 2 Jazzy

**Note**: If ROS 2 Jazzy is already installed, you can skip this step. If you have a different version of ROS 2 installed, see the "Clean Reinstall" section in Troubleshooting.

```bash
sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository universe

sudo apt update
sudo apt install -y curl

# Add ROS 2 repo (correct Jazzy method)
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')

curl -L -o /tmp/ros2-apt-source.deb \
"https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"

sudo dpkg -i /tmp/ros2-apt-source.deb

sudo apt update
sudo apt install -y ros-jazzy-desktop
```

---

## 🔁 4. Source ROS Automatically

```bash
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

---

## 🛠️ 5. Install Build Tools

```bash
sudo apt install -y python3-colcon-common-extensions python3-pip git
```

---

## � 6. Install LiDAR Driver

```bash
cd ~/robo_project/Robot_Project/embedded/ros2_ws/src
git clone https://github.com/slgrobotics/ldlidar_sl_ros2.git
```

---

## 🏗️ 7. Build Workspace

```bash
cd ~/robo_project/Robot_Project/embedded/ros2_ws
colcon build
```

**Note**: This build process may take 10-20 minutes on a Raspberry Pi. Be patient!

Verify the build was successful:
```bash
# Check if packages were built
ls install/
# Should show: robot_perception/ ldlidar_sl_ros2/ ...
```

---

## 🔁 8. Source Workspace

```bash
source ~/robo_project/Robot_Project/embedded/ros2_ws/install/setup.bash
```

(Optional: auto-source every terminal)

```bash
echo "source ~/robo_project/Robot_Project/embedded/ros2_ws/install/setup.bash" >> ~/.bashrc
```

---

## 🔌 9. Connect LiDAR

Check USB port:

```bash
ls /dev/ttyUSB*
```

Expected output:

```
/dev/ttyUSB0
```

Fix permissions:

```bash
sudo chmod 666 /dev/ttyUSB0
```

---

## 🚀 10. Run LiDAR Driver

```bash
ros2 launch ldlidar_sl_ros2 ld14p.launch.py
```

Leave this terminal running.

---

## 🤖 11. Run Perception Node

Open a new terminal:

```bash
source /opt/ros/jazzy/setup.bash
source ~/robo_project/Robot_Project/embedded/ros2_ws/install/setup.bash

ros2 run robot_perception lidar_front_node
```

This will start processing LiDAR data and publishing front distance measurements.

---

## 🖥️ 12. Run RViz (Optional)

Open another new terminal:

```bash
source /opt/ros/jazzy/setup.bash
source ~/robo_project/Robot_Project/embedded/ros2_ws/install/setup.bash
rviz2
```

---

## 📊 13. Verify System

Check that topics are being published:

```bash
ros2 topic list
```

Expected topics:
- `/scan` (from LiDAR driver)
- `/lidar_front_distance` (from perception node)
- `/parameter_events`
- `/rosout`

Check front distance data:

```bash
ros2 topic echo /lidar_front_distance
```

---

## 📜 14. Convenience Scripts

The convenience scripts are already included in the repository. Make them executable:

```bash
chmod +x ~/robo_project/Robot_Project/embedded/scripts/run_lidar.sh
chmod +x ~/robo_project/Robot_Project/embedded/scripts/run_rviz.sh
```

Usage:
- Start LiDAR: `~/robo_project/Robot_Project/embedded/scripts/run_lidar.sh`
- Start RViz: `~/robo_project/Robot_Project/embedded/scripts/run_rviz.sh`

---

## 🔧 Troubleshooting

### Clean Reinstall (If Starting Fresh)
If you need to completely reinstall everything:

```bash
# Remove existing ROS 2 installation
sudo apt remove --purge ros-jazzy-* -y
sudo apt autoremove -y

# Clean up old workspace
cd ~/robo_project/Robot_Project/embedded
rm -rf ros2_ws/build/ ros2_ws/install/ ros2_ws/log/

# Remove old LiDAR driver if it exists
rm -rf ros2_ws/src/ldlidar_sl_ros2/
```

### Permission Issues
If you get USB permission errors:
```bash
sudo usermod -a -G dialout $USER
# Reboot or logout/login for group changes to take effect
```

### Build Issues
If colcon build fails:
```bash
# Clean and rebuild
cd ~/robo_project/Robot_Project/embedded/ros2_ws
rm -rf build/ install/ log/
colcon build
```

### Missing Dependencies
If packages are missing:
```bash
sudo apt update
sudo apt install -y ros-jazzy-sensor-msgs ros-jazzy-std-msgs ros-jazzy-rclpy
```

### LiDAR Driver Issues
If the LiDAR driver fails to launch:
```bash
# Check if the driver repository is up to date
cd ~/robo_project/Robot_Project/embedded/ros2_ws/src/ldlidar_sl_ros2
git pull origin main

# Rebuild workspace after driver update
cd ~/robo_project/Robot_Project/embedded/ros2_ws
colcon build --packages-select ldlidar_sl_ros2
```

### Network/Repository Issues
If git clone fails:
```bash
# Make sure you're in the correct directory
cd ~/robo_project/Robot_Project/embedded/ros2_ws/src

# Try with different protocol
git clone https://github.com/slgrobotics/ldlidar_sl_ros2.git
# Or use SSH if you have keys set up
git clone git@github.com:slgrobotics/ldlidar_sl_ros2.git
```

---

## 📋 System Architecture Summary

After setup, your system will have:
- LiDAR driver publishing `/scan` topic
- Custom `lidar_front_node` processing front distances to `/lidar_front_distance`
- Optional RViz for visualization
- Convenience scripts for easy startup

---

## ⚠️ Important Notes

- **Ubuntu Version**: This guide assumes Ubuntu 24.04 (Noble). For other versions, the ROS 2 installation method may differ.
- **Hardware**: Assumes LD14P LiDAR on `/dev/ttyUSB0`. Different LiDAR models may require different drivers.
- **Network**: Requires internet access for downloading packages and cloning repositories.
- **Storage**: ROS 2 Jazzy with RViz requires significant disk space (minimum 32GB recommended).
- **Updates**: The LiDAR driver repository may have updates - check for newer versions if you encounter issues.
