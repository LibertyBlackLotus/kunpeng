import Vue from 'vue';
import Vuex from 'vuex';
import article from './modules/article';
import record from './modules/record';
import searchRecord from './modules/searchRecord';
import comments from './modules/comments';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		article,
		record,
		comments,
		searchRecord,
		user
	}
})