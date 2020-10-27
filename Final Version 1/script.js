console.log("STAY AWAY FROM HERE OR YOU WILL BE CHARGED WITH A FINE OF $300")
function openNav() {
    document.getElementById("nav").style.height = "20%";
    
    }
	
function closeNav() {
    document.getElementById("nav").style.height = "0%";
	
	}

    if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}

function ready() {
	var removeCartItemButtons = document.getElementsByClassName('btn-danger')
	for (var i = 0; i < removeCartItemButtons.length; i++) {
    	var button = removeCartItemButtons[i]
    	button.addEventListener('click', removeCartItem)
	}
	
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for (var i=0; i<quantityInputs.length; i++) {
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}
	
	var addToCartButtons = document.getElementsByClassName('shop-item-button')
	for (var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	} 
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert("Thanks For Wasting Your Money On My Imaginary Product")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
	
function removeCartItem(event) {
		var buttonClicked = event.target
		buttonClicked.parentElement.remove()
		updateCartTotal()
}

function quantityChanged(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <=0) {
		input.value = 1
	}
	updateCartTotal()
}

function addToCartClicked (event) {
	var button = event.target
	var shopItem = button.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
	addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
							
function addItemToCart(title, price, imageSrc){
	var cartItem = document.createElement('cartItem')
    cartItem.classList.add('cart-item')
	var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
for (var i=0; i < cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title){
        alert('This item is already added to the cart')
        return
        }
    }
    var cartRowContent = `<img class="cart-item-image" src="${imageSrc}"/>
        <descr class="cart-item-title">${title}</descr>
        <prices class="cart-price">${price}</prices>
        <input class="cart-quantity-input" type="number" value="1">
        <remove class="btn-danger">&times;</remove>`
    cartItem.innerHTML = cartRowContent
    cartItems.append(cartItem)
    cartItem.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    cartItem.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}


function updateCartTotal () {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-item')
	var total = 0
	for (var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText.replace('$',''))
		var quantity = quantityElement.value 
		total = total + (price * quantity)
	}
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}