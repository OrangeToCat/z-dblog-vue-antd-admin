<template>
    <div class="default-datagrid" :style="`min-height: ${pageMinHeight}px;`">

        <div class="content-tool-bar">
            <a-space>
                <a-button disabled type="primary" @click="showAddModal">新增</a-button>
                <a-button type="danger" @click="handleDelete">删除</a-button>
            </a-space>
        </div>

        <div class="content-condition">
            <div id="components-form-demo-advanced-search">
                <div class="search-result-list">
                    <a-table :columns="columns" :row-key="record => record.id" bordered
                        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                        :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
                        <span slot="available" slot-scope="available">
                            <a-tag :color="available ? 'cyan' : 'pink'">
                                {{ available? '可用': '不可用' }}
                            </a-tag>
                        </span>
                        <a-space slot="operation" slot-scope="operation">
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
                                <a-button type="link" icon="delete" @click="() => tableDeleteItem(operation)" />
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

import { updateTopOrRecommendedById } from "@/services/article";
import { typeList, typeRemove } from "@/services/type";
import { TypeConditionVO } from '@/services/vo/type';
import { override, keyReName } from "@/utils/ObjectUtil";

const columns = [
    {
        title: '层级',
        dataIndex: 'level',
        width: "40px",
        align: "center",
    },
    {
        title: "ID",
        dataIndex: "pk",
        width: "40px",
        align: "center"
    }, {
        title: "名称",
        dataIndex: "name",
        width: "100px",
        align: "left",
    }, {
        title: "父级分类",
        dataIndex: "parent",
        width: "80px",
        align: "center",
    }, {
        title: "描述",
        dataIndex: "description",
        ellipsis: true,
        width: "160px",
        align: "left",
    }, {
        title: "排序",
        dataIndex: "sort",
        align: "center",
        width: "40px",
    }, {
        title: "可用",
        dataIndex: "available",
        width: "40px",
        align: "center",
        scopedSlots: { customRender: 'available' },
    }, {
        title: "图标",
        dataIndex: "icon",
        width: "80px",
        align: "center",
    }, {
        title: "操作",
        dataIndex: "id",
        width: "80px",
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
                showQuickJumper:true,
                pageSizeOptions: ['10', '20', '30', '40'],
                defaultPageSize:10
            },
            loading: false,
            columns,
            expand: false,
            selectedRowKeys: [],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            visible: false,
            condition: new TypeConditionVO()
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
            console.log(ids);
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
                    typeRemove(ids).then(({ data }) => {
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

            // TypeConditionVO 定义了接口的数据格式
            // 如果params有值，则应该覆盖TypeConditionVO对象的值，其他值采用默认值
            override(this.condition, params);

            typeList(this.condition).then(({ data }) => {
                const pagination = { ...this.pagination };
                pagination.total = data.total;
                this.loading = false;
                keyReName(data.rows, "id", "pk");
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