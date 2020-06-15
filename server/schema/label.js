/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('cat_lable', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cat_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		lable_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
	}, {
		tableName: 'cat_lable'
	});
};
