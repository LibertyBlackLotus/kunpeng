export const ARTICLE_LIST_HOT = '/api/articles/hot';          //获取最热文章列表
export const ARTICLE_LIST_LATEST = '/api/articles/publish';   //获取最热文章列表
export const ARTICLE_LIST_FOCUS = '/api/articles/focus/';     //获取关注用户文章列表
export const ARTICLE_DETAIL = '/api/articles/';       		  //获取文章详情
export const ARTICLE_SEARCH = '/api/articles/search/';        //搜索文章
export const ARTICLE_COMMENT = '/api/comments/list/';         //获取文章评论
export const COMMENT = '/api/comments';                       //文章评论
export const COMMENT_REPLY = '/api/comments/reply';           //评论回复
export const COMMENT_PRAISE = '/api/comments/praise';         //评论点赞
export const ARTICLE_IS_LIKE = '/api/articles/isLike';        //判断用户是否喜欢文章
export const ARTICLE_IS_COLLECT = '/api/collection/user/isCollected';  //判断用户是否收藏文章
export const ARTICLE_LIKE = '/api/articles/like';             //喜欢文章
export const ARTICLE_COLLECT = '/api/collection';             //收藏文章
export const USER_COLLECTION_LIST = '/api/collection/user/';  //用户收藏文章列表
export const ARTICLE_CONSULT = '/api/articles/consult';       //查阅文章

export const RECORD = '/api/readRecord';                 //浏览记录
export const SEARCH_RECORD = '/api/record/searchRecord';       //记录搜索内容
export const SEARCH_RECORD_USER = '/api/record/searchRecord/user/';  //获取用户搜索记录

export const USER_LOGIN = '/auth/userAuth';   //登录
export const USER = '/auth/user';             //用户
export const USER_LOGIN_PHONE = '/auth/loginPhone';   //手机登录
export const SMS_CODE = '/auth/user/sendSms'; //发送手机验证码