const Op = require('sequelize').Op;
const db = require('../config/db.js');
const articles = '../schema/articles.js';
const user = '../schema/user.js';
const articleLike = '../schema/article_like.js';
const userFriends = '../schema/user_friends.js';
const searchRecord = '../schema/search_record.js';
const Article = db.import(articles);
const ArticleLike = db.import(articleLike);
const User = db.import(user);
const UserFriends = db.import(userFriends);
const SearchRecord = db.import(searchRecord);

//关联用户
Article.belongsTo(User, {
	as: 'User',
	foreignKey: 'user_id'
});
User.hasMany(Article, {
	as: 'Articles',
	foreignKey: 'user_id'
});

/**
 *  获取某个用户的全部articles
 * @param user_id 用户id
 * @returns {*}
 */
const getArticleList = (user_id) => {
	const articles = Article.findAll({
		where: {
			user_id
		},
		include: [{
			model: User,
			as: 'User',
			attributes: ['id', 'user_name', 'photo']
		}],
		order: [
			['article_date', 'DESC']
		]
	});
	return articles;
};

/**
 * 获取全部已发布文章
 * @returns {Promise<Model[]> | Promise.<Array.<Model>>}
 */
const getPublishArticleList = () => {
	const articles = Article.findAll({
		where: {
			status: 1
		},
		include: [{
			model: User,
			as: 'User',
			attributes: ['id', 'user_name', 'photo']
		}],
		order: [
			['article_date', 'DESC']
		]
	});
	return articles;
};

/**
 * 获取最热文章列表
 * @returns {Promise<Model[]> | Promise.<Array.<Model>>}
 */
const getHotArticleList = () => {
	const articles = Article.findAll({
		where: {
			status: 1
		},
		include: [{
			model: User,
			as: 'User',
			attributes: ['id', 'user_name', 'photo']
		}],
		order: [
			['article_views', 'DESC']
		]
	});
	return articles;
};

/**
 * 获取关注用户文章列表
 * @param id 用户id
 * @returns {Promise<Model[]> | Promise.<Array.<Model>>}
 */
const getFocusArticleList = (id) => {
	const articles = UserFriends.findAll({
		where: {
			user_id: id
		},
		attributes: ['user_friends_id'],
		raw: true
	}).then(friends => {
		let friendsId = [];
		friends.forEach((item) => {
			friendsId.push(item.user_friends_id);
		});
		return Article.findAll({
			where: {
				user_id: {
					[Op.or]: friendsId
				}
			},
			include: [{
				model: User,
				as: 'User',
				attributes: ['id', 'user_name', 'photo']
			}],
			order: [
				['article_date', 'DESC']
			]
		})
	});
	return articles;
};

/**
 * 创建/保存文章
 * @param data  文章内容
 * @returns {boolean}
 */
const createArticle = (data) => {
	let result;
	if (data.id) {
		result = Article.update(
			{
				article_title: data.title,
				article_content: data.content,
			},
			{
				where: {
					article_id: data.id
				}
			}
		).then(article => ({status: 'ok', article}))
			.catch(e => ({status: 'error', message: e}))
	} else {
		result = Article.create({
			...data
		}).then(article => ({status: 'ok', article}))
			.catch(e => ({status: 'error', message: e}));
	}
	return result;
}

/**
 * 删除文章
 * @param id  文章id
 * @returns {boolean}
 */
const removeArticle = (article_id) => {
	let result = Article.destroy({
		where: {
			article_id
		}
	}).then(result => ({status: 'ok'}))
		.catch(e => ({status: 'error', message: e}));
	return result;
}

/**
 * 修改文章
 * @param id  文章id
 * @param user_id  用户id
 * @param content 文章内容
 * @param status  文章状态
 * @returns {boolean}
 */
const updateArticle = (article_id, title, content) => {
	let result = Article.update(
		{
			article_title: title,
			article_content: content,
		},
		{
			where: {
				article_id
			}
		}
	)
	return result;
}

/**
 * 读取一篇文章
 * @param id  文章id
 * @returns {boolean}
 */
const readArticle = (article_id) => {
	let article = Article.findOne({
		where: {
			article_id
		},
		include: [{
			model: User,
			as: 'User',
			attributes: ['id', 'user_name', 'photo']
		}]
	});
	return article;
}

/**
 * 发布文章
 * @param article_id 文章id
 * @returns {Promise.<{status: string, article}>}
 */
const publishArticle = (article_id) => {
	let result = Article.update(
		{
			status: 1
		},
		{
			where: {
				article_id
			}
		}
	)
	return result;
}

/**
 * 喜欢文章
 * @param data.article_id 文章id
 * @param data.user_id 喜欢用户id
 * @returns {Promise<[number , Model[]]> | Promise.<Array.<number, number>>}
 */
const likeArticle = (data) => {
	let {article_id, user_id} = data;
	let result = ArticleLike.create(
		{
			article_id, user_id
		}
	).then(like => {
		return Article.findOne({where: {article_id}})
			.then(article => {
				return article.increment('article_like_count')
			});
	})
		.catch(e => ({status: 'error'}));
	return result;
};

/**
 * 取消喜欢文章
 * @param data.article_id 文章id
 * @param data.user_id 喜欢用户id
 * @returns {Promise<[number , Model[]]> | Promise.<Array.<number, number>>}
 */
const removeLike = (data) => {
	let {article_id, user_id} = data;
	let result = ArticleLike.destroy({
		where: {
			article_id, user_id
		}
	}).then(result => {
		return Article.findOne({where: {article_id}})
			.then(article => {
				return article.decrement('article_like_count')
			});
	})
		.catch(e => ({status: 'error'}));
	return result;
};

/**
 * 判断用户是否喜欢文章
 * @param data.article_id 文章id
 * @param data.user_id 喜欢用户id
 * @returns {Promise<[number , Model[]]> | Promise.<Array.<number, number>>}
 */
const isLike = (data) => {
	let {article_id, user_id} = data;
	let result = ArticleLike.findOne({
		where: {
			article_id, user_id
		}
	});
	return result;
};

/**
 * 查阅文章
 * @param article_id 文章id
 * @returns {Promise<[number , Model[]]> | Promise.<Array.<number, number>>}
 */
const consultArticle = (article_id) => {
	let result = Article.findByPk(article_id).then(article => {
		return article.increment('article_views', {by: 1})
	}).catch(e => ({status: 'error'}));
	return result;
};

/**
 * 搜索
 * @param keywords 关键字
 * @returns {Promise<[number , Model[]]> | Promise.<Array.<number, number>>}
 */
const search = (keywords) => {
	let result = Article.findAll({
		where: {
			[Op.or]: [
				{
					article_title: {
						[Op.like]: `%${keywords}%`
					}
				}, {
					article_content: {
						[Op.like]: `%${keywords}%`
					}
				}
			]
		},
		include: [{
			model: User,
			as: 'User',
			attributes: ['user_name', 'photo']
		}]
	});
	return result;
};

/**
 * 推荐阅读
 * @param userId 用户id
 * @returns {Promise<[number , Model[]]> | Promise.<Array.<number, number>>}
 */
const recommend = (id) => {
	let result = SearchRecord.findOne({
		where: {
			user_id: id
		},
		attributes: ['content'],
		order: [
			['time', 'DESC']
		],
		raw: true
	}).then(records => {
		return records ? Article.findAll({
			where: {
				[Op.or]: [
					{
						article_title: {
							[Op.like]: `%${records.content}%`
						}
					}, {
						article_content: {
							[Op.like]: `%${records.content}%`
						}
					}
				]
			},
			include: [{
				model: User,
				as: 'User',
				attributes: ['id', 'user_name', 'photo']
			}],
			order: [
				['article_date', 'DESC']
			]
		}) :
		[]
	});
	return result;
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
	search,
	recommend
}