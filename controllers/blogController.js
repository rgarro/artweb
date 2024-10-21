const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
	get: async (req, res) => {

		const thePosts = await db.posts.findAll();

		/*const viewData = {
            title: title,
            content: content,
		};*/
		res.status(202).render("blog", viewData)
	},

}


