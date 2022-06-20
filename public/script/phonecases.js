const productsList = document.querySelector('.productsList');
const isInStockForm = document.getElementById('isInStock');
const personalReceiptForm = document.getElementById('personalReceipt');
const filterbyPrice = document.querySelectorAll('.filterByPrice')
const filterbyBrand = document.querySelectorAll('.filterByBrand')

function template(element) {return `
<div class="phones card mb-3" style="max-width: 540px;  max-height: 300px; margin: 0.5rem;" datatype="${element.type}" dataisinstock="${element.isInStock}" databrand="${element.brand}" dataPersonalreceipt="${element.personalReceipt}">
<div class="row g-0">
  <div class="col-md-4" style="display: flex; align-items:center; justify-content: center;">
    <img src="${element.img}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text">${element.text}</p>
      <p class="card-text mb-1"><small class="text-muted">${element.price} Ft</small><a href="${element.link}"><button type="button" class="btn btn-success btn-sm ms-1">Érdekel</button></a></p>
    </div>
  </div>
</div>
</div>
`}

//GET MOBILE PHONES
function getPhones(){
    fetch('/dataPhoneCases')
    .then(res => res.json())
    .then(data => {
        productsList.innerHTML = '';
        data.forEach(element => {productsList.insertAdjacentHTML('beforeend', template(element))
    });
})
}
getPhones()

// FILTER
let priceFilter = {
    0: {minPrice: 0, maxPrice: 99999999},
    1: {minPrice: 0, maxPrice: 24000},
    2: {minPrice: 24001, maxPrice: 81000},
    3: {minPrice: 81001, maxPrice: 150000},
    4: {minPrice: 150001, maxPrice: 0}
}

let brandFilter = {
    0: {brandFilterIdMin: 0, brandFilterIdMax: 5},
    1: {brandFilterIdMin: 1, brandFilterIdMax: 1},
    2: {brandFilterIdMin: 2, brandFilterIdMax: 2},
    3: {brandFilterIdMin: 3, brandFilterIdMax: 3},
    4: {brandFilterIdMin: 4, brandFilterIdMax: 4}
}

let brandId = 0; let priceId = 0;

filterbyBrand.forEach(e => {
    e.addEventListener('click', () => {
        brandId = parseInt(e.getAttribute('dataid'));
        getFilter()
    })
})

filterbyPrice.forEach(e => {
    e.addEventListener('click', () => {
        priceId = parseInt(e.getAttribute('dataid'));
        getFilter()
    })
})

function getFilter() {
    fetch('/dataPhoneCases')
    .then(res => res.json())
    .then(data => {
            let filteredData = data.filter(e => e.brand >= brandFilter[brandId].brandFilterIdMin && e.brand <= brandFilter[brandId].brandFilterIdMax && e.price >= priceFilter[priceId].minPrice && e.price <= priceFilter[priceId].maxPrice);
            fetch('/dataPhoneCases')
            .then(res => res.json())
            .then(data => {
                productsList.innerHTML = '';
                for(let i = 0; i < data.length; i++){
                    if(data[i]._id == filteredData[i]._id){
                        productsList.insertAdjacentHTML('beforeend', template(data[i]))
                    }else{
                        console.log('err')
                    }
                }
            })
    })  
}