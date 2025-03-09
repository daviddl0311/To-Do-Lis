let button = document.getElementById("button");
let lista = document.getElementById("myList");
let text = document.getElementById("textos");
let arr = JSON.parse(localStorage.getItem("tasks")) || [];

function ocultar() {
    document.querySelector(".homework").style.display = "none";
}
function show() {
    document.querySelector(".homework").style.display = "";
}

if (arr.length === 0) ocultar();

function guardarTareas() {
    localStorage.setItem("tasks", JSON.stringify(arr));
}

// Función para renderizar una tarea en el DOM
function agregarTareaDOM(task, index) {
    let ele = document.createElement("li");
    ele.setAttribute("class", `item ${task.completed ? "item-2" : ""}`);
    ele.dataset.index = index; // Guardamos el índice en el dataset

    ele.innerHTML = `
        <div class='center-left'>
            <p class='tarea'>${task.name}</p>
        </div>
        <div class='center-right gap-3 model' ${task.completed ? "style='display: none;'" : ""}>
            <div class='center'>
                <button class='completed'>completada</button>
            </div>
            <div class='center'>
                <button class='delete'>borrar</button>
            </div>
        </div>
        <div class='center-right box' ${task.completed ? "" : "style='display: none;'"} >
            <div class='center'>
                <button class='activar'>activar tarea</button>
            </div>
        </div>
    `;

    lista.appendChild(ele);
}

// Agregar nueva tarea
button.addEventListener("click", () => {
    let word = text.value.trim();
    if (word === "") return;

    let newTask = {
        name: word[0].toUpperCase() + word.slice(1),
        completed: false
    };

    arr.push(newTask);
    guardarTareas();
    
    agregarTareaDOM(newTask, arr.length - 1);
    asignarEventos(); // Reasignar eventos

    text.value = "";
    text.focus();
    show();
});

// Cargar tareas desde localStorage
function display() {
    lista.innerHTML = "";
    arr.forEach((task, index) => agregarTareaDOM(task, index));
    asignarEventos();
}

display();

// Asignar eventos a los botones de tareas
function asignarEventos() {
    document.querySelectorAll(".completed").forEach((button) => {
        button.onclick = (event) => {
            let index = event.target.closest(".item").dataset.index;
            arr[index].completed = true;
            guardarTareas();
            display();
        };
    });

    document.querySelectorAll(".delete").forEach((button) => {
        button.onclick = (event) => {
            let index = event.target.closest(".item").dataset.index;
            arr.splice(index, 1);
            guardarTareas();
            display();
            if (arr.length === 0) ocultar();
        };
    });

    document.querySelectorAll(".activar").forEach((button) => {
        button.onclick = (event) => {
            let index = event.target.closest(".item").dataset.index;
            arr[index].completed = false;
            guardarTareas();
            display();
        };
    });
}

// localStorage.clear();
