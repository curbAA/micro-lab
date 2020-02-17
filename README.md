# micro:lab
"micro:lab" is an testing tool targeted towards youg students for learning, testing, and developing with the BBC micro:bit. This allows them to input commands from the application to their micro:bit or plot data from the microbit into the aplication. It was designed with the intention of easy and intuitive deployment. 



## Installation Setup
### Prequisities
- [Node.JS](https://nodejs.org/es/)
- A BBC micro:bit
- Winrar or any `".zip"` file uncompressor (Unnecesary for Windows 10 users)
### Installing
- First of all, create a directory in your machine and name it whatever you like, this is where you will download this repository.

- **If you have Git installed:** just do git init in your repository and set the origin remote to my directory and do ```"git pull origin master"```.

- **If you don't have Git installed:** simply download a zip file to the directory you created and uncompress it with Winrar or something like that.

- **Get your micro:bit** and plug it into your computer - you'll have to flash the `".hex"` file from the `"microbit files"` into your micro:bit for this to work.  

That's all there is for the installation.



## Deployment
- For running micro:lab in your computer, you'll have to open up a terminal and go to the directory where you installed micro:lab and run `npm start`. This will start an express server in your local network in the port `3222` by default.

- Open up your web navigator of choice and type `"localhost:3222/home"` in the navigation bar - now you have your application running in your local network.



## What's happening
Basically, this is an aplication that allows you to plot data from the micr:obit sensors(such as acceleration, magnetic orientation, and such), and put it to display in your machine. You can also, from your computer, send data and actions to the micro:bit, like a remote control. You can digitally toggle the IO pins in the microbit, or toggle a specific led on its screen, for example.

This allows you to make tests in real time with your micro:bit, without to having to code it every time. Allowing for more interactive classroom experiences with the micro:bit, 



## General Objectives
### Accelerometer
Being able to represent the data of the accelerometer of the micro:bit in both: a graph, and a 3d visual representation of the micro:bit being tilted **in real time.**

### Buttons
Being able to make the micro:bit do something stated in the page beforehand when you press a button (having a menu that lets you pick what you want the micro:bit to do when you press a button, like, show an icon or a string in the screen).

### Compass
Being able to represent the data of the magnetometer of the micro:bit in both: a graph, and a 3d visual representation of the micro:bit being rotated in a magnetic field **in real time.**

### Leds
Being able to show a string or an icon in the microbit, stated by the user.

### Pins
Have the capabilities of both reading and writing (digitally and analogically) values from and to the micro:bit IO Pins.

### Radio
Setting the channel, sending a value, string, etc, and listenig to them when received, all remotely based on user input.



## Achieved Milestones
#### Buttons
- Real time button press and release event detection and visualization.

#### Leds
- Real time LED toggling in the micro:bit built in screen.

### Pins
- Bein able to toggle any of the 3 main IO pins (0, 1, 2) individually and in real time.



## Versioning
- [Git](https://git-scm.com/)



## Authors
- [curbAA](https://github.com/curbAA) - *Initial work* 



## Contributors


## License
This project is licensed under the **MIT License** - see the LICENSE.md file for details
