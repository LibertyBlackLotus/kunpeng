const Articles = require('../models/articles.js');

/**
 * 获取用户全部articles
 * @param ctx
 * @returns {Promise.<void>}
 */
const getArticleList = async (ctx) => {
	const user_id = ctx.params.user_id;
	let articleList = await Articles.getArticleList(user_id);
	ctx.body = articleList;
}

/**
 * 获取全部已发布文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const getPublishArticleList = async (ctx) => {
	let articleList = await Articles.getPublishArticleList();
	ctx.body = articleList;
};

/**
 * 获取最热文章列表
 * @param ctx
 * @returns {Promise.<void>}
 */
const getHotArticleList = async (ctx) => {
	let articleList = await Articles.getHotArticleList();
	ctx.body = articleList;
};

/**
 * 获取关注用户文章列表
 * @param ctx
 * @returns {Promise.<void>}
 */
const getFocusArticleList = async (ctx) => {
	let id = ctx.params.id;
	let articleList = await Articles.getFocusArticleList(id);
	ctx.body = articleList;
};

/**
 * 创建/保存文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const createArticle = async (ctx) => {
	const data = ctx.request.body;
	const result = await Articles.createArticle(data);
	if (result.status == 'ok') {
		ctx.body = {
			status: true,
			article: result.article
		}
	} else {
		ctx.body = {
			status: false,
			message: result.message
		};
	}
}

/**
 * 删除文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeArticle = async (ctx) => {
	let data = ctx.request.body;
	let result = await Articles.removeArticle(data.article_id);
	if (result.status == 'ok') {
		ctx.body = {
			status: true
		}
	} else {
		ctx.body = {
			status: false,
			message: result.message
		};
	}
}

/**
 * 更新文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const updateArticle = async (ctx) => {
	let data = ctx.request.body;
	let article_id = data.article_id;
	let title = data.article_title;
	let content = data.article_content;
	let result = await Articles.updateArticle(article_id, title, content);
	ctx.body = result;
}

/**
 * 读取一篇文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const readArticle = async (ctx) => {
	let article_id = ctx.params.id;
	let article = await Articles.readArticle(article_id);
	ctx.body = article;
}

/**
 * 发布文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const publishArticle = async (ctx) => {
	let data = ctx.request.body;
	let article_id = data.article_id;
	let result = await Articles.publishArticle(article_id);
	ctx.body = result;
}

/**
 * 喜欢文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const likeArticle = async (ctx) => {
	let data = ctx.request.body;
	let result = await Articles.likeArticle(data);
	let status = result !== null;
	ctx.body = status;
};

/**
 * 取消喜欢文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeLike = async (ctx) => {
	let data = ctx.request.body;
	let result = await Articles.removeLike(data);
	let status = result !== null;
	ctx.body = status;
};

/**
 * 判断用户是否喜欢文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const isLike = async (ctx) => {
	let data = ctx.request.body;
	let result = await Articles.isLike(data);
	let status = result !== null;
	ctx.body = status;
};

/**
 * 查阅文章
 * @param ctx
 * @returns {Promise.<void>}
 */
const consultArticle = async (ctx) => {
	let data = ctx.request.body;
	let article_id = data.article_id;
	let result = await Articles.consultArticle(article_id);
	let status = result !== null;
	ctx.body = {status};
}

/**
 * 上传博客图片
 * @param ctx
 * @returns {Promise.<void>}
 */
const uploadImg = async (ctx) => {
	ctx.body = {
		info: ctx.req.file.filename
	}
};

/**
 * 搜索
 * @param ctx
 * @returns {Promise.<void>}
 */
const search = async (ctx) => {
	let keywords = ctx.params.keywords;
	let result = await Articles.search(keywords);
	ctx.body = result;
};

/**
 * 推荐阅读
 * @param ctx
 * @returns {Promise.<void>}
 */
const recommend = async (ctx) => {
	let userId = ctx.params.id;
	let result = await Articles.recommend(userId);
	ctx.body = result;
};

module.exports = {
	getArticleList,
	getPublishArticleList,
	getHotArticleList,
	getFocusArticleList,
	createArticle,
	removeArticle,
	updateArticle,
	readArticle,
	publishArticle,
	likeArticle,
	removeLike,
	isLike,
	consultArticle,
	uploadImg,
	search,
	recommend
}
