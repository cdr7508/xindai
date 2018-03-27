<template>
    <div>
        <div>{{$route.query.modelname}}</div>
        <!--<keep-alive>-->
        <component :is="view" :params="$route.query"></component>
        <!--</keep-alive>-->
    </div>
</template>
<script>
    //    贷款审批、合同用印、权证入库、出账放款、贷后检查、五级分类、档案借出
    import topbarback from '@/components/topbarback/topbarback'
    import daikuanshenpi from '@/components/daikuanshenpi'
    import hetongyongyin from '@/components/hetongyongyin'
    import quanzhengruku from '@/components/quanzhengruku'
    import chuzhangfangkuan from '@/components/chuzhangfangkuan'
    import daihoujiancha from '@/components/daihoujiancha'
    import wujifenlei from '@/components/wujifenlei'
    import danganjiechu from '@/components/danganjiechu'
    import jieqingjieya from '@/components/jieqingjieya'
    import hetongyongyin1 from '@/components/hetongyongyin'
    import p2pkaihuyongyin from '@/components/p2pkaihuyongyin'
    export default {
        components : {
            'v-topbarback' : topbarback,
            daikuanshenpi,
            hetongyongyin,
            quanzhengruku,
            chuzhangfangkuan,
            daihoujiancha,
            wujifenlei,
            danganjiechu,
            jieqingjieya,
            p2pkaihuyongyin
        },
        data(){
            return {

                currentView : this.checkCopm(this.$route.query.modelNo),
            }
        },
        methods : {
            checkCopm(str){
                switch(str){
                    case 'business':
                        this.view = 'daikuanshenpi'
                        break;
                    case 'microPrint':
                        this.view = 'hetongyongyin'
                        break;
                    case 'inStorage':
                        this.view = 'quanzhengruku'
                        break;
                    case 'outOfAccount':
                        this.view = 'chuzhangfangkuan'
                        break;
                    case 'lender':
                        this.view = 'danganjiechu'
                        break;
                    case 'debTransfer':
                        this.view = 'hetongyongyin'
                        break;
                    case 'afterCheck':
                        this.view = 'daihoujiancha'
                        break;
                    case 'classification':
                        this.view = 'wujifenlei'
                        break;
                    case 'outStorage':
                        this.view = 'jieqingjieya'
                        break;
                    case 'archivePrint':
                        this.view = 'p2pkaihuyongyin'
                        break;
                }
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
