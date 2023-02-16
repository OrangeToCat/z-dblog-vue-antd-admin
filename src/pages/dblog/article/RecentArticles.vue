<template>

    <a-table :columns="columns" :row-key="record => record.id" bordered
         :data-source="data" :pagination="false" size="small"
        :loading="loading" >

    </a-table>
</template>

<script>
import { mapState } from 'vuex'

import { articleList, updateTopOrRecommendedById } from "@/services/article";

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        ellipsis: true,
        align: "left",
    },
    {
        title: "分类",
        dataIndex: "coverImage",
        width: "80px",
        ellipsis: true,
        align: "center",
    },
    {
        title: "浏览数",
        dataIndex: "1",
        ellipsis: true,
        align: "center",
    },
    {
        title: "发布时间",
        dataIndex: "2",
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
            articleList().then(({ data }) => {
                this.loading = false;
                this.data = data.rows;
            });
        },
        showAddModal() {
            this.visible = true;
        },
        handleOk(e) {
            console.log(e);
            // 添加一个新的模块
            this.visible = false;
        },
        onChange(type, id) {
            var that = this;

            // 这里有可以优化的地方
            // 如果更改成功，则仅仅是提示，不做表格的刷新
            // 如果更改失败，则提示，另外还要把开关复原
            updateTopOrRecommendedById(type, id).then(({ data }) => {
                var { status, message } = data;
                that.$message[status == 200 ? "info" : "warn"](message);
                that.fetch();
            });
        }
    },
}
</script>


<style scoped lang="less">

</style>