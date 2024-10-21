'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.isDevel ? 'development' : 'prod';
const db = {};


console.log("DB connecting (values from env)",process.env.DB_NAME, process.env.DB_USER, process.env.DB_HOST);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER , process.env.DB_PASSWORD, {
	dialect: 'mysql', 
	host: process.env.DB_HOST || '127.0.0.1',
	logging: env=='development',
});

sequelize.authenticate().then(() => {
   console.log('DB connecition established successfully.');
}).catch((error) => {
	console.error('DB Unable to connect to the database: ', error);
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
