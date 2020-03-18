//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "thermometer";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });

//
// ─────────────────────────────────────────────── ANCHOR TEMPERATURE DISPLAY ─────
//

    socket.on("server:serial:event", (signal)=>{
        if (signal.sender == _name){
            if (signal.action == "plotData"){
                let temperature = parseInt(signal.values);
                setTemperature(temperature);
            }
        }
    })
    
