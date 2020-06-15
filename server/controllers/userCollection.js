const UserCollection = require('../models/userCollection.js');

/**
 * 添加收藏
 * @param ctx
 * @returns {Promise.<void>}
 */
const createCollection = async (ctx) => {
	const data = ctx.request.body;
	const result = await UserCollection.createCollection(data);
	if (result.status == 'ok') {
		ctx.body = {
			status: true,
			result
		}
	} else {
		ctx.body = {
			status: false,
			message: result.message
		};
	}
};

/**
 * 获取用户所有收藏
 * @param ctx
 * @returns {Promise.<void>}
 */
const getUserCollection = async (ctx) => {
	const user_id = ctx.params.user_id;
	let records = await UserCollection.getUserCollection(user_id);
	ctx.body = records;
};

/**
 * 取消收藏
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeCollection = async (ctx) => {
	let id = ctx.params.id;
	let result = await UserCollection.removeCollection(id);
	ctx.body = result;
};

/**
 * 清空用户收藏
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeCollectionAll = async (ctx) => {
	let data = ctx.request.body;
	let result = await UserCollection.removeCollectionAll(data.user_id);
	ctx.body = result;
};

/**
 * 判断用户是否收藏文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const isCollected = async (ctx) => {
	let data = ctx.request.body;
	let result = await UserCollection.isCollected(data);
	let status = result !== null;
	ctx.body = status;
};

module.exports = {
	createCollection,
	getUserCollection,
	removeCollection,
	removeCollectionAll,
	isCollected
};
