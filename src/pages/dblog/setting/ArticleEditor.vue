<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">


            <a-form-item label="默认文章编辑器" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-select default-value="" @change="handleChange">
                    <a-select-option :value="item.value" :key="item.value" v-for="item in articleEditorValues">
                        {{ item.text }}
                    </a-select-option>
                </a-select>
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
            value: "local",
            articleEditorValues: [{
                value: "md",
                text: "Markdown编辑器"
            }, {
                value: "we",
                text: "WangEditor编辑器"
            }],
            form: this.$form.createForm(this, { name: 'baseinfo' }),
        }
    },
    computed: {
        desc() {
            return "pageDesc"
        }
    },
    mounted() {

    },
    methods: {
        onChange(e) {
            console.log('radio checked', e.target.value);
        },
        handleChange(value) {
            console.log(`selected ${value}`);
        },
    },
}
</script>

<style scoped>

</style>