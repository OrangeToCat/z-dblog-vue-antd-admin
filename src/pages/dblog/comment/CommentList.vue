<template>
    <div class="default-datagrid" :style="`min-height: ${pageMinHeight}px;`">

        <div class="content-tool-bar">
            <a-space>
                <a-button type="danger" @click="handleDelete">删除</a-button>
            </a-space>
        </div>

        <div class="content-condition">
            <div id="components-form-demo-advanced-search">
                <div class="search-result-list">
                    <a-table :columns="columns" :row-key="record => record.id" bordered
                        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                        :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
                        <span class="tab-avatar" slot="avatar" slot-scope="avatar,record">
                            <div>
                                <a-avatar :size="18" icon="user" :src="record.avatar" alt="未找到" /> {{ record.nickname }}
                                <a-icon type="qq" /> <a-icon type="mail" />
                            </div>
                            <div>
                                <a-icon type="ie" /> {{ record.ip + ' | ' + record.address }}
                            </div>
                            <div>
                                <a-icon type="windows" /> {{ record.os + ' | ' + record.browser }}
                            </div>
                            <div>
                                <a-icon type="clock-circle" /> {{ record.createTimeString || "未知" }}
                            </div>
                        </span>
                        <span slot="content" slot-scope="content,record">
                            
                            <a-popover :title="record.articleTitle">
                                <template slot="content">
                                    <p v-html="record.content"></p>
                                </template>
                                <div v-html="record.content"></div>
                            </a-popover>
                        </span>
                        <span slot="support" slot-scope="support,record">
                            {{ record.support + "/" + record.oppose }}
                        </span>
                        <span slot="status" slot-scope="status,record">
                            <a-tag
                                :color="status == 'VERIFYING' ? '#f50' : (status == 'REJECT' ? 'orange' : (status == 'DELETED') ? 'pink' : 'green')">
                                {{ record.statusDesc || "状态异常" }}
                            </a-tag>
                        </span>
                        <a-space slot="operation" slot-scope="operation,record">
                            <a-tooltip>
                                <template slot="title">
                                    回复
                                </template>
                                <a-button disabled type="link" icon="message" />
                            </a-tooltip>

                            <a-tooltip>
                                <template slot="title">
                                    编辑
                                </template>
                                <a-button disabled type="link" icon="edit" />
                            </a-tooltip>

                            <a-tooltip>
                                <template slot="title">
                                    删除
                                </template>
                                <a-button type="link" icon="delete" @click="() => tableDeleteItem(record.id)" />
                            </a-tooltip>
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

import { list, remove } from "@/services/comment";

const columns = [
    {
        title: '作者',
        dataIndex: 'avatar',
        sorter: true,
        width: "160px",
        scopedSlots: { customRender: 'avatar' },
    },
    {
        title: "内容",
        dataIndex: "content",
        width: "80px",
        align: "left",
        scopedSlots: { customRender: 'content' },
    }, {
        title: "赞/踩",
        dataIndex: "support",
        width: "80px",
        scopedSlots: { customRender: 'support' },
        align: "center",
    }, {
        title: "状态",
        dataIndex: "status",
        width: "80px",
        scopedSlots: { customRender: 'status' },
        align: "center",
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
                position: 'bottom',
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '30', '40'],
                defaultPageSize: 10
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
        tableDeleteItem(ids) {
            if (typeof ids == "string") {
                ids = [ids];
            }
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
                    remove(ids).then(({ data }) => {
                        var status = data.status;
                        var msg = data.message;
                        that.$message[status == 200 ? "info" : "warn"](msg);
                        that.fetch({});
                    });
                    f();
                }
            });
        },
        handleDelete() {
            if (this.selectedRowKeys.length == 0) {
                this.$message.info('没有选择要删除得文章!');
            }
            else {
                this.tableDeleteItem(this.selectedRowKeys);
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

            list(...questParams).then(({ data }) => {
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
        }
    },
}
</script>


<style scoped lang="less">
.tab-avatar {
    div {
        padding: 2px 0;
    }
}
</style>