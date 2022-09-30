let dogID = localStorage.getItem("dogID");
let res = {}
let Cres = {}
const CdogURL = `https://japceibal.github.io/emercado-api/products_comments/${dogID}.json`
const dogURL = `https://japceibal.github.io/emercado-api/products/${dogID}.json`;

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(dogURL).then((Response)=>{
        res = Response.data;
        pInfo.innerHTML = `
      <h1 id="name" class="pt-2 m-3" style="font-size:4rem; color:#626266;float:right;">${res.name}</h1>
        <hr>
      <h3>Precio</h3>
        <div style="font-size:1,5rem; font-family:bold;" class="lead"><mark>${res.currency}</div>
        <div style="font-size:2rem;" class="lead;"><mark>${res.cost}</mark></div>
        <hr><h3>Descripción</h3>
        <div class="lead">${res.description}</div>
      <h3>Categoría</h3>
      <a href="products.html" style="text-decoration:none;"><div class="lead">${res.category}</div></a>
      <h3>Cantidad de vendidos</h3>
        <div class="lead">${res.soldCount}</div> 
      <h3>Imágenes ilustrativas</h3>
        <div class="row mr-4" style="" id="imgInfo"></div>`
      for(let img of res.images){
        imgInfo.innerHTML += `
        <div class="img-fluid img-thumbnail" id="img" style="width:20rem;">
            <img src="${img}" class="card-img-top"></img>
        </div>
        `
    }}) 
    getJSONData(CdogURL).then((Response)=>{
        Cres = Response.data;
        for(let comm of Cres){
        commInfo.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-start" style="width:98%;">
        <div class="ms-2 me-auto">
            <div class="fw-bold">${comm.user} - ${comm.dateTime} - ${star(comm.score)}
            </div>
                ${comm.description}
            </div>
    </li>
    `
        }
       function star(sc){
          let stars= "";
          for(let i=1;i<=5;i++){
          if(i<=sc){
            stars += `<span class="fa fa-star checked"></span>`;
            }else{
              stars+=`<span class="fa fa-star"></span>`;
          }}
        return stars;
  }})
});