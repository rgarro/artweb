module.exports = {

	get: (req, res) => {

		const viewData ={
			baseURL: ""
		};      

		res.status(202).render("preguntas-frecuentes", viewData)

	}

}
