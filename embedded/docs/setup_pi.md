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

# Add ROS 2 key
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Add ROS 2 repo
echo "deb [signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

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
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src
```

---

## 📡 6. Install LiDAR Driver

```bash
git clone https://github.com/slgrobotics/ldlidar_sl_ros2.git
```

---

## 🏗️ 7. Build Workspace

```bash
cd ~/ros2_ws
colcon build
```

---

## 🔁 8. Source Workspace

```bash
source ~/ros2_ws/install/setup.bash
```

(Optional: auto-source every terminal)

```bash
echo "source ~/ros2_ws/install/setup.bash" >> ~/.bashrc
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
source ~/ros2_ws/install/setup.bash
rviz2
```

---