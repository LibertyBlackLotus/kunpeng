module.exports = function (sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		phone_number: { //手机号
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			defaultValue: 0
		},
		user_name: { //用户名
			type: DataTypes.CHAR(50),
			allowNull: true,
			defaultValue: ''
		},
		password: { //密码
			type: DataTypes.CHAR(128),
			allowNull: true,
			defaultValue: '0'
		},
		email: {
			type: DataTypes.STRING(30),
			allowNull: true,
			defaultValue: null
		},
		photo: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		nickname: {
			type: DataTypes.STRING(30),
			allowNull: true,
			defaultValue: ''
		},
		register_time: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: new Date()
		},
		birthday: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			defaultValue: null
		}
	}, {
		tableName: 'user'
	});
};
