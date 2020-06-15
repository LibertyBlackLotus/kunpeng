const UserFriends = require('../models/userFriends');

/**
 * 关注用户
 * @param ctx
 * @returns {Promise.<void>}
 */
const focusUser = async (ctx) => {
	const data = ctx.request.body;
	const result = await UserFriends.focusUser(data);
	if (result.status == 'ok') {
		ctx.body = {
			status: true,
			result
		}
	} else {
		ctx.body = {
			status: false,
			message: result.message
		};
	}
};

/**
 * 获取所有关注用户
 * @param ctx
 * @returns {Promise.<void>}
 */
const getFriendsList = async (ctx) => {
	const user_id = ctx.params.user_id;
	let friends = await UserFriends.getFriendsList(user_id);
	ctx.body = friends;
};

/**
 * 取消关注
 * @param ctx
 * @returns {Promise.<void>}
 */
const removeFocus = async (ctx) => {
	let data = ctx.request.body;
	let result = await UserFriends.removeFocus(data);
	ctx.body = result;
};

/**
 * 检测是否关注
 * @param ctx
 * @returns {Promise.<void>}
 */
const checkFocus = async (ctx) => {
	let data = ctx.request.body;
	let result = await UserFriends.checkFocus(data);
	if(result == null){
		ctx.body = false;
	}else{
		ctx.body = true;
	}
};


module.exports = {
	focusUser,
	getFriendsList,
	removeFocus,
	checkFocus
};
