
module.exports = (sequelize, DataTypes) => {

	let cols = { 
		id: { type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey:true},

		author_id: { type: DataTypes.INTEGER, allowNull: false},
		title: { type: DataTypes.STRING, allowNull: false},
		content: { type: DataTypes.STRING, allowNull: false},
		blogdate: { type: DataTypes.DATE, allowNull: false},
		is_published:{ type: DataTypes.BOOLEAN, allowNull: false},
	};

	let config = {tableName: "posts",timestamps: false}

	const Posts = sequelize.define("posts", cols, config);


	return Posts;
}
