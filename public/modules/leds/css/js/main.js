//
// ─────────────────────────────────────────── ANCHOR TOGGLE BACKGROUND COLOR ─────
//

    function toggleBackgroundColor(element, colorBefore, colorAfter){
        if (element.style.background == colorAfter){
            element.style.background = colorBefore;
        } else {
            element.style.background = colorAfter;
        }
    }