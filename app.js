// get product list from api
const productList = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120
      },
      quantity: 1
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {
        rate: 4.1,
        count: 259
      },
      quantity: 1
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: {
        rate: 4.7,
        count: 500
      },
      quantity: 1
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: {
        rate: 2.1,
        count: 430
      },
      quantity: 1
    }    
  ];

// get all DOM elements
const app = document.getElementById("app");
const productWrapper = document.querySelector(".product-wrapper");
const clear = document.querySelector("#clear");

function e(tagname, attributes, ...child) {
    const tag = document.createElement(tagname);
    Object.assign(tag, attributes);
    tag.append(...child);
    return tag;
}
// render 1 product
function renderProduct(product) {
    const productDiv =      
        e("div", {className: "product"}, 
            e("div", {className: "row d-flex"},

                e("div", {className: "col-3"},
                    e("div", {className: "product-img"}, 
                        e("img", {src: product.image})
                    )
                ),
                e("div", {className:"col-7"}, 
                    e("div", {className: "product-meta"},
                        e("div", {className: "product-title"}, product.title),
                        e("div", {className: "product-price"}, format2(product.price, "$")),
                        e("button", {className: "btn-remove", 
                            onclick: function() {
                                const index = productList.indexOf(product);
                                productList.splice(index,1);   // remove product from list
                                renderProductList(productList);     // render product List
                            }
                        }, "Remove"
                        )
                    )
                ),
                e("div", {className:"col-2"}, 
                    e("div", {className: "amount-controller"}, 
                        e("div", {className: "increase"},
                            e("i", {className: "bi bi-caret-up-fill", id: "btn-increase", style: "cursor:pointer", 
                                onclick: function(e) {        
                                product.quantity = product.quantity + 1;   
                                renderProductList(productList);                                      
                                }
                            })
                        ),
                        e("div", {className: "quantity"},
                            e("p", {className: "amount"}, product.quantity)
                        ),
                        e("div", {className: "decrease"},
                            e("i", {className: "bi bi-caret-down-fill", id: "btn-decrease", style: "cursor:pointer",
                                onclick: function(e) {
                                product.quantity = product.quantity - 1;
                                renderProductList(productList);                            
                                if (product.quantity == 0) {
                                    const index = productList.indexOf(product)
                                    productList.splice(index, 1);
                                    renderProductList(productList);
                                }
                                }
                            })
                        )
                    )                  
                )   
            )                  
        )          
    return productDiv;
}

function renderProductList(products){
    productWrapper.innerHTML ="";
    products.map(product => productWrapper.append(renderProduct(product)))
    productWrapper.append(renderTotalPrice())
}

// Calculate final price
function calculateTotalPrice(productList) {
    let total = 0;
    for (let product of productList) {
        total += product.price * product.quantity;
    }
    return total;
}

function format2(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

// Render Total Price
function renderTotalPrice() {
    const priceDiv = e("div", {className: "final-price d-flex justify-content-between"},
        e("p", {},  "Total Price"),
        e("div", {className: "mright-150"}, format2(calculateTotalPrice(productList), "$"))    
    )
    return priceDiv;
}

renderProductList(productList);

// add event Clear All to button clear all
clear.addEventListener("click", () => {
    productList.length = 0;
    renderProductList(productList);
    const alert = e("p", {}, "is currently empty");
    const totalPrice = document.querySelector(".final-price")
    totalPrice.remove()
    productWrapper.append(alert);
})



