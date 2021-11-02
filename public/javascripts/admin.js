console.log('admin conneted success')

$('table-products').innerHTML = null; //limpio el caja padre

const loadProduct = async (limit,show,current,initial,next) => {
    try {
        let response = await fetch('/api/products');
        let result = await response.json();
        
        result.data.forEach(product => {
            addItem(product)
        });
        console.log()
        paginator(result.meta.total,limit,show,current,initial,next)

    } catch (error) {
        console.log(error)
    }
}

loadProduct(10,6,1,1,0)

const confirmRemove = (e,form) => {
    e.preventDefault()
    //console.log(form)

    Swal.fire({
        title: '¿Estás seguro que deseas eliminar el producto?',
        text: "¡Luego no podrás revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit()
        }
    })
}

const addItem = product => {
    let item = `
    <tr>
        <th scope="row">${product.id} </th>
        <td>${product.name} </td>
        <td>${product.price} </td>
        <td>${product.category.name} </td>
        <td class="d-flex justify-content-around">
            <a class="btn btn-sm btn-success"
            href="/products/edit/${product.id} "><i class="fas fa-edit"></i></a>
        <div>
            <form
                action="/products/delete/${product.id}?_method=DELETE"
                method="POST" id="formDelete${product.id}">
                <button 
                    class="btn btn-sm btn-danger"
                    type='submit'
                    onclick="confirmRemove(event,document.querySelector('#formDelete${product.id}'))"
                ><i class="fas fa-trash-alt"></i></button>
            </form>
        </div>
        </td>
    </tr>
    `
    $('table-products').innerHTML += item;
}

const goPage = async (event,current,limit,initial,next) => {
    event.preventDefault();
    $('table-products').innerHTML = null;
    $('box-paginator').innerHTML = null;

    try {
        let response = await fetch(`/api/products?current=${current}&limit=${limit}`);
        let result = await response.json();
        result.data.forEach(product => {
            addItem(product)
        });
        paginator(result.meta.total,limit,6,current,initial,next)

    } catch (error) {
        console.log(error)
    }
}

goPagesNext = (event,total,limit,show,current,initial,next) => {
    event.preventDefault();
    current = current + show;
    initial = initial + show;
    next = next + show
    paginator(total,limit,show,current,initial,next)
    goPage(event,current,limit,initial,next)
}


function paginator(total, limit, show, current,initial,next){
    let pages = Math.ceil(total / limit)
    $('box-paginator').innerHTML = 
    `
        <li class="page-item">
            <a class="page-link me-1" href="#">
                <i class="fas fa-angle-left"></i>
            </a>
        </li>
        <li class="page-item">
            <a class="page-link" href="#">
                <i class="fas fa-angle-double-left"></i>
            </a>
        </li>
    `
    for (let i = initial; i < initial + show; i++) {
        $('box-paginator').innerHTML += 
        `
            <li class="page-item ${current == i ? 'active' : null}" onclick="goPage(event, ${i},${limit},${initial},${next})"><a class="page-link" href="#">${i}</a></li>
        `
    }
   
    $('box-paginator').innerHTML += 
    `
        <li class="page-item">
            <a class="page-link" href="#" onclick="goPagesNext(event,${total},${limit},${show},${current},${initial},${next})">
                <i class="fas fa-angle-double-right"></i>
            </a>
        </li>
        <li class="page-item ms-1">
        <a class="page-link" href="#">
            <i class="fas fa-angle-right"></i>
        </a>
    </li>
    `
}