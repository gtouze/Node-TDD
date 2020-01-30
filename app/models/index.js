'use strict';

const fs = require('fs');
const path = require('path');
// const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config');
const db = require('mongoose');

let sequelize;
/*if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}*/

db.connect(`mongodb+srv://cluster0-vnic8.mongodb.net/${config.database}`,{useUnifiedTopology: true, useNewUrlParser: true,})
    .then(() => {
      console.log('Connected to MongoDB !')
    })
    .catch((err) => {
      console.log(err)
    })

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Close the database connection
b.close = async () => {
  await db.close()
}

module.exports = db;