<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">


            <a-form-item label="登录重试次数" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-input placeholder="请输入登录重试次数，默认5"
                    v-decorator="['loginRetryNum', { rules: [{ required: true, message: '请输入登录重试次数，默认5' }] }]"
                    :auto-size="{ minRows: 3, maxRows: 5 }" />
            </a-form-item>

            <a-form-item label="Session有效期" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">

                <a-form-item :style="{ display: 'inline-block', width: 'calc(80%)' }">
                    <a-input placeholder="请输入Session有效期，默认1小时"
                        v-decorator="['sessionTimeOut', { rules: [{ required: true, message: '请输入Session有效期，默认1小时' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item :style="{ display: 'inline-block', width: 'calc(20% - 12px)', marginLeft: '12px' }">
                    <a-select default-value="" style="width: 120px" @change="handleChange">
                        <a-select-option :value="item" :key="item" v-for="item in timeUnitsValues">
                            {{ item }}
                        </a-select-option>

                    </a-select>
                </a-form-item>

            </a-form-item>

            <a-form-item style="margin-top: 24px" :wrapperCol="{ span: 10, offset: 7 }">
                <a-button type="primary">保存</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script>
import { timeUnits } from "@/services/apiapi";

export default {
    data() {
        return {
            value: "local",
            timeUnitsValues:[],
            form: this.$form.createForm(this, { name: 'baseinfo' }),
        }
    },
    computed: {
        desc() {
            return "pageDesc"
        }
    },
    mounted() {
        this.timeUnits();
    },
    methods: {
        onChange(e) {
            console.log('radio checked', e.target.value);
        }, handleChange(value) {
            console.log(`selected ${value}`);
        },

        timeUnits() {
            var _this = this;
            timeUnits().then(({ data }) => {
                _this.timeUnitsValues = data.data;
            })
        }
    },
}
</script>

<style scoped>

</style>