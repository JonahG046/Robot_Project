#include <fcntl.h>
#include <unistd.h>
#include <termios.h>
#include <iostream>

int main() {
    int fd = open("/dev/ttyUSB0", O_RDONLY | O_NOCTTY);
    if (fd < 0) {
        perror("open");
        return 1;
    }

    termios tty{};
    tcgetattr(fd, &tty);

    cfsetospeed(&tty, B230400);
    cfsetispeed(&tty, B230400);

    tty.c_cflag |= (CLOCAL | CREAD);
    tty.c_cflag &= ~CSIZE;
    tty.c_cflag |= CS8;
    tty.c_cflag &= ~(PARENB | CSTOPB | CRTSCTS);

    tty.c_lflag = 0;
    tty.c_iflag = 0;
    tty.c_oflag = 0;

    tcsetattr(fd, TCSANOW, &tty);

    unsigned char buf[256];
    while (true) {
        int n = read(fd, buf, sizeof(buf));
        if (n > 0) {
            std::cout << "Read " << n << " bytes\n";
        }
    }

    close(fd);
    return 0;
}
