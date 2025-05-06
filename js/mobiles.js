let mainContainer = document.getElementById("mainContainer");
let mobileContainer = document.getElementById("mobileContainer");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicMobileSection('hello world!!'))

// BACKEND CALLING

function fetchData() {
  fetch('../json/products.json')
    .then(response => {
      if(!response.ok) {
        throw new Error("Network response was not ok");
      } 
      return response.json();
    }).then(products => {
      for (let i = 0; i < products.length; i++) {
            mobileContainer.appendChild(
                dynamicMobileSection(products[i])
            );    
        }
    });
}

window.onload = fetchData;