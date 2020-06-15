/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('comments_reply', {
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
		comment_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		reply_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		parent_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: 0
		}
	}, {
		tableName: 'comments_reply'
	});
};
