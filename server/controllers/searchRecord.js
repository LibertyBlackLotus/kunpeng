const SearchRecord = require('../models/searchRecord.js');

/**
 * 创建用户搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const createSearchRecord = async (ctx) => {
	const data = ctx.request.body;
	let {user_id, content} = data;
	let result = await SearchRecord.getRecord({user_id, content});
	if(result){
		let item = await SearchRecord.updateRecord(result.id, {time: new Date()});
		ctx.body = {
			status: true,
			item
		}
	}else{
		let item = await SearchRecord.createSearchRecord(data);
		ctx.body = {
			status: true,
			item
		}
	}
};

/**
 * 获取一条搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const getSearchRecord = async (ctx) => {
	const user_id = ctx.params.user_id;
	let records = await SearchRecord.getSearchRecord(user_id);
	ctx.body = records;
};

/**
 * 获取用户搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const getUserSearchRecord = async (ctx) => {
	const user_id = ctx.params.user_id;
	let records = await SearchRecord.getUserSearchRecord(user_id);
	ctx.body = records;
};

/**
 * 删除一条搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeRecord = async (ctx) => {
	let record_id = ctx.params.record_id;
	let result = await SearchRecord.removeRecord(record_id);
	ctx.body = result;
};

/**
 * 清空用户搜索记录
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeRecordAll = async (ctx) => {
	let data = ctx.request.body;
	let result = await SearchRecord.removeRecordAll(data.user_id);
	ctx.body = result;
};

module.exports = {
	createSearchRecord,
	getSearchRecord,
	removeRecord,
	removeRecordAll,
	getUserSearchRecord
};
