module.exports = function (sequelize, DataTypes) {
	return sequelize.define('search_record', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		content: {
			type: DataTypes.CHAR(30),
			allowNull: false
		},
		time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'search_record'
	});
};
