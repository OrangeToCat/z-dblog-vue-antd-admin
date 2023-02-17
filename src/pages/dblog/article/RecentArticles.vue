<template>

    <a-table :columns="columns" :row-key="record => record.id" bordered
         :data-source="data" :pagination="false" size="small"
        :loading="loading" >
        <span slot="itemTitle" slot-scope="itemTitle,record"> 
           <a :href="`${config.siteUrl}/article/${record.id || '0'}`" target="_blank">{{ itemTitle }}</a>
        </span>
        <span slot="type" slot-scope="type"> 
            <a :href="`${config.siteUrl}/type/${type.id || '0'}`" target="_blank">{{ type.name }}</a>
        </span>
    </a-table>
</template>

<script>
import { mapState } from 'vuex'

import { recentArticles } from "@/services/home";

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        ellipsis: true,
        align: "left",
        scopedSlots: { customRender: 'itemTitle' },
    },
    {
        title: "分类",
        dataIndex: "type",
        width: "80px",
        ellipsis: true,
        align: "center",
        scopedSlots: { customRender: 'type' },
    },
    {
        title: "浏览数",
        dataIndex: "lookCount",
        ellipsis: true,
        align: "center",
    },
    {
        title: "发布时间",
        dataIndex: "createTime",
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
    // , updated() {
    //     console.log('updated');
    // }
    , methods: {
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.fetch(values);
            });
        },
        handleReset() {
            this.form.resetFields();
        },
        toggle() {
            this.expand = !this.expand;
        },
        fetch() {
            this.loading = true;
            recentArticles(5).then(({ data }) => {
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