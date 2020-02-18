//
// ─────────────────────────────────────────────────────── ANCHOR PATH MODULE ─────
//

    const path = require("path");

//
// ────────────────────────────────────────────────────── ANCHOR SERVER DEPENDENCIES ─────
//

    const serverPortID = 3222; // The port that the server executes in

    const express = require("express");
    const app = express();
    const http = require("http");
    const socketIO = require("socket.io");

//
// ──────────────────────────────────────────────────────────────── ANCHOR LOCATIONS ─────
//

    const _publicDir = path.join(__dirname, "/../public");

    app.use("/home", express.static(_publicDir + "/home"));
    app.use("/public", express.static(_publicDir));

    app.use("/accelerometer", express.static(_publicDir + "/modules/accelerometer"));
    app.use("/buttons", express.static(_publicDir + "/modules/buttons"));
    app.use("/compass", express.static(_publicDir + "/modules/compass"));
    app.use("/leds", express.static(_publicDir + "/modules/leds"));
    app.use("/pins", express.static(_publicDir + "/modules/pins"));
    app.use("/radio", express.static(_publicDir + "/modules/radio"));

//
// ─────────────────────────────────────────────────────────────────── ANCHOR SERVER ─────
//

    const server = http.Server(app);
    server.listen(serverPortID);
    betterConsoleLog("| server |", "on port "+ serverPortID, "yellow");

//
// ──────────────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const io = socketIO(server);

    //saves the page that you are in in case of disconnection event
    var current_page; 

    io.on("connection", (socket)=>{
        
        // ─────────────────────────────────── ANCHOR SOCKETIO HOME-SERVER CONNECTION ─────

            socket.on("home:connection:server", ()=>{
                current_page = "home";
                console.log("Current Page:", current_page);
                portSendEvent("home", "connection", "0");
            });

        // ──────────────────────────────── ANCHOR SOCKET IO MODULE-SERVER CONNECTION ─────

            socket.on("module:connection:server", (module_data)=>{
                current_page = module_data;
                console.log("Current Page:", current_page);
                portSendEvent(current_page, "connection", "0");
            });
        
        // ────────────────────────────── ANCHOR SOCKET IO CURRENT PAGE DISCONNECTION ─────     

            socket.on("disconnect", ()=>{
                console.log("Disconnected:", current_page);
                portSendEvent(current_page, "disconnection", "0");
            });

        // ───────────────────────────────────── ANCHOR SOCKET IO MODULE SERIAL EVENT ─────

            socket.on("module:serial:event", (moduleData)=>{
                portSendEvent(moduleData.sender, moduleData.action, moduleData.values);
            });
            
    });

//
// ─────────────────────────────────── ANCHOR SERIAL LANGUAGE BETWEEN DEVICES ─────
//

    const language = {
        normal: [
            "home",             //sender
            "accelerometer",    //sender
            "buttons",          //sender
            "compass",          //sender
            "leds",             //sender
            "pins",             //sender
            "radio",            //sender
            "connection",       //action (any)
            "disconnection",    //action (any)
        ],

        translated: [
            "home",             //sender
            "accl",             //sender
            "btns",             //sender
            "comp",             //sender
            "leds",             //sender
            "pins",             //sender
            "rdio",             //sender
            "conn",             //action (any)
            "disc",             //action (any)
        ],

        translate: (word, reversed)=>{
            if (reversed){
                return language.normal[language.translated.indexOf(word)];
            } else {
                return language.translated[language.normal.indexOf(word)];
            }
        },

        addWord: (word, translation)=>{
            language.normal.push(word);
            language.translated.push(translation);
        }
    };

    //Here you can add words with "language.addWord()" for quickly indexing
    //new words that you want to send to the microbit in the microbit.
    //Be sure that they are added as well (in the same way) in the microbit 
    language.addWord("toggle", "tggl");         //action (leds)
    language.addWord("clear", "cler");          //action (any)
    language.addWord("digitalWrite", "dwrt");   //action (pins)

//
// ────────────────────────────────────────────────────────────── ANCHOR SERIAL PORT ─────
//

    /*
        ANCHOR MESSAGE ENCODING

        So... there is something really complicated and maybe unnecesary that i had
        to do that I HAVE to clarify

        Basically, what happens is that the micro:bit has an aparent limit of characters
        that it can read from the serial usb port (I've coded the micro:bit in JavaScript
        using MakeCode, by the way), or the node_module "SerialPort" has a limit for sending
        characters through the serial usb port; only happening when I send data **to** the
        micro:bit, never the other way around.

        You see, the way that I tell the micro:bit to do something is doing a port.write
        with a "sender", an "action", and "values":

            . Sender --> Indicates what module sent the signal
            . Action --> Indicates what that module wants the microbit to do
            . Values --> Indicates how it wants the microbit to do it

            All of them are written in a single line separated by ":" and with an ";"
            at the end to indicate the end of the signal, like this:

               "sender:action:value;"

            For example, lets say that I want to turn on an specific (0,0) LED in the screen
            of the microbit; it would be sent something like this trough serial port

                . Sender = "leds" --> signal sent from "leds" module
                . Action = "toggle" --> action indicating to execute "leds.toggle()" 
                . Values = "0,0" --> values indicating the parameters of "leds.toggle()" (0,0)

                Written in one like : "leds:toggle:0,0;"

        This is a very simple action that it can be done by sending just a few characters
        through the serial port, but not for every case. Sometimes this combination can 
        exceed the character limit of either the micro:bit reading capabilities, or the 
        "SerialPort" node_module port writing capabilites, and thus causing to loose of the
        signal when sent.

        The solution that I came up with was to reduce the amout of characters sent via the
        SerialPort by encoding the actions that are going to be sent to the microbit (but only
        the information thats sent from the server (computer) to the micro:bit):
            
            I've created an object called "language" that stores all the actions and senders that
            the micro:bit can interpretate all literal actions and translate them to a 
            compressed/enconded version of it that only uses 4 characters, leaving more space for
            the values if the signal:

                . Sender: "leds" --> "leds"
                . Action: "toggle" --> "tggl"
                . Values: "0,0" --> "0,0"

                 Written in one like : "leds:tggl:0,0;"

            Please, be aware that you are only going to send encoded/reduced messages **to**
            the micro:bit, never receive them from it.

    */
    
    const _portID = "COM3"; // Serial Port that's  going to be read

    const SerialPort = require('serialport');
    const Readline = SerialPort.parsers.Readline;
    const port = new SerialPort(_portID, {
        baudRate: 115200,
        autoOpen: false,
    });

    const parser = new Readline();
    port.pipe(parser);

    port.open(() => {
        betterConsoleLog("Serial Port Open:", _portID, "orange");
        parser.on('data', (signal) => {
            let signalProcess = signal.split("!")[0];
            let signalData = signal.split("!")[1];
            
            if(signalProcess == "log"){ //Signal data is console-logged
                betterConsoleLog("|---| micro:bit |--->", signalData, "orange");
            } else if (signalProcess == "act"){  //An action occurs based on signal data
                processSignalData(signalData);
            }
        });
    });

//
// ─────────────────────────────────── ANCHOR INCOMING SERIAL EVENT PROCESSOR ─────
//

   function processSignalData(signalData){

        // signalData = "[sender]:[action]:[values];"
       
        let sender = signalData.split(":")[0];
        let action = signalData.split(":")[1];
        let values = signalData.split(":")[2];

        // console.log(sender, action, values);

        /*
            Here you can listen to the actions that come from the microbit depending
            on wich "sender" sent it. 
        */

        switch(sender){

            case "accelerometer":
                break;
            // ─────────────────────────────────────────────────────────────────

            case "buttons":
                switch(action){

                    case "pressed":
                        io.emit("server:serial:event", {

                            //Remove any unwanted whitespace that the micro:bit might send 
                            sender:sender.trim(),
                            action:action.trim(),
                            values:values.trim(),
                        });
                        break;

                    case "released":
                        io.emit("server:serial:event", {

                            //Remove any unwanted whitespace that the micro:bit might send 
                            sender:sender.trim(),
                            action:action.trim(),
                            values:values.trim(),
                        });
                        break;
                }
                break;
            // ─────────────────────────────────────────────────────────────────

            case "compass":
                break;
            // ─────────────────────────────────────────────────────────────────

            case "leds":
                break;
            // ─────────────────────────────────────────────────────────────────

            case "pins":
                break;
            // ─────────────────────────────────────────────────────────────────

            case "radio":
                break;
            // ─────────────────────────────────────────────────────────────────
        }

   }

//
// ─────────────────────────────── ANCHOR SERIAL PORT EVENT EXPORTER FUNCTION ─────
//

    function portSendEvent(sender, action, values){
        let translated_sender = language.translate(sender);
        let translated_action = language.translate(action);
        let translated_values = values;

        port.write(translated_sender + ":" + translated_action + ":" + translated_values + ";");
    }

//
// ──────────────────────────────────────────────── ANCHOR BETTER CONSOLE LOG ─────
//

    function betterConsoleLog(text, data, textcolor){
        switch (textcolor) {
            case "yellow":
                console.log('\x1b[38;2;255;255;0m'+text+'\x1b[0m '+data);
                break;
            case "orange":
                console.log('\x1b[38;2;255;100;0m'+text+'\x1b[0m '+data);
                break;
            case "green":
                console.log('\x1b[38;2;0;100;0m'+text+'\x1b[0m '+data);
                break;
            case "red":
                console.log('\x1b[38;2;255;0;0m'+text+'\x1b[0m '+data);
                break;
        
            default:
                break;
        }
    }