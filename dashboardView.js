import View from './view.js'
import * as model from './Model.js'
class DashboardView extends View {
   _parentEl = document.querySelector('.container')
  
  editHandler(handler) {
     this._parentEl.addEventListener('change', (e) => {
        let btn = e.target.closest('.budgetEdit')
        if (!btn) return
        handler(btn.value)
     })
  }
  
   status(){
     model.state.status = this._data.budget - this._data.expense
   } 
   
   markup() {
      let minus =  this._data.budget -this._data.expense
      let isexceded = minus<0
      let amountExceeded =Math.abs(minus)
      let percentageExceeded = amountExceeded/this._data.budget*100
      console.log(percentageExceeded);
      return `
      <div class="BudgetAndExpense">
               <div class="expense">
                  <p class="expenseTitle">
                     Expense
                  </p>
                  <p class="expenseTotal">${this._data.expense}</p>
                  <p style='color:${this._data.budget>=this._data.expense? 'green' :'red'}' class="expensePercentage">$${minus}(${isexceded? percentageExceeded.toFixed(1)+'% exceeded':'on Budget'}) 
                  </p>
               </div>
               <div class="budget">
                  <p class="budgetTitle">
                     Budget
                  </p>
                  <input type='number' class="budgetEdit" placeholder='Edit'>
                  <p class="budgetTotal">$${this._data.budget}</p>
               </div>
            </div> 
            <div class= "barChartWarapper" >
         <div class="header2">
                  <p class="title2">Budget Vs Expenses</p>
                  <input type="month" name="Date" id="Date" value="2023-07">
      
               </div> 
               <div class = "barchart" >
      <canvas id="myChart" style="width:236px;height:164px;min-height:100%"></canvas> 
             </div> 
      </div>
      <h3 class = "title3" > Expense across categories </h3> 
      <div class = "doughnutChart">
         <canvas id="myChart2" style="width:100%;height:244px;min-height:100%"></canvas>
         </div>
      `
   }
}
export default new DashboardView()