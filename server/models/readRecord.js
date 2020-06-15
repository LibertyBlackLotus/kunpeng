const db = require('../config/db.js');
const read_record = '../schema/read_record.js';
const articles = '../schema/articles.js';
const ReadRecord = db.import(read_record);
const Articles = db.import(articles);

ReadRecord.belongsTo(Articles, {
	as: 'article',
	foreignKey: 'article_id'
});

/**
 * 添加一条阅读记录
 * @param data  搜索内容
 * @returns {boolean}
 */
const createReadRecord = (data) => {
	let result = ReadRecord.create({
		...data
	}).then(record => ({status: 'ok', record}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

/**
 *  更新一条阅读记录
 * @param item 记录
 * @returns {*}
 */
const updateRecord = (id, item) => {
	let result = ReadRecord.update(
		item,
		{
			where: {
				id
			}
		}
	)
	return result;
};

/**
 *  根据id获取一条阅读记录
 * @param record_id 记录id
 * @returns {*}
 */
const getReadRecord = (record_id) => {
	const records = ReadRecord.findOne({
		where: {
			id: record_id
		},
		order: [
			['time', 'DESC']
		]
	});
	return records;
};

/**
 *  获取一条阅读记录
 * @param item 记录
 * @returns {*}
 */
const getRecord = (item) => {
	const record = ReadRecord.findOne({
		where: item,
		order: [
			['time', 'DESC']
		]
	});
	return record;
};

/**
 *  获取某个用户的阅读记录
 * @param user_id 用户id
 * @returns {*}
 */
const getUserReadRecord = (user_id) => {
	const records = ReadRecord.findAll({
		where: {
			user_id
		},
		include: [{
			model: Articles,
			as: 'article',
			attributes: ['article_id', 'article_title']
		}],
		order: [
			['time', 'DESC']
		]
	});
	return records;
};

/**
 *  删除一条阅读记录
 * @param record_id 记录id
 * @returns {*}
 */
const removeReadRecord = (record_id) => {
	let result = ReadRecord.destroy({
		where: {
			id: record_id
		}
	}).then(result => ({status: 'ok'}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

/**
 *  清空用户阅读记录
 * @param user_id 用户id
 * @returns {*}
 */
const removeReadRecordAll = (user_id) => {
	let result = ReadRecord.destroy({
		where: {
			user_id
		}
	}).then(result => ({status: 'ok'}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

module.exports = {
	createReadRecord,
	getReadRecord,
	getUserReadRecord,
	removeReadRecord,
	removeReadRecordAll,
	updateRecord,
	getRecord
};