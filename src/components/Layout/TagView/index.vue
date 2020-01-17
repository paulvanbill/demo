<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="tags-view-wrapper">
      <el-scrollbar ref="scrollPane" class="scroll-container">
        <router-link
          v-for="tag in tagViews"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag)?'active':''"
          :to="{ path: tag.path }"
          tag="span"
          class="tags-view-item"
          @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          {{ tag.meta.title }}
          <span
            v-if="!tag.meta.affix"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </router-link>
      </el-scrollbar>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags(selectedTag)">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    };
  },
  computed: {
    tagViews() {
      return this.$store.state.tagViews;
    },
    routes() {
      return this.$router;
    }
  },
  watch: {
    $route() {
      this.addTag();
      //this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    this.initTags();
    //this.addTags();
  },
  methods: {
    initTags() {
      /* 把dashboard加上去,待优化 */
      let dashboardTag = {name: 'dashboard', path: '/index/dashboard', meta: {title: 'dashboard', affix: true, requireAuth: true}}
      let {name, path, meta} = this.$route;
      let tag = Object.assign({}, {name, path, meta});
      let tags = new Array();
      tags.push(dashboardTag, tag);
      for(let t of tags) {
        this.$store.dispatch('addTagView', t);
      }
    },
    addTag() {
      let {name, path, meta} = this.$route;
      let tag = Object.assign({}, {name, path, meta});
      if(path.indexOf('/redirect') != 0) {
        this.$store.dispatch('addTagView', tag);
      }
    },
    closeSelectedTag(tag) {
      this.$store.dispatch('delTagView', tag).then(tagViews => {
        if(this.isActive(tag)) {
          this.toLastView(tagViews);
        }
      })
    },
    isActive(tag) {
      return tag.path === this.$route.path
    },
    toLastView(tagViews) {
      if(tagViews.length != 0) {
        let lastView = tagViews.slice(-1)[0];
        this.$router.push(lastView.path);
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    refreshSelectedTag(tag) {
      if(tag.meta.cache) {
        this.$store.dispatch('delCachedView', tag).then(() => {
          this.$nextTick(() => {
            this.$router.push({path: '/redirect' + tag.path})
          })
        })
      }else {
        this.$router.push({path: '/redirect' + tag.path})
      }
    },
    closeOthersTags(tag) {
      this.$store.dispatch('deleteOtherTagView', tag).then(() => {
        if(!this.isActive(tag)) {
          this.$router.push({path: tag.path});
        }
      })
    },
    closeAllTags() {
      this.$store.dispatch('deleteAllTagViews').then(() => {
        console.log(this.tagViews)
        this.toLastView(this.tagViews);
      })
    }
  }

};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}

.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>