//
// ─────────────────────────────────────────────────────────── ANCHOR BUTTONS ─────
//

    const btn_accelerometer = document.querySelector("#btn-accelerometer");
    const btn_thermometer = document.querySelector("#btn-thermometer");
    const btn_compass = document.querySelector("#btn-compass");
    const btn_leds = document.querySelector("#btn-leds");
    const btn_pins = document.querySelector("#btn-pins");
    const btn_radio = document.querySelector("#btn-radio");
    

    btn_accelerometer.addEventListener("click", ()=>{
        homeBackgroundPageTransition("linear-gradient(#934956, #D97575)");
        window.location.pathname = "/accelerometer/";
    });
    btn_thermometer.addEventListener("click", ()=>{
        homeBackgroundPageTransition("linear-gradient(#B65C40, #CF976E)");
        window.location.pathname = "/thermometer/";
    });
    btn_compass.addEventListener("click", ()=>{
        homeBackgroundPageTransition("linear-gradient(#B08E36, #EEE596)");
        window.location.pathname = "/compass/";
    });
    btn_leds.addEventListener("click", ()=>{
        homeBackgroundPageTransition("linear-gradient(#6C9346, #91CF94)");
        window.location.pathname = "/leds/";
    });
    btn_pins.addEventListener("click", ()=>{
        homeBackgroundPageTransition("linear-gradient(#455D8C, #89A3D6)");
        window.location.pathname = "/pins/";
    });
    btn_radio.addEventListener("click", ()=>{
        homeBackgroundPageTransition("linear-gradient(#6B5DA3, #B38ABD)");
        window.location.pathname = "/radio/";
    });

//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "home";

    socket.on("connect",()=>{
        socket.emit("module:connection:server", _name);
    });

