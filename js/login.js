function loggin(e){
    const array = document.querySelectorAll('input');
    nombre = document.getElementById("mail").value;
    for(let i of array){
        if(i.value == "") {
            alert("Complete los campos vacíos");
            return false;
        } else {
            localStorage.setItem("usuario", JSON.stringify(nombre));
        }}}