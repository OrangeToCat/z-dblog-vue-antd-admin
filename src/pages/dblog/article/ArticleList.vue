<template>
    <div class="default-datagrid" :style="`min-height: ${pageMinHeight}px`">

        <div class="content-notice">
            <a-alert message="提示" description="使用过程中如果有不能解决的问题，请去提issue哈，在群里消息太多，有时候会看不到消息记录"
                type="info" />
        </div>

        <div class="content-tool-bar">
            <a-space>
                <a-button type="primary" @click="showAddModal">新增</a-button>
                <a-button type="danger">删除</a-button>
                <a-button>批量发布</a-button>
                <a-button icon="cloud" title="推送到百度">百度</a-button>
            </a-space>
        </div>

        <div class="content-condition">
            <div id="components-form-demo-advanced-search">
                <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                    <a-row :gutter="24">
                        <a-col :span="10" :style="{ display: 1 < count ? 'block' : 'none' }">
                            <a-form-item :label="`名称和描述`" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                <a-input v-decorator="[
                                    `请输入关键字查询`,
                                ]" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="10" :style="{ display: 1 < count ? 'block' : 'none' }">
                            <a-form-item :label="`名称`" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                <a-input v-decorator="[
                                    `请输入名称关键字查询`,
                                ]" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="4" :style="{ textAlign: 'left' }">
                            <a-button type="primary" html-type="submit">
                                搜索
                            </a-button>
                            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                                重置
                            </a-button>
                            <a v-if="false" :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                                <a-icon :type="expand ? 'up' : 'down'" />
                            </a>
                        </a-col>
                    </a-row>
                </a-form>
                <div class="search-result-list">
                    <a-table :columns="columns" :row-key="record => record.userId"
                        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                        :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
                        <template slot="moduleName" slot-scope="name"> {{ name }}</template>
                        <template slot="hidden" slot-scope="sex"> {{ sex }}</template>
                        <a-space slot="operation">
                            <a-button type="link" icon="edit" />
                            <a-button type="link" icon="search" />
                        </a-space>
                    </a-table>
                </div>
            </div>
        </div>


        <!-- 模态框 -->
        <a-modal :visible="visible" centered width="30%" okText="保存" title="新增模块" @ok="handleOk"
            @cancel="visible = false">
            <ModuleAdd></ModuleAdd>
        </a-modal>

    </div>
</template>

<script>
import { mapState } from 'vuex'

const columns = [
    {
        title: '标题',
        dataIndex: 'moduleName',
        sorter: true,
        width: "160px",
        scopedSlots: { customRender: 'moduleName' },
    },
    {
        title: "封面图",
        dataIndex: "componentUrl",
        width: "80px",
    }, {
        title: "评论",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "推荐",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "置顶",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "浏览",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "评论",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "喜欢",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "私密",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "发布时间",
        dataIndex: "hidden",
        width: "80px",
        scopedSlots: { customRender: 'hidden' },
    }, {
        title: "操作",
        dataIndex: "hidden",
        width: "120px",
        scopedSlots: { customRender: 'operation' },
    }
];

export default {
    data() {
        return {
            data: [],
            pagination: {},
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
    }, updated() {
        console.log('updated');
    }, methods: {
        onSelectChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                console.log('error', error);
                console.log('Received values of form: ', values);
            });
        },

        handleReset() {
            this.form.resetFields();
        },
        toggle() {
            this.expand = !this.expand;
        },
        handleTableChange(pagination, filters, sorter) {
            console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            });
        },
        fetch(params = {}) {
            this.loading = true;
            console.log(params);
            // queryData({
            //     results: 10,
            //     ...params,
            // }).then(({ data }) => {
            //     const pagination = { ...this.pagination };
            //     // Read total count from server
            //     // pagination.total = data.totalCount;
            //     pagination.total = 200;
            //     this.loading = false;
            //     this.data = data;
            //     this.pagination = pagination;
            // });
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