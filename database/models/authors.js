
module.exports = (sequelize, DataTypes) => {

	let cols = { 
		id: { type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey:true},

		username: { type: DataTypes.STRING, allowNull: false},
        password: { type: DataTypes.STRING, allowNull: false },
        full_name: { type: DataTypes.STRING, allowNull: false},
	};

	let config = {tableName: "authors",timestamps: false}

	const Authors = sequelize.define("authors", cols, config);


	return Authors;
}
