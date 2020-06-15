<template>
    <div>
        <Header></Header>

        <Row class="settings">
            <i-col span="4">
                <Menu @select="menuSelected"
                      width="auto"
                         :active-name="actived">
                    <MenuItem v-for="(item, i) in navList"
                                  :key="i"
                                  :name="item.name">
                        {{ item.navItem }}
                    </MenuItem>
                </Menu>
            </i-col>

            <i-col span="20">
                <keep-alive>
                    <component :is="currentComponent"></component>
                </keep-alive>
            </i-col>

        </Row>

    </div>
</template>


<script>
	import Header from './Header.vue';
	import SettingsBasic from './SettingsBasic.vue';
	import SettingsPersonal from './SettingsPersonal.vue';

	export default {
		components: {
			Header,
			SettingsBasic,
			SettingsPersonal
		},

		data() {
			return {
				currentComponent: 'SettingsBasic',
				actived: 'SettingsBasic',
				navList: [
					{name: 'SettingsBasic', navItem: '基础设置'},
//					{name: 'SettingsPersonal', navItem: '个人资料'}
				]
			}
		},

		methods: {
			//切换菜单
			menuSelected(index){
				this.currentComponent = index;
				this.actived = index;
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .settings
        width 1080px
        margin 0 auto
</style>
