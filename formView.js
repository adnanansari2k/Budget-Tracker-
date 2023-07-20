import View from './view.js'
class FormView extends View {
  _parentEl = document.querySelector('.container')
  _newCategory;
  transectionDataHandler(handler){
     this._parentEl.addEventListener('submit',(e)=>{
        e.preventDefault()
        let form = e.target.closest('form')
        if(!form) return 
        let dataArr = [...new FormData(form)]
        let data = Object.fromEntries(dataArr)
       handler(data)
     })
  }
  
   markup() {
    return  `
       <form>
         <h1 class="title5">Transection details</h1>
         <label for="name">Enter transaction name</label>
         <input type="text" class="transectionName" placeholder="Name of Transaction" name="name" required></br>
         <label for="amount">Enter transaction Amount</label>
         <input type="number" class="transectionAmount" name="amount" placeholder="Amount " required>
         <h1 class="title4">Select Payment Method</h1>
         <input type="radio" name="payment" value="cash">
         <span class="material-symbols-outlined">
            payments
         </span>
         <label for="payment">Cash</label><br>
         <input type="radio" name="payment" value="bank">
         <span class="material-symbols-outlined">
            account_balance
         </span>
         <label for="payment">Bank</label><br>
       <h1 class="title4">Select One of category</h1>
         <input type="radio" name="category" value="food">
         <label for="category">Food</label>
         <input type="radio" name="category" value="transport">
         <label for="category">Transport</label>
          <input type="radio" name="category" value="cigrate">
         <label for="category">Cigrate</label>
         <input type="radio" name="category" value="tea">
         <label for="category">Tea</label>
          <input type="radio" name="category" value="medicin">
         <label for="category">Medicin</label>
         </br>
         <input type="submit" value="Confirm Transaction" class="submit">
         </form>
      `
   }
}

export default new FormView()