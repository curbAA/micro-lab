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

            let button_panel = document.querySelector(".button-panel");
            let button_list = document.querySelectorAll(".button");

            console.log(button_panel, button_list);

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
    });

