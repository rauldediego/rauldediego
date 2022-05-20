function ConsultarDeportista() {

    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    const dataForSelect = {
        operation: "select",
        table: "deportista",
        key: idsocio
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        ConsultarDeportistaTerminado);
}

function ConsultarDeportistaTerminado(response) {

    document.getElementById("DatosDeportista").innerHTML=" ";

    let divsocio = document.createElement("div");
    divsocio.className="deportista";

        let divimagen = document.createElement("div");
        divimagen.className="foto";

            let imgsocio = document.createElement("img");
            imgsocio.setAttribute("src","imagenes/" + response.value.imagen);
            imgsocio.className="imgfoto"
            divimagen.append(imgsocio);

        divsocio.append(divimagen);

        let divdescripcion = document.createElement("div");
        divdescripcion.className = "descripcion";

            let h3Nombre = document.createElement("h3");
            h3Nombre.innerHTML = "Nombre: " + response.value.nombre + " " + response.value.apellidos;
            divdescripcion.append(h3Nombre);

            let h3Dni = document.createElement("h3");
            h3Dni.innerHTML = "DNI: " + response.value.dni;
            divdescripcion.append(h3Dni);

            let h3Antiguedad = document.createElement("h4");
            h3Antiguedad.innerHTML = "Antiguedad: " + (parseInt(2022)- parseInt(response.value.alta));
            divdescripcion.append(h3Antiguedad);

            let h4Id = document.createElement("h4");
            h4Id.innerHTML = "Nº Socio: " + response.value.idsocio;
            divdescripcion.append(h4Id);   
                    
            let h4anyo = document.createElement("h4");
            h4anyo.innerHTML = "Año de Nacimiento: " + response.value.nacimiento;
            divdescripcion.append(h4anyo); 

            let h4altura = document.createElement("h4");
            h4altura.innerHTML = "Altura: " + response.value.altura;
            divdescripcion.append(h4altura);

            let h4peso = document.createElement("h4");
            h4peso.innerHTML = "Peso: " + response.value.peso;
            divdescripcion.append(h4peso);

            let h4nivel = document.createElement("h4");
            h4nivel.innerHTML = "Nivel Kyu: " + response.value.kyu;
            divdescripcion.append(h4nivel);

            let h4categoria = document.createElement("h4");
            h4categoria.innerHTML = "Categoria: " + response.value.categoria;
            divdescripcion.append(h4categoria);

            let h4federado = document.createElement("h4");
            h4federado.innerHTML = "Federado: " + response.value.federado;
            divdescripcion.append(h4federado);
            
            let h3Usuario = document.createElement("h3");
            h3Usuario.innerHTML = "Usuario: " + response.value.usuario;
            divdescripcion.append(h3Usuario);

            let h3Password = document.createElement("h3");
            h3Password.innerHTML = "Password: " + response.value.password;
            divdescripcion.append(h3Password);

            let h3Tipousuario = document.createElement("h3");
            h3Tipousuario.innerHTML = "Tipo Usuario: " + response.value.tipousuario;
            divdescripcion.append(h3Tipousuario);

            let h3Tlfno = document.createElement("h3");
            h3Tlfno.innerHTML = "Teléfono: " + response.value.telefono;
            divdescripcion.append(h3Tlfno);

            let h3Emergencias = document.createElement("h3");
            h3Emergencias.innerHTML = "Teléfono de Emergencias: " + response.value.emergencia;
            divdescripcion.append(h3Emergencias);

            /*let h3Entrenador = document.createElement("h3");
            h3Entrenador.innerHTML = "Entrenador: " + BuscarElementos("entrenadores",response.value.entrenador);
            divdescripcion.append(h3Entrenador);*/
            let h3Entrenador = document.createElement("h3");
            h3Entrenador.innerHTML = "Entrenador: " + response.value.entrenador;
            divdescripcion.append(h3Entrenador);
                
        divsocio.append(divdescripcion);
                
    document.getElementById("DatosDeportista").append(divsocio);
}
ConsultarDeportista();

/*Actualizamos el deportista con los datos del formulario*/

function UpdateDeportista() {

    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");
    
    let tableName     = "deportista";

    let columnNombre  = "nombre";
    let ValueNombre  = document.getElementById("UpdateNombre").value;
    
    let columnApelllido  = "apellidos";
    let ValueApellido  = document.getElementById("UpdateApellido").value;

    let columnPeso  = "peso";
    let ValuePeso  = document.getElementById("UpdatePeso").value;

    let columnAltura  = "altura";
    let ValueAltura  = document.getElementById("UpdateAltura").value;

    let columnCategoria  = "categoria";
    let ValueCategoria  = document.getElementById("UpdateCategoria").value;

    let columnFederado  = "federado";
    let ValueFederado  = document.getElementById("UpdateFederado").value;

    let columnTelefono  = "telefono";
    let ValueTelefono  = document.getElementById("UpdateTelefono").value;

    let columnEmergencia  = "emergencia";
    let ValueEmergencia  = document.getElementById("UpdateEmergencia").value;

    let columnKyu  = "kyu";
    let ValueKyu  = document.getElementById("UpdateKyu").value;

    let columnUsuario  = "usuario";
    let ValueUsuario  = document.getElementById("UpdateUsuario").value;

    let columnPassword  = "password";
    let ValuePassword  = document.getElementById("UpdatePassword").value;

    let columnAnyo  = "nacimiento";
    let ValueAnyo  = document.getElementById("UpdateAnyo").value;

    let NombreImagen2 =  ValueNombre.toLowerCase() + ValueApellido.toLowerCase();          
    let NombreImagen  = NombreImagen2.split(" ").join("");

    let columnImagen = "imagen";
    let ValueImagen = NombreImagen + ".jpeg";

    let columnEntrenador = "entrenador";
    let ValueEntrenador = document.getElementById("Updateentrenador").value;
    if (ValueEntrenador){
        ValueEntrenador = BuscarElementos("entrenadores",ValueEntrenador);
    } 
    
    const newRow = {};

    if (columnNombre) {
        newRow[columnNombre] = ValueNombre;
    }

    if (columnApelllido) {
        newRow[columnApelllido] = ValueApellido;
    }

    if (columnPeso) {
        newRow[columnPeso] = ValuePeso;
    }

    if (columnAltura) {
        newRow[columnAltura] = ValueAltura;
    }

    if (columnCategoria) {
        newRow[columnCategoria] = ValueCategoria;
    }

    if (columnFederado) {
        newRow[columnFederado] = ValueFederado;
    }

    if (columnTelefono) {
        newRow[columnTelefono] = ValueTelefono;
    }

    if (columnAnyo) {
         newRow[columnAnyo] = ValueAnyo;
    }

    if (columnImagen) {
        newRow[columnImagen] = ValueImagen;
    }

    if (columnEmergencia) {
        newRow[columnEmergencia] = ValueEmergencia;
    }

    if (columnKyu) {
        newRow[columnKyu] = ValueKyu;
    }

    if (columnUsuario) {
        newRow[columnUsuario] = ValueUsuario;
    }

    if (columnPassword) {
        newRow[columnPassword] = ValuePassword;
    }

    if (columnClase) {
        newRow[columnClase] = ValueClase;
    }

    if (columnEntrenador) {
        newRow[columnEntrenador] = ValueEntrenador;
    }


    const dataForSelect = {
        operation: "update",
        table: tableName,
        key: idsocio,
        object: newRow
    };

    document.getElementById("ErrorUpdate").innerHTML = "Esperando resultado...";
    document.getElementById("MessageUpdate").innerHTML = "Esperando resultado...";

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        updateFinished);

}

function updateFinished(response) {
    document.getElementById("ErrorUpdate").innerHTML = response.error;
    document.getElementById("MessageUpdate").innerHTML = response.message;
    ConsultarDeportista();
}

function Actualizar_Palmares(){

    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    let columnIdsocio = "idsocio";
    let tableName = "resultados"

    let columnAnyo = "anyo";
    let ValueAnyo = document.getElementById("PalmaresAnyo").value;

    let columnCompeticion = "competicion";
    let ValueComepticion = document.getElementById("PalmaresCompeticion").value;

    let columnResultado = "resultado";
    let ValueResultado = document.getElementById("PalmaresResultado").value;

    let columnCategoria = "categoria";
    let ValueCategoria = document.getElementById("PalmaresCategoria").value;

    const newRow = {};

    if (columnIdsocio) {
        newRow[columnIdsocio] = idsocio;
    }

    if (columnAnyo) {
        newRow[columnAnyo] = ValueAnyo;
    }

    if (columnCompeticion) {
        newRow[columnCompeticion] = ValueComepticion;
    }

    if (columnResultado) {
        newRow[columnResultado] = ValueResultado;
    }

    if (columnCategoria) {
        newRow[columnCategoria] = ValueCategoria;
    }

    const dataForSelect = {
        operation: "insert",
        table: tableName,
        object: newRow
    };

    document.getElementById("ErrorPalmares").innerHTML = "Esperando resultado...";
    document.getElementById("MessagePalmares").innerHTML = "Esperando resultado...";

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        InsertarPalmaresTerminado);


}

function InsertarPalmaresTerminado(response){

    document.getElementById("ErrorPalmares").innerHTML = response.error;
    document.getElementById("MessagePalmares").innerHTML = response.message;
    document.getElementById("PalmaresAnyo").value = " ";
    document.getElementById("PalmaresCompeticion").value = " ";
    document.getElementById("PalmaresResultado").value = " ";
    document.getElementById("PalmaresCategoria").value = " ";

}

function Resultados(){

    const dataForSelect = {
        operation: "select",
        table: "resultados",
        
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        ConsultarResultadosTerminado);

}

function ConsultarResultadosTerminado(response){
    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    document.getElementById("palmares").innerHTML=" ";
    
    for (let i=0;i < response.values.length; i++)
    {
        if (response.values[i].idsocio == idsocio)
        {
            let br =document.createElement("br");
            document.getElementById("palmares").append(br);

            let divplan = document.createElement("div");
            divplan.className="palmares";

                let h3Anyo = document.createElement("h3");
                h3Anyo.innerHTML = "Año: "+response.values[i].anyo;
                divplan.append(h3Anyo);

                let h3Competicion = document.createElement("h3");
                h3Competicion.innerHTML = "Competición: "+response.values[i].competicion;
                divplan.append(h3Competicion);

                let h3Categoria = document.createElement("h3");
                h3Categoria.innerHTML = "Categoría: "+response.values[i].categoria;
                divplan.append(h3Categoria);

                let h3Resultado = document.createElement("h3");
                h3Resultado.innerHTML = "Resultado: "+response.values[i].resultado;
                divplan.append(h3Resultado);

            document.getElementById("palmares").append(divplan);

        }

    }

}

/*NECESITO EL ID DE LA CLASE PARA ACCEDER A LA CLASE QUE ES Y MOSTRAR
LOS DATOS DE LA CLASE*/

function Clases_Alumno(){

    const dataForSelect ={
        operation: "select",
        table: "clasesAlumnos"
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        ClasesAlumnoTerminado
    );
}

function ClasesAlumnoTerminado(response){

    console.log(response);
    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");
    /*Creo que no obtengo el ID*/
    let clase=0;

    for (let i = 0; i < response.values.length; i++){

        if (response.values[i].idAlumno == idsocio){

            clase = response.values[i].idClase;
        }
    }
    
    Mostrar_Clases (clase);

}

function Mostrar_Clases (clase){

    const dataForSelect = {
        operation: "select",
        table: "clases",
        key: clase
    }

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        MostrarClasesTerminado
    );

}

function MostrarClasesTerminado(respuesta){

    console.log(respuesta);
    document.getElementById("palmares").innerHTML="";

        

    let divplan = document.createElement("div");
    divplan.className="palmares";

        let h3DiaClase = document.createElement("h3");
        h3DiaClase.innerHTML = "Días de clase: "+respuesta.value.diaclase;
        divplan.append(h3DiaClase);

        let h3HoraClase = document.createElement("h3");
        h3HoraClase.innerHTML = "Horario: "+respuesta.value.horaclase;
        divplan.append(h3HoraClase);

        let h3Entrenador = document.createElement("h3");
        h3Entrenador.innerHTML = "Entrenador: "+respuesta.value.entrenador;
        divplan.append(h3Entrenador);

    document.getElementById("palmares").append(divplan);

}

function AniadirClase() {
    const urlParams = new URLSearchParams(window.location.search);
    const idsocio= urlParams.get("id");

    window.location = "alumnoYClase.html?id=" + idsocio;

}