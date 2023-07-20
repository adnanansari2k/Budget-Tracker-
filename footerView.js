import View from './view.js'
class FooterView {
   _parentEl = document.querySelector('.footer')
   navigationHandler(handler) {
      let btns = document.querySelectorAll('.btn')
      this._parentEl.addEventListener('click', (e) => {
         let btn = e.target.closest('.btn')
         btns.forEach(btn=>{
            btn.classList.remove('selected')
         })
         btn.classList.add('selected')
         
         handler(btn.classList[0])
      })
   }
}

export default new FooterView()