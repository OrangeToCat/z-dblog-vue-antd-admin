<template>

    <a-table :columns="columns" :row-key="record => record.id" bordered :data-source="data" :pagination="false"
        size="small" :loading="loading">
        <span slot="content" slot-scope="content"> 
            <p v-html="content"></p>    
        </span>
        <span slot="articleTitle" slot-scope="articleTitle,record"> 
            <a :href="`${config.siteUrl}${record.sourceUrl}`" target="_blank">{{ articleTitle }}</a>
        </span>
    </a-table>
</template>

<script>
import { mapState } from 'vuex'

import { recentComments } from "@/services/home";

const columns = [
    {
        title: '发起人',
        dataIndex: 'nickname',
        ellipsis: true,
        align: "left",
        width: "40",
    },
    {
        title: "评论内容",
        dataIndex: "content",
        width: "80",
        ellipsis: true,
        align: "center",
        scopedSlots: { customRender: 'content' },
    },
    {
        title: "出处",
        dataIndex: "articleTitle",
        ellipsis: true,
        align: "left",
        scopedSlots: { customRender: 'articleTitle' },
    },
    {
        title: "评论时间",
        dataIndex: "updateTime",
        ellipsis: true,
        align: "center",
    },
];

export default {
    data() {
        return {
            data: [],
            loading: false,
            columns,
            expand: false,
            selectedRowKeys: [],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            visible: false
        }
    },
    computed: {
        ...mapState('setting', ['pageMinHeight']), count() {
            return this.expand ? 11 : 7;
        },
        ...mapState('sysconfig', ['config']),
    }, mounted() {
        this.fetch();
    }
    , methods: {
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        fetch() {
            this.loading = true;
            recentComments(10).then(({ data }) => {
                this.loading = false;
                this.data = data.data;
            });
        },
        showAddModal() {
            this.visible = true;
        },
        handleOk(e) {
            console.log(e);
            // 添加一个新的模块
            this.visible = false;
        }
    },
}
</script>


<style scoped lang="less">

</style>