console.clear()

const jsonData = JSON.parse(localStorage.getItem('jsonData')) || [];

let id = location.search.split('?')[1]
console.log(id)

const params = new URLSearchParams(window.location.search);
const productId = params.get('productId');

// if(document.cookie.indexOf(',counter=')>=0)
// {
//     let counter = document.cookie.split(',')[1].split('=')[1]
//     document.getElementById("badge").innerHTML = counter
// }

document.getElementById("badge").innerHTML = jsonData.length ?? 0
function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     imgTag.style.height = '450px'
     imgTag.style.width = '400px'
     imgTag.style.objectFit = 'fit'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode("$ "+ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonsDiv = document.createElement('div')
    buttonsDiv.id = 'buttonsDiv'

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    buttonText = document.createTextNode('Add to Cart')
    buttonTag.onclick  =   function()
    {
      console.log(`JSON DATA = ${typeof(jsonData)}`);
      console.log(`JSON DATA = ${jsonData}`);
      jsonData.push(ob);
      localStorage.setItem('jsonData', JSON.stringify(jsonData));
      document.getElementById("badge").innerHTML = jsonData.length ?? 0
    }
    buttonTag.appendChild(buttonText)


    let pickupDiv = document.createElement('div')
    pickupDiv.id = 'pickupbutton'

    let pickUpButtonTag = document.createElement('button')
    pickupDiv.appendChild(pickUpButtonTag)

    pickUpButtonText = document.createTextNode('Pick Up')
    pickUpButtonTag.onclick  =   function()
    {
      alert('This feature will be available in next roll-out! \nThank you!');
    }
    pickUpButtonTag.appendChild(pickUpButtonText)

    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    productDetailsDiv.appendChild(buttonsDiv)
    
    
    buttonsDiv.appendChild(buttonDiv)
    buttonsDiv.appendChild(pickupDiv)
    buttonsDiv.style.display = 'flex'
    buttonsDiv.style.gap = '10px'

    return mainContainer
}



// BACKEND CALLING

// let httpRequest = new XMLHttpRequest()
// {
//     httpRequest.onreadystatechange = function()
//     {
//         if(this.readyState === 4 && this.status == 200)
//         {
//             console.log('connected!!');
//             let contentDetails = JSON.parse(this.responseText)
//             {
//                 console.log(contentDetails);
//                 dynamicContentDetails(contentDetails)
//             }
//         }
//         else
//         {
//             console.log('not connected!');
//         }
//     }
// }

// httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
// httpRequest.send()  


function fetchData() {
    fetch('../json/products.json')
      .then(response => {
        if(!response.ok) {
          throw new Error("Network response was not ok");
        } 
        return response.json();
      }).then(products => {
        dynamicContentDetails(products[productId - 1])
        // for (let i = 0; i < products.length; i++) {
        //           if (products[i].isAccessory) {
        //             console.log(products[i]);
        //             // containerAccessories.appendChild(
        //                 dynamicContentDetails(products[i])
        //             // );
        //           } else {
        //             console.log(products[i]);
        //             // containerClothing.appendChild(
        //                 dynamicContentDetails(products[i])
        //             // );
        //           }
        //         }
      });
  }

  window.onload = fetchData;
