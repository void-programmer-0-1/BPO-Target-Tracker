
let dataset = undefined;
let dataloaded = false;

// graphs
let onoff = true;

let cleaned_dataset = {
    cdataset : [0,0,0,0]  // target,achievement,error,leftout
};

let percentage_error = {
    per_err : [0,0,0,0]     // percentage for correct,error,achievement,leftout
};;

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

Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

let preprocessed_dataset = (dataset) => {

    for(let i=0;i<Object.size(dataset);i++){

        cleaned_dataset["cdataset"][0] += dataset[i]["fields"]["target"];
        cleaned_dataset["cdataset"][1] += dataset[i]["fields"]["achieved"];
        cleaned_dataset["cdataset"][2] += dataset[i]["fields"]["error"];
        cleaned_dataset["cdataset"][3] += (dataset[i]["fields"]["target"] - dataset[i]["fields"]["achieved"]);
        
    } // this loop calculates the sum for target,achieved and error

    p_e = percentageANDerror(cleaned_dataset["cdataset"][1],
                             cleaned_dataset["cdataset"][0],
                             cleaned_dataset["cdataset"][2]) // this function calculates the percentage

    percentage_error["per_err"][0] = p_e[0];
    percentage_error["per_err"][1] = p_e[1];
    percentage_error["per_err"][2] = p_e[2];
    percentage_error["per_err"][3] = p_e[3];

};



$.ajax({
    type: "GET",
    url : "/app/ograph/",
    success : (response) => {
        dataset = JSON.parse(response);

        preprocessed_dataset(dataset);

        console.log(dataset);
        console.log(cleaned_dataset["cdataset"]);
        console.log(percentage_error["per_err"]);

        let ograph = document.getElementById("ograph").getContext("2d");
        let ograph1 = document.getElementById("ograph1").getContext("2d");
        let configuration1,configuration2;
        
        configuration1 = {
            type: 'bar',
            data: {
                labels: ['Target', 'Achieved', 'Error','Leftout'],
                datasets: [{
                    label: 'Count Chart',
                    data: cleaned_dataset["cdataset"],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 106, 186, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 106, 186, 1)',
                    ],
                    borderWidth: 1
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
                responsive: true,
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
                labels: ['Correct', 'Error', 'Achivement','Leftout'],
                datasets: [{
                    label: ['Percentage Chart',],
                    data: percentage_error["per_err"],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 106, 186, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 106, 186, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins : {
                    title:{
                        display : true,
                        text : "Percentage Plot",
                        fontSize: 25
                    },
                },
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        let chart1 = new Chart(ograph,configuration1);
        let chart2 = new Chart(ograph1,configuration2);
    }   
});



