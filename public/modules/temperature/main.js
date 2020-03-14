//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "temperature";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });

//
// ───────────────────────────── ANCHOR SERIAL BUTTON PRESS EVENT FROM SERVER ─────
//

    button_a = document.querySelector("#button-a");
    button_b = document.querySelector("#button-b");

    socket.on("server:serial:event", (signal)=>{

        if(signal.sender == _name){ //If the signal is for this module

            
            switch (signal.action){
                case "pressed":
                    if (signal.values == "a") {
                        setButton(button_a, "pressed"); 
                    } else if (signal.values == "b"){
                        setButton(button_b, "pressed"); 
                    } 

                    break;
                    
                case "released":
                    if (signal.values == "a") {
                        setButton(button_a, "released"); 
                    } else if (signal.values == "b"){
                        setButton(button_b, "released"); 
                    } 
                    break;
                default:
                    break;
            }
        }
    });