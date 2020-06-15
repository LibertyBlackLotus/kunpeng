import comments from '../../api/comments';
import {
	ARTICLE_COMMENT,
} from '../mutations_type';

const state = {
	comments: [],    //文章评论
};

const getters = {
};

const mutations = {
	//文章评论
	[ARTICLE_COMMENT](state, {comments}) {
		state.comments = comments;
	},

};

const actions = {
	/**
	 * 获取文章评论
	 * @param id 文章id
	 */
	getComments({commit}, {id}) {
		comments.getComments(id).then(res => {
			commit(ARTICLE_COMMENT, {comments: res});
		});
	},

	/**
	 * 提交评论
	 * @param params
	 */
	commitComment({commit}, params) {
		return comments.commitComment(params).then(res => {
			commit(ARTICLE_COMMENT, {comments: res});
			return Promise.resolve(res);
		});
	},

	/**
	 * 提交回复
	 * @param params
	 */
	commitReply({commit}, params) {
		return comments.commitReply(params).then(res => {
			commit(ARTICLE_COMMENT, {comments: res});
			return Promise.resolve(res);
		});
	},

	/**
	 * 评论点赞
	 * @param params
	 */
	likeComment({commit}, params) {
		return comments.likeComment(params).then(res => {
			return Promise.resolve(res);
		});
	},


};

export default {
	state,
	getters,
	mutations,
	actions
}