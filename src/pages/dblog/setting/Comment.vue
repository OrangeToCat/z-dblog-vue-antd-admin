<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">
            <a-form-item label="允许匿名评论？" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-radio-group v-model="value" @change="onChange">
                    <a-radio value="1">
                        开启
                    </a-radio>
                    <a-radio value="0">
                        关闭
                    </a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="开启留言板评论" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-radio-group v-model="value" @change="onChange">
                    <a-radio value="1">
                        开启
                    </a-radio>
                    <a-radio value="0">
                        关闭
                    </a-radio>
                </a-radio-group>
            </a-form-item>

                <a-form-item label="Placeholder" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="例如：说点什么吧"
                        v-decorator="['editorPlaceholder', { rules: [{ required: false, message: '请输入Placeholder' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>
              
                <a-form-item label="警示语" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="例如：讲文明、要和谐"
                        v-decorator="['editorAlert', { rules: [{ required: false, message: '请输入警示语' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
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
            value: "1",
           
            form: this.$form.createForm(this, { name: 'baseinfo' }),
        }
    },
    computed: {
        desc() {
            return "pageDesc"
        }
    },
    mounted(){
        
    },
    methods: {
        onChange(e) {
            console.log('radio checked', e.target.value);
        }
    },
}
</script>

<style scoped>

</style>