# Raspberry Pi Setup (ROS 2 Jazzy + LiDAR + RViz)

This guide rebuilds the full embedded system from scratch.

---

## 🧱 1. System Requirements

- Raspberry Pi (Pi 4 or Pi 5 recommended)
- Ubuntu 24.04 (recommended for ROS 2 Jazzy)
- Internet connection
- LiDAR connected via USB

---

## 📦 2. Install ROS 2 Jazzy

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

## 🔁 3. Source ROS Automatically

```bash
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

---

## 🛠️ 4. Install Build Tools

```bash
sudo apt install -y python3-colcon-common-extensions python3-pip git
```

---

## 📁 5. Create Workspace

```bash
cd ~/robo_project/Robot_Project/embedded
mkdir -p ros2_ws/src
cd ros2_ws/src
```

---

## 📡 6. Install LiDAR Driver

```bash
git clone https://github.com/slgrobotics/ldlidar_sl_ros2.git
```

---

## 🏗️ 7. Build Workspace

```bash
cd ~/robo_project/Robot_Project/embedded/ros2_ws
colcon build
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

## 🚀 10. Run LiDAR

```bash
ros2 launch ldlidar_sl_ros2 ld14p.launch.py
```

Leave this terminal running.

---

## 🖥️ 11. Run RViz

Open a new terminal:

```bash
source /opt/ros/jazzy/setup.bash
source ~/robo_project/Robot_Project/embedded/ros2_ws/install/setup.bash
rviz2
```

---
