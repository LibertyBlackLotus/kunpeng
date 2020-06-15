<!-- 用户收藏的文章 -->
<template>
    <Row class="articleList">
        <Tag>共收藏 {{userCollectionList.length}} 篇文章</Tag>
        <i-col v-for="(item) in userCollectionList" :key="item.id">
            <Card class="articleItem">
                <span class="articleItemTitle"
                      @click="toDetail(item.article_id, item.article.article_title)">
                    {{item.article && item.article.article_title}}

                </span>
                <Tag color="gold"
                     style="float: right;">
                    收藏于<Time :time="item.time"/>&nbsp;&nbsp;
                    {{item.time | dateFormat}}
                </Tag>
                <div class="articleItemContent"
                     v-html="item.article && item.article.article_content">
                    {{item.article && item.article_content}}
                </div>
                <div class="articleItemInfoContent">
                    <span class="articleItemInfo articleItemInfoUser">
                        <img :src="item.User && item.User.photo"/>
                      </span>
                    <span class="articleItemInfo articleItemInfoUser">
                        {{ item.User && item.User.user_name }}
                      </span>
                    <span class="articleItemInfo">
                        <span class="articleItemInfoImg">
                            <img src="../assets/heart.png"/>
                        </span>
                          <span>
                              {{ item.article && item.article.article_like_count }}
                          </span>
                        <Tag class="articleItemInfo">
                            {{ item.article && item.article.article_date | dateFormat }}
                        </Tag>
                    </span>
                    <Button type="text" size="small" @click="removeCollection({id: item.id})">取消收藏</Button>
                </div>
            </Card>
        </i-col>
    </Row>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import {openBlank} from '../utils/common';

	export default {
		props: {
			userId: [Number, String]  //个人主页用户id
		},

		computed: {
			...mapState({
				userCollectionList: state => state.article.userCollectionList  //用户收藏列表
			})
		},

		mounted: function () {
			this.getUserCollectionList({id: this.userId});   //获取用户收藏列表
		},

		methods: {
			...mapActions([
				'getUserCollectionList',  //获取用户收藏列表
				'removeCollection'        //取消收藏
			]),

			//跳转至详情
			toDetail(id, title) {
				openBlank(this.$router, 'article_detail', {id, title});
			}
		}
	}
</script>

<style lang="stylus" scoped>
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
