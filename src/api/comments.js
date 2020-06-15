import {
	ARTICLE_COMMENT,
	COMMENT,
	COMMENT_REPLY,
	COMMENT_PRAISE
} from './apiUrl';
const axios = require('axios');

export default {
	/**
	 * 获取文章评论
	 * @param id 文章id
	 * @returns {Promise.<TResult>}
	 */
	getComments(id) {
		return axios.get(ARTICLE_COMMENT + id)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 提交评论
	 * @param params.user_id             用户id
	 * @param params.article_id          文章id
	 * @param params.comment_content     评论内容
	 * @param params.comment_like_count
	 * @param params.comment_date        时间
	 * @returns {Promise.<TResult>}
	 */
	commitComment(params) {
		return axios.post(COMMENT, params)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 提交回复
	 * @param params.user_id             用户id
	 * @param params.article_id          文章id
	 * @param params.comment_content     评论内容
	 * @param params.comment_like_count
	 * @param params.comment_date        时间
	 * @returns {Promise.<TResult>}
	 */
	commitReply(params) {
		return axios.post(COMMENT_REPLY, params)
			.then((res) => {
				console.log('---commitReply---api--res->', res);
				if (res.status == 200) {
					return res.data;
				}
			});
	},

	/**
	 * 评论点赞
	 * @param params.comment_id 评论id
	 * @param params.user_id 用户id
	 * @returns {Promise.<TResult>}
	 */
	likeComment(params) {
		return axios.post(COMMENT_PRAISE, params)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},


}