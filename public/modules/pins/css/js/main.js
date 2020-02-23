//
// ───────────────────────────────────────── ANCHOR TOGGLE PIN VISUAL EFFECTS ─────
//

    function togglePinVisual(switchElement, lightning){

        if (switchElement.style.alignItems == "flex-end"){
            switchElement.style.alignItems = "flex-start";
            lightning.style.visibility = "hidden";
        } else {
            switchElement.style.alignItems = "flex-end";
            lightning.style.visibility = "visible";
        }


    }