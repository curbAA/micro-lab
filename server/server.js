//
// ─────────────────────────────────────────────────────── ANCHOR PATH MODULE ─────
//

    const pathModule = require("path");

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

    const _publicDir = pathModule.join(__dirname, "/../public");

    app.use("/home", express.static(_publicDir + "/home"));
    app.use("/public", express.static(_publicDir));

    app.use("/accelerometer", express.static(_publicDir + "/modules/accelerometer"));
    app.use("/compass", express.static(_publicDir + "/modules/compass"));
    app.use("/leds", express.static(_publicDir + "/modules/leds"));
    app.use("/pins", express.static(_publicDir + "/modules/pins"));
    app.use("/radio", express.static(_publicDir + "/modules/radio"));
    app.use("/thermometer", express.static(_publicDir + "/modules/thermometer"));

    app.use("/node_modules", express.static(_publicDir + "/../node_modules"));

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

    var current_page; //saves the page that you are in in case of disconnection event 

    io.on("connection", (socket)=>{

        // ──────────────────────────────── ANCHOR SOCKET IO MODULE-SERVER CONNECTION ─────

            socket.on("module:connection:server", (module_data)=>{
                current_page = module_data;
                betterConsoleLog("| server | +++ Connection", current_page, "yellow");
                portSendEvent(current_page, "connection", "0");
            });
        
        // ────────────────────────────── ANCHOR SOCKET IO CURRENT PAGE DISCONNECTION ─────     

            socket.on("disconnect", ()=>{
                betterConsoleLog("| server | --- Disconnection", current_page, "yellow");
                portSendEvent(current_page, "disconnection", "0");
            });

        // ───────────────────────────────────── ANCHOR SOCKET IO MODULE SERIAL EVENT ─────

            socket.on("module:serial:event", (moduleData)=>{
                betterConsoleLog("| server | >>> Module Serial Event", moduleData.sender+":"+moduleData.action+":"+moduleData.values, "yellow");
                portSendEvent(moduleData.sender, moduleData.action, moduleData.values);
            });
            
    });

//
// ─────────────────────────────────── ANCHOR SERIAL LANGUAGE BETWEEN DEVICES ─────
//

    /*
        ANCHOR MESSAGE ENCODING
        Read "Node - micro:bit communication protocol" in "README.md" to know more about what's going on here
    */

    const language = {
        normal: [
            "home",             //sender
            "accelerometer",    //sender
            "compass",          //sender
            "leds",             //sender
            "pins",             //sender
            "radio",            //sender
            "thermometer",      //sender
            "connection",       //action (any)
            "disconnection",    //action (any)
        ],

        translated: [
            "home",             //sender
            "accl",             //sender
            "comp",             //sender
            "leds",             //sender
            "pins",             //sender
            "rdio",             //sender
            "thrm",             //sender
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

    /*
        ANCHOR MESSAGE ENCODING
        Read "Node - micro:bit communication protocol" in "README.md" to know more about what's going on here
    */

    //  Here you can add words with "language.addWord()" for quickly indexing
    //  new words that you want to send to the microbit in the microbit.
    //  Be sure that they are added as well (in the same way) in the microbit

    language.addWord("toggle", "tggl");         //action (leds)
    language.addWord("clear", "cler");          //action (leds or any)
    language.addWord("digitalWrite", "dwrt");   //action (pins)
    language.addWord("analogWrite", "awrt");    //action (pins)
    language.addWord("plotData", "pdta");       //action (accelerometer | compass | thermometer)
    language.addWord("setGroup", "sgrp");       //action (radio)
    language.addWord("sendString", "sstr");     //action (radio)

//
// ────────────────────────────────────────────────────────────── ANCHOR SERIAL PORT ─────
//

    /*
        ANCHOR MESSAGE ENCODING
        Read "Node - micro:bit communication protocol" in "README.md" to know more about what's going on here
    */
    
    const serialPortID = "/dev/ttyACM0"; // Serial Port that's going to be read

    const SerialPort = require('serialport');
    const Readline = SerialPort.parsers.Readline;
    const port = new SerialPort(serialPortID, {
        baudRate: 115200,
        autoOpen: false,
    });

    const parser = new Readline();
    port.pipe(parser);

    port.open(() => {
        betterConsoleLog("Using Serial Port:", serialPortID + "\n", "orange");

        parser.on('data', (signal) => {
                betterConsoleLog("|---| micro:bit |--->", signal + "\n", "orange");
                processSignal(signal);
        });
    });

//
// ─────────────────────────────────── ANCHOR INCOMING SERIAL EVENT PROCESSOR ─────
//

   function processSignal(signal){

        // signalData = "sender:action:values;"
       
        let sender = signal.split(":")[0].trim();
        let action = signal.split(":")[1].trim();
        let values = signal.split(":")[2].trim();

        // console.log(sender, action, values);

       io.emit("server:serial:event", {
            sender:sender,
            action:action,
            values:values,
        });
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

// ────────────────────────────────────────────────────────────────────────────────