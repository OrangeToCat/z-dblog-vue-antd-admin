import BaseInfo from "./BaseInfo";
import Seo from "./Seo";
import Storage from "./Storage";
import Auth from "./Auth";
import Comment from "./Comment";
import ArticleEditor from "./ArticleEditor";
import Contact from "./Contact";
import Praise from "./Praise";
import Other from "./Other";
import Custom from "./Custom";

export default {
    tabPane: [
        {
            key: "1",
            tab: "基本信息",
            icon: "info",
            content: BaseInfo
        },
        {
            key: "2",
            tab: "SEO",
            icon: "ie",
            content: Seo
        },
        {
            key: "3",
            tab: "云存储",
            icon: "cloud",
            content: Storage
        },
        {
            key: "4",
            tab: "登录",
            icon: "login",
            content: Auth
        },
        {
            key: "5",
            tab: "评论",
            icon: "cloud",
            content: Comment
        },
        {
            key: "6",
            tab: "文章编辑器",
            icon: "edit",
            content: ArticleEditor
        },
        {
            key: "7",
            tab: "联系方式",
            icon: "phone",
            content: Contact
        }, {
            key: "8",
            tab: "赞赏码",
            icon: "qrcode",
            content: Praise
        }, {
            key: "9",
            tab: "其他",
            icon: "ellipsis",
            content: Other
        }, {
            key: "10",
            tab: "定制页面",
            icon: "setting",
            content: Custom
        },
    ]
};