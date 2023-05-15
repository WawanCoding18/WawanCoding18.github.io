//Toggle class active untuk menu//
const navbarNav = document.querySelector('.navbar-nav');

//ketika icon Menu di klik//
document.querySelector('#menu').onclick = () =>{
    navbarNav.classList.toggle('active')
}

//Toggle class active untuk search form menu//
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

//ketika icon Search di klik//
document.querySelector('#search-button').onclick = (e) =>{
    searchForm.classList.toggle('active')
    searchBox.focus()
    e.preventDefault()
}

//Toggle class active untuk shopping-cart form menu//
const shoppingCart = document.querySelector('.shopping-cart');

//ketika icon Shopping-cart di klik//
document.querySelector('#shopping-cart-button').onclick = (e) =>{
    shoppingCart.classList.toggle('active');
    e.preventDefault()
}

//Klik di luar sidebar untuk menghilangkan nav, search dan shopping-cart//
const hm = document.querySelector('#menu');
const sb = document.querySelector('#search-button')
const scb = document.querySelector('#shopping-cart-button')

document.addEventListener('click', function (e){
    if ( !hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active')
    }
    if ( !sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active')
    }
    if (!scb.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active')
    }
})

//Modal Box//
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display ='flex';
        e.preventDefault();
    };
})


//Klik tombol close modal//
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display= 'none';
    e.preventDefault();
}




