<!-- 文章详情 -->
<template>
    <div>
        <BackToTop></BackToTop>
        <!-- 头部 -->
        <Header></Header>

        <div class="loading" v-if="loading">
            <Spin size="large"></Spin>
        </div>

        <transition appear
                    appear-class="custom-appear-class"
                    appear-active-class="custom-appear-active-class">
            <div class="articleDetail">
            <!-- 文章详情 -->
                <div class="content">
                    <!-- 文章标题 -->
                    <Row class="articleTitle">
                        {{article.article_title}}
                    </Row>

                    <!-- 文章信息 -->
                    <Row class="articleContent">
                        <i-col span="1" class="articleAvatar">
                            <img :src="article.User && article.User.photo?article.User.photo: require('../assets/avatar.png')" />
                        </i-col>
                        <i-col span="12">
                            <div class="articleInfoUser">
                            <span>
                                {{article.User && article.User.user_name}}
                                <!-- <span v-if="userId != article.User.id">
                                     <Button type="primary"
                                             size="small"
                                             v-if="!isFocus"
                                             @click="focusUser">
                                          关注
                                     </Button>
                                     <Button type="success"
                                             size="small"
                                             v-if="isFocus"
                                             @click="removeFocus">
                                         已关注
                                     </Button>
                                 </span>-->
                            </span>
                            </div>
                            <div class="articleInfo">
                                <span>{{article.article_date | dateFormat}} &nbsp;&nbsp;</span>
                                <span>阅读 {{article.article_views}}</span>
                            </div>
                        </i-col>
                    </Row>

                    <!-- 文章内容 -->
                    <EditorShow :content="article.article_content"></EditorShow>

                    <Row v-if="article">
                        <i-col span="2">
                        <span v-if="!isLike">
                            <img src="../assets/heart.png"
                                 @click="like({user_id: userId, article_id: id})"
                                 class="articleLike"/>
                        </span>
                            <span v-if="isLike">
                            <img src="../assets/heartHover.png"
                                 @click="removeLike({user_id: userId, article_id: id})"
                                 class="articleLike"/>
                        </span>
                        </i-col>
                        <i-col span="2">
                            {{article && article.article_like_count}} 人喜欢
                        </i-col>
                        <i-col span="2">
                        <span v-if="!isCollected">
                            <span class="collect"  @click="addCollect">收藏</span>
                        </span>
                            <span v-if="isCollected">
                            <Tag color="gold">已收藏</Tag>
                        </span>
                        </i-col>
                    </Row>
                </div>
                <!-- 评论 -->
                <Comment :id="id"></Comment>
            </div>
        </transition>

        <!--  底部添加评论 -->
        <div class="commentsPanel">
            <div class="write-reply" v-if="!showBox">
                <span @click="showCommentBox">
                    <Input placeholder="添加新评论" />
                </span>
            </div>
            <transition>
                <div class="input-wrapper" v-if="showBox">
                    <Input class="gray-bg-input"
                              v-model="inputReply"
                              type="textarea"
                              :rows="3"
                              placeholder="写下你的评论" />
                    <div class="btn-control">
                        <Button size="small" style="margin-right: 10px;" @click="cancelCommentInput">取消</Button >
                        <Button size="small" type="primary" @click="commitCommentMethod(inputReply)">确定</Button >
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
	import Header from './Header.vue';
	import Comment from './Comment.vue';
	import moment from 'moment';
    import {mapState, mapActions} from 'vuex';
	import userMixin from '../mixins/user';
    import EditorShow from './NoteBookEditorShow.vue';
	import BackToTop from './BackToTop.vue';

	export default {
		mixins: [userMixin],
		props: {
			id: [String, Number],  //文章id
			title: String,         //文章标题
		},

		components: {
			Header,
			Comment,
			EditorShow,
			BackToTop
		},

		data() {
			return {
				inputReply: '',           //回复内容
				userId: this.getUserId(), //用户id
				showBox: false,           //是否显示评论框
				isFocus: false,           //是否关注了
				loading: true
			}
		},

        computed: {
            ...mapState({
				article: state => state.article.article,          //文章详情
				isLike: state => state.article.isLike,            //是否喜欢了文章
				isCollected: state => state.article.isCollected,  //是否收藏了文章
            })
        },

		mounted() {
			this.getArticleDetail({id: this.id}).then(res => { //获取文章详情
				this.loading = false;
            });
			this.consult({article_id: this.id});  //查阅文章
            this.addRecord();	                  //添加阅读记录
		},

		methods: {
            ...mapActions([
                'getArticleDetail', //获取文章详情
                'like',             //喜欢文章
                'removeLike',       //取消喜欢文章
                'addCollection',    //收藏文章
                'consult',          //查阅文章
                'addReadRecord',    //添加阅读记录
                'commitComment',    //提交评论
            ]),

			//添加阅读记录
			addRecord(){
				let params = {
					user_id: this.userId,
					article_id: this.id,
					time: moment().format('YYYY-MM-DD HH:mm:ss')
				};
				this.addReadRecord(params); //添加阅读记录
            },

			//添加收藏
			addCollect() {
				let params = {
					article_id: this.id,
					user_id: this.userId,
					time: moment().format('YYYY-MM-DD HH:mm:ss')
				};
            	this.addCollection(params);
			},

			//提交评论
			commitCommentMethod(comment_content = '') {
				let params = {
					user_id: this.userId,
					article_id: this.id,
					comment_content,
					comment_like_count: 0,
					comment_date: moment().format('YYYY-MM-DD HH:mm:ss')
				};

				this.commitComment(params).then(res => {
					this.inputReply = '';
					this.showBox = false;
                });
//				this.commitComment(params);
//				this.inputReply = '';
//				this.showBox = false;
			},

			//显示评论框
			showCommentBox() {
				this.showBox = true;
			},

			//取消评论输入
			cancelCommentInput() {
				this.showBox = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
    .articleDetail{
        width: 1080px;
        margin: 0 auto;
        padding-bottom: 60px;
    }
    .loading{
        width: 1080px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content{
        margin-top: 10px;
    }
    .articleContent{
        margin-top: 15px;
    }
    .articleTitle{
        font-size: 25px;
        font-weight: 700;
        color: #00b4ff;
    }
    .articleAvatar img{
        width: 30px;
    }
    .articleInfoUser{
        font-size: 13pt;
    }
    .articleInfo{
        font-size: 8pt;
    }
    .articleLike{
        cursor: pointer;
    }
    .comments{
        width: 910px;
        margin-top: 5px;
    }
    .commentsPanel{
        position: fixed;
        bottom: 0;
        width: 100%;
        line-height: 50px;
        background-color: #fff;
        border-top: 1px solid #d5d8dc;
        padding-top: 3px;
    }
    .write-reply{
        width: 30%;
        margin: 0 auto;
    }
    .input-wrapper{
        width: 30%;
        margin: 0 auto;
    }
    .collect{
        cursor: pointer;
    }
    .collect:hover{
        text-decoration: underline;
    }
    .custom-appear-class{
        opacity: 0;
        /*width: 1000px;*/
        margin-top: -200px;
    }
    .custom-appear-active-class{
        transition: all .5s;
    }


</style>
