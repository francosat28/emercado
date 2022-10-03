const ascPriceOrder = "priceASC";
const descPriceOrder = "priceDESC";
const descSoldOrder = "mostSOLD";
let currentCriteria = undefined;
let minimo = undefined;
let maximo = undefined;
let catAll = localStorage.getItem("catID");
const catURL = `https://japceibal.github.io/emercado-api/cats_products/${catAll}.json`;
let list = [];

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(catURL).then(function(result){
        if (result.status === "ok")
        {html = result.data;
            ordProd = result.data.products;
            showList(ordProd);}
    });
    sortAsc.addEventListener("click", ()=>{
        sortAndShow(ascPriceOrder);
    });
    sortDesc.addEventListener("click", ()=>{
        sortAndShow(descPriceOrder);
    });
    sortByCount.addEventListener("click", ()=>{
        sortAndShow(descSoldOrder);
    });
    filter.addEventListener("click", ()=>{
        filtrar();
    })
    clean.addEventListener("click", ()=>{
        min.value = "";
        max.value = "";
        minimo = undefined;
        maximo = undefined;
        showList(ordProd);
    });

    function filtrar(){
        let minimo = min.value; 
        let maximo = max.value;
        let listaFiltrada = ordProd;
        if ((minimo != undefined) && (minimo != "") && (parseInt(minimo)) >= 0){
            minimo = parseInt(minimo);
            listaFiltrada = ordProd.filter(producto => producto.cost>=minimo);
        }
        if ((maximo != undefined) && (maximo != "") && (parseInt(maximo)) >= 0){
            maximo = parseInt(maximo);
            listaFiltrada = listaFiltrada.filter(producto => producto.cost<=maximo);
        }
        showList(listaFiltrada); 
    }
});

function showList(array){
    let append = "";
    pName.innerHTML = html.catName;
    for (let product of array){ 
        append += `
        <div onclick="setProd(${product.id})" class="list-group-item list-group-item-action">
            <div class="row">
            <div class="col-3">
            <img src="` + product.image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">
            <h4>`+ product.name + "  -  " + product.currency + "   " + product.cost +`</h4> 
            <p> `+ product.description +`</p> 
            </div>
            <small class="text-muted">` + product.soldCount + ` vendidos</small> 
            </div>
            </div>
            </div>
        </div>`
    loadCat.innerHTML = append; 
    }}

function classify(criteria, ordProd){
    let result = [];
    if (criteria === ascPriceOrder)
    {       result = ordProd.sort(function(a, b){
            return b.cost-a.cost;
        });
    }else if (criteria === descPriceOrder){
        result = ordProd.sort(function(a, b){
            return a.cost-b.cost;
        });
    }else if (criteria === descSoldOrder){
        result = ordProd.sort(function(a, b){
            return b.soldCount-a.soldCount;
        });
    }
    return result;
}

function sortAndShow(criteria, ordProd){
    currentCriteria = criteria;
    if(ordProd != undefined){
       ordProd = html.products;
    }
    let prod = html.products;
    ordProd = classify(currentCriteria, prod);
    showList(ordProd);
}

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}
