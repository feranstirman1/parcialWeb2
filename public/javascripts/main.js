seguros();

document.querySelector('#formSeguros').addEventListener("submit",function(e){
    //alert("le dio click");
    console.log(e);
    e.preventDefault();
    let data ={
        codigo : document.forms.formSeguros.codigo.value,
        tipo : document.forms.formSeguros.tipo.value,
        vigencia : document.forms.formSeguros.vigencia.value
    };
    fetch('/api/Seguros',{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json()).then(response => {
        //alert("seguro ingresado con exito");
        seguros();
    }).catch(err=>{
        console.log(err);
    });
});

//para el update
document.querySelector('#btnUpdate').addEventListener("click",function(e){
    console.log(document.forms.formUpdate.codigoU.value);
    let seguro ={
        codigo : document.forms.formUpdate.codigoU.value,
        tipo: document.forms.formUpdate.tipoU.value,
        vigencia : document.forms.formUpdate.vigenciaU.value
    };
    fetch('/api/Seguros/'+document.forms.formUpdate.idU.value,{
        method:"PUT",
        body: JSON.stringify(seguro),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json()).then(response=>{
        seguros();
    }).catch(err=>{
        console.log(err);
    });
});

//funcion principal para que sirva el ajax
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
              <a href="/api/Seguros/${seguro._id}" class="delete btn btn-danger">Eliminar</a>
              <a data-toggle="modal" data-target="#modalUpdate" href="/api/Seguros/${seguro._id}" class="update btn btn-success">Actualizar</a>
            </td>
          </tr>`
        });
        document.querySelector('#tbody-seguros').innerHTML= filas;

        //botones para el update
        let botonesUpdate = document.querySelectorAll('.update');
        botonesUpdate.forEach(boton=>{
            boton.addEventListener("click",function(e){
                let url = this["href"];
                fetch(url,{
                    method:"GET"
                }).then(res=>res.json()).then(seguro=>{
                    console.log(seguro[0]);
                    document.forms.formUpdate.idU.value=seguro[0]._id;
                    document.forms.formUpdate.codigoU.value = seguro[0].codigo;
                    document.forms.formUpdate.tipoU.value = seguro[0].tipo;
                    document.forms.formUpdate.vigenciaU.value = seguro[0].vigencia;

                }).catch(err=>{
                    console.log(err);
                });
            });
        });

        //botones para eliminar
        let botonesEliminar = document.querySelectorAll('.delete');
        botonesEliminar.forEach(boton=>{
            boton.addEventListener("click",function(e){
                e.preventDefault();
                let url = this["href"];
                fetch(url,{
                    method:"DELETE"
                }).then(res=>res.json()).then(response=>{
                    seguros();
                }).catch(err=>{
                    console.log(err);
                });
            });
        });
    }).catch(err=>{
        console.log(err);
    });
}