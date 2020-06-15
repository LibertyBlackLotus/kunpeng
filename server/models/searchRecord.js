const db = require('../config/db.js');
const search_record = '../schema/search_record.js';
const Record = db.import(search_record);

/**
 * 创建搜索记录
 * @param data  搜索内容
 * @returns {boolean}
 */
const createSearchRecord = (data) => {
	let result = Record.create({
		...data
	}).then(record => ({status: 'ok', record}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

/**
 *  通过id获取一条搜索记录
 * @param record_id 记录id
 * @returns {*}
 */
const getSearchRecord = (record_id) => {
	const records = Record.findOne({
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
 *  获取一条搜索记录
 * @param item 记录
 * @returns {*}
 */
const getRecord = (item) => {
	const record = Record.findOne({
		where: item,
		order: [
			['time', 'DESC']
		]
	});
	return record;
};


/**
 *  更新一条搜索记录
 * @param item 记录
 * @returns {*}
 */
const updateRecord = (id, item) => {
	let result = Record.update(
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
 *  获取某个用户搜索记录
 * @param user_id 用户id
 * @returns {*}
 */
const getUserSearchRecord = (user_id) => {
	const records = Record.findAll({
		where: {
			user_id
		},
		order: [
			['time', 'DESC']
		]
	});
	return records;
};

/**
 *  删除一条搜索记录
 * @param record_id 记录id
 * @returns {*}
 */
const removeRecord = (record_id) => {
	let result = Record.destroy({
		where: {
			id: record_id
		}
	}).then(result => ({status: 'ok'}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

/**
 *  清空用户搜索记录
 * @param user_id 用户id
 * @returns {*}
 */
const removeRecordAll = (user_id) => {
	let result = Record.destroy({
		where: {
			user_id
		}
	}).then(result => ({status: 'ok'}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

module.exports = {
	createSearchRecord,
	getSearchRecord,
	removeRecord,
	removeRecordAll,
	getUserSearchRecord,
	getRecord,
	updateRecord
};