import ChartView from './chartView.js'
import FooterView from './footerView.js'
import DashboardView from './dashboardView.js'
import HistoryView from './historyView.js'
import FormView from './formView.js'
import * as model from './Model.js'
//import AllTransectionView from './allTransectionView.js'
const months = [
     "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function showApp() {
   DashboardView.render(model.state)
   ChartView.chartGenerate(model.state)
   ChartView.chartGenerate2(model.state)
}

function transectionDataController(data) {
   let id = (Math.random() + '').slice(-6)
   data.id = id
   let date = new Date()
   let m0 = date.getMonth()
   let h0 = date.getHours()
   let h1 = ((h0 > 12 ? h0 - 12 : h0) + '').padStart(2, '0')
   let h = h1 === '00' ? 12 : h1
   let m = (date.getMinutes() + '').padStart(2, '0')
   let d = date.getDate()
   let time = `${h}:${m},${d} ${months[m0] }`
   data.time = time
   model.state.transections.push(data)
   localStorage.setItem('transections', JSON.stringify(model.state.transections))
   model.expenseTotal()
}

function navigationControll(page) {
   if (page === 'addButton') {
      FormView.render(model.state)

   }
   if (page === 'history') {
      HistoryView.render(model.state)
      HistoryView.categoryChange(categoryChangeController)
   }
   if (page === 'dashbord') {
      DashboardView.render(model.state)
      ChartView.chartGenerate(model.state)
      ChartView.chartGenerate2(model.state)
   }
}

function editController(value) {
   model.state.budget = value
   DashboardView.render(model.state)
   ChartView.chartGenerate(model.state)
   ChartView.chartGenerate2(model.state)
}

function dateController(date) {
   let month = months[parseInt(date) - 1]
   model.state.selectedMonth = month
   model.state.selectedMonthT = []
   model.currentTransection()
   ChartView.chartGenerate(model.state)
   ChartView.chartGenerate2(model.state)
}

function categoryController() {
   FormView.render(model.state)
}

function transectionController(id) {
   let index = model.state.transections.findIndex(t => {
      return t.id === id
   })
   model.state.transections.splice(index, 1)
   localStorage.setItem('transections', JSON.stringify(model.state.transections))
   HistoryView.render(model.state)
}

function searchController(name) {
   let modefiedData = { transections: [] }
   model.state.transections.forEach(t => {
      if (t.name === name) {
         modefiedData.transections.push(t)
      }
   })
   HistoryView.render(modefiedData)
}

function categoryChangeController(name) {
   let modefiedData = { transections: [] }
   model.state.transections.forEach(t => {
      console.log(t, name);
      if (t.category === name) {
         console.log(t, name);
         modefiedData.transections.push(t)
      }
   })
   if (name === 'all') {
      modefiedData.transections = model.state.transections
   }
   HistoryView.render(modefiedData)
}

function init() {
   FooterView.navigationHandler(navigationControll)
   DashboardView.editHandler(editController)
   FormView.transectionDataHandler(transectionDataController)
   ChartView.dateHandler(dateController)
   HistoryView.transectionRemove(transectionController)
   HistoryView.searchViewHandler(searchController)
   showApp()
}

init()