<template>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
        <a-form :form="form">
            <a-form-item label="存储类型" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                <a-radio-group v-model="value" @change="onChange">
                    <a-radio value="local">
                        本地
                    </a-radio>
                    <a-radio value="qiniu">
                        七牛云
                    </a-radio>
                    <a-radio value="aliyun">
                        阿里云OSS
                    </a-radio>
                </a-radio-group>
            </a-form-item>

            <div v-if="value == 'local'">
                <a-form-item label="文件服务器域名" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入文件服务器域名，如：http://file.zhyd.me/"
                        v-decorator="['localFileUrl', { rules: [{ required: true, message: '请输入文件服务器域名' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>
                <a-form-item style="margin-top: -24px" :wrapperCol="{ span: 10, offset: 7 }">
                    <small>请按照 <code>http://file.zhyd.me/</code> 格式填写，包含 <code>http://</code> 和末尾的
                        <code>/</code></small>
                </a-form-item>
                <a-form-item label="文件存储路径" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入文件存储路径，如：/var/www/oneblog/upload/"
                        v-decorator="['localFilePath', { rules: [{ required: true, message: '请输入文件存储路径' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>
                <a-form-item style="margin-top: -24px" :wrapperCol="{ span: 10, offset: 7 }">
                    <small>请按照 <code>/var/www/oneblog/upload/</code> 格式填写，包含末尾的 <code>/</code></small>
                    <br />
                    <small>本地文件服务器，需要手动<strong class="red">搭建文件服务器</strong>。作者推荐Nginx，<a class="pointer"
                            data-toggle="modal" data-target="#storageNginxServerModal">获取nginx文件服务器配置</a> </small>
                </a-form-item>
            </div>

            <div v-if="value == 'qiniu'">
                <a-form-item label="Bucket 名称" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入Bucket 名称"
                        v-decorator="['qiniuBucketName', { rules: [{ required: true, message: '请输入Bucket 名称' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item label="Access Key" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入Access Key"
                        v-decorator="['qiniuAccessKey', { rules: [{ required: true, message: '请输入Access Key' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item label="Secret Key" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入Secret Key"
                        v-decorator="['qiniuSecretKey', { rules: [{ required: true, message: '请输入Secret Key' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item label="七牛云cdn域名" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入七牛域名，格式：http://***.**.**/"
                        v-decorator="['qiniuBasePath', { rules: [{ required: true, message: '请输入七牛云cdn域名' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>
            </div>

            <div v-if="value == 'aliyun'">
                <a-form-item label="Bucket 名称" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入Bucket 名称"
                        v-decorator="['aliyunBucketName', { rules: [{ required: true, message: '请输入Bucket 名称' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item label="地域节点（EndPoint）" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入endpoint，如：http://oss-cn-hangzhou.aliyuncs.com"
                        v-decorator="['aliyunEndpoint', { rules: [{ required: true, message: '请输入endpoint，如：http://oss-cn-hangzhou.aliyuncs.com' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item label="Bucket 域名" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="默认为bucketName + endpoint，若使用自定义的域名，请修改"
                        v-decorator="['aliyunFileUrl', { rules: [{ required: true, message: '请输入Bucket 域名' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item label="Access Key" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入Access Key"
                        v-decorator="['aliyunAccessKey', { rules: [{ required: true, message: '请输入Access Key' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>

                <a-form-item label="Access Key Secret" :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
                    <a-input placeholder="请输入Access Key Secret"
                        v-decorator="['aliyunAccessKeySecret', { rules: [{ required: true, message: '请输入Access Key Secret' }] }]"
                        :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>
            </div>

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