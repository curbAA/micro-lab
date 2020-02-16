//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "pins";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });

//
// ────────────────────────────────────────────── ANCHOR PIN ACTIVATION EVENT ─────
//

    let lightningPin0 = document.querySelector("#lightning-pin0");
    let lightningPin1 = document.querySelector("#lightning-pin1");
    let lightningPin2 = document.querySelector("#lightning-pin2");

    let switchPin0 = document.querySelector("#switch-pin0");
    let switchPin1 = document.querySelector("#switch-pin1");
    let switchPin2 = document.querySelector("#switch-pin2");

    let valuesPin0 = 0;
    let valuesPin1 = 0;
    let valuesPin2 = 0;


    //PIN 0
    switchPin0.addEventListener("mousedown", ()=>{
        valuesPin0 = (valuesPin0 == 0) ? 1:0;
        togglePinVisual(switchPin0, lightningPin0);
        socket.emit("module:serial:event", {
            sender: _name,
            action: "digitalWrite",
            values: "0,"+valuesPin0
        } );
    });
    
    //PIN 1
    switchPin1.addEventListener("mousedown", ()=>{
        valuesPin1 = (valuesPin1 == 0) ? 1:0;
        togglePinVisual(switchPin1, lightningPin1);
        socket.emit("module:serial:event", {
            sender: _name,
            action: "digitalWrite",
            values: "1,"+valuesPin1
        } );
    });
    
    //PIN 0
    switchPin2.addEventListener("mousedown", ()=>{
        valuesPin2 = (valuesPin2 == 0) ? 1:0;
        togglePinVisual(switchPin2, lightningPin2);
        socket.emit("module:serial:event", {
            sender: _name,
            action: "digitalWrite",
            values: "2,"+valuesPin2
        } );
    });
