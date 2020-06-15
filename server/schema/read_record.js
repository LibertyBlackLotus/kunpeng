/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('read_record', {
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
		article_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'read_record'
	});
};
