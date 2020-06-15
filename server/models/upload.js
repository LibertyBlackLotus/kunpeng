const multer = require('koa-multer');
const path = require("path");
// const destPath = path.join(__dirname, "public/uploads/");
//配置
var storage = multer.diskStorage({
	//文件保存路径
	destination: path.resolve("public/uploads/"),
	//修改文件名称
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
		cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});

//加载配置
var upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 2 // 限制2M
	}
});

module.exports = upload;