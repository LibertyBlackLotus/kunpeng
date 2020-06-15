const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:@localhost/myblog', {
	define: {
		timestamps: false
	},
	dialectOptions: {
		useUTC: false //for reading from database
	},
	timezone: '+08:00', //for writing to database
	pool: {   //连接池
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

module.exports = sequelize;
