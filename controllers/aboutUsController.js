module.exports = { 
    get: (req,res) =>{ 
        
        const viewData ={
            baseURL: ""
        };

        res.status(202).render("sobre-nosotros", viewData) 
    
    },

     getDirecciones: (req, res) => { 
        
        const viewData ={
            baseURL: ""
        };

        res.status(202).render("direcciones", viewData)
    },
    
     getClientesNuestros :  (req,res)=> {
        const viewData ={
            baseURL: ""
        };
        res.status(202).render("nuestros-clientes", viewData)
    }
}    
    
    