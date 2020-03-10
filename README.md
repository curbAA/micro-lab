# micro:lab
"micro:lab" is a testing tool targeted towards young students for learning, testing, and developing with the BBC micro:bit. This allows them to input commands from the application to their micro:bit or plot data from the microbit into the aplication. It was designed with the intention of easy and intuitive deployment/implementation. 

<br>

## Prequisities
- [Node.JS](https://nodejs.org/es/)
- A BBC micro:bit
- Microsoft MakeCode (Recomended for this application customization)
- Winrar or any `".zip"` file uncompressor (Unnecesary for Windows 10 users)

<br>

## Installation
- First of all, create a directory in your machine and name it whatever you like, this is where you will download this repository.

- **If you have Git installed:** just do git init in your repository and set the origin remote to my directory and do `"git pull origin master"`.

- **If you don't have Git installed:** simply download a zip file to the directory you created and uncompress it with Winrar or something like that.

- **Get your micro:bit** and plug it into your computer - you'll have to flash the `".hex"` file from the `"microbit files"` into your micro:bit for this to work.

- Open a terminal in the directory you installed micro:lab and run `npm install` for installing all the dependencies.

- **Last, but not least, you will have to check in your machine in what port your micro:bit is connected** for Windows 10, you will have to open up "device manager" from the start menu, go to "ports (COM & LPT)" and checkout if you have like "COM3", "COM5", or something like that in there. Whatever it says, remember the port, open up your text editor, go to the micro:lab directory, go to "server" and open up "server.js", when you are in there, search for the variable "serialPortID" and change it to the value you got from the "device manager".

<br>

## Deployment
- Before running this, make sure you don't have any programs, like MakeCode, that read serial ports, becouse they will negate micro:lab access to those ports.

- For running micro:lab in your computer, you'll have to open up a terminal and go to the directory where you installed micro:lab and run `npm start`. This will start an express server in your local network in the port `3222` by default.

- Open up your web navigator of choice and type `"localhost:3222/home"` (or `"[your-ip]:3222/home`") in the navigation bar - now you have your application running in your local network.

<br>

## Common problems
If you aren't receiving any data from the micro:bit when executing the aplication, this could be:
- You are not using the correct `"serialPortID"` (change it in the `"server.js"` file)
- You have another program opened that uses serial port readings (like MakeCode, for example)
- You don't have your micro:bit plugged in correctly (try other USB port)
- You touched too much your micro:bit without conscent and now it's mad at you...yes, really. For some reason when you touch the electronic components behind the micro:bit with your fingers, this can cause it to **completely** stop sending and receiving data from the serial port (just restart the node server in your terminal with `"rs"`, if it doesn't work, reset both the micro:bit and the server)

<br>

## Use
Basically, this is an aplication that allows you to plot data from the micro:bit's sensors (acceleration, magnetic orientation, and such), and put it to display in your machine. You can also, from your computer, send data and actions to the micro:bit, like a remote control. You can digitally toggle the IO pins in the microbit, or toggle a specific led on its screen, for example.

Inside this app there is 6 "modules", each with a different purpose:
- **Accelerometer**
Plots the data from the micro:bit's accelerometer live in a chart
- **Compass**
Shows the magnetic orientation of the micro:bit in real time
- **~~Buttons~~**
Showed micro:bit's buttons presses on screen
- **Thermometer**
Shows the current temperature of the micro:bit on screen
- **Leds**
Allows you to toggle individual leds of the micro:bit's screen
- **Pins**
Lets you toggle on or off digitally any on the 3 main IO pins on the micro:bit
- **Radio**
Allows you to set your radio channel, see what strings are being sent through it, and send strings as well.
 
This allows you to make tests in real time with your micro:bit, without to having to code it every time. Allowing for more interactive classroom experiences with it.

## Node - micro:bit comunication protocol
So... there is something somewhat overcomplicated and maybe unnecesary that I had to do that I NEED to clarify

Basically, what happens is that the micro:bit has an aparent limit of characters
that it can read from the serial usb port (I've coded the micro:bit in JavaScript
using MakeCode, by the way), or the node_module "SerialPort" has a limit for sending
characters through the serial usb port; only happening when I send data **to** the
micro:bit, never the other way around.

You see, the way that I tell the micro:bit to do something is doing a port.write
with a "sender", an "action", and "values":

|   Data    |                    Utility                         |
|-----------|----------------------------------------------------|
|   Sender  | Indicates what module sent the signal              |
|   Action  | Indicates what that module wants the microbit to do|
|   Values  | Indicates how it wants the microbit to do it       |

All of them are written in a single line separated by ":" and with an ";"
at the end to indicate the end of the signal, like this:

    "sender:action:value;"

For example, lets say that I want to turn on an specific (0,0) LED in the screen
of the microbit; it would be sent something like this trough serial port

|   Data    |  Value   |                        Utility                             |
|-----------|----------|------------------------------------------------------------|
|   Sender  | "leds"   | signal sent from "leds" module                             |
|   Action  | "toggle" | action indicating to execute "leds.toggle()"               |
|   Values  | "0,0"    | values indicating the parameters of "leds.toggle()" ("0,0")|

    Written in one line like: "leds:toggle:0,0;"

This is a very simple action that it can be done by sending just a few characters
through the serial port, but not for every case. Sometimes this combination can 
exceed the aparent character limit of either the micro:bit reading capabilities, or the 
"SerialPort" node_module port writing capabilites, and thus causing to loose of the
signal when sent.

The solution that I came up with was to reduce the amout of characters sent via the
SerialPort by encoding the actions that are going to be sent to the microbit (but only
the information thats sent from the server (computer) to the micro:bit):
    
I've created an object called "language" that stores all the actions and senders that
the micro:bit can interpretate all literal actions and translate them to a 
compressed/enconded version of it that only uses 4 characters, leaving more space for
the values if the signal:

|   Data    |  Value   |  Translation  |
|-----------|----------|---------------|
|   Sender  | "leds"   |    "leds"     |
|   Action  | "toggle" |    "tggl"     |
|   Values  | "0,0"    |    "0,0"      |

    Written in one line like: "leds:tggl:0,0;"

It's important to note that you are only going to **send** encoded/reduced messages **to**
the micro:bit, never receive them from it.

<br>

## Versioning
- [Git](https://git-scm.com/)

## Authors
- [curbAA](https://github.com/curbAA) - *Initial work*

## License
This project is licensed under the **MIT License** - see the LICENSE.md file for details