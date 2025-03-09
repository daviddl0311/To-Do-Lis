let button = document.getElementById("button");
let lista = document.getElementById("myList");
let text = document.getElementById("textos");
let arr = JSON.parse(localStorage.getItem("tasks")) || [];

// Mostrar u ocultar la lista de tareas
function toggleLista() {
    document.querySelector(".homework").style.display = arr.length ? "" : "none";
}

// Guardar en localStorage
function guardarTareas() {
    localStorage.setItem("tasks", JSON.stringify(arr));
}

// Renderizar todas las tareas
function renderizarTareas() {
    lista.innerHTML = ""; // Limpiar la lista antes de renderizar
    arr.forEach((task, index) => {
        let tarea = document.createElement("li");
        tarea.className = `item ${task.completed ? "item-2" : ""}`;
        tarea.dataset.index = index; // Guardamos el índice

        tarea.innerHTML = `
            <div class='center-left'>
                <p class='tarea'>${task.name}</p>
            </div>
            <div class='center-right gap-3 model' ${task.completed ? "style='display: none;'" : ""}>
                <button class='completed'>completada</button>
                <button class='delete'>borrar</button>
            </div>
            <div class='center-right gap-3 box' ${task.completed ? "" : "style='display: none;'"} >
                <button class='activar'>activar tarea</button>
                <button class='delete'>borrar</button>
            </div>
        `;

        lista.appendChild(tarea);
    });

    toggleLista();
}
renderizarTareas();

// Agregar nueva tarea
button.addEventListener("click", () => {
    let word = text.value.trim();
    if (!word) return;

    arr.push({ name: word[0].toUpperCase() + word.slice(1), completed: false });
    guardarTareas();
    renderizarTareas();

    text.value = "";
    text.focus();
});

// Delegación de eventos para evitar reasignaciones
lista.addEventListener("click", (e) => {
    let index = e.target.closest("li")?.dataset.index;
    if (index === undefined) return;

    if (e.target.classList.contains("completed")) {
        arr[index].completed = true;
    } else if (e.target.classList.contains("activar")) {
        arr[index].completed = false;
    } else if (e.target.classList.contains("delete")) {
        arr.splice(index, 1);
    }

    guardarTareas();
    renderizarTareas();
});
