<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">


            <a-form-item label="微信赞赏码" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
                    :file-list="fileList" @preview="handlePreview" @change="handleChange">
                    <div v-if="fileList.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">
                            Upload
                        </div>
                    </div>
                </a-upload>
            </a-form-item>

            <a-form-item label="支付宝赞赏码" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
                    :file-list="fileList" @preview="handlePreview" @change="handleChange">
                    <div v-if="fileList.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">
                            Upload
                        </div>
                    </div>
                </a-upload>
            </a-form-item>

<!-- 
            <a-form-item style="margin-top: 24px" :wrapperCol="{ span: 10, offset: 7 }">
                <a-button type="primary">保存</a-button>
            </a-form-item> -->
        </a-form>
    </a-card>
</template>

<script>

export default {
    data() {
        return {
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
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
        },

        handleCancel() {
            this.previewVisible = false;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = 1 // await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
        },
    },
}
</script>

<style scoped>

</style>