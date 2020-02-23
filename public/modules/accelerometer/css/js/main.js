//
// ─────────────────────────────────────────────── ANCHOR PAGE RESPONSIVENESS ─────
//
    
    var chart_table = document.querySelector(".chart-table");
    var chart_box = document.querySelectorAll(".chart-box");

    if (window.innerWidth < 850){
        chart_table.style.gridTemplateColumns = "auto";
        chart_table.style.gridTemplateRows = "auto auto auto";
    } else {
        chart_table.style.gridTemplateColumns = "auto auto auto";
        chart_table.style.gridTemplateRows = "auto";
    }

    window.addEventListener("resize", ()=>{
        if (window.innerWidth < 850){
            chart_table.style.gridTemplateColumns = "auto";
            chart_table.style.gridTemplateRows = "auto auto auto";
        } else {
            chart_table.style.gridTemplateColumns = "auto auto auto";
            chart_table.style.gridTemplateRows = "auto";
        }
    });
