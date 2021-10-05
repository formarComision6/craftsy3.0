async function search(keywords) {
    try {
        let response = await fetch('/api/products/search?keywords=' + keywords)
        let result = await response.json();

        if (result.meta.total > 0) {
            
            $('box-products').innerHTML = ""
            $('text-search').innerHTML = 'Resultados para la búsqueda: ' + keywords;

            result.data.forEach(product => {
                let item =
                `
                <div class="col-12 col-md-4 col-lg-3 my-2">
                    <a href="/products/detail/${product.id}">
                        <article class="p-3">
                        <img src="/images/${product.images[0].file}" class="img-fluid" alt="" />
                        <h4 class="text-secondary text-center">${product.name} </h4>
                        </article>
                    </a>
                </div>
                `
                $('box-products').innerHTML += item
            });

        } else {
            $('box-products').innerHTML = ""
            $('text-search').innerHTML = 'No hay resultados para la búsqueda: ' + keywords;
        }
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener('load', () => {
    search(query.get('keywords'));
})