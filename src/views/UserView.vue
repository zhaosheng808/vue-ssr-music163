<template>
  <div class="user-view">
    <template v-if="user">
      <div class="avatar-box">
        <img :src="user.profile.avatarUrl" alt="">
      </div>
      <h1>User : {{ user.profile.nickname }}</h1>
      <ul class="meta">
        <li><span class="label">Created:</span> {{ user.profile.createTime | timeFormat }}</li>
        <li><span class="label">Birthday:</span> {{ user.profile.birthday | timeFormat }}</li>
        <li v-if="user.profile.signature" v-html="user.profile.signature" class="about"></li>
      </ul>
      <p class="links">
        <a :href="'https://music.163.com/#/user/home?id=' + user.profile.userId" target="_blank">主页</a> |
        <a :href="'https://music.163.com/#/user/event?id=' + user.profile.userId" target="_blank">动态</a>
      </p>
    </template>
    <template v-else-if="user === false">
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>

export default {
  name: 'user-view',

  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    }
  },

  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('FETCH_USER', { id })
  },

  title () {
    return this.user
      ? this.user.profile.nickname
      : 'User not found'
  }
}
</script>

<style lang="stylus">
.user-view
  background-color #fff
  box-sizing border-box
  padding 2em 3em
  .avatar-box
    width 40px
    height 40px
    border-radius 50%
    overflow hidden
    float left
    img
     width 100%
     height 100%
     object-fit cover
  h1
    margin 0 0 0 50px
    font-size 1.5em
    line-height 40px
  .meta
    list-style-type none
    padding 0
  .label
    display inline-block
    min-width 4em
  .about
    margin 1em 0
  .links a
    text-decoration underline
</style>
