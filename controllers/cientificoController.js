module.exports = {


    get: (req, res) => {
    
        const viewData ={
            baseURL: ""
        };
    
       res.status(202).render("cientifico-y-forense", viewData)
    
    },

    getAnalisisPigmen:(req,res)=>  {

        const viewData ={
            baseURL: ""
        };

        res.status(202).render("analisis-de-pigmentos", viewData)
    },

getAnalisisPapel:(req,res)=>  {

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("analisis-del-papel", viewData)
},

getDatMetales:(req,res)=> {

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("datacion-por-metales", viewData)
},

getEspeciesMadera:(req,res)=> {

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("especies-de-madera", viewData)
},
getDatacion:(req,res)=> {

    const viewData ={
        baseURL: ""
    };

res.status(202).render("datacion", viewData)
},


getDataCarbo: (req,res)=> { 

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("datacion-por-carbono", viewData)
}, 
getEstudiosFore:(req,res)=> {

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("estudios-forenses", viewData)
},
getFirma:(req,res)=> {

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("firma", viewData)
},
getFirmaCali: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("firma-y-caligrafia", viewData)
},
getFotoEsp: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("fotografia-especial", viewData)
},
getLinguistica: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("linguistica-forense", viewData)
},
getMontajeBasti: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("montaje-de-bastidores", viewData)
},
getPaneles: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("paneles", viewData)
},
getPruebasCientificas: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("pruebas-cientificas", viewData)
},
getRayosX: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("rayos-x", viewData)
},
getSellos: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("sellos", viewData)
},
getSellosEtiquetas: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("sellos-y-etiquetas", viewData)
},
getSobreDatacion: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("sobre-la-datacion", viewData)
},
getTermo: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("sobre-la-termoluminiscencia", viewData)
},
getTablas: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("tablas", viewData)
},
getTachuelas: (req,res)=>{

    const viewData ={
        baseURL: ""
    };

    res.status(202).render("tachuelas", viewData)
}

    }


