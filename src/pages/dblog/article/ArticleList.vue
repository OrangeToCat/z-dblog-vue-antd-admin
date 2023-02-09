<template>
    <div class="default-datagrid" :style="`min-height: ${pageMinHeight}px;`">

        <div class="content-notice">
            <a-alert message="提示" description="使用过程中如果有不能解决的问题，请去提issue哈，在群里消息太多，有时候会看不到消息记录" type="info" />
        </div>

        <div class="content-tool-bar">
            <a-space>
                <a-button type="primary" @click="showAddModal">新增</a-button>
                <a-button type="danger" @click="handleDelete">删除</a-button>
                <a-button>批量发布</a-button>
                <a-button icon="cloud" title="推送到百度">百度</a-button>
            </a-space>
        </div>

        <div class="content-condition">
            <div id="components-form-demo-advanced-search">
                <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                    <a-row :gutter="24">
                        <a-col :span="10" :style="{ display: 1 < count ? 'block' : 'none' }">
                            <a-form-item label="名称和描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                <a-input v-decorator="[
                                    `keywords`,
                                ]" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="10" :style="{ display: 1 < count ? 'block' : 'none' }">
                            <a-form-item label="名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                <a-input v-decorator="[
                                    `title`,
                                ]" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="4" :style="{ textAlign: 'left' }">
                            <a-button type="primary" html-type="submit" @click="handleSearch">
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
                    <a-table :columns="columns" :row-key="record => record.id" bordered
                        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                        :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
                        <span slot="coverImage" slot-scope="coverImage">
                            <!-- <a-avatar  shape="square" :src="'http://172.16.2.230:8085/static/assets/' + coverImage"/>  -->
                            {{ coverImage }}
                        </span>
                        <span slot="comment" slot-scope="comment,record">
                            <a-switch :defaultChecked="comment" @change="() => onChange('comment', record.id)" />
                        </span>
                        <span slot="recommended" slot-scope="recommended,record">
                            <a-switch :defaultChecked="recommended" @change="() => onChange('recommend', record.id)" />
                        </span>
                        <span slot="top" slot-scope="top,record">
                            <a-switch :defaultChecked="top" @change="() => onChange('top', record.id)" />
                        </span>
                        <span slot="isprivate" slot-scope="isprivate">
                            <a-tag :color="isprivate ? 'volcano' : 'green'">
                                {{ isprivate?"私密": "公开" }}
                            </a-tag>
                        </span>
                        <a-space slot="operation">
                            <a-button type="link" icon="edit" />
                            <a-button type="link" icon="search" />
                            <a-button type="link" icon="delete" />
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

import { articleList, deleteArticles, updateTopOrRecommendedById } from "@/services/article";

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        sorter: true,
        width: "160px",
        ellipsis: true,
    },
    {
        title: "封面图",
        dataIndex: "coverImage",
        width: "80px",
        align: "center",
        scopedSlots: { customRender: 'coverImage' },
    }, {
        title: "评论",
        dataIndex: "comment",
        width: "80px",
        scopedSlots: { customRender: 'comment' },
        align: "center",
    }, {
        title: "推荐",
        dataIndex: "recommended",
        width: "80px",
        scopedSlots: { customRender: 'recommended' },
        align: "center",
    }, {
        title: "置顶",
        dataIndex: "top",
        width: "80px",
        scopedSlots: { customRender: 'top' },
        align: "center",
    }, {
        title: "浏览",
        dataIndex: "lookCount",
        align: "center",
        width: "80px",
    }, {
        title: "评论",
        dataIndex: "commentCount",
        width: "80px",
        align: "center",
    }, {
        title: "喜欢",
        dataIndex: "loveCount",
        width: "80px",
        align: "center",
    }, {
        title: "私密",
        dataIndex: "private",
        width: "80px",
        align: "center",
        scopedSlots: { customRender: 'isprivate' },
    }, {
        title: "发布时间",
        dataIndex: "updateTime",
        width: "80px",
    }, {
        title: "操作",
        dataIndex: "id",
        width: "120px",
        align: "center",
        scopedSlots: { customRender: 'operation' },
    }
];

export default {
    data() {
        return {
            data: [],
            pagination: {
                position: 'bottom'
            },
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
        handleDelete() {
            if (this.selectedRowKeys.length == 0) {
                this.$message.info('没有选择要删除得文章!');
            }
            else {
                var that = this;
                this.$confirm({
                    title: '删除确认',
                    content: '确认删除吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onCancel(f) {
                        f();
                    },
                    onOk(f) {
                        deleteArticles(that.selectedRowKeys).then(({ data }) => {
                            var status = data.status;
                            var msg = data.message;
                            that.$message[status == 200 ? "info" : "warn"](msg);
                            that.fetch({});
                        });
                        f();
                    }
                });

                console.log(deleteArticles);
            }
        },
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
        handleTableChange(pagination, filters, sorter) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            });
        },
        fetch(params = {}) {
            this.loading = true;

            // 这里获取表格基本信息
            var questParams = [
                // keywords
                params.keywords || this.form.getFieldValue('keywords'),
                // title
                params.title || this.form.getFieldValue('title'),
                // searchText
                params.searchText || null,
                // sortOrder
                this.form.getFieldValue('username'),
                // pageSize
                params.pageSize || this.pagination.pageSize,
                // pageNumber
                params.pageNumber | this.pagination.current
            ];

            articleList(...questParams).then(({ data }) => {
                const pagination = { ...this.pagination };
                pagination.total = data.total;
                this.loading = false;
                this.data = data.rows;
                this.pagination = pagination;
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
            console.log(type);
            console.log(id);


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