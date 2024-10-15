module.exports = {


get: (req, res) => {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("autenticacion", viewData)

},

getAnalisis: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("analisis", viewData)
},
getBio: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("biografica", viewData)
},
getCasosDificiles: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("casos-dificiles", viewData)
},
getCertificacion: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("certificacion-coa", viewData)
},
getDocumental: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("documental", viewData)
},
getExaminacion: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("examinacion", viewData)
},
getInves: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("investigacion", viewData)
},
getReviRechazo: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("revision-del-rechazo", viewData)
},
getRobos: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("robos", viewData)
},

getOrigen: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("origen", viewData)
},

getAtribucion: (req,res)=> {

   const viewData ={
      baseURL: ""
  };

   res.status(202).render("atribucion", viewData)
},


}