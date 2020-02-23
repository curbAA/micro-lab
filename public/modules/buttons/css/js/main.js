//
// ───────────────────────────────────── ANCHOR BUTTON PRESSED VISUAL EFFECTS ─────
//

    function setButton(button, state){
        if (state == "pressed"){
            
            button.style.marginBottom = "0px";
            button.style.marginRight = "0px";
            button.style.marginLeft = "2vw";

            button.style.background = "#dba16a";
            button.style.color = "#967252";
            
            button.style.filter = "none";
        } else if (state == "released"){

            button.style.marginBottom = "2vw";
            button.style.marginRight = "2vw";
            button.style.marginLeft = "0px";

            button.style.background = "#c5c5c5";
            button.style.color = "#7e7e7e";
            
            button.style.filter = "drop-shadow(2vw 2vw #7e7e7e)";
        }
    }