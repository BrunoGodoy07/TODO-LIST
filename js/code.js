let arrayTareas = [];

const getID = () => {
    return arrayTareas.length === 0 ? 0 : Math.max(...arrayTareas.map(t => t.id)) + 1;
};

const agregarTarea = () => {
    let nuevaTareaTexto = document.getElementById('nuevaTarea').value.trim();
    if (!nuevaTareaTexto) {
        alert("Por favor, ingrese una tarea");
        return;
    }

    let tarea = {
        id: getID(),
        texto: nuevaTareaTexto,
        creada: new Date(),
        completada: null
    };

    arrayTareas.push(tarea);
    document.getElementById('nuevaTarea').value = "";
    mostrarTareas();
};

const marcarTarea = (id) => {
    arrayTareas = arrayTareas.map(t => 
        t.id === id ? { ...t, completada: t.completada ? null : new Date() } : t
    );
    mostrarTareas();
};

const eliminarTarea = (id) => {
    arrayTareas = arrayTareas.filter(t => t.id !== id);
    mostrarTareas();
};

const eliminarTodaLaLista = () => {    
    arrayTareas = [];
    mostrarTareas();
};

const mostrarTareaMasRapida = () => {
    let tareasCompletadas = arrayTareas.filter(t => t.completada !== null);
    
    if (tareasCompletadas.length === 0) {
        alert("No hay tareas completadas aún.");
        return;
    }

    let tareaMasRapida = tareasCompletadas.reduce((min, tarea) => {
        let tiempoTarea = tarea.completada - tarea.creada;
        return tiempoTarea < (min.completada - min.creada) ? tarea : min;
    });

    let tiempoFinalizacion = (tareaMasRapida.completada - tareaMasRapida.creada) / 1000; // Segundos totales
    let mensajeTiempo;

    if (tiempoFinalizacion < 60) {
        // Menos de 1 minuto → Solo en segundos
        mensajeTiempo = `${Math.round(tiempoFinalizacion)} segundos.`;
    } else if (tiempoFinalizacion < 3600) {
        // Menos de 1 hora → Minutos y segundos
        let minutos = Math.floor(tiempoFinalizacion / 60);
        let segundos = Math.round(tiempoFinalizacion % 60);
        mensajeTiempo = `${minutos} min ${segundos} seg.`;
    } else {
        // Más de 1 hora → Horas y minutos
        let horas = Math.floor(tiempoFinalizacion / 3600);
        let minutos = Math.floor((tiempoFinalizacion % 3600) / 60);
        mensajeTiempo = `${horas} h ${minutos} min.`;
    }

    alert(`La tarea completada más rápido fue: "${tareaMasRapida.texto}" en ${mensajeTiempo}`);
};


const actualizarBotonMasRapida = () => {
    let boton = document.getElementById('tareaMasRapida');
    let hayTareasCompletadas = arrayTareas.some(t => t.completada !== null);
    boton.style.display = hayTareasCompletadas ? "block" : "none";
};

const actualizarBotonEliminarLista = () => {
    let botonEliminarLista = document.getElementById('eliminarLista');
    botonEliminarLista.style.display = arrayTareas.length > 0 ? "block" : "none";
};

const mostrarTareas = () => {
    let listado = document.getElementById('listaTareas');
    
    listado.innerHTML = arrayTareas.reduce((html, tarea) => {
        return html + `
        <li>
            <input type="checkbox" class="checkbox" 
                   onclick="marcarTarea(${tarea.id})" 
                   ${tarea.completada ? "checked" : ""}>
            <p class="${tarea.completada ? "completada" : "tarea"}">${tarea.texto}</p>
            <small>Creada: ${tarea.creada.toLocaleString()}</small>
            ${tarea.completada ? `<small>Completada: ${tarea.completada.toLocaleString()}</small>` : ""}
            <button class="eliminar" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        </li>
        `;
    }, "");

    actualizarBotonMasRapida();
    actualizarBotonEliminarLista();
};
