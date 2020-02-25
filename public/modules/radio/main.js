//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "radio";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });

    socket.on("server:serial:event", (signal)=>{
        if (signal.sender == _name){
            switch (signal.action){
                case "receivedString":
                    showReceivedString(signal.values);
                    break;
            }
        }
    });


//
// ─────────────────────────────────────────────────── ANCHOR RADIO SET GROUP ─────
//

    const set_group_input = document.querySelector("#set_group_input");
    const set_group_button = document.querySelector("#set_group_button");

    set_group_button.addEventListener("click", ()=>{
        socket.emit("module:serial:event", {
            sender: _name,
            action: "setGroup",
            values: set_group_input.value,
        });
    });

//
// ──────────────────────────────────────────────── ANCHOR RADIO SEND STRING ─────
//

    const send_string_input = document.querySelector("#send_string_input");
    const send_string_button = document.querySelector("#send_string_button");
    
    send_string_button.addEventListener("click", ()=>{
        socket.emit("module:serial:event", {
            sender: _name,
            action: "sendString",
            values: send_string_input.value,
        });
    });

//
// ───────────────────────────────────────────── ANCHOR RADIO RECEIVED STRING ─────
//

    function showReceivedString(string){
        console.log(string);
    }