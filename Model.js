const months = [
     "January","February","March","April","May","June","July","August","September", "October","November","December"];
import ChartView from './chartView.js'
export const state ={
   budget:3000,
   expense:0,
   status:0,
   transections:[],
   selectedMonth:'July',
   selectedMonthT:[],
}

export function expenseTotal(){
  let total =  state.transections.reduce((acc,t)=>{
      return +t.amount + acc
   },0)
   state.expense =total
}

export function currentTransection(){
   state.transections.forEach(t => {
      if (t.time.split(' ')[1] === state.selectedMonth) {
         state.selectedMonthT.push(t)
      }
   })
}

const init =function(){
   let storage = localStorage.getItem('transections')
   if (storage) state.transections = JSON.parse(storage)
   currentTransection()
}
init()