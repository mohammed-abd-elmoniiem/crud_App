import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

var productName = document.getElementById('product-name');
var productPrice = document.getElementById('product-price');
var productCategory = document.getElementById('product-category');

var productDescription = document.getElementById('product-description');
var productImage = document.getElementById('product-image');
var productsSection = document.getElementById('products-section');
const addButton = document.getElementById("add");



// read saved product from the local storage
var productsList = retrieveSavedProducts();

// ***********************************

displayProducts(productsList)


/* 

  1-add new product
  2- display() => update ui using 
  3- storeLocal() => update the data stored in the localStorage with new product 

*/

window.addProduct = function addProduct(){

    productsList.unshift(createProduct())

    displayProducts(productsList);
    storeLocal();
    resetInputs();
}
// ////////////////////////////////////////////////////////////////



// store to local storage +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function storeLocal(){
  localStorage.setItem('products',JSON.stringify(productsList));
}
// ---------------------------------------------------------------------


// get data from local storage ++++++++++++++++++++++++++++++++++++++
function retrieveSavedProducts(){
  return JSON.parse(localStorage.getItem('products'))  || []
}
// ------------------------------------------


// reset inputs++++++++++++++++++++++++++++++++++++++++++++
function resetInputs(){

     document.getElementById('option').selected = true
      productName.value= null;
      productPrice.value= null;
      productDescription.value= null;
     

}
// --------------------------------


// create new product object+++++++++++++++++++++++++++++++++++++++
function createProduct(){
    return{
        productName:productName.value,
        productPrice:productPrice.value,
        productCategory:productCategory.value,
        productDescription:productDescription.value,
        productImage:productImage.files[0].name
    }
}
// ----------------------------------------------------------------


// delete product ++++++++++++
// update localestorage
// update ui





window.deleteProduct = function(productIndex){
    
  productsList.splice(productIndex,1);
  displayProducts(productsList);
   storeLocal();
};



// add products in html ++++++++++++++++++++++++++++++++++++++++
function displayProducts(products){
    var str= ''
    for(var i = 0 ;i < products.length;i++){

        str+=`
        <div class="">
        <div class="product border-1 p-2 shadow border rounded-2">
          <div class="image mb-2">
            <img
              class="w-100 h-100 object-fit-contain d-block"
              src="./public/images/${products[i].productImage}"
              alt="product image"
            />
          </div>
          <h3>${products[i].productName}</h3>
          <p>${products[i].productCategory}</p>

          <p >${products[i].productDescription}</p>
          <div class="d-flex justify-content-between">
            <p class="price">${products[i].productPrice}</p>
            <div class="">
              <i class="fa-solid fa-pen-to-square"></i>
              <i class="fa-solid fa-trash " id="delete" onclick = "deleteProduct(${i})"  ></i>
            </div>
          </div>
        </div>
      </div>
        `

    }
    productsSection.innerHTML = str;
}
// ---------------------------------------------------------------


// search ++++++++++++++++++++++++++++++++++++++
window.seachProduct =  function seachProduct(searchValue){

  var filterList = []

  console.log(searchValue)

  for(var i=0 ; i<productsList.length ;i++){

    if(productsList[i].productName.toLowerCase().includes(searchValue.toLowerCase())){
      filterList.push(productsList[i])
    }

  }
  displayProducts(filterList);
}
