//
// ────────────────────────────────────────────────────── ANCHOR SERVER DEPENDENCIES ─────
//

    const express = require("express");
    const app = express();
    const http = require("http");
    const socketIO = require("socket.io");

//
// ──────────────────────────────────────────────────────────────── ANCHOR LOCATIONS ─────
//

    const _publicDir = "C:/Users/prost/Desktop/Programación/Node/microbit/microlab/public";

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
    server.listen(3222);
    console.log("Server on port", 3222);

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
// ────────────────────────────────────────────────────────────── ANCHOR SERIAL PORT ─────
//

    const SerialPort = require('serialport');
    const Readline = SerialPort.parsers.Readline;
    const port = new SerialPort("COM3", {
        baudRate: 115200,
        autoOpen: false,
    });

    const parser = new Readline();
    port.pipe(parser);

    port.open(() => {
        console.log("< Port open");
        parser.on('data', (data) => {
            //Colored Console Log for incoming micro:bit serial data
            betterConsoleLog("|---| microbit |--->", data, "orange");
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

    //Here you can add words with "addWord" for quickly indexing
    //new words that you want to test in the microbit    
    language.addWord("toggle", "tggl");         //action (leds)
    language.addWord("clear", "cler");          //action (any)
    language.addWord("digitalWrite", "dwrt");   //action (pins)

//
// ─────────────────────────────── ANCHOR SERIAL PORT EVENT EXPORTER FUNCTION ─────
//

    function portSendEvent(sender, action, values){
        actual_sender = language.translate(sender);
        actual_action = language.translate(action);
        actual_values = values;

        port.write(actual_sender + ":" + actual_action + ":" + actual_values + ";");
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