//
// ─────────────────────────────────────────────────────────── ANCHOR BUTTONS ─────
//

    const btn_accelerometer = document.querySelector("#btn-accelerometer");
    const btn_buttons = document.querySelector("#btn-buttons");
    const btn_compass = document.querySelector("#btn-compass");
    const btn_leds = document.querySelector("#btn-leds");
    const btn_pins = document.querySelector("#btn-pins");
    const btn_radio = document.querySelector("#btn-radio");
    

    btn_accelerometer.addEventListener("click", ()=>{window.location.pathname = "/accelerometer/";});
    btn_buttons.addEventListener("click", ()=>{window.location.pathname = "/buttons/";});
    btn_compass.addEventListener("click", ()=>{window.location.pathname = "/compass/";});
    btn_leds.addEventListener("click", ()=>{window.location.pathname = "/leds/";});
    btn_pins.addEventListener("click", ()=>{window.location.pathname = "/pins/";});
    btn_radio.addEventListener("click", ()=>{window.location.pathname = "/radio/";});

//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "home";

    socket.on("connect",()=>{
        socket.emit("module:connection:server", _name);
    });

