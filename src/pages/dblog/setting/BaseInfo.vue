<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">
            <a-form-item label="站点简介" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="一句话简介" v-decorator="['siteDesc', { rules: [{ required: true, message: '请填写站点简介' }] }]" />
            </a-form-item>
            <a-form-item label="主域名" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="例如: zhyd.me" v-decorator="['domain', { rules: [{ required: true, message: '请填写主域名' }] }]" />
            </a-form-item>
            <a-form-item label="博客地址" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="例如: http://localhost:8443" v-decorator="['siteUrl', { rules: [{ required: true, message: '请填写主域名' }] }]" />
            </a-form-item>
            <a-form-item label="站点图标" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="例如：http://localhost:8443/favicon.ico" v-decorator="['siteFavicon', { rules: [{ required: true, message: '请填写主域名' }] }]"/>
            </a-form-item>
            <a-form-item label="资源文件域名" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="例如：http://localhost:8443" v-decorator="['staticWebSite', { rules: [{ required: true, message: '请填写主域名' }] }]"/>
            </a-form-item>
            <a-form-item label="管理系统地址" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="例如: http://localhost:8085" v-decorator="['cmsUrl', { rules: [{ required: true, message: '请填写主域名' }] }]"/>
            </a-form-item>
            <a-form-item label="版权信息" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="例如：Copyright &copy; zhyd.me All Rights Reserved" v-decorator="['copyright', { rules: [{ required: false, message: '请填写主域名' }] }]"/>
            </a-form-item>
            <a-form-item label="网站备案号" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="例如：鲁ICP备17054970号-1"  v-decorator="['recordNumber', { rules: [{ required: false, message: '请填写网站备案号' }] }]"/>
            </a-form-item>
            <a-form-item label="懒加载图片" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="懒加载图片"  v-decorator="['lazyloadPath', { rules: [{ required: false, message: '请填写懒加载图片' }] }]"/>
            </a-form-item>
            <a-form-item label="博客安装日期" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="博客安装日期" v-decorator="['installdate', { rules: [{ required: true, message: '请填写博客安装日期' }] }]"/>
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