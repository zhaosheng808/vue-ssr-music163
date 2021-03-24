<template>
  <li class="news-item">
    <span class="score">{{ item.trackCount }}</span>
    <span class="coverImg"><img :src="item.coverImgUrl" alt=""></span>
      <div class="detail">
          <span class="title">
      <template>
        <router-link :to="'/item/' + item.id">{{ item.name }}</router-link>>
        <span class="host"> ({{ item.coverImgUrl | host }})</span>
      </template>
                  <!--      <template v-else>-->
                  <!--        <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>-->
                  <!--      </template>-->
    </span>
          <br>
          <span class="meta">
      <span v-if="item.type !== 'job'" class="by">
        by <router-link :to="'/user/' + item.creator.userId">{{ item.creator.nickname }} </router-link>
      </span>
      <span class="time">
        {{ item.createTime | timeFormat }}
      </span>
      <span v-if="item.type !== 'job'" class="comments-link">
        | <router-link :to="'/item/' + item.id">{{ item.commentCount }} comments</router-link>
      </span>
    </span>
          <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
      </div>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style lang="stylus">
.news-item
  background-color #fff
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .score
    color #ff6600
    font-size 1.1em
    font-weight 700
    position absolute
    top 50%
    left 0
    width 80px
    text-align center
    margin-top -10px
  .coverImg
    float left
    width 40px
    height 40px
    img
          width 100%
          height 100%
          object-fit cover
  .detail
    margin-left 60px
  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600
</style>
