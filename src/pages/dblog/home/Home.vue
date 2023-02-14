<template>
    <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
        <div>
            <a-row :gutter="[10]">
                <a-col :span="6">
                    <a-card>
                        <a-statistic title="文章" :value="articleCount" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                            <template #prefix>
                                <a-icon type="form" />
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card>
                        <a-statistic title="标签" :value="tagCount" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                            <template #prefix>
                                <a-icon type="tags" />
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card>
                        <a-statistic title="分类" :value="typeCount" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                            <template #prefix>
                                <a-icon type="unordered-list" />
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card>
                        <a-statistic title="留言数" :value="commentCount"
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                            <template #prefix>
                                <a-icon type="message" />
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>
        </div>

        <div>
            <a-row :gutter="[10]">
                <a-col :span="8">
                    <a-card title="分类文章数统计" :bordered="false">
                        <ArticleTypeChart></ArticleTypeChart>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card title="文章访问TOP.10" :bordered="false">
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card title="爬虫访问统计TOP.10" :bordered="false">
                        <SpiderChart></SpiderChart>
                    </a-card>
                </a-col>
            </a-row>
        </div>

        <div>
            <a-row :gutter="[10]">
                <a-col :span="12">
                    <a-card title="近期文章" :bordered="false">
                        <a slot="extra" href="#">更多</a>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </a-card>
                </a-col>
                <a-col :span="12">
                    <a-card title="近期评论" :bordered="false">
                        <a slot="extra" href="#">更多</a>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { ArticleTypeChart , SpiderChart} from "./chart";
import { siteInfo } from "@/services/home";
export default {
    data() {
        return {
            articleCount: 0,
            commentCount: 0,
            tagCount: 0,
            typeCount: 0,
            installdate: 0
        }
    },
    mounted() {
        var _this = this;
        siteInfo().then(({ data }) => {
            var _data = data.data;
            _this.articleCount = _data.articleCount;
            _this.commentCount = _data.commentCount;
            _this.tagCount = _data.tagCount;
            _this.typeCount = _data.typeCount;
            _this.installdate = _data.installdate;
        });
    },
    components: { ArticleTypeChart , SpiderChart},
    computed: {
        ...mapState('setting', ['pageMinHeight']),
        desc() {
            return "Hello"
        }
    }
}
</script>

<style scoped lang="less">
@import "index";
</style>