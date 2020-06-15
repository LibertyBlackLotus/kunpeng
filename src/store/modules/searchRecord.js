import searchRecord from '../../api/searchRecord';
import {
	SEARCH_RECORD_USER,
} from '../mutations_type';

const state = {
	recentSearch: [],  //最近搜索
};

const getters = {
};

const mutations = {
	//搜索记录
	[SEARCH_RECORD_USER](state, {list}) {
		state.recentSearch = list;
	},

};

const actions = {
	//记录搜索内容
	saveSearchRecord({commit}, params) {
		searchRecord.saveSearchRecord(params).then(res => {

		});
	},

	/**
	 * 获取用户最近搜索记录
	 * @param id 用户id
	 */
	getRecentSearch({commit}, {id}) {
		searchRecord.getRecentSearch(id).then(res => {
			commit(SEARCH_RECORD_USER, {list: res});
		});
	},

	/**
	 * 删除搜索记录
	 * @param id
	 */
	deleteRecord({commit}, {id}) {
		return searchRecord.deleteRecord(id).then(res => {
			return Promise.resolve(res);
		});
	},

	/**
	 * 清空用户搜索记录
	 * @param params
	 */
	clearRecord({commit}, params) {
		return searchRecord.clearRecord(params).then(res => {
			return Promise.resolve(res);
		});
	}

};

export default {
	state,
	getters,
	mutations,
	actions
}