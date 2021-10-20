const $ = id => document.getElementById(id);
const query = new URLSearchParams(location.search);

if($('form-search')){
    $('form-search').addEventListener('submit', e => {
        e.preventDefault();
        if(location.pathname != '/products/search'){
            $('form-search').submit()
        }else{
            query.set('keywords',$('input-search').value);
            history.replaceState({},'',`${location.pathname}?${query}`)
            search(query.get('keywords'));
        }
    })
}

