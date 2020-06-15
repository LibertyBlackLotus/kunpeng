const db = require('../config/db.js');
const userCollection = '../schema/user_collection.js';
const articles = '../schema/articles.js';
const user = '../schema/user.js';
const UserCollection = db.import(userCollection);
const Articles = db.import(articles);
const User = db.import(user);

UserCollection.belongsTo(Articles, {
	as: 'article',
	foreignKey: 'article_id'
});

UserCollection.belongsTo(User, {
	as: 'User',
	foreignKey: 'user_id'
});

/**
 * 添加收藏
 * @param data  搜索内容
 * @returns {boolean}
 */
const createCollection = (data) => {
	let result = UserCollection.create({
		...data
	}).then(collection => ({status: 'ok', collection}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

/**
 *  获取某个用户的收藏
 * @param user_id 用户id
 * @returns {*}
 */
const getUserCollection = (user_id) => {
	const records = UserCollection.findAll({
		where: {
			user_id
		},
		include: [{
			model: Articles,
			as: 'article'
		},{
			model: User,
			as: 'User',
			attributes: ['id', 'user_name', 'photo']
		}],
		order: [
			['time', 'DESC']
		]
	});
	return records;
};

/**
 *  取消收藏
 * @param id 收藏id
 * @returns {*}
 */
const removeCollection = (id) => {
	let result = UserCollection.findOne({
		where: {
			id
		},
		attributes: ['user_id'],
		raw: true
	}).then(user => {
		return UserCollection.destroy({
			where: {
				id
			}
		}).then(result => {
			return UserCollection.findAll({
				where: {
					user_id: user.user_id
				},
				include: [{
					model: Articles,
					as: 'article'
				},{
					model: User,
					as: 'User',
					attributes: ['id', 'user_name', 'photo']
				}],
				order: [
					['time', 'DESC']
				]
			});
		}).catch(e => ({status: 'error', message: e}));
	});
	return result;
};

/**
 *  清空用户收藏
 * @param user_id 用户id
 * @returns {*}
 */
const removeCollectionAll = (user_id) => {
	let result = UserCollection.destroy({
		where: {
			user_id
		}
	}).then(result => ({status: 'ok'}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};


/**
 * 判断用户是否收藏文章
 * @param data.article_id 文章id
 * @param data.user_id 收藏用户id
 * @returns {Promise<[number , Model[]]> | Promise.<Array.<number, number>>}
 */
const isCollected = (data) => {
	let {article_id, user_id} = data;
	let result = UserCollection.findOne({
		where: {
			article_id, user_id
		}
	});
	return result;
};

module.exports = {
	createCollection,
	getUserCollection,
	removeCollection,
	removeCollectionAll,
	isCollected
};