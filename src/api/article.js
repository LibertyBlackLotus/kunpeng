import {
	ARTICLE_LIST_HOT,
	ARTICLE_LIST_LATEST,
	ARTICLE_LIST_FOCUS,
	ARTICLE_DETAIL,
	ARTICLE_IS_LIKE,
	ARTICLE_IS_COLLECT,
	ARTICLE_LIKE,
	ARTICLE_COLLECT,
	USER_COLLECTION_LIST,
	ARTICLE_CONSULT,
	ARTICLE_SEARCH
} from './apiUrl';
const axios = require('axios');

export default {
	//获取最热文章列表
	getHotList() {
		return axios.get(ARTICLE_LIST_HOT)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	//获取最新文章列表
	getLatestList() {
		return axios.get(ARTICLE_LIST_LATEST)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 获取关注用户文章列表
	 * @param id 用户id
	 * @returns {Promise.<TResult>}
	 */
	getFocusList(id) {
		return axios.get(ARTICLE_LIST_FOCUS + id)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 获取文章详情
	 * @param id 文章id
	 * @returns {Promise.<TResult>}
	 */
	getDetail(id) {
		return axios.get(ARTICLE_DETAIL + id)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 判断用户是否喜欢文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 * @returns {Promise.<TResult>}
	 */
	checkIsLike(params) {
		return axios.post(ARTICLE_IS_LIKE, params)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 判断用户是否收藏文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 * @returns {Promise.<TResult>}
	 */
	checkIsCollected(params) {
		return axios.post(ARTICLE_IS_COLLECT, params)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 喜欢文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 * @returns {Promise.<TResult>}
	 */
	like(params) {
		return axios.post(ARTICLE_LIKE, params)
			.then(res => {
				if (res.status == 200) {
					return true;
				}
			})
	},

	/**
	 * 取消喜欢文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 * @returns {Promise.<TResult>}
	 */
	removeLike(params) {
		return axios.delete(ARTICLE_LIKE, {data: params})
			.then(res => {
				if (res.status == 200) {
					return false;
				}
			})
	},

	/**
	 * 收藏文章
	 * @param params.user_id 用户id
	 * @param params.article_id 文章id
	 * @param params.time 时间
	 * @returns {Promise.<TResult>}
	 */
	addCollection(params) {
		return axios.post(ARTICLE_COLLECT, params)
			.then(res => {
				if (res.status == 200 && res.data.status) {
					return true;
				}
			})
	},

	/**
	 * 取消收藏文章
	 * @param id
	 * @returns {Promise.<TResult>}
	 */
	removeCollection(id) {
		return axios.delete(ARTICLE_COLLECT + `/${id}`)
			.then(res => {
				if (res.status == 200) {
					return res.data;
				}
			})
	},

	//获取用户收藏文章列表
	getUserCollectionList(id) {
		return axios.get(USER_COLLECTION_LIST + id)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 查阅文章
	 * @param params.id 文章id
	 * @returns {Promise.<TResult>}
	 */
	consult(params) {
		return axios.post(ARTICLE_CONSULT, params)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 搜索文章
	 * @param keywords 关键字
	 * @returns {Promise.<TResult>}
	 */
	getSearchItem(keywords) {
		return axios.get(ARTICLE_SEARCH + keywords)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},


}