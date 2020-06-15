const Comments = require('../models/comments.js');

/**
 * 获取文章评论列表
 * @param ctx
 * @returns {Promise.<void>}
 */
const getCommentsList = async (ctx) => {
	const article_id = ctx.params.id;
	let commentsList = await Comments.getCommentsList(article_id);
	ctx.body = commentsList;
}

/**
 * 创建评论
 * @param ctx
 * @returns {Promise.<void>}
 */
const createComment = async (ctx) => {
	const data = ctx.request.body;
	let result = await Comments.createComment(data);
	ctx.body = result;
};

/**
 * 点赞评论
 * @param ctx
 * @returns {Promise.<void>}
 */
const praiseComment = async (ctx) => {
	const data = ctx.request.body;
	let result = await Comments.praiseComment(data);
	ctx.body = result;
}

/**
 * 回复评论
 * @param ctx
 * @returns {Promise.<void>}
 */
const replyComment = async (ctx) => {
	const data = ctx.request.body;
	let result = await Comments.replyComment(data);
	ctx.body = result;
};

module.exports = {
	getCommentsList,
	createComment,
	praiseComment,
	replyComment
}
