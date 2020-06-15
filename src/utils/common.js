/**
 * 获取用户信息
 * @returns {null}
 */
const getUserInfo = () => {
	let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	return userInfo != null ? userInfo : null;
}

/**
 *
 * @returns string id
 */
const getUserId = () => {
	let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	return userInfo != null ? userInfo.id : '';
};

/**
 * 打开新页面
 * @param router 路由对象
 * @param name   路由地址
 * @param params 传递参数
 */
const openBlank = (router, name, params = {}) => {
	const {href} = router.resolve({	name, params });
	window.open(href, '_blank');
};

module.exports = {
	getUserInfo,
	getUserId,
	openBlank
}
