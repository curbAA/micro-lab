//
// ───────────────────────────────────────── ANCHOR THERMOMETER BAR ANIMATION ─────
//

    const thermometer_bar = document.querySelector("#thermometer-bar");
    const temperature_number = document.querySelector("#temperature-number");
    
    function setTemperature(temp_input){
        thermometer_bar.style.height = `${Math.ceil(250 * (temp_input / 55))}px`;
        temperature_number.innerHTML = `${temp_input}°C`;
    }

