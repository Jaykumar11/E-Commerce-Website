// console.clear();

let contentTitle;

const jsonData = JSON.parse(localStorage.getItem('jsonData')) ?? [];
document.getElementById("badge").innerHTML = jsonData.length

console.log(document.cookie);
function dynamicMobileSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = `contentDetails.html?productId=${ob.id}`;

  let imgTag = document.createElement("img");
  imgTag.style.height = '300px'
  imgTag.style.objectFit = 'fit'
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("$ " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicMobileSection());

// console.log(boxDiv)

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
                if (products[i].isAccessory) {
                  containerAccessories.appendChild(
                    dynamicMobileSection(products[i])
                  );
                } else {
                  mobileContainer.appendChild(
                    dynamicMobileSection(products[i])
                  );
                }
              }
    });
}

window.onload = fetchData;

