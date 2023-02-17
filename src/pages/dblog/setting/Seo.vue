<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">
            <a-form-item label="首页标题" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入站点名" v-decorator="['siteName', { rules: [{ required: true, message: '请输入站点名' }] }]" />
            </a-form-item>
            <a-form-item label="META描述" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-textarea placeholder="请输入首页描述" v-decorator="['homeDesc', { rules: [{ required: true, message: '请输入首页描述' }] }]" :auto-size="{ minRows: 3, maxRows: 5 }"/>
            </a-form-item>
            <a-form-item label="META关键词" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-textarea placeholder="请输入首页关键字(半角逗号分隔)" v-decorator="['homeKeywords', { rules: [{ required: true, message: '请输入首页关键字(半角逗号分隔)' }] }]" :auto-size="{ minRows: 3, maxRows: 5 }"/>
            </a-form-item>
            <a-form-item label="百度推送Token" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入百度推送Token，推送功能能加快百度搜索引擎对博文的索引速度" v-decorator="['baiduPushToken', { rules: [{ required: false, message: '请输入百度推送Token，推送功能能加快百度搜索引擎对博文的索引速度' }] }]"/>
            </a-form-item>
            <a-form-item style="margin-top: -24px" :wrapperCol="{ span: 10, offset: 7 }">
                获取地址： <a href="https://ziyuan.baidu.com/linksubmit/index" target="_blank">点击获取百度推送Token</a>
            </a-form-item>
            <a-form-item label="百度推送Cookie" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-textarea placeholder="请输入百度推送Cookie" v-decorator="['baiduPushCookie', { rules: [{ required: false, message: '请输入百度推送Cookie' }] }]" :auto-size="{ minRows: 3, maxRows: 5 }"/>
            </a-form-item>
            <a-form-item style="margin-top: -24px" :wrapperCol="{ span: 10, offset: 7 }">
                帮助文档：<a href="http://t.cn/AiCIWi0Q" target="_blank">OneBlog-第三方配置参考-百度站长平台配置</a>
            </a-form-item>
            <a-form-item style="margin-top: 24px" :wrapperCol="{ span: 10, offset: 7 }">
                <a-button type="primary">保存</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script>
export default {
    data() {
        return {
            value: 1,
            form: this.$form.createForm(this, { name: 'baseinfo' }),
        }
    },
    computed: {
        desc() {
            return "pageDesc"
        }
    }
}
</script>

<style scoped>

</style>