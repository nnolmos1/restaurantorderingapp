import { menuArray } from './data.js'

let orders = [] //keeps track of users curr order

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }

    if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
})

function handleAddClick(itemId) {
    const targetOptionObj = menuArray.filter(function(option){ //find matching object in menuArray
        return option.id === Number(itemId)
    })[0] // .filter returns an array, [0] grabs the actual object inside it

    orders.push(targetOptionObj)

    renderOrder()
}

function handleRemoveClick(itemId) {
    // 1. Find the index (position) of the first item in orderArray that matches the clicked ID
    const targetOptionObjIndex = orders.findIndex(function(option){ //find matching object in menuArray
        return option.id === Number(itemId) //convert to num
    })

     //If the item exists in the array (findIndex returns -1 if it's not found)
    if (targetOptionObjIndex !== -1) {
        // Remove exactly 1 item at that specific index position
        orders.splice(targetOptionObjIndex, 1)
    }

    renderOrder()
}

function getMenuOptions() {
    let menuHtml = ``

    menuArray.forEach(function(option) {
        menuHtml += `
        <div class="menu-option"> 
            <p class="emoji"> ${option.emoji} </p>
                <div class="option-text">
                    <p class="option-title">${option.name}</p>
                    <p class="option-ingredients gray">${option.ingredients}</p>
                    <p class="option-price">$${option.price}</p>
                </div>
                <div class="plus-container">
                    <button class="add-btn" data-add="${option.id}">+</button>
                </div>        
        </div>
        <div class="divider"> </div>
        `
    })
    return menuHtml
}

function getOrderHtml() {
    // Only generate HTML if there is actually something in the cart
    if (orders.length === 0) {
        return "" 
    }
    
    let orderHtml = "" //html to render
    let totalPrice = 0

    orders.forEach(function(order){
        totalPrice += order.price

    
                                //note: span is inline, so it helps order render side by side. div forces a line break
        orderHtml += `
            <div class="order-item">
                <span class="order-item-name">${order.name}</span> 
                <button class="remove-btn" data-remove="${order.id}">remove</button>
                <span class="order-item-price">$${order.price}</span>
            </div>
        `
    })

    return `
        <div class="order-summary">
            <p class="order-title">Your Order</p>
            <div class="order-items-list">
                ${orderHtml}
            </div>
            <div class="dividerBlack"> </div>
            <div class="order-total-section">
                <span class="total-price-text">Total Price: </span>
                <span class="total-price-amount"> $${totalPrice}</span>
            </div>
            <button class="complete-btn" id="complete-btn">Complete order</button>
        </div>
    `
}

function renderOrder() {
    document.getElementById('order-container').innerHTML = getOrderHtml()
}

function render(){
    document.getElementById('menu-container').innerHTML = getMenuOptions()
}

render()