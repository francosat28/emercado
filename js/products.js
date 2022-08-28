let catAll = localStorage.getItem("catID");
const catURL = `https://japceibal.github.io/emercado-api/cats_products/${catAll}.json`;
let list = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(catURL).then(function(result){
        if (result.status === "ok")
        {html = result.data;
            showList();}
    });
});

function showList(){
    document.getElementById("pName").innerHTML = html.catName;
    let append = "";

    for (let product of html.products){ 
        append += `
        <div class="list-group-item list-group-item-action">
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
                        <small class="text-muted">` + product.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("loadCat").innerHTML = append; 
    }
}