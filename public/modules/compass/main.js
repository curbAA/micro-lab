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
// ─────────────────────────────────────── ANCHOR TURN COMPASS ARROW FUNCTION ─────
//

    function turnCompassArrow(deg){
        let compass_arrow = document.querySelector(".compass .arrow");

        compass_arrow.style.transform = "rotate("+deg+"deg)";
    }
