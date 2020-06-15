const db = require('../config/db.js');
const comments = '../schema/comments.js';
const comments_reply = '../schema/comments_reply.js';
const user = '../schema/user.js';
const comments_like = '../schema/comments_like';
const articles = '../schema/articles';

const Comments = db.import(comments);
const CommentsReply = db.import(comments_reply);
const User = db.import(user);
const CommentsLike = db.import(comments_like);
const Articles = db.import(articles);

Comments.belongsTo(User, {
	as: 'User',
	foreignKey: 'user_id'
});
User.hasMany(Comments, {
	as: 'Comments',
	foreignKey: 'user_id'
});

CommentsReply.belongsTo(Comments, {
	as: 'comments',
	foreignKey: 'comment_id'
});
Comments.hasMany(CommentsReply, {
	as: 'replys',
	foreignKey: 'comment_id'
});

/**
 * 获取文章评论列表
 * @param article_id 文章id
 * @returns {Promise<Model[]> | Promise.<Array.<Model>>}
 */
const getCommentsList = (article_id) => {
	const result = Comments.findAll({
		where: {
			article_id
		},
		order: [
			['comment_date', 'DESC']
		],
		include: [{
			model: User,
			as: 'User',
			attributes: ['user_name', 'photo']
		}, {
			model: CommentsReply,
			as: 'replys'
		}]
	});
	return result;
};

/**
 * 创建评论
 * @param data
 * @returns {Q.Promise<{status: string, message: any}>}
 */
const createComment = (data) => {
	let comment = Comments.create({
		...data
	}).then(comment => {
		return comment? Articles.findOne({
			where: {
				article_id: comment.article_id
			}
		}).then(article => {
			article.increment('article_comment_count');
			return getCommentsList(comment.article_id);
		}):	null;
	}).catch(e => ({status: 'error', message: e}));
	return comment;
}

/**
 * @param data.comment_id 评论id
 * @param data.user_id 用户id
 * @returns {Promise.<T>|Q.Promise<{status: string}>}
 */
const praiseComment = (data) => {
	console.log('praiseComment----model--->', data);
	let {comment_id, user_id} = data;
	let result = CommentsLike.create(
		{
			comment_id, user_id
		}
	).then(like => {
		console.log('praiseComment----model--like->', like);
		return Comments.findOne({
			where: {
				id: data.comment_id
			}
		}).then(comment => {
			return comment.increment('comment_like_count');
		});
	})
		.catch(e => ({status: 'error'}));
	return result;
}

/**  回复评论
 * @param data.comment_id 评论id
 * @param data.user_id 用户id
 * @returns {Promise.<T>|Q.Promise<{status: string}>}
 */
const replyComment = (data) => {
	let commentsReply = CommentsReply.create({
		...data
	}).then(commentR => ({status: 'ok', commentR}))
		.catch(e => ({status: 'error', message: e}));
	return commentsReply;
}

module.exports = {
	getCommentsList,
	createComment,
	praiseComment,
	replyComment
}
