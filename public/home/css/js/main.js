function changeHomeView(button_panel, button_list, view){
    if (view == "narrow"){

        button_panel.style.gridTemplateRows = "auto auto auto";
        button_panel.style.gridTemplateColumns = "auto auto";
                
        for(let button of button_list){
            button.style.width = "clamp(16px, 30vw, 20vh)";
            button.style.height = "clamp(16px, 30vw, 20vh)";
        }
    } else if (view == "wide"){

        button_panel.style.gridTemplateRows = "auto auto";
        button_panel.style.gridTemplateColumns = "auto auto auto";

        for(let button of button_list){
            button.style.width = "clamp(16px, 20vw, 20vh)";
            button.style.height = "clamp(16px, 20vw, 20vh)";
        }
    }
}

//
// ─────────────────────────────────────────── ANCHOR WAIT FOR WINDOW LOADING ─────
//

    window.addEventListener("load", ()=>{

        //
        // ────────────────────────────── ANCHOR SWITCH BETWEEN NARROW AND WIDE VIEWS ─────
        //

            const button_panel = document.querySelector(".button-panel");
            const button_list = document.querySelectorAll(".button");

            if (window.innerWidth <= 650){
                changeHomeView(button_panel, button_list, "narrow");
                
            } else {
                changeHomeView(button_panel, button_list, "wide");
            }

            window.addEventListener("resize", ()=>{
                if (window.innerWidth <= 650){
                    changeHomeView(button_panel, button_list, "narrow");
                    
                } else {
                    changeHomeView(button_panel, button_list, "wide");
                }
            });

        

        //
        // ──────────────────── ANCHOR BUTTON CHANGE BACKGROUND EFFECT ─────
        //

            let body = document.querySelector("body");

            button_list[0].addEventListener("click", ()=>{body.style.background = "#934956"}); // Accelerometer Button Click
            button_list[1].addEventListener("click", ()=>{body.style.background = "#B65C40"}); // Buttons Button Click
            button_list[2].addEventListener("click", ()=>{body.style.background = "#B08E36"}); // Compass Button Click
            button_list[3].addEventListener("click", ()=>{body.style.background = "#6C9346"}); // Leds Button Click
            button_list[4].addEventListener("click", ()=>{body.style.background = "#455D8C"}); // Pins Button Click
            button_list[5].addEventListener("click", ()=>{body.style.background = "#6B5DA3"}); // Radio Button Click

    });

