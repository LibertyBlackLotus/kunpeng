const Articles = require('../controllers/articles.js');
const Comments = require('../controllers/comments.js');
const SearchRecord = require('../controllers/searchRecord.js');
const UserFriends = require('../controllers/userFriends.js');
const ReadRecord = require('../controllers/readRecord.js');
const UserCollection = require('../controllers/userCollection.js');
const User = require('../controllers/user');
const router = require('koa-router')();
const upload = require("../models/upload");

router.get('/articles/list/:user_id', Articles.getArticleList);   //获取个人文章列表
router.get('/articles/publish', Articles.getPublishArticleList);  //获取全部已发布文章列表 最新
router.get('/articles/hot', Articles.getHotArticleList);          //获取最热文章列表
router.get('/articles/focus/:id', Articles.getFocusArticleList);  //获取关注用户文章列表
router.get('/articles/:id', Articles.readArticle);                //读取文章
router.post('/articles', Articles.createArticle);                 //创建/保存文章
router.delete('/articles', Articles.removeArticle);               //删除文章
router.put('/articles', Articles.updateArticle);                  //更新文章
router.put('/articles/publish', Articles.publishArticle);         //发布文章
router.post('/articles/like', Articles.likeArticle);              //喜欢文章
router.delete('/articles/like', Articles.removeLike);             //取消喜欢文章
router.post('/articles/isLike', Articles.isLike);                 //判断用户是否喜欢文章
router.post('/articles/consult', Articles.consultArticle);        //查阅文章
router.post('/articles/uploadImg', upload.single('img'), Articles.uploadImg); //博客图片上传
router.get('/articles/search/:keywords', Articles.search);        //搜索
router.get('/articles/recommend/:id', Articles.recommend);        //推荐阅读

router.post('/record/searchRecord', SearchRecord.createSearchRecord);               //添加搜索记录
router.get('/record/searchRecord/:user_id', SearchRecord.getSearchRecord);          //获取一条搜索记录
router.delete('/record/searchRecord/:record_id', SearchRecord.removeRecord);        //删除一条搜索记录
router.delete('/record/searchRecord', SearchRecord.removeRecordAll);                //清空用户搜索记录
router.get('/record/searchRecord/user/:user_id', SearchRecord.getUserSearchRecord); //获取用户搜索记录

router.get('/comments/list/:id', Comments.getCommentsList);       //获取文章评论列表
router.post('/comments', Comments.createComment);                 //添加评论
router.post('/comments/praise', Comments.praiseComment);          //评论点赞
router.post('/comments/reply', Comments.replyComment);            //评论回复

router.post('/uploadAvatar', User.saveAvatar);                    //用户上传头像

router.post('/friends', UserFriends.focusUser);                   //关注用户
router.get('/friends', UserFriends.getFriendsList);               //获取所有关注用户
router.delete('/friends/removeFocus', UserFriends.removeFocus);   //取消关注
router.post('/friends/checkFocus', UserFriends.checkFocus);       //检测是否关注

router.post('/readRecord', ReadRecord.createReadRecord);               //添加一条阅读记录
router.get('/readRecord/:record_id', ReadRecord.getReadRecord);        //获取一条阅读记录
router.delete('/readRecord/:record_id', ReadRecord.removeReadRecord);  //删除一条阅读记录
router.delete('/readRecord', ReadRecord.removeReadRecordAll);          //清空用户阅读记录
router.get('/readRecord/user/:user_id', ReadRecord.getUserReadRecord); //获取用户阅读记录

router.post('/collection', UserCollection.createCollection);               //添加收藏
router.delete('/collection/:id', UserCollection.removeCollection);         //取消收藏
router.delete('/collection', UserCollection.removeCollectionAll);          //清空用户收藏
router.get('/collection/user/:user_id', UserCollection.getUserCollection); //获取用户收藏
router.post('/collection/user/isCollected', UserCollection.isCollected);   //判断用户是否收藏



module.exports = router;
