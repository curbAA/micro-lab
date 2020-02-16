function setButton(button, state){
    if (state == "pressed"){
        
        button.style.marginBottom = "0";
        button.style.marginRight = "0";
        button.style.marginRight = "5";

        button.style.background = "#dba16a";
        button.style.color = "#967252";
        
        button.style.filter = "none";
    } else if (state == "released"){

        button.style.marginBottom = "5";
        button.style.marginRight = "5";
        button.style.marginRight = "0";

        button.style.background = "#c5c5c5";
        button.style.color = "#7e7e7e";
        
        button.style.filter = "drop-shadow(5px 5px #7e7e7e)";
    }
}