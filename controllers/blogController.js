const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
	get: async (req, res) => {

		const thePosts = await db.posts.findAll();
        //console.log(thePosts);
		const viewData = {
            blogs: thePosts,
            baseURL: ""
		};
		res.status(202).render("blog", viewData)
	},

}


