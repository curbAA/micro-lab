//
// ───────────────────────────────────────── ANCHOR TOGGLE DIGITAL PIN VISUAL EFFECTS ─────
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

//
// ──────────────────────────────────────── ANCHOR SWITCH MODE VISUAL EFFECTS ─────
//
    var analogButton = document.querySelector(".button-analog");
    var digitalButton = document.querySelector(".button-digital");

    var digitalSwtiches = document.querySelectorAll(".switch");
    var analogInputsContainer = document.querySelectorAll(".analog");

    // Analog Mode
    analogButton.addEventListener("click", ()=>{
        digitalButton.style.background = "none";
        digitalButton.style.border = "5px solid white";
        analogButton.style.background = "#2e2e2e";
        analogButton.style.border = "5px solid #2e2e2e";

        switchMode("analog");
    });

    // Digital Mode 
    digitalButton.addEventListener("click", ()=>{
        analogButton.style.background = "none";
        analogButton.style.border = "5px solid white";
        digitalButton.style.background = "#2e2e2e";
        digitalButton.style.border = "5px solid #2e2e2e";

        switchMode("digital");
    });

    function switchMode(mode){
        if (mode == "digital") {
            for (let node of digitalSwtiches) {
                node.style.display = "flex";
                // console.log("Digital Switches:", node);
            }
            for (let node of analogInputsContainer) {
                node.style.display = "none";
                // console.log("Analog Inputs:", node);
            }

        } else if (mode == "analog") {
            for (let node of analogInputsContainer) {
                node.style.display = "flex";
                // console.log("Analog Inputs:", node);
            }
            for (let node of digitalSwtiches) {
                node.style.display = "none";
                // console.log("Digital Switches:", node);
            }

        }
    }


//
// ──────────────────────────────────────────── ANCHOR ANALOG INPUT LOGISTICS ─────
//

    // for(let node of document.querySelectorAll(".analog-input-submit")){
    //     node.addEventListener("mousedown", ()=>{
    //         for (let node of document.querySelectorAll(".analog-input")){
    //             if (parseInt(node.value) >  1023){
    //                 node.style.borderTop = "2px solid salmon";
    //                 node.style.borderBottom = "2px solid salmon";
    //                 node.style.background = "linear-gradient(rgba(0,0,0,0), rgba(255,0,0,.2)";
    //             } else {
    //                 node.style.borderTop = "2px solid white";
    //                 node.style.borderBottom = "2px solid white";
    //                 node.style.background = "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.2)";
    //             }
    //         }
    //     });
    // }
    