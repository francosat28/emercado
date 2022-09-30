function loggin(){
    const array = document.querySelectorAll('input');
    nombre = mail.value;
    for(let i of array){
        if(i.value == "") {
            alert("Complete los campos vacíos");
            return false;
        }}
    localStorage.setItem("usuario", nombre);
    }