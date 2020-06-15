/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
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
    comment_like_count: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    comment_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'comments'
  });
};
