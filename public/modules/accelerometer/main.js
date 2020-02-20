//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "accelerometer";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });

//
// ────────────────────────────────────────────────────────── ANCHOR CHART JS ─────
//

    Chart.defaults.global.defaultFontColor = 'rgba(255,255,255,0.5)';
    Chart.defaults.global.defaultFontFamily = 'montserrat';
    Chart.defaults.global.defaultFontSize = 10;

    var options = {

        legend:{
            display:false,
            labels:{
            }
        },

        scales:{

            yAxes: [{
                gridLines:{
                    color:"rgba(255,255,255,0.1)",
                    zeroLineColor:"rgba(255,255,255,0.1)",
                    
                    lineWidth:1,
                    zeroLineWidth:1,
                },
                ticks: {
                    beginAtZero: false,
                    suggestedMax: 2000,
                    suggestedMin: -2000,
                    maxTicksLimit: 5,
                },
            }],

            xAxes:[{
                gridLines:{
                    color:"rgba(0,0,0,0)",
                    zeroLineColor:"rgba(0,0,0,0)",
                },
                ticks:{
                    beginAtZero: false,
                }
            }]
        }
    };

    var default_chart_type = "line";
    var default_chart_data = {
        labels:["0", "1", "2", "3", "4", "5"],
        datasets:{
            data:[500,1000,-1500,2000,-1000,-500],
            borderWidth:2,
        },
    };

    //
    // ────────────────────────────────────────────────────── ANCHOR X AXIS CHART ─────
    //  

    
        
        var x_ctx = document.getElementById('x-chart').getContext('2d');
        var x_chart = new Chart(x_ctx, {
            type: default_chart_type,
            data: {
                datasets: [{
                    label: "X",
                    backgroundColor: "rgba(255, 50, 100, 0.2)",
                    borderColor: "rgba(255, 50, 100, 0.7)",
                    borderWidth: default_chart_data.datasets.borderWidth,
                }]
            },
            options: options
        });
        

    //
    // ────────────────────────────────────────────────────── ANCHOR Y AXIS CHART ─────
    //
        
        var y_ctx = document.getElementById('y-chart').getContext('2d');
        var y_chart = new Chart(y_ctx, {
            type: default_chart_type,
            data: {
                datasets: [{
                    label: "Y",
                    backgroundColor: "rgba(100, 50, 255, 0.2)",
                    borderColor: "rgba(100, 50, 255, 0.7)",
                    borderWidth: default_chart_data.datasets.borderWidth,
                }]
            },
            options: options
        });
        
        
    //
    // ────────────────────────────────────────────────────── ANCHOR Z AXIS CHART ─────
    //
    
        var z_ctx = document.getElementById('z-chart').getContext('2d');
        var z_chart = new Chart(z_ctx, {
            type: default_chart_type,
            data: {
                datasets: [{
                    label: "Z",
                    backgroundColor: "rgba(50, 255, 100, 0.2)",
                    borderColor: "rgba(50, 255, 100, 0.7)",
                    borderWidth: default_chart_data.datasets.borderWidth,
                }]
            },
            options: options
        });

    //
    // ──────────────────────────────────────── ANCHOR ADD DATA TO CHART FUNCTION ─────
    //

        function chartPlotData(chart, value, index, limit){
            console.log(chart.data.datasets[0].data.length);

            if(chart.data.datasets[0].data.length < limit){

                chart.data.datasets[0].data.push(value);
                chart.data.labels.push(index);
            } else {

                chart.data.datasets[0].data.shift();
                chart.data.datasets[0].data.push(value);
                
                chart.data.labels.shift();
                chart.data.labels.push(index);
            }

            chart.update();
        }

        chartPlotData(x_chart, 2000, "0", 4);
        chartPlotData(x_chart, 100, "1", 4);
        chartPlotData(x_chart, -1500, "2", 4);
        chartPlotData(x_chart, -1500, "3", 4);

        chartPlotData(y_chart, 2000, "0", 4);
        chartPlotData(y_chart, 100, "1", 4);
        chartPlotData(y_chart, -1500, "2", 4);
        chartPlotData(y_chart, -1500, "3", 4);

        chartPlotData(z_chart, 2000, "0", 4);
        chartPlotData(z_chart, 100, "1", 4);
        chartPlotData(z_chart, -1500, "2", 4);
        chartPlotData(z_chart, -1500, "3", 4);
        

        
        