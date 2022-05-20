/*Borramos el deportista*/

function BajaDeportista() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    document.getElementById("ErrorUpdate").innerHTML = "";
    document.getElementById("MessageUpdate").innerHTML = "";

    //let tableName     = "deportista";

    const newRow = {};

    newRow["estado"] = "baja"; 
    
   /* const dataForSelect = {
        operation: "delete",
        operation: "update"
        table: tableName,
        key: idsocio
    };*/

    const dataForSelect = {
        operation: "update",
        table: "deportista",
        key: idsocio,
        object: newRow
    };

    document.getElementById("ErrorUpdate").innerHTML = "Esperando resultado...";
    document.getElementById("MessageUpdate").innerHTML = "Esperando resultado...";

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        BajaDeportistaTerminado);

    BajaUsuario(idsocio);
    BajaClase(idsocio);
}

/*Damos de baja tambien el usuario  y la clase si esta en alguna*/

function BajaDeportistaTerminado(response) {


    document.getElementById("ErrorUpdate").innerHTML = response.error;
    document.getElementById("MessageUpdate").innerHTML = response.message;
    
}


function BajaUsuario(idsocio){

    document.getElementById("ErrorUpdate").innerHTML = " ";
    document.getElementById("MessageUpdate").innerHTML = " ";

    let tableName     = "usuarios";
    
    const dataForSelect = {
        operation: "delete",
        table: tableName,
        key: idsocio
    };

    document.getElementById("ErrorUpdate").innerHTML = "Esperando resultado...";
    document.getElementById("MessageUpdate").innerHTML = "Esperando resultado...";

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        deleteTerminado);
}

/*Damos de Baja el estar en clase*/

function BajaClase(idsocio){

    document.getElementById("ErrorUpdate").innerHTML = " ";
    document.getElementById("MessageUpdate").innerHTML = " ";

    let tableName     = "clasesAlumnos";
    
    const dataForSelect = {
        operation: "delete",
        table: tableName,
        key: idsocio
    };

    document.getElementById("ErrorUpdate").innerHTML = "Esperando resultado...";
    document.getElementById("MessageUpdate").innerHTML = "Esperando resultado...";

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        deleteTerminado);

}

function deleteTerminado(){
    // document.getElementById("ErrorUpdate").innerHTML = response.error;
    // document.getElementById("MessageUpdate").innerHTML = response.message;
}

