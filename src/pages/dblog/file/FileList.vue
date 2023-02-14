<template>
    <div class="default-datagrid" :style="`min-height: ${pageMinHeight}px;`">

        <div class="content-tool-bar">
            <a-space>
                <a-button type="primary" @click="showAddModal">新增</a-button>
                <a-button type="danger" @click="handleDelete">删除</a-button>
            </a-space>
        </div>

        <div class="content-condition">
            <div id="components-form-demo-advanced-search">
               
                <div class="search-result-list">
                    <a-table :columns="columns" :row-key="record => record.id" bordered
                        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                        :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange">

                        <span slot="fullFilePath" slot-scope="fullFilePath">
                            <a-avatar shape="square" :src="fullFilePath" />
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
                        <a-space slot="operation" slot-scope="operation,record">
                            <a-tooltip>
                                <template slot="title">
                                    复制链接
                                </template>
                                <a-button data-clipboard-action="copy" class="copy-file-url-btn"
                                    :data-clipboard-text="record.fullFilePath"  type="link" icon="copy"
                                    @click="handleCopy" />
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

import { list, remove } from "@/services/file";
import ClipboardJS from 'clipboard';

const columns = [
    {
        title: '文件名',
        dataIndex: 'originalFileName',
        sorter: true,
        width: "160px",
        ellipsis: true,
    },
    {
        title: "文件类型",
        dataIndex: "suffix",
        width: "80px",
        align: "center",
        scopedSlots: { customRender: 'suffix' },
    }, {
        title: "缩略图",
        dataIndex: "fullFilePath",
        width: "80px",
        scopedSlots: { customRender: 'fullFilePath' },
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
                this.data = data.list;
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
        handleCopy() {
            var _this = this;
            var clipboard = new ClipboardJS(".copy-file-url-btn");

            clipboard.on('success', function () {
                _this.$message.info("复制成功")
            });

            clipboard.on('error', function () {
                _this.$message.warn("复制失败")
            });
        }
    },
}
</script>


<style scoped lang="less">

</style>