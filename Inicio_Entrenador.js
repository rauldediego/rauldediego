function LeerDeportistas() {

    const dataForSelect = {
        operation: "select",
        table: "deportista",
    };

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        LeerDeportistasTerminado);
}

function LeerDeportistasTerminado(response){
    console.log(response);

    for (let i = 0 ; i < response.values.length; i++){

        if (response.values[i].estado != "baja")
        {
        
            let divdeportista = document.createElement("div");
            divdeportista.className="deportista";
            divdeportista.setAttribute("onclick", "clickSobreDeportista(" + response.values[i].idsocio + ")");
        
                let divimagen = document.createElement("div");
                divimagen.className="imgfoto";
        
                    let imgsocio = document.createElement("img");
                    imgsocio.setAttribute("src","imagenes/"+response.values[i].imagen);
                    imgsocio.className="imgfoto";
                    divimagen.append(imgsocio);
        
                    divdeportista.append(divimagen);
        
                let divdescripcion = document.createElement("div");
                divdescripcion.className = "descripcion";
        
                    let h3Nombre = document.createElement("h3");
                    h3Nombre.innerHTML = "Nombre: "+response.values[i].nombre;
                    divdescripcion.append(h3Nombre);

                    let h3Apellidos = document.createElement("h3");
                    h3Apellidos.innerHTML = "Apellidos: "+response.values[i].apellidos;
                    divdescripcion.append(h3Apellidos);
    
        
                    let h4altura = document.createElement("h4");
                    h4altura.innerHTML = "Altura: "+response.values[i].altura;
                    divdescripcion.append(h4altura);
        
                    let h4peso = document.createElement("h4");
                    h4peso.innerHTML = "Peso: "+response.values[i].peso;
                    divdescripcion.append(h4peso);
        
                    let h4nivel = document.createElement("h4");
                    h4nivel.innerHTML = "Nivel Kyu: "+response.values[i].nivel;
                    divdescripcion.append(h4nivel);
        
                    let h4categoria = document.createElement("h4");
                    h4categoria.innerHTML = "Categoria: "+response.values[i].categoria;
                    divdescripcion.append(h4categoria);
                    let categoria = response.values[i].categoria;
                    categoria = categoria.toLowerCase();
        
                    let h4federado = document.createElement("h4");
                    h4federado.innerHTML = "Federado: "+response.values[i].federado;
                    divdescripcion.append(h4federado);
        
                    let h4Entrenador = document.createElement("h4");
                    h4Entrenador.innerHTML = "Entrenador: "+response.values[i].entrenador;
                    divdescripcion.append(h4Entrenador);
            
                        
                divdeportista.append(divdescripcion);
        
            document.getElementById(categoria).append(divdeportista); 
        }
    }
}

LeerDeportistas();

function clickSobreDeportista(id) {

    window.location = "actualizardeportista.html?id=" + id;
    
}

function BuscarElementos(Tabla,Id){
    const dataForSelect = {
        operation: "select",
        table: Tabla,
        Key: Id
    };
    const tabla = Tabla;
    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        BuscarelementosTerminado);

    
}

function BuscarelementosTerminado(response){

    console.log(response);
    
    let h4Entrenador = document.createElement("h4");
    h4Entrenador.innerHTML = "Entrenador: " + response.values.nombre + response.values.apellidos;
    document.getElementById("entrenadores").append(h4Entrenador);
}

// function PlanEntreno(){

//     const dataForSelect = {
//         operation: "select",
//         table: "planentreno",
        
//     };

//     GoogleSheetDataBaseOperation(
//         idGoogle,
//         dataForSelect,
//         ConsultarPlanTerminado);

// }

// function ConsultarPlanTerminado(response){
//     const urlParams = new URLSearchParams(window.location.search);
//     const idsocio= urlParams.get("id");

//     document.getElementById("planentreno").innerHTML="";
    
//     for (let i=0;i < response.values.length; i++)
//     {
//         if (response.values[i].idsocio == idsocio)
//         {
//             let br1 =document.createElement("br");
//             document.getElementById("planentreno").append(br1);

//             let divplan = document.createElement("div");
//             divplan.className="planentreno";

//                 let h3Nombre = document.createElement("h3");
//                 h3Nombre.innerHTML = "Entrenamiento: "+response.values[i].nombre;
//                 divplan.append(h3Nombre);

//                 let h3Detalle = document.createElement("h3");
//                 h3Detalle.innerHTML = "Descripción: "+response.values[i].detalle;
//                 divplan.append(h3Detalle);

//                 let h3Frecuencia = document.createElement("h3");
//                 h3Frecuencia.innerHTML = "Frecuencia: "+response.values[i].frecuencia;
//                 divplan.append(h3Frecuencia);

//                 let h3Entrenador = document.createElement("h3");
//                 h3Entrenador.innerHTML = "Entrenador: "+response.values[i].entrenador;
//                 divplan.append(h3Entrenador);

//             document.getElementById("planentreno").append(divplan);

//         }

//     }

// }