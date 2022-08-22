function loggin(e){
    const array = document.querySelectorAll('input');
    for(let i of array){
        if(i.value == "") {
            alert("Complete los campos vacíos");
            return false;
        }}}