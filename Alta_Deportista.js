/*Alta de un nuevo Deportista */

function AltaDeportista() {
    const dataForSelect = {
        operation: "select",
        table: "deportista",
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        selectTerminado);

    }

function selectTerminado(response) {

    const fecha = new Date();
    let alta = fecha.getFullYear();
    
    let tableName     = "deportista";
    
    let columnIdsocio  = "idsocio";
    let ValueIdsocio = response.values.length+1;
    
    
    let columnNombre  = "nombre";
    let ValueNombre  = document.getElementById("InsertNombre").value;

    let columnApellido  = "apellidos";
    let ValueApellido  = document.getElementById("InsertApellido").value;

    let columnDni  = "dni";
    let ValueDni  = document.getElementById("InsertDni").value;

    let columnAnyo  = "nacimiento";
    let ValueAnyo  = document.getElementById("InsertAnyo").value;

    /*Definimos categoria deportiva */

    let edad = alta-ValueAnyo;
    let categoria;

    if (edad < 11){

        categoria = "Benjamin";

    }else if (edad > 10 && edad < 15){

        categoria = "Infantil";

        }else if (edad > 14 && edad < 17){

            categoria = "Cadete";

        }else if (edad > 16 && edad < 20){

            categoria = "Juvenil";

        }else{

            categoria = "Senior";

        }

    let columnAlta  = "alta";
    let ValueAlta  = alta;

//Generamos el nombre del archivo imagen asociado, tendremos que crear el archivo de imagen
//cuando demos un alta. El nombre del archivo sera: nombreapellido.jpeg

    let NombreImagen2 =  ValueNombre.toLowerCase() + ValueApellido.toLowerCase();          
    let NombreImagen  = NombreImagen2.split(" ").join("");

    let columnImagen = "imagen";
    let ValueImagen = NombreImagen + ".jpeg";

    let columnCategoria = "categoria";
    let ValueCategoria = categoria;

    let columnPeso  = "peso";
    let ValuePeso  = document.getElementById("InsertPeso").value;

    let columnAltura  = "altura";
    let ValueAltura  = document.getElementById("InsertAltura").value;

    let columnFederado  = "federado";
    let ValueFederado  = document.getElementById("InsertFederado").value;

    let columnTelefono  = "telefono";
    let ValueTelefono  = document.getElementById("InsertTelefono").value;

    let columnEmergencia  = "emergencia";
    let ValueEmergencia  = document.getElementById("InsertEmergencia").value;

    let columnKyu  = "kyu";
    let ValueKyu  = document.getElementById("InsertKyu").value;

    // let columnUsuario  = "usuario";
    // let ValueUsuario  = document.getElementById("InsertUsuario").value;

    // let columnPassword  = "password";
    // let ValuePassword  = document.getElementById("InsertPassword").value;

    let columnEntrenador  = "entrenador";
    let ValueEntrenador  = document.getElementById("InsertEntrenador").value;

    // let columnClase = "idclase";
    // let ValueClase = document.getElementById("InsertClase").value;

    let columnTipousuario = "tipousuario";
    let ValueTipousuario = document.getElementById("InsertTipousuario").value;

    let columnEstado = "estado";
    let ValueEstado = "alta";

    const newRow = {};

    if (columnIdsocio) {
        newRow[columnIdsocio] = ValueIdsocio;
    }

    if (columnNombre) {
        newRow[columnNombre] = ValueNombre;
    }

    if (columnApellido) {
        newRow[columnApellido] = ValueApellido;
    }

    if (columnAnyo) {
        newRow[columnAnyo] = ValueAnyo;
    }

    if (columnAlta) {
        newRow[columnAlta] = ValueAlta;
    }

    if (columnImagen) {
        newRow[columnImagen] = ValueImagen;
    }

    if (columnDni) {
        newRow[columnDni] = ValueDni;
    }

    if (columnCategoria) {
        newRow[columnCategoria] = ValueCategoria;
    }

    if (columnAltura) {
        newRow[columnAltura] = ValueAltura;
    }

    if (columnPeso) {
        newRow[columnPeso] = ValuePeso;
    }

    if (columnTelefono) {
        newRow[columnTelefono] = ValueTelefono;
    }

    if (columnEmergencia) {
        newRow[columnEmergencia] = ValueEmergencia;
    }

    if (columnKyu) {
        newRow[columnKyu] = ValueKyu;
    }

    newRow["usuario"] = ValueNombre+ValueApellido;
    newRow["password"] = ValueNombre+ValueAnyo;
    

    // if (columnClase) {
    //     newRow[columnClase] = ValueClase;
    // }

    if (columnEntrenador) {
        newRow[columnEntrenador] = ValueEntrenador;
    }

    if (columnFederado) {
        newRow[columnFederado] = ValueFederado;
    }

    newRow[columnTipousuario] = "deportista";
    

    if (columnEstado){
        newRow[columnEstado] = ValueEstado;
    }


    const dataForSelect = {
        operation: "insert",
        table: tableName,
        object: newRow
    };

    document.getElementById("ErrorInsert").innerHTML = "Esperando resultado...";
    document.getElementById("MessageInsert").innerHTML = "Esperando resultado...";

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        insertFinished);



    const newRowUsuarios = {};

    newRowUsuarios[columnIdsocio] = ValueIdsocio;
    newRowUsuarios[columnUsuario] = ValueUsuario;
    newRowUsuarios[columnPassword] = ValuePassword;
    newRowUsuarios["tipousuario"] = "deportista";


    

    const dataForSelect2 ={
        operation: "insert",
        table: "usuarios",
        object: newRowUsuarios

    }

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect2,
        insertFinished);

}


function insertFinished(response) {
    document.getElementById("ErrorInsert").innerHTML = response.error;
    document.getElementById("MessageInsert").innerHTML = response.message;
    AltaUsuario();
}
    