import View from './view.js'
class ChartView extends View{
   _parentEl= document.querySelector('.container');
   _date=0;
   
   
   
   
   chartGenerate(data){
      let labels = ['W 1', 'W 2', 'W 3', 'W 4', 'W 5'];
      let w1=0,w2=0,w3=0,w4=0,w5=0
      data.selectedMonthT.forEach(data=>{
    let d =data.time.split(',')[1].split(' ')[0] 
       if(d>=1 && d<=7){
          w1 +=+data.amount
       }
       if(d>7 && d<=14){
          w2 +=+data.amount
       }
       if(d>14 && d<=21){
          w3 +=+data.amount
       }
       if (d > 21 && d <= 28) {
          w4 += +data.amount
       }
       if (d > 28) {
          w5 += +data.amount
       }
      })
      let dataSet1 = [w1,w2,w3,w4,w5];
      let budgetPw = data.budget/5
      let dataSet2 = Array(5).fill(budgetPw)
      
      // Create the chart
      let ctx = document.getElementById('myChart').getContext('2d');
      let myChart = new Chart(ctx, {
         type: 'bar',
         data: {
            labels: labels,
            datasets: [
               {
                  label: 'Expense',
                  backgroundColor: 'steelblue',
                  data: dataSet1,
                  barPercentage: 0.4, // Adjust the width of the bars within each cluster
                  categoryPercentage: 0.5 // Adjust the spacing between the clusters
                },
               {
                  label: 'Budget',
                  backgroundColor: 'green',
                  data: dataSet2,
                  barPercentage: 0.4, // Adjust the width of the bars within each cluster
                  categoryPercentage: 0.5 // Adjust the spacing between the clusters
                }
              ]
         },
         options: {
            responsive: true,
            scales: {
               x: {
                  stacked: false
               },
               y: {
                  stacked: false // Set to false to make the bars parallel
               }
            }
         }
      });
   }
   
   chartGenerate2(data){
     let objects = {}
     data.selectedMonthT.forEach(function(transaction) {
  const category = transaction.category;
  const amount = transaction.amount;
  
  if (category in objects) {
    objects[category] += +amount;
  } else {
    objects[category] = +amount;
  }
});
      let xValues = []
      let yValues = []
     for(let [key,value] of Object.entries(objects)){
        xValues.push(key)
        yValues.push(value)
     }
      let barColors = [
        "#42445A",
        "#00ABA9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
      ];
      
      new Chart("myChart2", {
         type: "doughnut",
         data: {
            labels: xValues,
            datasets: [{
               backgroundColor: barColors,
               data: yValues
          }]
         },
         options: {
            title: {
               display: true,
               text: "Expenses by category "
            }
         }
      });
   }
}

export default new ChartView()