seguros();

document.querySelector('#formRegistros').addEventListener("submit",function(e){
    e.preventDefault();
    let data ={
        codigo : document.forms.formRegistros.codigo.value,
        tipo : document.forms.formRegistros.tipo.value,
        vigencia : document.forms.formRegistros.vigencia.value
    }
    fetch('/api/Seguros',{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json()).then(response => {
        alert("seguro ingresado con exito");
        seguros();
    }).catch(err=>{
        console.log(err);
    });
});



function seguros(){
    fetch('/api/Seguros',{
        method:"GET"
    }).then(res=>res.json()).then(data =>{
        let filas="";
        data.forEach(seguro=>{
            filas = filas + `<tr>
            <td>${seguro._id}</td>
            <td>${seguro.codigo}</td>
            <td>${seguro.tipo}</td>
            <td>${seguro.vigencia}</td>
            <td>
              <a href="/api/Seguros/${seguro._id}" class="btn btn-danger">Eliminar</a>
              <a href="/api/Seguros/${seguro._id}" class="btn btn-success">Actualizar</a>
            </td>
          </tr>`
        });
        document.querySelector('#tbody-seguros').innerHTML= filas;
    }).catch(err=>{
        console.log(err);
    });
}