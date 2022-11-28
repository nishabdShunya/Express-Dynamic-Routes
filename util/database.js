const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'YahaAbhiIsiWaqt@0', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;