var Seguro = require('../models/seguro');
var segurosController = {};

//retorna todos los seguros
segurosController.index = async function(req,res){
    let seguros = await Seguro.find();
    try {
        return res.status(200).json(seguros);
    } catch (error) {
        return res.status(500).json({message:"ha habido un error al retornar los seguros"});
    }
}

//postea un seguros
segurosController.ingresarSeguro = async function(req,res){
    let seguro = new Seguro();
    seguro.codigo = req.body.codigo;
    seguro.tipo = req.body.tipo;
    seguro.vigencia = req.body.vigencia;

    try {
        await seguro.save();
        return res.status(200).json({message:"el seguro se ha guardado con exito"});
    } catch (error) {
        return res.status(500).json({message:"no se ha podido guardar el seguro"});
    }
}

//elimina un seguro
segurosController.eliminarSeguro = async function(req,res){
    let id = req.params.id;
    try {
        await Seguro.remove({_id:id});
        return res.status(200).json({message:"el seguro se ha borrado con exito"});
    } catch (error) {
        return res.status(500).json({error:error});
    }
}


module.exports = segurosController;