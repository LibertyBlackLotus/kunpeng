import record from '../../api/record';
import {
	ARTICLE_LIST_HOT,
} from '../mutations_type';

const state = {
};

const getters = {
};

const mutations = {

};

const actions = {
	//添加阅读记录
	addReadRecord({commit}, params) {
		record.addReadRecord(params).then(res => {
		});
	},
};

export default {
	state,
	getters,
	mutations,
	actions
}