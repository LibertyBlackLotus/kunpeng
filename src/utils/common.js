/**
 * 获取用户信息
 * @returns {null}
 */
const getUserInfo = () => {
	let userInfo = JSON.parse(localStorage.getItem('userInfo'));
	return userInfo != null ? userInfo : null;
}

/**
 *
 * @returns string id
 */
const getUserId = () => {
	let userInfo = JSON.parse(localStorage.getItem('userInfo'));
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

var p = 0, t = 0;
var direction = '';
const scrollDirection = () => {
	window.addEventListener('scroll', function(){
		p = document.documentElement.scrollTop || document.body.scrollTop;
		console.log('ppp===>', p);
		if (t < p) {
			//向下滚
			direction =  'down';
		} else {
			//向上滚
			direction = 'up';
		}
		setTimeout(function() {
			t = p;
		}, 0);
		console.log('direction===>', direction);
	})
}

var i = 0;
var direction2 = '';
const scrollDirection2 = () => {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
		document.body.scrollTop
	var scroll = scrollTop - i;
	i = scrollTop;
	if(scroll < 0){
		console.log('up');
		direction2 = 'up';
	}else{
		console.log('down');
		direction2 = 'down';
	}
	console.log('--scrollDirection2-->', direction2 );
	return direction2;
}

module.exports = {
	getUserInfo,
	getUserId,
	openBlank,
	scrollDirection,
	scrollDirection2
}
