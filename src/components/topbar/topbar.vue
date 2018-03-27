<template>
    <header class="bar bar-nav top-bar">
        <h1 class="title">{{text}}</h1>
    </header>
</template>

<script>
    export default {
        name : 'topbar',
        props : ['text']
        //  data () {
        //    return {
        //      msg: 'Welcome to Your Vue.js App'
        //    }
        //  }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .top-bar{
        height:3.2rem;
    }
    .top-bar .title{
        line-height:3.2rem;
        color:#fff;
    }
    .foot-bar ~ .content{
        bottom:3.2rem;
    }
</style>
