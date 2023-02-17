<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">
            <a-form-item label="站长名称" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入站长名称" v-decorator="['authorName', { rules: [{ required: false, message: '请输入站长名称' }] }]" />
            </a-form-item>
            <a-form-item label="站长邮箱" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入站长邮箱" v-decorator="['authorEmail', { rules: [{ required: false, message: '请输入站长邮箱' }] }]" />
            </a-form-item>
            <a-form-item label="微信二维码" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入微信二维码" v-decorator="['wxCode', { rules: [{ required: false, message: '请输入微信二维码' }] }]" />
            </a-form-item>
            <a-form-item label="QQ" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入QQ" v-decorator="['qq', { rules: [{ required: false, message: '请输入QQ' }] }]"/>
            </a-form-item>
            <a-form-item label="微博" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入微博" v-decorator="['weibo', { rules: [{ required: false, message: '请输入微博' }] }]"/>
            </a-form-item>
            <a-form-item label="GitHub" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入GitHub" v-decorator="['github', { rules: [{ required: false, message: '请输入GitHub' }] }]"/>
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