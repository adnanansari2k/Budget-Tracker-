import View from './view.js'
class HistoryView extends View{
   _parentEl = document.querySelector('.container');
  transectionRemove(handler){
     this._parentEl.addEventListener('dblclick',(e)=>{
        let btn = e.target.closest('.transection')
        if(!btn) return
        handler(btn.dataset.id)
     })
  }   
  
  searchViewHandler(handler){
     this._parentEl.addEventListener('change', (e) => {
        let btn = e.target.closest('.searchBar')
        if (!btn) return
        handler(btn.value)
     })
  }
  
  categoryChange(handler){
     this._parentEl.addEventListener('click', (e) => {
        let btn = e.target.closest('.category')
        if (!btn) return
        console.log(btn.dataset.name);
        handler(btn.dataset.name)
     })
     
  }
  
   markup(){
     return `
      <input type="text" class="searchBar" placeholder="Search...">
         <div class="categoryBar">
            <span class='category' data-name="all">All</span>
            <span class='category' data-name="food">Food</span>
            <span class='category' data-name="medicin">Medicine</span>
            <span class='category' data-name="transport">Transport</span>
            <span class='category' data-name="cigrate">Cigrates</span>
         </div>
         <div class="transectionWrap">
         ${this._data.transections.map(this.genrateMarkup).join('')}
         </div>
          
      `
         
   }
   
   genrateMarkup(data){
      return `
           <div class="transection" data-id=${data.id}>
               <div class="one">
                  <p class="name">${data.name}</p>
                  <span class="material-symbols-outlined icon">
                     ${data.payment === 'cash'?  'payments':'account_balance'}
                  </span>
                  <span class="CategoryType">${data.category
                  }</span>
               </div>
               <div class="two">
                  <h6 class="todayDate">${data.time}</h6>
                  <h6 class="transectionMoney">-$${data.amount}</h6>
               </div>
            </div>
      `
   }
   
}

export default new HistoryView()