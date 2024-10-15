module.exports = {
    get: (req, res) => { 
        
        const viewData ={
            baseURL: ""
        };

        res.status(202).render("vender", viewData) 
},
    getConsejos: (req,res)=> {

        const viewData ={
            baseURL: ""
        };


        res.status(202).render("consejos", viewData)
    },
    getAyuda: (req, res)=>{

        const viewData ={
            baseURL: ""
        };

        res.status(202).render("ayuda", viewData)
    
    },
    getCorretaje: (req, res)=>{
        
        const viewData ={
            baseURL: ""
        };

        res.status(202).render("venta-de-corretaje", viewData)
    },

    getContrato: (req, res)=>{
        
        const viewData ={
            baseURL: ""
        };

        res.status(202).render("contrato-privado", viewData)
    },
    getSubast:(req, res)=> {
        
        const viewData ={
            baseURL: ""
        };

        res.status(202).render("subastacion", viewData)
    },

    getVentaOnline:(req, res)=> {
        
        const viewData ={
            baseURL: ""
        };


        res.status(202).render("venta-online", viewData)
    
    },


}