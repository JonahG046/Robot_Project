from setuptools import find_packages, setup

package_name = 'robot_perception'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='seprogram',
    maintainer_email='jonah.green@mnsu.edu',
    description='ROS 2 package for robot perception including LiDAR processing nodes',
    license='Apache-2.0',
    extras_require={
        'test': [
            'pytest',
        ],
    },
    entry_points={
        'console_scripts': [
            'lidar_front_node = robot_perception.lidar_front_node:main',
        ],
    },
)
