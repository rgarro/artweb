const artistController = require("./artistController");

module.exports = async (req, res) => {
	const artists = await artistController.getEveryone()

	const viewData = {
		artists: artists,
		baseURL: ""
	};
	res.status(202).render("sitemap-xml", viewData)
}


