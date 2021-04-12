const getProducts = async () => {
   const response = await fetch('products.json');
   const result = await response.json();
   const products = result.products
   return products
}

const displayProducts = (products, positionBlock) => {
   let display = products.map(function ({ title, image, price }) {
      return ` <div class="product-center__item">
         <div class="product-center__header">
            <img src="${image}" alt="image">
         </div>
            <div class="product-center__footer">
               <h3>${title}</h3>
               <div class="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
               </div>
               <div class="product-price">
                  <h4>$${price}</h4>
               </div>
            </div>
         </div>`
   })
   display = display.join('')
   positionBlock.innerHTML = display
}

const sortCategory = document.querySelector('.sort-category')
const productCenter = document.querySelector('.product-center')
const shopCenter = document.querySelector('.shop-center')
const btnFilter = [...document.querySelectorAll('.filter-btn')]
const latestProduct = document.querySelector('.latest-product')


if (sortCategory) {
   sortCategory.addEventListener('click', async (event) => {
      let targetElement = event.target.closest('.section__title')
      if (!targetElement) return
      let idElement = targetElement.dataset.id
      if (idElement) {
         btnFilter.forEach(btn => {
            btn.classList.remove('active')
         })
         targetElement.classList.add('active')
         let products = await getProducts()
         let filterProduct = products.filter(product => product.category == idElement)

         displayProducts(filterProduct, productCenter)
      }
   })
}

function filtering(id, products, positionBlock) {
   displayProducts(products.filter(product => product.category == id), positionBlock)
}

window.addEventListener('DOMContentLoaded', async function () {
   let products = await getProducts()
   document.querySelector('.all-products').addEventListener('click', function () {
      displayProducts(products, shopCenter)
      this.classList.add('active')
   })
   document.querySelector('.product-latest').addEventListener('click', function () {
      filtering('latest', products, latestProduct)
      this.classList.add('active')
   })
})