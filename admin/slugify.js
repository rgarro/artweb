//INFO: agregar slug por defecto a los artistas que no tengan

require('dotenv').config()

const db = require("../database/models");
const Op = db.Sequelize.Op;
const slugify= require("slugify")

process= async () => {
	const artists = await db.artist.findAll();
	for (let i=0; i<artists.length; i++) {
		let a= artists[i];
		const id= a.id; const name= a.name;
		let slug= a.slug;
		if (!slug) {
			slug= slugify(a.name, {strict: true, lower: true});
			console.log(`update artist set slug='${slug}' where id=${id};`) 
		}
	};
}

process()
