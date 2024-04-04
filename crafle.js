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

//Klik tombol diluar modal//
window.onclick = (e) => {
    if (e.target === itemDetailModal){
        itemDetailModal.style.display='none';
    }
}

document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => {
    items = [
      { id: 1, name: 'Original Waffle', img: 'produk2.jpg', price: 5000 },
      { id: 2, name: 'Waffle Oreo', img: 'waffle large.jpg', price: 10000 },
      { id: 3, name: 'Waffle Ice Cream', img: '1.jpg', price: 10000 },
    ];
  });
  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada / cart masih kosong

      if(!cartItem){
          this.items.push({...newItem, quantity:1, total: newItem.price});
          this.quantity++;
          this.total += newItem.price;
      } else{
        //jika barang sudah ada, cek apakah barang beda atau sama dengan ada yang di cart
        this.items = this.items.map((item)=>{
        //jika barang berbeda
        if(item.id !== newItem.id){
          return item;
        } else{
          //jika barang sudah ada , tambah quantity dan totalnya
          item.quantity++;
          item.total = item.price * item.quantity;
          this.quantity++;
          this.total += item.price;
          return item;
        }
        })
      }
    
      
      console.log(this.total);
    },
    remove(id){
      //ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari 1
      if(cartItem.quantity > 1){
        //telusuri 1 1
        this.items = this.items.map((item) => {
           //jika bukan barang yang diklik
           if(item.id !== id){
             return item;
           } else{
             item.quantity--;
             item.total = item.price * item.quantity;
             this.quantity--;
             this.total -= item.price
             return item;
           }
        })
      } else if(cartItem.quantity === 1){
        //jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id)
        this.quantity--;
        this.total-=cartItem.price;
        return item;
      }
    }
  });
      
});

//konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

//form validation
const checkoutButton = document.querySelector('.checkout-button')

checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm')

form.addEventListener('keyup', function(){
    for(let i = 0; i < form.elements.length; i++){
      if(form.elements[i].value.length !== 0){
        checkoutButton.classList.remove('disabled')
        checkoutButton.classList.add('disabled')
      }else{
        return false;
      }
    }
    checkoutButton.disabled = false
    checkoutButton.classList.remove('disabled')
})

//kirim data ketika tombol checkout di click
checkoutButton.addEventListener('click', async function(e){
   e.preventDefault();
   const formData = new FormData(form)
   const data = new URLSearchParams(formData);
   const objData = Object.fromEntries(data);
   const message = formatMessage(objData)
   window.open('https://wa.me/6285876009918?text= '+ encodeURIComponent(message))
  
  // //minta transaction token menggunakan ajax / fetc
  // try{
  //     const response = await fetch('php/craffle.php',{
  //       method: "POST",
  //       body: data,
  //     });
  //     const token = await response.text()
  //     window.snap.pay(token)
  // }catch (err){
  //   console.log(err.message)
  // }

  });

//format pesan whatsap
const formatMessage = (obj) => {
   return `Data Customer
     Nama: ${obj.name}
     Email: ${obj.email}
     No HP: ${obj.phone}
     Data Pesanan
     ${JSON.parse(obj.items).map((item)=> `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`)}
     TOTAL: ${rupiah(obj.total)}
     Terima kasih.`
}
