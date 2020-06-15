const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger');
const app = new Koa();
const router = new Router();
const path = require('path');
const cors = require('koa2-cors');
const serve = require('koa-static');
const historyApiFallback = require('koa-history-api-fallback');
const jwt = require('koa-jwt');
// const session = require('koa-generic-session');
// const redisStore = require('koa-redis');
const auth = require('./server/routes/auth.js');
const api = require('./server/routes/api.js');

const {SERVER_URL, SERVER_API_PORT, SERVER_COR} = require('./server/config/server');
app.use(bodyParser());
app.use(json());
app.use(logger());
// app.keys = ['key', 'keys'];
// app.use(session({
// 	store: redisStore({
// 		// Options specified here
// 	})
// }));
app.use(async (ctx, next) => {  //JWT 验证处理
	try {
		await next();
	} catch (err) {
		if (401 == err.status) {
			ctx.status = 401;
			ctx.body = {
				success: false,
				token: null,
				info: 'Protected resource, use Authorization header to get access'
			};
		} else {
			throw err;
		}
	}
});

app.use(serve(path.join(__dirname, '/public')));

app.on('error', (err, ctx) => {
	console.log('server error', err);
});

app.use(cors({
	origin: function (ctx) {
		// return 'http://localhost:8081';
		// return 'http://39.100.152.216:80';
		return SERVER_COR;
		// return '*';
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(jwt({ secret: 'lin' }).unless({  //jwt验证, 并跳过指定api
	path: [
		/^\/auth/,
		'/api/articles/uploadImg',
		'/api/articles/publish',
		'/api/articles/hot',
		/^\/api\/articles\/focus/,
		'/api/articles/isLike',
		'/api/articles/consult',
		/^\/api\/articles\/recommend/,
		'/api/readRecord',
		'/api/collection/user/isCollected',
		/^\/api\/comments\/list/,
		/^\/api\/articles/,
		'/api/uploadAvatar'
	]
}));


router.use('/auth', auth.routes());
router.use('/api', api.routes());

app.use(router.routes());
app.use(historyApiFallback());        // 处理刷新页面404,一定要加在静态文件的serve之前，否则会失效。
// app.use(serve(path.resolve('dist'))); // 用pm2部署，前后端用一个服务端口时将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(SERVER_API_PORT, () => {
	console.log(`Koa is listening in ${SERVER_API_PORT}`);
});
module.exports = app;


