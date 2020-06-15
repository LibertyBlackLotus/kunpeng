<!--评论组件-->
<template>
    <div class="container" v-if="comments.length > 0">
        <Tag>{{comments.length}} 条评论</Tag>
        <div class="comment" v-for="item in comments" :key="item.id">
            <div class="info">
                <img class="avatar" :src="item.User && item.User.photo" width="36" height="36"/>
                <div class="right">
                    <div class="name">{{item.User && item.User.user_name}}</div>
                    <div class="date">{{item.comment_date | dateFormat}}</div>
                </div>
            </div>
            <div class="content">{{item.comment_content}}</div>
            <div class="control">
                <span class="like" @click="likeClick(item)">
                    <i class="el-icon-thumb"> </i>
                    <span class="like-num"> {{item.comment_like_count > 0 ? item.comment_like_count + '人赞' : '赞'}}</span>
                </span>
                <span class="comment-reply" @click="showReplyInput(item)">
                    <i class="iconfont icon-comment"></i>
                    <span>回复</span>
                </span>
            </div>

            <div class="reply">
                <Tag v-if="item.replys && item.replys.length > 0">{{item.replys && item.replys.length}} 条回复</Tag>
                <div class="item" v-for="reply in item.replys" :key="reply.id">
                    <div class="reply-content">
                        <!--<span class="from-name">{{reply.fromName}}</span><span>: </span>-->
                        <!--<span class="to-name">@{{reply.toName}}</span>-->
                        <span>{{reply.content}}</span>
                    </div>
                    <div class="reply-bottom">
                        <span>{{reply.reply_date | dateFormat}}</span>
                        <!--<span class="reply-text" @click="showReplyInput(item)">-->
                    <!--<i class="iconfont icon-comment"></i>-->
                        <!--<span>回复</span>-->
                    <!--</span>-->
                    </div>
                </div>

                <transition name="fade">
                    <div class="input-wrapper" v-if="showItemId === item.id">
                        <Input  class="gray-bg-input"
                                  v-model="inputReply"
                                  type="textarea"
                                  :rows="3"
                                  autofocus
                                  placeholder="写下你的回复" />
                        <div class="btn-control">
                            <Button class="cancel" @click="cancel">取消</Button>
                            <Button type="primary" @click="commitReplySure(item)">确定</Button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUserId} from '../utils/common';
    import {mapState, mapActions} from 'vuex';
	import moment from 'moment';
	export default {
		props: {
            id: [String, Number]     //文章id
		},

		data() {
			return {
				inputReply: '',
				showItemId: ''
			}
		},

        computed: {
            ...mapState({
				comments: state => state.comments.comments,  //文章评论
            })
        },

		mounted() {
			this.getComments({id: this.id});      //获取评论
		},

		methods: {
            ...mapActions([
				'getComments',      //获取文章评论
				'commitReply',      //提交回复
				'likeComment',      //评论点赞
            ]),

			// 提交回复
			commitReplySure(item) {
				this.commitReplyMethod(item.id, this.inputReply);
			},

			commitReplyMethod(comment_id = 0, content = '', parent_id = 0) {
				let params = {
					comment_id,
					user_id: getUserId(),
					content,
					reply_date: moment().format('YYYY-MM-DD HH:mm:ss'),
					parent_id
				};
				this.commitReply(params).then(res => {
					this.showBox = false;
					this.inputReply = '';
					this.showItemId = '';
					this.getComments({id: this.id});      //获取评论
                });

			},

			//评论点赞
			likeClick(comment) {
				let params = {
					comment_id: comment.id,
					user_id: getUserId()
				};
				this.likeComment(params).then(res => {
					this.getComments({id: this.id});      //获取评论
                });
			},

			/**
			 * 点击回复
			 * item: 当前大评论
			 * reply: 当前回复的评论
			 */
			showReplyInput(item) {
				this.showItemId = item.id;
			},

			// 取消按钮
			cancel() {
				this.showItemId = ''
			},

		}

	}
</script>

<style lang="scss">
    @import "../assets/scss/index.scss";

    .container {
        padding: 0 10px;
        box-sizing: border-box;
        .comment {
            display: flex;
            flex-direction: column;
            padding: 10px;
            border-bottom: 1px solid $border-fourth;
            .info {
                display: flex;
                align-items: center;
                .avatar {
                    border-radius: 50%;
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                    .name {
                        font-size: 16px;
                        color: $text-main;
                        margin-bottom: 5px;
                        font-weight: 500;
                    }
                    .date {
                        font-size: 12px;
                        color: $text-minor;
                    }
                }
            }
            .content {
                font-size: 16px;
                color: $text-main;
                line-height: 20px;
                padding: 10px 0;
            }
            .control {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: $text-minor;
                .like {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    cursor: pointer;
                    &.active, &:hover {
                        color: $color-main;
                    }
                    .iconfont {
                        font-size: 14px;
                        margin-right: 5px;
                    }
                }
                .comment-reply {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    &:hover {
                        color: $text-333;
                    }
                    .iconfont {
                        font-size: 16px;
                        margin-right: 5px;
                    }
                }

            }
            .reply {
                margin: 10px 0;
                border-left: 2px solid $color-main;
                padding-left: 2px;
                .item {
                    margin: 0 10px;
                    padding: 10px 0;
                    border-bottom: 1px dashed $border-third;
                    .reply-content {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        color: $text-normal;
                        .from-name {
                            color: $color-main;
                        }
                        .to-name {
                            color: $color-main;
                            margin-left: 5px;
                            margin-right: 5px;
                        }
                    }
                    .reply-bottom {
                        display: flex;
                        align-items: center;
                        margin-top: 6px;
                        font-size: 12px;
                        color: $text-minor;
                        .reply-text {
                            display: flex;
                            align-items: center;
                            margin-left: 10px;
                            cursor: pointer;
                            &:hover {
                                color: $text-333;
                            }
                            .icon-comment {
                                margin-right: 5px;
                            }
                        }
                    }
                }
                .write-reply {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: $text-minor;
                    padding: 10px;
                    cursor: pointer;
                    &:hover {
                        color: $text-main;
                    }
                    .el-icon-edit {
                        margin-right: 5px;
                    }
                }
                .fade-enter-active, fade-leave-active {
                    transition: opacity 0.5s;
                }
                .fade-enter, .fade-leave-to {
                    opacity: 0;
                }
                .input-wrapper {
                    padding: 10px;
                    .gray-bg-input, .el-input__inner {
                        /*background-color: #67C23A;*/
                    }
                    .btn-control {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        padding-top: 10px;
                        .cancel {
                            margin-right: 20px;
                            cursor: pointer;
                            &:hover {
                                color: $text-333;
                            }
                        }
                        .confirm {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }


</style>
