/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('user_collection', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		article_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'user_collection'
	});
};
