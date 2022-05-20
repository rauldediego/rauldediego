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

    let divsocio = document.createElement("div");
    divsocio.className="deportista";

        let divimagen = document.createElement("div");
        divimagen.className="foto";

            let imgsocio = document.createElement("img");
            imgsocio.setAttribute("src","imagenes/"+response.value.imagen);
            imgsocio.className="imgfoto"
            divimagen.append(imgsocio);

        divsocio.append(divimagen);

        let divdescripcion = document.createElement("div");
        divdescripcion.className = "descripcion";

            let h3Nombre = document.createElement("h3");
            h3Nombre.innerHTML = "Nombre: "+response.value.nombre;
            divdescripcion.append(h3Nombre);

            let h3Apellidos = document.createElement("h3");
            h3Apellidos.innerHTML = "Apellidos: "+response.value.apellidos;
            divdescripcion.append(h3Apellidos);

            let h3Dni = document.createElement("h3");
            h3Dni.innerHTML = "DNI: " + response.value.dni;
            divdescripcion.append(h3Dni);

            let h3Antiguedad = document.createElement("h4");
            h3Antiguedad.innerHTML = "Antiguedad: " + (parseInt(2022)- parseInt(response.value.alta));
            divdescripcion.append(h3Antiguedad);


            let h4Id = document.createElement("h4");
            h4Id.innerHTML = "Nº Socio: "+response.value.idsocio;
            divdescripcion.append(h4Id);   
                    
            let h4anyo = document.createElement("h4");
            h4anyo.innerHTML = "Año de Nacimiento: "+response.value.nacimiento;
            divdescripcion.append(h4anyo); 

            let h4altura = document.createElement("h4");
            h4altura.innerHTML = "Altura: "+response.value.altura;
            divdescripcion.append(h4altura);

            let h4peso = document.createElement("h4");
            h4peso.innerHTML = "Peso: "+response.value.peso;
            divdescripcion.append(h4peso);

            let h4kyu = document.createElement("h4");
            h4kyu.innerHTML = "Nivel Kyu: "+response.value.kyu;
            divdescripcion.append(h4kyu);

            let h4categoria = document.createElement("h4");
            h4categoria.innerHTML = "Categoria: "+response.value.categoria;
            divdescripcion.append(h4categoria);

            let h4federado = document.createElement("h4");
            h4federado.innerHTML = "Federado: "+response.value.federado;
            divdescripcion.append(h4federado);

            let h4Telefono = document.createElement("h4");
            h4Telefono.innerHTML = "Teléfono: "+response.value.telefono;
            divdescripcion.append(h4Telefono);

            let h4Emergencia = document.createElement("h4");
            h4Emergencia.innerHTML = "Emergencias: "+response.value.emergencia;
            divdescripcion.append(h4Emergencia);
                
        divsocio.append(divdescripcion);  
                
    document.getElementById("DatosDeportista").append(divsocio);
}

ConsultarDeportista();

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
    document.getElementById("MasDatos").innerHTML="";

             let br1 =document.createElement("br");
             document.getElementById("MasDatos").append(br1);

            let divplan = document.createElement("div");
             divplan.className="clases";

                 let h3DiaClase = document.createElement("h3");
                 h3DiaClase.innerHTML = "Días de clase: "+respuesta.value.diaclase;
                 divplan.append(h3DiaClase);

                 let h3HoraClase = document.createElement("h3");
                 h3HoraClase.innerHTML = "Horario: "+respuesta.value.horaclase;
                 divplan.append(h3HoraClase);

                let h3Entrenador = document.createElement("h3");
                h3Entrenador.innerHTML = "Entrenador: "+respuesta.value.entrenador;
                divplan.append(h3Entrenador);

            document.getElementById("MasDatos").append(divplan);

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

    document.getElementById("MasDatos").innerHTML="";
    let encontrado = false;
    
    for (let i=0;i < response.values.length; i++)
    {
        if (response.values[i].idsocio == idsocio)
        {
            let br =document.createElement("br");
            document.getElementById("MasDatos").append(br);

            let divplan = document.createElement("div");
            divplan.className="competiciones";

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

            document.getElementById("MasDatos").append(divplan);
            encontrado = true;

        }

    }
    if (encontrado == false){
        

        let parrafo = document.createElement("p");
        parrafo.className = "linea";
        parrafo.innerHTML="No existen datos de competiciones para este deportista";
        document.getElementById("MasDatos").append(parrafo);
    
    }

}