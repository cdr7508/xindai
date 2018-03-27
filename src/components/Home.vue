<template>
    <div class="page-group">
        <div class="page page-current">

            <!-- 工具栏 -->
            <v-footer></v-footer>
            <!-- 这里是页面内容区 -->
          <!--<keep-alive>-->
            <router-view></router-view>
          <!--</keep-alive>-->


        </div>
    </div>
</template>

<script>
    import Footbar from '@/components/footbar/FootBar'
    export default {
        name : 'home',
        components : {
            'v-footer' : Footbar,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
