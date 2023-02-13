import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'demo',
          name: '演示页',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/demo')
        },{
          path: 'article',
          name: '文章管理',
          meta: {
            icon: 'unordered-list'
          },
          component: BlankView,
          children:[
            {
              path: 'article-list',
              name: '文章列表',
              component: async () => (await import("@/pages/dblog/article")).ArticleList,
            },
            {
              path: 'type-list',
              name: '分类列表',
              component: async () => (await import("@/pages/dblog/type")).TypeList,
            },
            {
              path: 'tags-list',
              name: '标签列表',
              component: async () =>(await import("@/pages/dblog/tags")).TagsList,
            }
          ]
        },{
          path: 'site',
          name: '网站管理',
          meta: {
            icon: 'global'
          },
          component: BlankView,
          children:[
            {
              path: 'link',
              name: '友情链接',
              component: async () => (await import("@/pages/dblog/link")).LinkList,
            },
            {
              path: 'comment',
              name: '评论管理',
              component: async () => (await import("@/pages/dblog/comment")).CommentList,
            },
            {
              path: 'template',
              name: '模板管理',
              component: async () => (await import("@/pages/dblog/template")).TemplateList,
            },
            {
              path: 'update_recorde',
              name: '更新日志',
              component: async () => (await import("@/pages/dblog/update_recorde")).UpdateRecordList,
            },
            {
              path: 'notice',
              name: '公告管理',
              component: async () => (await import("@/pages/dblog/notice")).NoticeList,
            },
            {
              path: 'file',
              name: '文件管理',
              component: async () => (await import("@/pages/dblog/file")).FileList,
            },
            {
              path: 'login-list',
              name: '社会化登录配置管理',
              component: () => import('@/pages/demo'),
            }
          ]
        },{
          path: 'auth',
          name: '权限管理',
          meta: {
            icon: 'lock'
          },
          component: PageView,
          children:[
            {
              path: 'resource-list',
              name: '资源管理',
              component: () => import('@/pages/demo'),
            },
            {
              path: 'roles-list',
              name: '角色管理',
              component: () => import('@/pages/demo'),
            }
          ]
        },{
          path: 'user',
          name: '用户管理',
          meta: {
            icon: 'user'
          },
          component: PageView,
          children:[
            {
              path: 'user-list',
              name: '用户列表',
              component: () => import('@/pages/demo'),
            }
          ]
        },{
          path: 'lab',
          name: '实验室',
          meta: {
            icon: 'bank'
          },
          component: PageView,
          children:[
            {
              path: 'msg-list',
              name: '推送消息',
              component: () => import('@/pages/demo'),
            },{
              path: 'article-ship-list',
              name: '文章搬运工',
              component: () => import('@/pages/demo'),
            }
          ]
        },{
          path: 'testpage',
          name: '测试页面',
          meta: {
            icon: 'bug'
          },
          component: PageView,
          children:[
            {
              path: 'edit-config',
              name: '编辑器',
              component: () => import('@/pages/demo'),
            },{
              path: 'icon-list',
              name: 'icon图标',
              component: () => import('@/pages/demo'),
            },{
              path: 'shiro-list',
              name: 'shiro测试',
              component: () => import('@/pages/demo'),
            }
          ]
        },
        {
          path: 'parent1',
          name: '父级路由1',
          meta: {
            icon: 'dashboard',
          },
          component: BlankView,
          children: [
            {
              path: 'demo1',
              name: '演示页面1',
              component: () => import('@/pages/demo'),
            }
          ]
        },
        {
          path: 'parent2',
          name: '父级路由2',
          meta: {
            icon: 'form'
          },
          component: PageView,
          children: [
            {
              path: 'demo2',
              name: '演示页面2',
              component: () => import('@/pages/demo'),
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          name: '验权页面',
          path: 'auth/demo',
          meta: {
            icon: 'file-ppt',
            authority: {
              permission: 'form',
              role: 'manager'
            },
            component: () => import('@/pages/demo')
          }
        }
      ]
    }
  ]
}

export default options
