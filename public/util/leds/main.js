//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "leds";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });

//
// ───────────────────────────────────────────────── ANCHOR LED BUTTON PANNEL ─────
//

    var btn_list = new Array(25).fill(0);

    for(let i = 0; i < btn_list.length; i++){
        
        btn_list[i] = document.querySelector("#led" + i);

        btn_list[i].addEventListener("click", ()=>{     //jshint ignore:line

            //Translate 0-24 index to x & y coordinates
            var x = i%5;
            var y = Math.floor(i/5);
            // console.log(x,y)

            toggleBackgroundColor(btn_list[i], "white", "salmon"); 

            socket.emit("module:serial:event", {
                sender: _name,
                action: "toggle",
                values: x + "," + y
            });
        });
    }
