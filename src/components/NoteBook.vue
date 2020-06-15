<template>
    <div>
        <Row>
            <i-col span="4" class="nodeList">
                <Menu @on-select="menuSelected"
                         :active-name="actived" >
                    <MenuItem name="0">
                        <span>新建文章</span>
                        <i class="el-icon-edit"></i>
                    </MenuItem>
                    <MenuItem v-for="(item, i) in articleList"
                                  :key="i"
                                  :name="'' + item.article_id"
                                  >
                        {{ item.article_title }}
                        <Tag :color="item.status == 1? 'success': 'default'"
                             style="position: absolute; right: 0px; opacity: 0.7;">
                            {{item.status == 1? '已发布': '草稿'}}
                        </Tag>
                    </MenuItem>
                </Menu>
            </i-col>
            <i-col span="20">
                <Editor v-if="reFresh"
                        :saveArticle="saveArticle"
                        :updateArticle="updateArticle"
                        :publishArticle="publishArticle"
                        :removeArticle="removeArticle"
                        :articleId="articleId">
                </Editor>
            </i-col>
        </Row>
    </div>
</template>

<script>
	import {getUserId} from '../utils/common';
	import Editor from './NoteBookEditor.vue';
	import moment from 'moment';

	export default {
		components: {
			Editor
		},

		data() {
			return {
				actived: '0',
				userId: getUserId(),
				articleId: 0,
				articleList: [],
				reFresh: true
			}
		},

		mounted: function () {
			this.getArticleList();  //获取文章列表
		},

		methods: {
			menuSelected(name) {
				this.actived = name;
				this.articleId = parseInt(this.actived);
				this.reFresh = false;
				this.$nextTick(() => {
					this.reFresh = true;
				});
			},

			//获取用户文章列表
			getArticleList() {
				this.$http.get('/api/articles/list/' + this.userId)
					.then((res) => {
						console.log('getArticleList: ', res);
						if (res.status == 200) {
							this.articleList = res.data;
						}
					});
			},

			//新建/保存文章
			saveArticle(data) {
				if (data.title == 0) {
					this.$Message.warning({
						content: '请填写文章标题！'
					});
					return;
				}
				if (data.content == null) {
					this.$Message.warning({
						content: '请填写文章内容！'
					});
					return;
				}
				let params = {
					user_id: this.userId,
					article_title: data.title,
					article_content: data.content,
					status: 0,
					article_date: moment().format('YYYY-MM-DD HH:mm:ss'),
					article_views: 0,
					article_comment_count: 0,
					article_like_count: 0,
				};
				this.$http.post('/api/articles', params)
					.then(res => {
						this.articleId = res.data.article.article_id;
						if (res.status != 200 || !res.data || !res.data.status) {
							this.$Message.error({
								content: '保存失败！'
							});
							return;
						}
						this.getArticleList();  //获取文章列表
					});
			},

			//发布文章
			publishArticle(data) {
				let params = {
					article_id: data.article_id
				};
				this.$http.put('/api/articles/publish', params)
					.then(res => {
						if (res.status != 200) {
							this.$Message.error({
								content: '发布失败！'
							});
							return;
						}
						this.$Message.success({
							content: '发布成功！'
						});
						this.getArticleList();  //获取文章列表
					}).catch(e => {
					this.$Message.error({
						content: '发布失败！'
					});
				});
			},

			//删除文章
			removeArticle(data) {
				this.$http.delete('/api/articles', {data: data})
					.then(res => {
						if (res.status != 200 || !res.data || !res.data.status) {
							this.$Message.error({
								content: '删除失败！'
							});
							return;
						}
						this.$Message.success({
							content: '删除成功！'
						});
						this.actived = '0';
						this.getArticleList();  //获取文章列表
					});
			},

			//更新文章
			updateArticle(data) {
				let params = {
					article_id: data.id,
					article_title: data.title,
					article_content: data.content,
				};
				this.$http.put('/api/articles', params)
					.then(res => {
						if (res.status != 200 || !res.data) {
							this.$Message.error({
								content: '保存失败！'
							});
							return;
						}
						this.getArticleList();  //获取文章列表
					});
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .nodeList
        z-index 10000
        background-color #fff

    .nodeListRow
        width 200px !important
        margin-top 5px

    .el-menu-item
        border-bottom 1px solid #409EFF
        overflow hidden

</style>
