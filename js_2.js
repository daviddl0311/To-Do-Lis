let buscar = document.getElementById("search");
let list = document.getElementById("myList");
let item = list.getElementsByTagName("li");
let message = document.getElementById("message");

buscar.addEventListener("input", () => {
    let myItem = buscar.value.toLowerCase();
    let hasMatch = false;

    Array.from(item).forEach(i => {
        const contenido = i.textContent.toLowerCase();
        if(contenido.includes(myItem)) {
            i.style.display = "";
            hasMatch = true;
        } else {
            i.style.display = "none";
        }
    });

    if(!hasMatch) {
        message.textContent = `No se encontró "${buscar.value}"`;
        message.style.display = "";
    } else {
        message.style.display = "none";
    }
});