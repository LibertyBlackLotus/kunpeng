import Vue from 'vue';
import Router from 'vue-router';
const Login = () => import('../components/Login.vue');
const LoginPhone = () => import('../components/LoginPhone.vue');
const Signup = () => import('../components/Signup.vue');
const Home = () => import('../components/Home.vue');
const MyPage = () => import('../components/MyPage.vue');
const Settings = () => import('../components/Settings.vue');
const Hot = () => import('../components/Hot.vue');
const Focus = () => import('../components/Focus.vue');
const Recent = () => import('../components/Recent.vue');
const NoteBook = () => import('../components/NoteBook.vue');
const ArticleDetail = () => import('../components/ArticleDetail.vue');
const SearchResult = () => import('../components/SearchResult.vue');

Vue.use(Router);

const routes = [
	/**
	 * 手机号注册/登录
	 */
	{
		path: '/loginPhone',
		name: 'loginPhone',
		title: '登录',
		component: LoginPhone
	},
	/**
	 * 用户名密码登录
	 */
	{
		path: '/login',
		name: 'login',
		title: '登录',
		component: Login
	},
	/**
	 * 用户名密码注册
	 */
	{
		path: '/signup',
		name: 'signup',
		title: '注册',
		component: Signup
	},
	/**
	 * 首页
	 */
	{
		path: '/home',
		name: 'home',
		title: '昆朋首页',
		component: Home
	},
	/**
	 * 个人主页
	 * * @param id 主页用户id
	 */
	{
		path: '/mypage/:id',
		name: 'mypage',
		title: '个人主页',
		props: true,
		component: MyPage
	},
	/**
	 * 设置
	 */
	{
		path: '/settings',
		name: 'settings',
		title: '设置',
		component: Settings
	},
	/**
	 * 写文章
	 */
	{
		path: '/notebook',
		name: 'notebook',
		title: '发表文章',
		component: NoteBook
	},
	/**
	 * 最热
	 */
	{
		path: '/hot',
		name: 'hot',
		title: '最热',
		component: Hot
	},
	/**
	 * 关注页
	 * * @param id 用户id
	 */
	{
		path: '/focus',
		name: 'focus',
		title: '关注',
		component: Focus
	},
	/**
	 * 文章详情
	 * @param id    文章id
	 * @param title 文章标题
	 */
	{
		path: '/article_detail/:id/:title',
		name: 'article_detail',
		title: '文章详情',
		props: true,
		component: ArticleDetail
	},
	/**
	 * 搜索结果
	 * @param keywords 搜索关键字
	 */
	{
		path: '/searchResult/:keywords',
		name: 'searchResult',
		title: '搜索结果',
		props: true,
		component: SearchResult
	},
	/**
	 * 最近浏览
	 */
	{
		path: '/recent',
		name: 'recent',
		component: Recent
	},
	/**
	 * 默认路径，如果路由没有匹配项则跳转至默认路径
	 */
	{
		path: '*',
		redirect: '/home'
	},
];

export default new Router({
	mode: 'history',                           //history 模式
	scrollBehavior(to, from, savedPosition) {  //跳转页面时恢复滚动位置
		if (savedPosition) {
			return savedPosition
		} else {
			return {x: 0, y: 0}
		}
	},
	base: __dirname,
	routes
});
