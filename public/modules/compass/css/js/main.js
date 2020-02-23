//
// ──────────────────────────────────── ANCHOR COMPASS ARROW ROTATION VISUALS ─────
//

function turnCompassArrow(deg){
    let compass_arrow = document.querySelector(".compass .arrow");

    compass_arrow.style.transform = "rotate("+deg+"deg)";
}
