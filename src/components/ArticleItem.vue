<!-- 文章列表项 -->
<template>
    <Card class="articleItem">
        <span class="articleItemTitle"
              @click="toDetail(item.article_id, item.article_title)">
            {{item.article_title}}
        </span>
        <div class="articleItemContent">
            <code class="articleItemContentCode" v-html="item.article_content"></code>
        </div>

        <div class="articleItemInfoContent">
            <span class="articleItemInfo articleItemInfoUser"
                  @click="toUserMainPage(item.User.id)">
                    <img :src="item.User.photo? item.User.photo: require('../assets/avatar.png')"/>
                    <span class="articleItemInfoUserSpanHover">{{ item.User.user_name }}</span>
            </span>
            <span class="articleItemInfo">
                <Tag color="primary" type="border" fade>
                    {{item.article_views}} 次阅读
                </Tag>
                <span class="articleItemInfoImg">
                    <img src="../assets/heartHover.png"/>
                </span>
                <span>
                    {{ item.article_like_count }}
                </span>
            </span>
            <Tag class="articleItemInfo">
                发表于
                <Time :time="item.article_date"/>
                {{ item.article_date | dateFormat }}
            </Tag>
            <span class="articleItemInfo">
                共{{ item.article_comment_count }}条评论
            </span>
        </div>
    </Card>
</template>

<script>
	import {openBlank} from "../utils/common";

	export default {
		props: {
            item: Object,    //文章对象
		},

		methods: {
			//跳转至详情
			toDetail(id, title) {
				openBlank(this.$router, 'article_detail', {id, title});
			},

            //跳转至用户主页
			toUserMainPage(id) {
				openBlank(this.$router, 'mypage', {id});
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .articleItem
        margin-top 5px
        padding 10px
    .articleItemTitle
        font-size 18px
        font-weight 600
        color #000
        cursor pointer
    .articleItemTitle:hover
        text-decoration underline
    .articleItemContent
        max-height 200px
        overflow hidden
        text-overflow ellipsis
        white-space wrap
        margin-top 10px
    .articleItemInfoContent
        margin-top 10px
    .articleItemInfo
        margin-left 20px
        font-size 12px
        color #b4b4b4
    .articleItemInfoUser
        cursor pointer
        margin-left 0
        border 1px solid #f1f1f1
        padding 3px
        border-radius 2px
    .articleItemInfoUser:hover
        border 1px solid #b4b4b4
        color #b4b4b4
    .articleItemInfoUserSpan
        align-items center
    .articleItemInfoUserSpanHover
        font-size 13pt
        color #606266
    .articleItemInfoUser img
        width 30px
        border-radius 15px
    .articleItemInfoImg img
        width 10px
        margin-left 10px
</style>
