function Login(){
    document.getElementById("ErrorLogin").innerHTML=" ";
    
    const dataForSelect = {
        operation: "select",
        table: "usuarios"
    }; 

    GoogleSheetDataBaseOperation(
        idGoogle,
        dataForSelect,
        LoginTerminado);
};

function LoginTerminado(response){
    console.log(response);
    let usu_log = false;

    for (let i = 0; i < response.values.length && usu_log == false; i++)
    {
        if ((document.getElementById("usuario").value == response.values[i].usuario) &&
        (document.getElementById("passwd").value == response.values[i].password))
        {
            
            usu_log=true;
            
            window.location = "pagina"+response.values[i].tipousuario+".html?id=" + response.values[i].idsocio;
                      
        }
        
    }
    if (usu_log == false){
        document.getElementById("ErrorLogin").innerHTML="Usuario o contraseña incorrectos.";
        
    }
}

