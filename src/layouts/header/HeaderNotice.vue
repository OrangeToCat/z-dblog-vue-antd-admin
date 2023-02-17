<template>
  <a-dropdown :trigger="['click']" v-model="show">
    <div slot="overlay">
      <a-spin :spinning="loading">
        <a-tabs class="dropdown-tabs" :tabBarStyle="{ textAlign: 'center' }" :style="{ width: '297px' }">
          <a-tab-pane tab="消息" key="1">
            <a-list class="tab-pane" :data-source="msgData">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta :title="item.nickname" :description="item.createTime">
                  <a-avatar icon="user" alt="头像" style="background-color: white" slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </div>
    <span @click="showNotice" class="header-notice">
      <a-badge class="notice-badge" :count="count">
        <a-icon :class="['header-notice-icon']" type="bell" />
      </a-badge>
    </span>
  </a-dropdown>
</template>

<script>
import { newCommentInfo } from "@/services/comment";

export default {
  name: 'HeaderNotice',
  data() {
    return {
      loading: false,
      show: false,
      msgData: [],
      count: 0
    }
  },
  computed: {
  },
  mounted() {
    this.fetchNotice();

    setTimeout(()=>{
      this.delayLoadMsg();
    },5000);
  },
  methods: {
    showNotice() {


    },
    msgCount() {
      console.log(1);
    },
    fetchNotice() {
      var _this = this;
      if (this.loading) {
        this.loading = false
        return
      }
      if (this.show) return

      this.loading = true
      newCommentInfo(50).then(({ data }) => {
        _this.msgData = data.data.comments;
        _this.count = data.data.total;
        this.loading = false
      });

    },
    delayLoadMsg() {
      setInterval(() => {
        if (this.show) return
        this.fetchNotice();
      }, 5000);
    }
  }
}
</script>

<style lang="less">
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }

  .notice-badge {
    color: inherit;

    .header-notice-icon {
      font-size: 16px;
      padding: 4px;
    }
  }
}

.dropdown-tabs {
  background-color: @base-bg-color;
  box-shadow: 0 2px 8px @shadow-color;
  border-radius: 4px;

  .tab-pane {
    padding: 0 24px 12px;
    min-height: 250px;
  }
}
</style>
