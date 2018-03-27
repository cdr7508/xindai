<template>
    <header class="bar bar-nav top-bar">
        <span class="goback"  @click="goBack"></span>
        <h1 class="title">{{text}}</h1>
    </header>
</template>

<script>

    export default {
        name : 'topbar',
        props : ['text'],
        methods: {
          goBack () {
            this.$router.goBack()
          }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .goback{
        position:absolute;
        left:0;
        top:0;
        width:2.2rem;
        height:100%;
        background:url(return.svg) 10px center no-repeat;
        background-size:.6rem;
        z-index:100;
    }
    .top-bar{
        height:3.2rem;
    }
    .top-bar .title{
        line-height:3.2rem;
        color:#fff;
    }

</style>
