<!-- 推荐阅读 -->
<template>
    <div class="articleList" v-if="recommendList.length > 0">
        <Tag class="recommendTag">推荐阅读</Tag>
        <Row v-for="item in recommendList"
             :key="item.article_id">
            <Card class="articleItem">
                <span class="articleItemTitle"
                      @click="toDetail(item.article_id, item.article_title)">
                    {{item.article_title}}
                </span>
                <div class="articleItemContent"
                     v-html="item.article_content"  >
                    {{item.article_content}}
                </div>
                <div class="articleItemInfoContent">
                    <span class="articleItemInfo articleItemInfoUser"
                          @click="toUserMainPage(item.User.id)">
                        <img :src="item.User.photo" />
                      </span>
                      <span class="articleItemInfo articleItemInfoUser"
                            @click="toUserMainPage(item.User.id)">
                        {{ item.User.user_name }}
                      </span>
                    <span class="articleItemInfo">
                        <span class="articleItemInfoImg">
                            <img src="../assets/heart.png"/>
                        </span>
                          <span>
                              {{ item.article_like_count }}
                          </span>
                      </span>
                    <span class="articleItemInfo">
                        {{ item.article_date | dateFormatDay }}
                      </span>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
    import {openBlank} from '../utils/common';
	export default {
		props: {
		    userId: [Number, String] //用户id
        },

		data() {
			return {
				recommendList: [],    //推荐阅读列表
			}
		},

		created: function () {
			this.getRecommendList();  // 获取文章列表
		},

		methods: {
			// 获取文章列表
			getRecommendList() {
				this.$http.get('/api/articles/recommend/' + this.userId)
					.then((res) => {
						console.log('getRecommendList: ', res);
						if (res.status == 200) {
							this.recommendList = res.data;
						}
					});
			},

			//跳转至详情
			toDetail(id, title) {
				openBlank(this.$router, 'article_detail', {id, title});
			},

			//跳转至用户主页
			toUserMainPage(id) {
				const {href} = this.$router.resolve({
					name: 'mypage',
					params: {id}
				});
				window.open(href, '_blank');
			},

		}

	}
</script>

<style lang="stylus" scoped>
    .articleList
    .articleItem
        margin-top 5px
    .recommendTag
        width 100%
        margin-bottom 25px
    .articleItemTitle
        font-size 16px
        font-weight 600
        color #00b4ff
        cursor pointer
    .articleItemTitle:hover
        text-decoration underline

    .articleItemContent
        max-height 50px
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
