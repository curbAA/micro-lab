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
                    showReceivedString("incoming", signal.values);
                    break;
                case "sendString":
                    showReceivedString("outcoming", signal.values);
                    break;
            }
        }
    });


//
// ─────────────────────────────────────────────────── ANCHOR RADIO SET GROUP ─────
//

    const set_group_input = document.querySelector("#set_group_input");
    const set_group_button = document.querySelector("#set_group_button");
    var _group = "1";

    set_group_button.addEventListener("click", ()=>{updateGroup();});
    set_group_input.addEventListener("keydown", (key)=>{if (key.code == "Enter") updateGroup();});

    set_group_input.addEventListener("input", ()=>{
        if (set_group_input.value != _group){
            set_group_button.style.background = "#D2A9E4";
            set_group_button.style.boxShadow = "-5px 5px #2e2e2e5f";
        }
    });

    function updateGroup(){
        if (set_group_input.value && set_group_input.value != _group){
            _group = set_group_input.value.trim();

            socket.emit("module:serial:event", {
                sender: _name,
                action: "setGroup",
                values: _group,
            });
        } 

        set_group_button.style.background = "lightgrey";
        set_group_button.style.boxShadow = "none";
    }

//
// ──────────────────────────────────────────────── ANCHOR RADIO SEND STRING ─────
//

    const send_string_input = document.querySelector("#send_string_input");
    const send_string_button = document.querySelector("#send_string_button");
    
    send_string_button.addEventListener("mousedown", ()=>{sendString();});
    send_string_input.addEventListener("keydown", (key)=>{if (key.code == "Enter") sendString();});

    function sendString(){
        if (send_string_input.value){
            socket.emit("module:serial:event", {
                sender: _name,
                action: "sendString",
                values: send_string_input.value.trim(),
            });

            send_string_button.style.background = "none";
            send_string_button.style.border = "5px solid #64597D";
            send_string_button.style.color = "#64597D";
            setTimeout(() => {
            send_string_button.style.background = "#D2A9E4";
            send_string_button.style.border = "none";
            send_string_button.style.color = "white";
        }, 200);
        }
    }

//
// ───────────────────────────────────────────── ANCHOR RADIO RECEIVED STRING ─────
//

    const received_strings = document.querySelector("#received_strings");

    function showReceivedString(string_direction, string){
        str = document.createElement("P");
        str.innerHTML = string;

        if(string_direction == "incoming"){
            str.innerHTML = "<-- " + string;
            str.className = "string incoming-string";

        } else if (string_direction == "outcoming"){
            str.innerHTML = "--> " + string;
            str.className = "string outcoming-string";
        }

        received_strings.appendChild(str);
        received_strings.scrollTop = received_strings.scrollHeight;
    }