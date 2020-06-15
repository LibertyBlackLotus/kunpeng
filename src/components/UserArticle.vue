<template>
    <Row class="articleList">
        <Tag>共{{userArticleList.length}} 篇文章</Tag>
        <i-col v-for="(item) in userArticleList" :key="item.article_id">
            <Card class="articleItem">
                <span class="articleItemTitle"
                      @click="toDetail(item.article_id, item.article_title)">
                    {{item.article_title}}
                </span>
                <div class="articleItemContent"
                     v-html="item.article_content" >
                    {{item.article_content}}
                </div>
                <div class="articleItemInfoContent">
                    <!--<span class="articleItemInfo articleItemInfoUser">
                        <img :src="item.User.photo? item.User.photo: require('../assets/avatar.png')"/>
                      </span>
                    <span class="articleItemInfo articleItemInfoUser">
                        {{ item.User.user_name }}
                      </span>-->
                    <span class="articleItemInfo">
                        <span class="articleItemInfoImg">
                            <img src="../assets/heart.png"/>
                        </span>
                          <span>
                              {{ item.article_like_count }}
                          </span>
                      </span>
                    <Tag color="blue" class="articleItemInfo">
                        发表于<Time :time="item.article_date"/>
                        {{ item.article_date | dateFormat }}
                      </Tag>
                    <span class="articleItemInfo">
                        共{{ item.article_comment_count }}条评论
                      </span>
                </div>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    import {openBlank} from '../utils/common';
	export default {
		props: {
			userId: [Number, String]  //个人主页用户id
        },

		data() {
			return {
				userArticleList: [],
			}
		},


		created: function () {
			this.getUserArticleList();   //获取用户文章列表
		},

		methods: {
			getUserArticleList() {
				this.$http.get('/api/articles/list/' + this.userId)
					.then((res) => {
						console.log('getUserArticleList: ', res);
						if (res.status == 200) {
							this.userArticleList = res.data;
						}
					});
			},

			//跳转至详情
			toDetail(id, title) {
				openBlank(this.$router, 'article_detail', {id, title});
			}

		}

	}
</script>

<style lang="stylus" scoped>
    .articleList

    .articleItem
        margin-top 1px

    .articleItemTitle
        font-size 16px
        font-weight 600
        color #00b4ff
        cursor pointer
    .articleItemTitle:hover
        text-decoration underline

    .articleItemContent
        max-height 200px
        overflow hidden

    .articleItemInfoContent
        margin-top 10px

    .articleItemInfo
        margin-left 20px
        font-size 12px
        color #b4b4b4

    .articleItemInfoUser
        cursor pointer

    .articleItemInfoUser img
        width 30px

    .articleItemInfoImg img
        width 10px

</style>
