const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
	get: async (req, res) => {
//console.log(req.query.post);
        const post_id = req.query.post;
        //const post = await db.posts.findOneByPk(pid);
        const bpost = await db.posts.findOne({ where: { id: post_id } })
		if (!bpost) { res.send("BLOG NO DISPONIBLE") }
     
		const viewData = {
			bpost: bpost.dataValues,
			baseURL: ""
		};

        res.status(202).render("blogpost", viewData);
	},

}