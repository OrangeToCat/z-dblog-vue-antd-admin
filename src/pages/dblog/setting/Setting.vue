<template>
    <div class="page-container" :style="`min-height: ${pageMinHeight}px`">
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane :key="item.key"  v-for="item in tabPane">
                <span slot="tab" >
                    <a-icon :type="item.icon" v-if="item.icon"/>
                    {{ item.tab }}
                </span>
                <component v-bind:is="item.content"></component>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import tabPane from "./tabPane";

export default {
    data() {
        return {
            tabPane: tabPane.tabPane
        }
    },
    methods: {
        callback(key) {
            console.log(key);
        },
    }, computed: {
        ...mapState('setting', ['pageMinHeight']),
    }
}
</script>

<style lang="less" scoped>
.page-container {
    height: 100%;
    background-color: @base-bg-color;
    padding: 10px;
    border-radius: 4px;

    //margin-top: -24px;
    h1 {
        font-size: 48px;
    }
}
</style>