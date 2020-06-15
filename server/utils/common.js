/**
 * 生成短信验证码
 */
const smsCodeLetter = () => {
	var codes = [];
	//数字:48-57;unicode编码
	for (var i = 48; i < 57; codes.push(i), i++) ;
	/*console.log(codes);*/
	//大写字母:65-90;unicode编码
	for (var i = 60; i < 90; codes.push(i), i++) ;
	//小写字母:97-122;unicode编码
	for (var i = 97; i < 122; codes.push(i), i++) ;
	var arr = [];
	for (var i = 0; i < 4; i++) {   //从0-61之间取随机数
		var index = Math.floor(Math.random() * (61 - 0 + 1) + 0);
		var char = String.fromCharCode(codes[index]);
		arr.push(char);
	}
	/*console.log(arr);*/
	var code = arr.join("");
	return code;
}

const smsCode = () => {
	var num = "";
	for (var i = 0; i < 4; i++) {
		num += Math.floor(Math.random() * 10);
	};
	return parseInt(num);
}


module.exports = {
	smsCode
}