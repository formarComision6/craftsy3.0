let spanCantidad = document.querySelector('span.badge');
let changuito = document.querySelector('#lista-carrito tbody');
let spanTotal = document.getElementById('total');
let cartHead = document.getElementById('cart-head');
let cartFooter = document.getElementById('cart-footer');
let cartEmpty = document.getElementById('cart-empty');
let btnCartEmpty = document.getElementById('btn-delete-cart');
let btnNextBuy = document.getElementById('btn-next-buy');

const urlBase = window.origin;



const mostrarCantidad = changuito => {

    var cantidad = 0;
    var total = 0;
    changuito.forEach(item => {
        cantidad += item.cantidad
        total += item.total
    });
    spanCantidad.innerHTML = cantidad
    spanTotal.innerHTML = `<span>$</span> <span class="float-end">${total}</span>`
    
    if(cantidad == 0){
        cartHead.setAttribute('hidden',true)
        cartFooter.setAttribute('hidden',true)
        cartEmpty.removeAttribute('hidden')
        btnCartEmpty.setAttribute('disabled',true);
        btnNextBuy.classList.add('disabled');
    }else{
        cartHead.removeAttribute('hidden')
        cartFooter.removeAttribute('hidden')
        cartEmpty.setAttribute('hidden',true)
        btnCartEmpty.removeAttribute('disabled');
        btnNextBuy.classList.remove('disabled');
    }

}

const show = async () => {
    try {
        let response = await fetch(urlBase + '/api/carts/show')
        let result = await response.json();
        console.log(result)
        mostrarCantidad(result.data)
    } catch (error) {
        console.log(error)
    }
}

const agregarItem = async (e,id) => {
    e.preventDefault()
    try {
        let response = await fetch(urlBase + '/api/carts/add/' + id)
        let result = await response.json();
        mostrarCantidad(result.data)

    } catch (error) {
        console.log(error)

    }
    console.log('producto ' + id + ' agregado!!')
}

show()