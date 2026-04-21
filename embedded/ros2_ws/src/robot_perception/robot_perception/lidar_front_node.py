import math
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from std_msgs.msg import Float32

class LidarFrontNode(Node):
    def __init__(self):
        super().__init__('lidarf_front_node')
        self.scan_sub = self.create_subscription(
            LaserScan,
            '/scan',
            self.scan_callback,
            10
        )
        self.front_distance_pub = self.create_publisher(
            Float32,
            '/front_distance',
            10)
        
        self.get_logger().info('Lidar Processing Node has been started. Listening on /scan topic.')

    def scan_callback(self, msg: LaserScan) -> None:
        ranges = msg.ranges
        if not ranges:
            return
        
        total_points = len(ranges)

        window_size = min(20, total_points // 8)

        front_ranges = list(ranges[:window_size]) + list(ranges[-window_size:])

        valid_ranges = []
        for r in front_ranges:
            if math.isnan(r) or math.isinf(r):
                continue

            if r <= 0.0 or r >= 254.9:
                continue

            valid_ranges.append(r)

        output = Float32()

        if valid_ranges:
            closest_front = min(valid_ranges)
            output.data = float(closest_front)
            self.front_distance_pub.publish(output)

            self.get_logger().info(
                f'Published front distance: {output.data:.2f} m based on {len(valid_ranges)} valid points.'
            )
        else:
            output.data = -1.0
            self.front_distance_pub.publish(output)

            self.get_logger().warn('No valid front distance measurements found. Published -1.0m.')

def main(args=None) -> None:
    rclpy.init(args=args)
    node = LidarFrontNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()

