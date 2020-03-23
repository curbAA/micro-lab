//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "compass";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });

    socket.on("server:serial:event", (signal)=>{
        if(signal.sender == _name){
            if(signal.action == "plotData"){
                turnCompassArrow(signal.values);
            }
        }
    });

//
// ──────────────────────────────────────── ANCHOR COMPASS CALIBRATION BUTTON ─────
//

    const calibrate_button = document.querySelector("#calibrate-compass");
    calibrate_button.addEventListener("click", ()=>{
        socket.emit("module:serial:event", {
            sender:_name,
            action:"calibrate",
            values:"0",
        });
    });