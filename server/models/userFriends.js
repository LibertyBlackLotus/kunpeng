const db = require('../config/db.js');
const user_friends = '../schema/user_friends.js';
const UserFriends = db.import(user_friends);

/**
 * 关注用户
 * @param data.user_id  用户id
 * @param data.user_friends_id 关注的用户id
 * @param data.focus_time 关注时间
 * @returns {boolean}
 */
const focusUser = (data) => {
	let result = UserFriends.create({
		...data
	}).then(record => ({status: 'ok', record}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

/**
 *  获取所有关注用户
 * @param user_id 用户id
 * @returns {*}
 */
const getFriendsList = (user_id) => {
	const records = UserFriends.findAll({
		where: {
			user_id
		},
		order: [
			['focus_time', 'DESC']
		]
	});
	return records;
};

/**
 *  取消关注
 * @param data.user_id   当前登录用户id
 * @param data.user_friends_id  关注用户id
 * @returns {*}
 */
const removeFocus = (data) => {
	let {user_id, user_friends_id} = data;
	let result = UserFriends.destroy({
		where: {
			user_id, user_friends_id
		}
	}).then(result => ({status: 'ok'}))
		.catch(e => ({status: 'error', message: e}));
	return result;
};

/**
 *  检测是否关注
 * @param data.user_id   当前登录用户id
 * @param data.user_friends_id  关注用户id
 * @returns {*}
 */
const checkFocus = (data) => {
	let {user_id, user_friends_id} = data;
	let result = UserFriends.findOne({
		where: {
			user_id, user_friends_id
		}
	});
	return result;
};

module.exports = {
	focusUser,
	getFriendsList,
	removeFocus,
	checkFocus
};