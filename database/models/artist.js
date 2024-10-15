

module.exports = (sequelize, DataTypes) => {

	let cols = { 
		id: { type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey:true},

		name: { type: DataTypes.STRING, allowNull: false},
		knownas: { type: DataTypes.STRING, allowNull: false},
		slug: { type: DataTypes.STRING, allowNull: true},
		dates: { type: DataTypes.STRING, allowNull: false},
		bio:{ type: DataTypes.STRING, allowNull: false},
	};

	let config = {tableName: "artist",timestamps: false}

	const Artist = sequelize.define("artist", cols, config);


	return Artist;
}
