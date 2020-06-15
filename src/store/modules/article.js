import article from '../../api/article';
import {getUserId} from '../../utils/common';
import {
	ARTICLE_LIST_HOT,
	ARTICLE_LIST_LATEST,
	ARTICLE_LIST_FOCUS,
	ARTICLE_DETAIL,
	ARTICLE_IS_LIKE,
	ARTICLE_IS_COLLECT,
	USER_COLLECTION_LIST,
	ARTICLE_SEARCH
} from '../mutations_type';

const state = {
	hotList: [],     		//最热文章列表
	latestList: [],  		//最新文章列表
	focusArticleList: [],   //关注的用户文章列表
	article: {},    		//文章详情
	isLike: false,          //是否喜欢了文章
	isCollected: false,     //是否收藏了文章
	userCollectionList: [], //用户收藏文章列表
	searchResult: [],       //搜索结果
};

const getters = {
};

const mutations = {
	//最热文章列表
	[ARTICLE_LIST_HOT](state, {list}) {
		state.hotList = list;
	},

	//最新文章列表
	[ARTICLE_LIST_LATEST](state, {list}) {
		state.latestList = list;
	},

	//关注的用户的文章列表
	[ARTICLE_LIST_FOCUS](state, {list}) {
		state.focusArticleList = list;
	},

	//文章详情
	[ARTICLE_DETAIL](state, {detail}) {
		state.article = detail;
	},

	//是否喜欢了文章
	[ARTICLE_IS_LIKE](state, {result}) {
		state.isLike = result;
	},

	//是否收藏了文章
	[ARTICLE_IS_COLLECT](state, {result}) {
		state.isCollected = result;
	},

	//设置用户收藏文章列表
	[USER_COLLECTION_LIST](state, {list}) {
		state.userCollectionList = list;
	},

	//搜索结果
	[ARTICLE_SEARCH](state, {list}) {
		state.searchResult = list;
	},

};

const actions = {
	//获取最热文章列表
	getHotList({commit}) {
		article.getHotList().then(res => {
			commit(ARTICLE_LIST_HOT, {list: res});
		});
	},

	//获取最新文章列表
	getLatestList({commit}) {
		article.getLatestList().then(res => {
			commit(ARTICLE_LIST_LATEST, {list: res});
		});
	},

	/**
	 * 获取关注的文章列表
	 * @param id 当前用户id
	 */
	getFocusUserArticleList({commit}, {id}) {
		article.getFocusList(id).then(res => {
			commit(ARTICLE_LIST_FOCUS, {list: res});
		});
	},

	/**
	 * 获取文章详情
	 * @param id 文章id
	 */
	getArticleDetail({commit, dispatch}, {id}) {
		article.getDetail(id).then(res => {
			commit(ARTICLE_DETAIL, {detail: res});
			let params =  {
				user_id: getUserId(),
				article_id: res.article_id
			};
			dispatch('checkIsLike', params);
			dispatch('checkIsCollected', params);
		});
	},

	/**
	 * 判断用户是否喜欢文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 */
	checkIsLike({commit}, params) {
		article.checkIsLike(params).then(res => {
			commit(ARTICLE_IS_LIKE, {result: res});
		});
	},

	/**
	 * //判断用户是否收藏文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 */
	checkIsCollected({commit}, params) {
		article.checkIsCollected(params).then(res => {
			commit(ARTICLE_IS_COLLECT, {result: res});
		});
	},

	/**
	 * 喜欢文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 */
	like({commit, dispatch}, params) {
		article.like(params).then(res => {
			commit(ARTICLE_IS_LIKE, {result: res});
			dispatch('getArticleDetail', {id: params.article_id});
		});
	},

	/**
	 * 取消喜欢文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 */
	removeLike({commit, dispatch}, params) {
		article.removeLike(params).then(res => {
			commit(ARTICLE_IS_LIKE, {result: res});
			dispatch('getArticleDetail', {id: params.article_id});
		});
	},

	/**
	 * 收藏文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 * @param params.time 时间
	 */
	addCollection({commit}, params) {
		article.addCollection(params).then(res => {
			commit(ARTICLE_IS_COLLECT, {result: res});
		});
	},

	/**
	 * 取消收藏文章
	 * @param  id
	 */
	removeCollection({commit}, {id}) {
		article.removeCollection(id).then(res => {
			commit(ARTICLE_IS_COLLECT, {result: false});
			commit(USER_COLLECTION_LIST, {list: res});
		});
	},

	/**
	 * 获取用户收藏文章列表
	 * @param id 用户id
	 */
	getUserCollectionList({commit}, {id}) {
		article.getUserCollectionList(id).then(res => {
			commit(USER_COLLECTION_LIST, {list: res});
		});
	},

	/**
	 * 查阅文章
	 * @param params.id 文章id
	 */
	consult({commit}, params) {
		article.consult(params).then(res => {
		});
	},

	/**
	 * 搜索文章
	 * @param keywords 关键字
	 */
	getSearchItem({commit}, {keywords}) {
		article.getSearchItem(keywords).then(res => {
			commit(ARTICLE_SEARCH, {list: res});
		});
	},

};

export default {
	state,
	getters,
	mutations,
	actions
}