//
// ─────────────────────────────────────────────────────────── ANCHOR BUTTONS ─────
//

    const modules = {
        accelerometer: {
            button: document.querySelector("#btn-accelerometer"),
            background: "linear-gradient(#934956, #D97575)",
            path: "/accelerometer/"
        },
        compass: {
            button: document.querySelector("#btn-compass"),
            background: "linear-gradient(#B08E36, #EEE596)",
            path: "/compass/"
        },
        leds: {
            button: document.querySelector("#btn-leds"),
            background: "linear-gradient(#6C9346, #91CF94)",
            path: "/leds/"
        },
        pins: {
            button: document.querySelector("#btn-pins"),
            background: "linear-gradient(#455D8C, #89A3D6)",
            path: "/pins/"
        },
        radio: {
            button: document.querySelector("#btn-radio"),
            background: "linear-gradient(#6B5DA3, #B38ABD)",
            path: "/radio/"
        },
        thermometer: {
            button: document.querySelector("#btn-thermometer"),
            background: "linear-gradient(#B65C40, #CF976E)",
            path: "/thermometer/"
        },
    };

    console.log(modules);
    
    for (const m in modules){
        modules[m].button.addEventListener("click", ()=>{changePage(modules[m]);});
    }

    function changePage(modl){
        window.location.pathname = modl.path;
    }



//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "home";

    socket.on("connect",()=>{
        socket.emit("module:connection:server", _name);
    });

