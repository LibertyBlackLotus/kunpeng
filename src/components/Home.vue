<template>
    <div>
        <BackToTop></BackToTop>
        <Header></Header>
        <Row class="homeContent">
            <i-col span="16">
                <vue-tabs @tab-change="handleTabChange"
                          active-tab-color="#409EFF"
                          active-text-color="white">
                    <v-tab v-for="item in tabList"
                           :key="item.id"
                           :title="item.tabItem">
                        <transition name="component-fade" mode="out-in">
                            <component v-bind:is="item.component"></component>
                        </transition>
                    </v-tab>
                </vue-tabs>
                <!--<Tabs class="tabsContent"
                         v-model="activeName" >
                    <TabPane v-for="item in tabList"
                                 :key="item.id"
                                 :label="item.tabItem"
                                 :name="item.name" >
                        <keep-alive>
                            <component v-bind:is="item.component" :userId="userId"></component>
                        </keep-alive>
                    </TabPane>
                </Tabs>-->
            </i-col>
            <i-col span="7" offset="1">
                <Recommend :userId="userId"></Recommend>
            </i-col>
        </Row>

        <Footer></Footer>
    </div>
</template>

<script>
	import Vue from 'vue';
	// import Latest from './Latest';
    import {getUserId} from '../utils/common';
	const Latest = () => import('./Latest.vue');
	const Header = () => import('./Header.vue');
	// const Hot = () => import('./Hot.vue');
	// const Focus = () => import('./Focus.vue');
	const Footer = () => import('./Footer.vue');
	// const Recommend = () => import('./Recommend.vue');

	const Hot = Vue.component('Hot', function (resolve) {
		setTimeout(function () {
			require(['./Hot.vue'], resolve)
		}, 100);
	});
	const BackToTop = Vue.component('BackToTop', function (resolve) {
		setTimeout(function () {
			require(['./BackToTop.vue'], resolve)
		}, 100);
	});
	const Focus = Vue.component('Focus', function (resolve) {
		setTimeout(function () {
			require(['./Focus.vue'], resolve)
		}, 100);
	});

	const Recommend = Vue.component('Recommend', function (resolve) {
		setTimeout(function () {
			require(['./Recommend.vue'], resolve)
		}, 100);
	});

	export default {
		components: {
			Header,
			Hot,
			Latest,
			Focus,
			Recommend,
			Footer
		},

		data() {
			return {
				activeIndex: '1',
				activeName: 'latest',
                userId: getUserId(),
				bannerList: [
//					{id: 1, image: require('../assets/banner1.jpg')}
                ],
				tabList: [
					{id: 1, name: 'latest', tabItem: '最新', component: Latest},
					{id: 2, name: 'hot', tabItem: '最热', component: Hot},
					{id: 3, name: 'focus', tabItem: '关注', component: Focus},
				]
			}
		},

        mounted() {

		},

		methods: {
			handleTabChange(tabIndex, newTab, oldTab){
				//your code here
			}
		},
	}
</script>

<style lang="scss" scoped>
    .homeContent{
        width: 1080px;
        margin: 0 auto;
        margin-top: 5px;
    }

    .bannerImg{
        width: 100%;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to {
        opacity: 0;
    }


</style>
