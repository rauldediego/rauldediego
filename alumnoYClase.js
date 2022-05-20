function cargarAlumno() {
    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    // document.getElementById("alumno").innerHTML = "Cargando datos...";

    const dataForSelect = {
        operation: "select",
        table: "deportista",
        key: idsocio
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        cargarAlumnoTerminado);
}

function cargarAlumnoTerminado(respuesta) {

    console.log(respuesta);

    if (respuesta.error == false) {

        let divsocio = document.createElement("div");
        divsocio.className="deportista";

            let divimagen = document.createElement("div");
            divimagen.className="foto";

                let imgsocio = document.createElement("img");
                imgsocio.setAttribute("src","imagenes/"+respuesta.value.imagen);
                imgsocio.className="imgfoto"
                divimagen.append(imgsocio);

            divsocio.append(divimagen);

            let divdescripcion = document.createElement("div");
            divdescripcion.className = "descripcion";

                let h3Nombre = document.createElement("h3");
                h3Nombre.innerHTML = "Nombre: "+respuesta.value.nombre;
                divdescripcion.append(h3Nombre);

                let h3Apellidos = document.createElement("h3");
                h3Apellidos.innerHTML = "Apellidos: "+respuesta.value.apellidos;
                divdescripcion.append(h3Apellidos);

                let h3Dni = document.createElement("h3");
                h3Dni.innerHTML = "DNI: " + respuesta.value.dni;
                divdescripcion.append(h3Dni);
                
            divsocio.append(divdescripcion);  
                
        document.getElementById("alumno").append(divsocio);

        // document.getElementById("alumno").innerHTML = 
        //     respuesta.value.apellidos + ", " + respuesta.value.nombre + "(" + respuesta.value.dni + ")";

        document.getElementById("clases").innerHTML = "Cargando datos...";
    
        const dataForSelect = {
            operation: "select",
            table: "clases",
        };
    
        GoogleSheetDataBaseOperation(
            idGoogle,
            dataForSelect,
            cargarClasesTerminado);
                
    }
    else {
        console.log(respuesta.message);
    }
}


function cargarClasesTerminado(respuesta) {
    document.getElementById("clases").innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    for (let i = 0; i < respuesta.values.length; i++) {
        let divClase = document.createElement("div");
            let parrafoClase = document.createElement("p");
            let botonClase = document.createElement("button");
            
            divClase.className="clase";
            botonClase.className="boton";
            parrafoClase.className="parrafo"

            parrafoClase.innerHTML = respuesta.values[i].diaclase + " - " + respuesta.values[i].horaclase;
            botonClase.innerHTML = "ASOCIAR";
            botonClase.setAttribute("onclick", "asociarAlumnoYClase(" + idsocio  + ", " + respuesta.values[i].idclase + ")");

            divClase.append(parrafoClase);
            divClase.append(botonClase);
            

        document.getElementById("clases").append(divClase);
    }
}

function asociarAlumnoYClase(idSocio, idClase) {

    /*leer asociaciones para borrar si existe alguna y poner la nueva*/
    
    let realizado = Buscar_Clases_Existentes(idSocio);

 /*inserto la seleccion nueva*/

    if (realizado){

        const dataForInsert = {
            operation: "insert",
            table: "clasesAlumnos",
            object: {
                idAlumno: idSocio,
                idClase: idClase
            }
        };

        GoogleSheetDataBaseOperation(
            idGoogle,
            dataForInsert,
            asociarAlumnoYClaseTerminado);
        

        const dataForUpdate = {
            operation: "update",
            table: "deportista",
            key: idSocio,
            object: {
                idclase: idClase
            }
        };
    
        GoogleSheetDataBaseOperation(
            idGoogle,
            dataForUpdate,
            asociarAlumnoYClaseTerminado);
    }

}

function asociarAlumnoYClaseTerminado(respuesta) {

    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    window.location = "actualizardeportista.html?id=" + idsocio;
}



function Buscar_Clases_Existentes(idSocio){

    const dataForSelect = {
        operation: "select",
        table: "clasesAlumnos",
        key: idSocio
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        BuscarExistentesTerminado);
    
    return true;

}
    
function BuscarExistentesTerminado(){

    console.log(response);

    if (response.value.idsocio){

        Borrar_Clase_Existente (response);

    }
}

function Borrar_Clase_Existente (respuesta){

    const dataForDelete = {
        operation: "delete",
        table: "clasesAlumnos",
        key: respuesta.value.idsocio
        //  object: {
        //     idAlumno: idSocio,
        //     idClase: idClase
        // }
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForDelete,
        deleteTermiando);

}


function deleteTerminado(){

    document.getElementById("ErrorOp").innerHTML = " ";
    document.getElementById("MessageOp").innerHTML = " ";

    document.getElementById("ErrorOp").innerHTML = response.error;
    document.getElementById("MessageOP").innerHTML = response.message;

}

cargarAlumno();