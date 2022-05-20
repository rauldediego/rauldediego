
function Ver_Repeticiones(){

    document.getElementById("ErrorOp").innerHTML = "Realizando operación...";
    document.getElementById("MessageOp").innerHTML = "Realizando operación...";

    const dataForSelect = {
        operation: "select",
        table: "mensualidades",
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        VerRepeticionesTerminado
    );
}

function VerRepeticionesTerminado(response){

    console.log(response);
    let repetido = false;
    const fecha = new Date();
    
    let month=new Array();
    month[0]="Enero";
    month[1]="Febrero";
    month[2]="Marzo";
    month[3]="Abril";
    month[4]="Mayo";
    month[5]="Junio";
    month[6]="Julio";
    month[7]="Agosto";
    month[8]="Septiembre";
    month[9]="Octubre";
    month[10]="Noviembre";
    month[11]="Diciembre";
    let mesactual = month[fecha.getMonth()];

    for (let i = 0; i < response.values.length; i++){

        if (response.values[i].mes == mesactual){
            repetido = true;
        }
    }

    if (repetido){

        document.getElementById("ErrorOp").innerHTML = "true";
        document.getElementById("MessageOp").innerHTML = "Esta mensualidad ya está generada";

    }else{
        Crear_Mensualidades();
    }
}

function Crear_Mensualidades () {
    document.getElementById("ErrorOp").innerHTML = "Realizando operación...";
    document.getElementById("MessageOp").innerHTML = "Realizando operación...";

    const dataForSelect = {
        operation: "select",
        table: "deportista",
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        Crear_MensualidadesTerminado
    )
}

let iAlta, mAlta, valuesAlta, mesAlta, añoAlta;

function Crear_MensualidadesTerminado(response){

    console.log(response);  

    const fecha = new Date();
    let año = fecha.getFullYear();
    let month=new Array();

    month[0]="Enero";
    month[1]="Febrero";
    month[2]="Marzo";
    month[3]="Abril";
    month[4]="Mayo";
    month[5]="Junio";
    month[6]="Julio";
    month[7]="Agosto";
    month[8]="Septiembre";
    month[9]="Octubre";
    month[10]="Noviembre";
    month[11]="Diciembre";

    let mes = month[fecha.getMonth()];

    iAlta = 0;
    mAlta = response.values.length;
    valuesAlta = response.values;
    mesAlta = mes;
    añoAlta = año;

    // for( let i = 0; i < response.values.length; i++){
    //     Dar_Alta_Elto_i(response.values[i].idsocio,mes,año);
    // }

    Dar_Alta_Elto_i2();
}

function Dar_Alta_Elto_i2(){

    let socio = valuesAlta[iAlta].idsocio;
    let clave = socio.toString() + mesAlta + añoAlta.toString();
    const newRow = {};

    newRow["idmensualidad"] = clave;
    newRow["idsocio"] = socio;
    newRow["mes"] = mesAlta;
    newRow["año"] = añoAlta;
    newRow["pagado"] = "no"; 

    if (iAlta < mAlta) {

        if (valuesAlta[iAlta].estado = "alta")
        {
            const dataForInsert = {
                operation: "insert",
                table: "mensualidades",
                object: newRow
            }
        }

        GoogleSheetDataBaseOperation(
            idGoogle,
            dataForInsert,
            DarAltaTerminado2
        );
    }
}

function DarAltaTerminado2 (response){
    document.getElementById("ErrorOp").innerHTML = response.error;
    document.getElementById("MessageOp").innerHTML = response.message;

    iAlta++;

    if (iAlta < mAlta) {
        Dar_Alta_Elto_i2();
    }
}

/* Muestro las mensualidades pendientes necesito enlazar
dos tablas a traves de un libro. Enlazo la tabla mensualidade y deportista
ya que he de sacar datos de amba ablas para mostrarlos en pantalla */


function consultarMensualidades() {
    const dataForSelect = {
        operation: "select",
        table: "mensualidades"
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        consultarMensualidadesTerminado);
}

function consultarDeportista() {
    const dataForSelect = {
        operation: "select",
        table: "deportista"
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        consultarDeportistaTerminado);
}

let deportistas = null;

function consultarDeportistaTerminado(response) {
    deportistas = {};

    for (let i = 0; i < response.values.length; i++) {
        let deportista = response.values[i];
        let idDeportista = response.values[i].idsocio;

        deportistas[idDeportista] = deportista;
    }

    consultarMensualidades();
}

function consultarMensualidadesTerminado(response) {
    
    let divdeportista = document.createElement("div");
    divdeportista.className = "Datos";

        for (let i = 0; i < response.values.length; i++) {

            //definimos si el deportista est en esta de baja
            //si es asi las mensualidades salen conun color de fondo diferente

            // if (deportistas[response.values[i].idsocio].estado == "baja"){
            //     divdeportista.className = "DatosBaja";
            // }

            // Datos deportista
            let divdatosdeportista = document.createElement("div");
            if (deportistas[response.values[i].idsocio].estado == "baja"){
                divdatosdeportista.className = "mensualidadbaja";
            }else {
            divdatosdeportista.className = "mensualidad";
            }

            let h3nombre = document.createElement("h3");
            h3nombre.innerHTML = "Nombre: " + deportistas[response.values[i].idsocio].nombre;
            divdatosdeportista.append(h3nombre);

            let h3apellidos = document.createElement("h3");
            h3apellidos.innerHTML = "Apellidos: " + deportistas[response.values[i].idsocio].apellidos;
            divdatosdeportista.append(h3apellidos);
        

            // Mensualidades por deportista
        
           

            let h4mes = document.createElement("h4");
            h4mes.innerHTML = "Mes: " + response.values[i].mes;
            divdatosdeportista.append(h4mes);

            let h4año = document.createElement("h4");
            h4año.innerHTML = "Año: " + response.values[i].año;
            divdatosdeportista.append(h4año);

            let h4pagado = document.createElement("h4");
            h4pagado.innerHTML = "Pagado: " + response.values[i].pagado;
            divdatosdeportista.append(h4pagado);

            divdatosdeportista.setAttribute(
                "onclick",
                "clickSobreMensualidad(\"" + response.values[i].idmensualidad + "\")");

        divdeportista.append(divdatosdeportista);
    }

    document.getElementById("mensualidad").append(divdeportista);
}

function clickSobreMensualidad(idmensualidad) {

    const newrow = {};

    newrow["pagado"] = "si";

    const dataForUpdate = {
        operation: "update",
        table: "mensualidades",
        object: newrow,
        key: idmensualidad
    };

    document.getElementById("ErrorOp").innerHTML = "Esperando resultado...";
    document.getElementById("MessageOp").innerHTML = "Esperando resultado...";

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForUpdate,
        clickSobreMensualidadTerminado);
}

function clickSobreMensualidadTerminado(){

    // document.getElementById("ErrorOp").innerHTML = response.error;
    // document.getElementById("MessageOp").innerHTML = response.message;
    document.getElementById("mensualidad").innerHTML=" ";
    consultarDeportista();
    
}

consultarDeportista();


