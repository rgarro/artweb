const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
	get: async (req, res) => {

		const artists = await db.artist.findAll();

		const viewData = {
			artists: artists,
			baseURL: ""
		};
		res.status(202).render("artistas", viewData)
	},

	getOne: async (req, res) => {
		const id = req.params.id
		const artist = isNaN(id) ? await db.artist.findOne({ where: { slug: id } }) : await db.artist.findByPk(id);
		if (!artist) { res.send("no hay artista") }

		const viewData = {
			artist: artist,
			baseURL: ""
		};

		res.status(202).render("artistOne", viewData)
	},


	search: async (req, res) => {

		const artists = await db.artist.findAll({
			where: { name: { [Op.like]: `%${req.query.q}%` } }
		});

		const viewData = {
			artists: artists,
			baseURL: ""
		};
		res.status(202).render("artistas", viewData)
	},

	filterleter: async (req, res) => {

		const artists = await db.artist.findAll({
			where: {[Op.or]: [{ name: { [Op.like]: `${req.query.q}%` }}, {name: { [Op.like]: `% ${req.query.q}%` }}]}
		});

		const viewData = {
			artists: artists,
			baseURL: "" //TODO: leer de configuracion, hacerlo en todas las paginas
		};
		res.status(202).render("artistas", viewData)
	},

	getEveryone: async () => { //U: for sitemap
		const artists = await db.artist.findAll();
		return artists;
	},

}


