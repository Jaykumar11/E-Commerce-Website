console.clear();

const jsonData = JSON.parse(localStorage.getItem('jsonData'));

// if(document.cookie.indexOf(',counter=')>=0)
// {
//     let counter = document.cookie.split(',')[1].split('=')[1]
    
// }

document.getElementById("badge").innerHTML = jsonData.length
let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    console.log(`Parthiv ==  ${ob}`);
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(`${ob.name}` + ' × ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: ' + `${ob.price}`)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    let boxh5 = document.createElement('h5')
    let h5Text = document.createTextNode('Delete Product')
    boxh5.id = 'delete-product'
    boxh5.appendChild(h5Text)
    boxDiv.appendChild(boxh5)

    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    buttonLink.appendChild(buttonText)
    clearButtonLink.appendChild(clearButtonText)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    // let totalh4Text = document.createTextNode(amount)
    let totalh4Text = document.createTextNode('Amount: $' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonsDiv)
    console.log(totalh4);
}

let buttonsDiv = document.createElement('div')
buttonsDiv.id = 'buttonsDiv'

let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = 'orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function()
{
    localStorage.clear();
    console.log("clicked")
}  

let clearButtonDiv = document.createElement('div')
clearButtonDiv.id = 'clearButton'

let clearButtonTag = document.createElement('button')
clearButtonTag.id = 'clearButtonTag'
clearButtonDiv.appendChild(clearButtonTag)

let clearButtonLink = document.createElement('a')
// clearButtonLink.href = 'orderPlaced.html?'
clearButtonTag.appendChild(clearButtonLink)

clearButtonText = document.createTextNode('Clear Cart')
clearButtonTag.onclick = function()
{
    localStorage.clear();
    location.reload();
}  

buttonsDiv.appendChild(buttonDiv)
buttonsDiv.appendChild(clearButtonDiv)
buttonsDiv.style.display = 'flex'
buttonsDiv.style.gap = '10px'

// dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL
// let httpRequest = new XMLHttpRequest()
// let totalAmount = 0
// httpRequest.onreadystatechange = function()
// {
//     if(this.readyState === 4)
//     {
//         if(this.status == 200)
//         {
//             // console.log('call successful');
//             contentTitle = JSON.parse(this.responseText)

//             let counter = Number(document.cookie.split(',')[1].split('=')[1])
//             document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

//             let item = document.cookie.split(',')[0].split('=')[1].split(" ")
//             console.log(counter)
//             console.log(item)

//             let i;
//             let totalAmount = 0
//             for(i=0; i<jsonData.length; i++)
//             {
//                 let itemCounter = 1
//                 for(let j = i+1; j<counter; j++)
//                 {   
//                     if(Number(item[j]) == Number(item[i]))
//                     {
//                         itemCounter +=1;
//                     }
//                 }
//                 // totalAmount += Number(contentTitle[item[i]-1].price) * itemCounter
//                 dynamicCartSection(contentTitle[item[i]-1],itemCounter)
//                 i += (itemCounter-1)
//             }
//             amountUpdate(totalAmount)
//         }
//     }
//         else
//         {
//             console.log('call failed!');
//         }
// }

// httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
// httpRequest.send()

function fetchData() {
    let counter = jsonData.length
    document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

    // let item = document.cookie.split(',')[0].split('=')[1].split(" ")
    console.log(counter)
    // console.log(item)

    let i;
    let totalAmount = 0
    for(i=0; i<counter; i++){
        let itemCounter = 1
        dynamicCartSection(jsonData[i], itemCounter)
        i += (itemCounter-1)
        console.log(jsonData[i].price);
        totalAmount += jsonData[i].price    
        console.log("Amount = $ " + totalAmount);            
    }
    amountUpdate(totalAmount)
}

window.onload = fetchData;

