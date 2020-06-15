import {
	SEARCH_RECORD,
	SEARCH_RECORD_USER
} from './apiUrl';
const axios = require('axios');

export default {
	//记录搜索内容
	saveSearchRecord(params) {
		return axios.post(SEARCH_RECORD, params)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 获取用户最近搜索记录
	 * @param id  用户id
	 * @returns {Promise.<TResult>}
	 */
	getRecentSearch(id) {
		return axios.get(SEARCH_RECORD_USER + id)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 删除搜索记录
	 * @param id  id
	 * @returns {Promise.<TResult>}
	 */
	deleteRecord(id) {
		return axios.delete(SEARCH_RECORD + `/${id}`)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 清空用户搜索记录
	 * @param params
	 * @returns {Promise.<TResult>}
	 */
	clearRecord(params) {
		return axios.delete(SEARCH_RECORD, {data: params})
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},


}