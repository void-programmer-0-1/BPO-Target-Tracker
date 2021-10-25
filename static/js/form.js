
$( document ).ready(function() {
    $('#form-modal').modal('show');
});

document.getElementById("sub-btn").addEventListener("click",() => {
    $('#form-modal').modal('hide');
});

let percentageANDerror = (achieved,target,error) => {
    let pcorrect = 0;
    let perror = 0;
    let pachievement = 0;
    let pleftout = 0;

    pcorrect = ((achieved - error) / target) * 100;
    perror = (error / target) * 100;
    pachievement = (achieved / target) * 100
    pleftout = ((target - achieved) / target) * 100;

    return [pcorrect,perror,pachievement,pleftout];
};

 

let dataset;

$.ajax({
    type: "GET",
    url : "/app/formdata/",
    success : (res) => {
        dataset = JSON.parse(res);
        console.log(dataset);

        Chart.defaults.font.size = 16;
        Chart.defaults.font.family = "Lato";
        

        let graph1 = document.getElementById("graph1").getContext("2d");
        let graph2 = document.getElementById("graph2").getContext("2d");
        let graph3 = document.getElementById("graph3").getContext("2d");
        let graph4 = document.getElementById("graph4").getContext("2d");
        

        configuration1 = {
            type: 'bar',
            data: {
                labels: ['Target', 'Achieved', 'Error','Leftout'],
                datasets: [{
                    label: "Count Calculated",
                    data: [dataset["target"],dataset["achieved"],dataset["error"],dataset["target"] - dataset["achieved"]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(48, 48, 48, 0.2)',
                        'rgba(255, 106, 186, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(48, 48, 48, 1)',
                        'rgba(255, 106, 186, 1)',
                    ],
                    borderWidth : 1,
                    hoverBorderWidth : 3,
                }]
            },
            options: {
                plugins : {
                    title:{
                        display : true,
                        text : "Counter Plot",
                        fontSize: 25
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
      
        configuration2 = {
            type: 'bar',
            data: {
                labels: ['Correct', 'Error', 'Achievement','Leftout'],
                datasets: [{
                    label: "Percentage Calculated",
                    data: percentageANDerror(dataset["achieved"],dataset["target"],dataset["error"]),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(48, 48, 48, 0.2)',
                        'rgba(255, 106, 186, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(48, 48, 48, 1)',
                        'rgba(255, 106, 186,1)',
                    ],
                    borderWidth : 1,
                    hoverBorderWidth : 3,
                }]
            },
            options: {
                plugins : {
                    title:{
                        display : true,
                        text : "Percentage Chart",
                        fontSize: 25
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            }
        };

        configuration3 = {
            type: 'doughnut',
            data: {
                labels: ['Target', 'Achieved', 'Error','Leftout'],
                datasets: [{
                    label: "Count Calculated",
                    data: [dataset["target"],dataset["achieved"],dataset["error"],dataset["target"] - dataset["achieved"]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(48, 48, 48, 0.2)',
                        'rgba(255, 106, 186, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(48, 48, 48, 1)',
                        'rgba(255, 106, 186, 1)',
                    ],
                    borderWidth : 1,
                    hoverBorderWidth : 3,
                }]
            },
            options: {
                plugins : {
                    title:{
                        display : true,
                        text : "Counter Plot",
                        fontSize: 25
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        
        configuration4 = {
            type: 'doughnut',
            data: {
                labels: ['Correct', 'Error', 'Achievement','Leftout'],
                datasets: [{
                    label: "Percentage Calculated",
                    data: percentageANDerror(dataset["achieved"],dataset["target"],dataset["error"]),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(48, 48, 48, 0.2)',
                        'rgba(255, 106, 186, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(48, 48, 48, 1)',
                        'rgba(255, 106, 186,1)',
                    ],
                    borderWidth : 1,
                    hoverBorderWidth : 3,
                }]
            },
            options: {

                plugins : {
                    title:{
                        display : true,
                        text : "Percentage Chart",
                        fontSize: 25
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            }
        };

        let chart1 = new Chart(graph1,configuration1);
        let chart2 = new Chart(graph2,configuration2);
        let chart3 = new Chart(graph3,configuration3);
        let chart4 = new Chart(graph4,configuration4);

    }
})


