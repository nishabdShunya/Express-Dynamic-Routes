const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     dialect: 'mysql',
//     host: process.env.DB_HOST
// });

const sequelize = new Sequelize('node-complete', 'root', 'YahaAbhiIsiWaqt@0', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;