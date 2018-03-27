<template>
    <div class="page-group">
        <div class="page page-current">
            <header class="bar bar-nav top-bar">
                <img src="../../assets/return.svg" class="back" @click="goBack">
                <p class="title2">同意审批</p>
                <p class="fl-r top-sure" @click="agree">确认</p>
            </header>
            <div class="content">
                    <!--<div>{{$route.params}}</div>-->
                    <!--<div> {{$route.params.modelNo=='outStorage' && $route.params.nodeno=='0040'}}</div>-->
                <!--贷款审批-->
                <div v-if="$route.params.modelNo=='business'" class="text-left bgf">
                        <div class="list-block" v-if="$route.params.nodeno=='0020'||$route.params.nodeno=='0030'||$route.params.nodeno=='0040'||$route.params.nodeno=='0050'||$route.params.nodeno=='0060'">
                            <div class="list-block" v-if="oldpresidentAmount==0">
                                <ul>
                                    <li>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title">申请金额（万元)</div>
                                                <div class="item-myself mutiple">
                                                    <input type="number" v-model="amount">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title"> 申请利率（%）</div>
                                                <div class="item-myself mutiple">
                                                    <input type="number" v-model="rate" >
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title">申请期限（个月）</div>
                                                <div class="item-myself mutiple">
                                                    <input type="number" v-model="maturityDate" >
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="list-block" v-else>
                                <ul>
                                    <li>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title"> 同意金额（万元)</div>
                                                <div class="item-myself mutiple">
                                                    <input type="number" v-model="presidentAmount">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title">同意利率（%）</div>
                                                <div class="item-myself mutiple">
                                                    <input type="number" v-model="presidentRate" >
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title"> 同意期限（个月）</div>
                                                <div class="item-myself mutiple">
                                                    <input type="number" v-model="presidentMonth" >
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    <div v-if="$route.params.nodeno=='0040'" class="mb-10" >
                        <textarea class="input-agreen1" placeholder="批复内容" v-model="replyContent"></textarea>
                    </div>
                </div>
                <!--出帐放款-->
                <div v-if="$route.params.modelNo=='outOfAccount'">
                    <div class="text-left" v-if="$route.params.nodeno=='0020'">
                        <p class="input-wrap">
                            <input type="number" placeholder="实收担保费金额" v-model="guaranteefee" />
                            <span>元</span>
                        </p>
                        <p class="input-wrap">
                            <!--<input type="text" placeholder="请输入实收担保费日期" v-model="guaranteeDate" />-->
                            <mu-date-picker v-model="guaranteeDate" autoOk hintText="担保费实收日期"/>
                            <span>月／日</span>
                        </p>
                    </div>
                    <div class="text-left" v-if="$route.params.nodeno=='0080'">
                        <div class="list-block">
                            <ul>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">放款金额（万元）</div>
                                            <div class="item-myself"><input type="number" placeholder="放款金额" v-model="loanMoney"></div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">放款日期</div>
                                            <div class="item-myself1">
                                                <!--<input type="text" placeholder="请输入放款时间" v-model="guaranteeDate">-->
                                                <mu-date-picker v-model="loanTime" autoOk
                                                        hintText="放款时间"
                                                        inputClass="in"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">放款单位 </div>
                                            <div class="item-myself ">
                                                <div class="select-wrap">
                                                    <select class="select-input" v-model="fangkuanDW" @change="getBank">
                                                        <option value="">选择放款单位 </option>
                                                        <option :value="opt.id" v-for="opt in fangKunDanWei">{{opt.depAlias}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">放款银行</div>
                                            <div class="item-myself">
                                                <div class="select-wrap">
                                                    <select class="select-input" v-model="fangkuanBK">
                                                        <option value="">放款银行 </option>
                                                        <option :value="opt1.id" v-for="opt1 in fangKuanBank">{{opt1.loanAccountName}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="list-block">
                            <ul>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title"> 客户户名</div>
                                            <div class="item-myself">{{name}}</div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">开户行</div>
                                            <div class="item-myself">{{openbank}}</div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">银行卡号</div>
                                            <div class="item-myself">{{bankNo}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--五级分类（classification）-->
                <div v-if="$route.params.modelNo=='classification'">
                    <div class="text-left" v-if="$route.params.nodeno=='0030'">
                        <div class="clearfix wj">
                            <div class="fl">五级分类</div>
                            <div class="fr"><v-select :items="selectoptions" ref="wjOption"></v-select></div>
                        </div>
                    </div>
                </div>

                <!--通用-->
                <div v-if="$route.params.modelNo=='business' || ($route.params.modelNo=='outOfAccount' && $route.params.nodeno=='0020')">
                    <textarea class="input-agreen" placeholder="请输入意见" v-model="desc"></textarea>
                </div>
                <div v-if="$route.params.modelNo!='business' && !($route.params.modelNo=='outOfAccount' && $route.params.nodeno=='0020')">
                    <textarea class="input-agreen" v-model="approvement"></textarea>
                </div>
                <!--权证入库-->
                <div class="text-left" v-if="$route.params.modelNo=='inStorage' && $route.params.nodeno==='0030'">
                    <div class="input-rk">
                        <label>入库编号</label>
                        <input type="text" v-model="instorageNo" ></div>
                    <div v-if="rukuList.length>0">
                        <div class="text-left pd-15 fz-16 c-80 bg-f7">请勾选入库的权证清单</div>
                        <ul class="select-box">
                            <li v-for="(rk,index) in rukuList">
                                <label>{{rk.archives_type_name}}（编号：{{rk.rightNo}}） <input type="checkbox"  v-model="ids" :id="index" :value="rk.id" name="rkchk"><span></span></label>
                            </li>
                        </ul>
                    </div>

                </div>
                <!--合同用印-->
                <div class="text-left bgf clearfix" v-if="$route.params.modelNo=='microPrint' && $route.params.nodeno==='0050'">
                        <div v-for="ht in htList">
                            <div class="agreen-shenpi width-70 pdt-10 pdl-15 c-3d">{{ht.archives_type_name}}</div>
                            <p class=" width-30 text-center fl">
                            <span class="up-box"><input type="file"  @change="upfile($event,ht)">
                                <img class="by-img" src="../../assets/operation_upload.svg" >
                            </span>
                            </p>
                        </div>
                </div>

                <!--P2P开户用印-->
                <div class="text-left bgf clearfix" v-if="$route.params.modelNo=='archivePrint' && $route.params.nodeno==='0050'">
                        <div v-for="p2p in needArchiveList">
                            <div class="agreen-shenpi width-70 pdt-10 pdl-15 c-3d">{{p2p.archives_type_name}}</div>
                            <p class=" width-30 text-center fl">
                            <span class="up-box"><input type="file"  @change="upfile($event,p2p)">
                                <img class="by-img" src="../../assets/operation_upload.svg" >
                            </span>
                            </p>
                        </div>
                </div>

                <!--结清解压-->

            <div class="text-left bgf clearfix" v-if="$route.params.modelNo=='outStorage' && $route.params.nodeno=='0040'">
                <!--<div v-if="jieQingList.length>0">-->
                <div v-for="jq in jieQingList">
                    <div class="agreen-shenpi width-70 pdt-10 pdl-15 c-3d">{{jq.archives_type_name}}</div>
                    <p class=" width-30 text-center fl">
                            <span class="up-box"><input type="file" @change="upfile($event,jq)"><img class="by-img" src="../../assets/operation_upload.svg" >
                            </span>
                    </p>
                    <!--</div>-->
                </div>
            </div>
            <div class="bg-gray"></div>
                <!--lodading-->
                <div class="loading-box" v-show="uptrue">
                    <div class="loading"><img src="../../assets/loading.gif"><span>上传中</span></div>
                </div>
                <div class="loading2" v-show="load">
                    <div class="preloader"></div>
                    <span class="vm">加载中...</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@/config/config'
    import select from '@/components/select/select'
    import check from '@/util/check'
    import getuser from '@/util/getuser'
    import {format} from '@/util/format.js';
    import Vue from 'vue'
    import MuseUI from 'muse-ui'
//    import 'muse-ui/dist/muse-ui.css'
    Vue.use(MuseUI)
    export default {
        components:{
            'v-select':select
        },
        data(){
            return {
                selectoptions:['选择分类','正常','关注','次级','可疑','损失'],
                uptrue:false,
                wjSelect:'',
                fangKunDanWei:[],
                fangKuanBank: [],
                fangkuanDW:'',
                fangkuanBK:'',
                approvement:'同意',
                ids:[],
                guaranteeDate:''+this.getToday(),
                guaranteefee_real:0,
                instorageNo:'',
                presidentAmount:'',
                presidentRate:'',
                presidentMonth:'',
                amount:'',
                rate:'',
                maturityDate:'',
                replyContent:'',
                five_state_final:'',
                five_stage_initial:'',
                loanTime:'',
                loanMoney:'',
                oldloanMoney:'',
                loanDepart:'',
                loanAccount:'',
                oldAmount:'',
                oldpresidentAmount:'',
                name:'',
                openbank:'',
                bankNo:'',
                source:0,
                rukuList:[],
                htList:[],
                needArchiveList:[],
                jieQingList:[],
                isClick:false,
                guaranteefee:'',
                oldguaranteefee:'',
                instorageNo:'',
                load:false
            };
        },
        mounted(){

            if(this.$route.params.modelNo=='outOfAccount' && this.$route.params.nodeno=='0080'){
                this.getUnit()
            }
            if(this.$route.params.modelNo=='business'){
                this.getBusiInfo();
            }
            if(this.$route.params.modelNo=='outOfAccount'){
                this.getOutAccount();
                if(this.$route.params.nodeno=='0080'){
                    this.getUserInfo();
                }
            }
            if(this.$route.params.modelNo=='microPrint'){

                if(this.$route.params.nodeno=='0050'){
                    this.getHetong()
                }
            }
            //P2P开户用印
            if(this.$route.params.modelNo=='archivePrint'){

                if(this.$route.params.nodeno=='0050'){
                    this.getP2P()
                }
            }
            //入库
            if(this.$route.params.modelNo=='inStorage' && this.$route.params.nodeno==='0030'){
                    this.getRuKu()
            }
            //结清
            if(this.$route.params.modelNo=='outStorage' && this.$route.params.nodeno==='0040'){
                    this.getJieQing()
            }
            //五级分类
            if(this.$route.params.modelNo=='classification'){
                    this.getWjflInitStatus()
            }

        },
        methods : {
            goBack () {
                this.$router.goBack()
            },
            getUnit(){

                this.$http.post(config.baseUrl+'/app/queryOwnOrgList.do', {
                   'userId':getuser().id
                }, {
                    headers: {},
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    this.fangKunDanWei = response.data.list
                    console.log(this.fangKunDanWei);

                }, function(err) {
                    console.log(response);
                    this.$router.replace({ path: '/login/go' })
                });
            },
            getUserInfo(){
                var cusId= this.$route.params.custId
                this.$http.post(config.baseUrl+'/app/readCustInfoStatistics.do', {
                    'custId':this.$route.params.custId
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    console.log(response);
                    if(response.data.data.type==1){
                        this.name=response.data.data.name
                        this.openbank=response.data.data.openbank
                        this.bankNo=response.data.data.bankNo
                    } else{
                        this.name=response.data.data.name
                        this.openbank=response.data.data.openbank1
                        this.bankNo=response.data.data.bankName1
                    }
                    console.log(this.openbank);
                    console.log(this.bankNo);

                }, function(err) {
                    console.log(err);
                    this.$router.replace({ path: '/login/go' })
                });

            },
            getBank(){

                console.log(this.fangkuanDW);
                var cusId= this.$route.params.custId
                if(this.fangkuanDW){
                    this.$http.post(config.baseUrl+'/app/getAccountById.do', {
                        'departId':this.fangkuanDW
                    }, {
                        headers: {
                        },
                        emulateJSON: true
                    }).then(function(response) {
                        if(response.data.code ==1001){
                            this.$router.replace({ path: '/login/go' })
                        }
                        console.log(response.data.list);
                        if(response.data.statusCode==200){
                            this.fangKuanBank = response.data.list
                        }else{
                            layer.open({
                                content:err.message,
                                btn:['知道了']
                            })
                        }
                    }, function(err) {
                        this.$router.replace({ path: '/login/go' })
                    });
                }



            },
            getBusiInfo(){
                this.$http.post(config.baseUrl+'/app/businessSignDealnew.do', {
                    'busiId':this.$route.params.busiId
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                       console.log(response.data.data);
                    let data = response.data.data;
                    this.presidentAmount=data.presidentAmount;
                    this.oldpresidentAmount=data.presidentAmount;
                    this.presidentRate=data.presidentRate;
                    this.presidentMonth=data.presidentMonth;
                    this.amount=data.amount;
                    this.oldAmount=data.amount;
                    this.rate=data.rate;
                    this.maturityDate=data.maturityDate;

                });

            },
            getWjflInitStatus(){
                this.$http.post(config.baseUrl+'/app/queryBusinessFiveStateList.do', {
                    'busiId':this.$route.params.busiId,
                    'objectNo':this.$route.params.objectNo
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    if(response.data.statusCode==200){
                        var result = response.data.list;
                        this.five_stage_initial = result[0].five_stage_initial;
                    }

                }, function(response) {
                    this.$router.replace({ path: '/login/go' })
                });
            },
            agree(){
//                console.log('save');
//                console.log(this.oldAmount);
//              console.log(this.getToday());
//              var now = new Date().getTime();
//              console.log(now);
//              console.log(new Date('2017-01-12').getTime());

                 if(this.$route.params.modelNo=='classification' && this.$route.params.nodeno=='0030'){
                        var selected=this.$refs.wjOption.selected;

                        switch(selected){
                            case '选择分类':
                                this.five_state_final=0
                                break;
                            case '正常':
                                this.five_state_final=1
                                break;
                            case '关注':
                                this.five_state_final=2
                                break;
                            case '次级':
                                this.five_state_final=3
                                break;
                            case '可疑':
                                this.five_state_final=4
                                break;
                            case '损失':
                                this.five_state_final=5
                                break;
                        }
                        if(this.five_state_final==0){
                            layer.open({
                                    content:'请选择最终分类',
                                    btn:['知道了']
                                })
                                return
                        }
                        if(this.five_state_final<this.five_stage_initial){
                            layer.open({
                                    content:'不可高于初级分类',
                                    btn:['知道了']
                                })
                                return
                        }
                                
                    }
                    if(this.$route.params.modelNo=='outOfAccount' && this.$route.params.nodeno=='0020'){
                     console.log(this.guaranteeDate);
                     console.log(parseFloat(this.guaranteefee));
                     console.log(parseFloat(this.oldguaranteefee));

                        var re=/^\d+(\.\d+)?$/;
                        if(!this.guaranteefee){
                            layer.open({
                                content:'请填写金额',
                                btn:['知道了']
                            })
                            return
                        }else if(!re.test(this.guaranteefee)){
                            layer.open({
                                content:'金额不是数字',
                                btn:['知道了']
                            })
                            return
                        }else if(parseFloat(this.guaranteefee) < parseFloat(this.oldguaranteefee)){
                            layer.open({
                                content:'金额不能小于'+this.oldguaranteefee,
                                btn:['知道了']
                            })
                            return
                        }
                      var now = new Date().getTime();

                        if(!this.guaranteeDate || this.guaranteeDate==''){
                            layer.open({
                                content:'请选择日期',
                                btn:['知道了']
                            })
                            return
                        }else if(new Date(this.guaranteeDate).getTime()-now>0){
                          layer.open({
                            content:'日期不能大于今天',
                            btn:['知道了']
                          })
                          return
                        }
                        this.approvement = this.desc;
                        this.guaranteefee_real = this.guaranteefee;
                    }
                    if(this.$route.params.modelNo=='outOfAccount' && this.$route.params.nodeno=='0080'){
                        var re=/^\d+(\.\d+)?$/;
                        if(!re.test(this.loanMoney)){
                            layer.open({
                                content:'金额不是数字',
                                btn:['知道了']
                            })
                            return
                        }

                        if(parseFloat(this.loanMoney)< 0.01 || parseFloat(this.loanMoney)>parseFloat(this.oldloanMoney)){
                            layer.open({
                                content:'金额不能小于0大于'+this.oldloanMoney+'万元',
                                btn:['知道了']
                            })
                            return
                        }
                        if(!this.loanTime || this.loanTime==''){
                            layer.open({
                                content:'请选择日期',
                                btn:['知道了']
                            })
                            return
                        }

                        if(!this.fangkuanDW){
                            layer.open({
                                content:'请选择放款单位',
                                btn:['知道了']
                            })
                            return
                        }
                        if(!this.fangkuanBK){
                            layer.open({
                                content:'请选择放款银行',
                                btn:['知道了']
                            })
                            return
                        }
                        console.log(this.loanTime);
                        console.log(this.loanMoney);

                    }
                    if(this.$route.params.modelNo=='business'){
                        var re=/^\d+(\.\d+)?$/;
                        if(this.$route.params.nodeno=='0020'||this.$route.params.nodeno=='0030'||this.$route.params.nodeno=='0040'||
                            this.$route.params.nodeno=='0050'||this.$route.params.nodeno=='0060'){
                            if(this.presidentAmount==0){
                                if(!re.test(this.amount)){
                                    layer.open({
                                        content:'金额只能是数字',
                                        btn:['知道了']
                                    })
                                    return
                                }else if(!re.test(this.rate) || !re.test(this.maturityDate)){
                                    layer.open({
                                        content:'只能是数字',
                                        btn:['知道了']
                                    })
                                    return
                                }else if((parseFloat(this.amount)- parseFloat(this.oldAmount))>0 || parseFloat(this.amount)<0.01){
                                    console.log('no');
                                    layer.open({
                                        content:'金额不能小于0或大于'+this.oldAmount,
                                        btn:['知道了']
                                    })
                                    return
                                }else{
                                    this.presidentAmount = this.amount;
                                    this.presidentRate =this.rate;
                                    this.presidentMonth = this.maturityDate;
                                }

                            }else{

                                if(!re.test(this.presidentAmount)){
                                    layer.open({
                                        content:'金额只能是数字',
                                        btn:['知道了']
                                    })
                                    return
                                }else if(!re.test(this.presidentMonth) || !re.test(this.presidentRate)){
                                    layer.open({
                                        content:'只能是数字',
                                        btn:['知道了']
                                    })
                                    return
                                }else if(parseFloat(this.presidentAmount)> parseFloat(this.oldpresidentAmount) || parseFloat(this.presidentAmount)<0.01){
                                    layer.open({
                                        content:'金额不能小于0或大于'+this.oldpresidentAmount,
                                        btn:['知道了']
                                    })
                                    return
                                }else{
                                    this.presidentAmount = this.presidentAmount;
                                    this.presidentRate =this.presidentRate;
                                    this.presidentMonth = this.presidentMonth;
                                }
                            }
                        }
                        this.approvement = this.desc;
                    }
                    if(!this.approvement){
                        layer.open({
                            content:'请填写意见',
                            btn:['知道了']
                        })
                        return
                    }
                if(this.$route.params.modelNo=='inStorage' && this.$route.params.nodeno==='0030'){
                    if(this.ids.length<1){
                        layer.open({
                            content:'请至少选择一项',
                            btn:['知道了']
                        })
                        return
                    }
                }
//                console.log(this.loanMoney);
//                console.log(this.loanTime );
//                console.log(this.guaranteeDate );
//                return ;
//                console.log(this.approvement);
//                return ;
//                if(this.isClick===false){

//                    this.isClick =true;

                    var _this = this;
                    this.load=true;
                    this.$http.post(config.baseUrl+'/app/submitFlow.do', {
                        'id':getuser().id,
                        'busiId':this.$route.params.busiId,
                        'objectNo':this.$route.params.objectNo,
                        'result':'agree',
                        'modelNo':this.$route.params.modelNo,
                        'paramMap.approvement':this.approvement,
//                        'ids':check_val.toString(),
                        'ids':this.ids.toString(),
                        'paramMap.instorageNo':this.instorageNo,
                        'paramMap.guaranteeDate':this.guaranteeDate,
                        'paramMap.guaranteefee_real':this.guaranteefee_real,
                        'paramMap.instorageNo':this.instorageNo,
                        'paramMap.presidentAmount':this.presidentAmount,
                        'paramMap.presidentRate':this.presidentRate,
                        'paramMap.presidentMonth':this.presidentMonth,
                        'paramMap.replyContent':this.replyContent,
                        'paramMap.five_state_final':this.five_state_final,
                        'paramMap.loanTime':this.loanTime,
                        'paramMap.loanMoney':this.loanMoney,
                        'paramMap.loanDepart':this.fangkuanDW,
                        'paramMap.loanAccount':this.fangkuanBK,
                        'paramMap.source':this.checkSource(),
                    }, {
                        headers: {
                        },
                        emulateJSON: true
                    }).then(function(response) {
                        this.load=false;
                        if(response.data.code ==1001){
                            this.$router.replace({ path: '/login/go' })
                        }

                        if(response.data.statusCode==200){
                            layer.open({
                                content:response.data.message,
                                btn:['知道了'],
                                yes:function(index){
                                    _this.$router.push({ path: '/home/task' });
                                    layer.close(index);
                                }
                            })
                        }else if(response.data.statusCode==0){
                            layer.open({
                                content:response.data.message,
                                btn:['知道了'],
                                yes:function(index){
                                    _this.$router.push({ path: '/home/task' });
                                    layer.close(index);
                                }
                            })
                        }
                    }, function(err) {
                        this.$router.replace({ path: '/login/go' })
                    });

//                }

            },
            getOutAccount(){
                var _this = this
                this.$http.post(config.baseUrl+'/app/outOfAccountSignDealnew.do', {
                    'id':getuser().id,
                    'busiId':this.$route.params.busiId,
                    'objectNo':this.$route.params.objectNo,
                    'modelNo':this.$route.params.modelNo,
                    'flag':1
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    console.log(response.data.data);
                    let data = response.data.data;
                    _this.loanMoney=data.loanMoney;
                    _this.oldloanMoney=data.loanMoney;
                    _this.guaranteefee= data.guaranteefee?data.guaranteefee:0;
                    _this.oldguaranteefee=data.guaranteefee?data.guaranteefee:0;;
                    _this.presidentMonth=data.maturityDate;
//                    _this.guaranteeDate=data.guaranteeDate;

                }, function(err) {
                    console.log(err);
                    this.$router.replace({ path: '/login/go' })
                });

            },
            getHetong(){
                this.$http.post(config.baseUrl+'/app/microPrintDealnew.do', {
                    'id':getuser().id,
                    'busiId':this.$route.params.busiId,
                    'nodeno':this.$route.params.nodeno,
                    'objectNo':this.$route.params.objectNo,
                    'modelNo':this.$route.params.modelNo,
                    'status':'active',
                    'flag':1
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    console.log('ht:'+response.data.list);
                    this.htList=response.data.list

                }, function(err) {
                    console.log(err);
                    this.$router.replace({ path: '/login/go' })
                });

            },
            getP2P(){
                this.$http.post(config.baseUrl+'/app/archivePrintDealnew.do', {
                    'id':getuser().id,
                    //'busiId':this.$route.params.busiId,
                    'nodeno':this.$route.params.nodeno,
                    'objectNo':this.$route.params.objectNo,
                    'modelNo':this.$route.params.modelNo,
                    'status':'active',
                    //'flag':1
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    this.needArchiveList=response.data.needArchiveList

                }, function(err) {
                    console.log(err);
                    this.$router.replace({ path: '/login/go' })
                });

            },
            getJieQing(){
                this.$http.post(config.baseUrl+'/app/outstorageDealnew.do', {
                    'id':getuser().id,
                    'busiId':this.$route.params.busiId,
                    'nodeno':this.$route.params.nodeno,
                    'objectNo':this.$route.params.objectNo,
                    'modelNo':this.$route.params.modelNo,
                    'status':this.$route.params.status,
                    'flag':1
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    this.jieQingList=response.data.list
                }, function(err) {
                    console.log(err)
                    this.$router.replace({ path: '/login/go' })
                });

            },
            getRuKu(){
                this.$http.post(config.baseUrl+'/app/instorageDealnew.do', {
                    'id':getuser().id,
                    'busiId':this.$route.params.busiId,
                    'objectNo':this.$route.params.objectNo,
                    'modelNo':this.$route.params.modelNo,
                    'nodeno':this.$route.params.nodeno,
                    'flag':1
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    console.log(response);
                    this.rukuList=response.data.list

                }, function(err) {
                    console.log(err);
                    this.$router.replace({ path: '/login/go' })

                });

            },
            getXHR(){
                var xhr = null;
                if(window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    try {
                        xhr = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        try {
                            xhr = new ActiveXObject("Microsoft.XMLHTTP");
                        } catch (e) {
                            alert("您的浏览器暂不支持Ajax!");
                        }
                    }
                }
                return xhr;
            },
            upfile($event,item){
                this.uptrue=true;
                var files = event.target.files;
                let file = event.target.files[0];
                let formData = new FormData(); //创建form对象
                formData.append('file',file,file.name);//通过append向form对象添加数据
                console.log(formData.get('file'));

                formData.append('levelOne', item.archives_type_parent );
                formData.append('levelTwo', item.archives_type_id );
                formData.append('custId', this.$route.params.custId );
                formData.append('content', '' );
                formData.append('projectId', this.$route.params.busiId );
                formData.append('belongOne', '' );
                formData.append('belongTwo', '' );
                formData.append('userId', this.$store.state.userinfo.id );

                var xhr = this.getXHR();
                xhr.withCredentials = true;
                var _this = this
                console.log(_this);
                xhr.open("POST", config.baseUrl + '/app/dealLotPictureUpload.do',formData, true);
                var  _this=this;
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            _this.uptrue=false;
                            console.log(xhr.responseText);
                            var  res = JSON.parse(xhr.responseText)
                            if(res.statusCode==200){
                                layer.open({
                                    content:'上传成功',
                                    btn:['知道了'],
                                    yes:function(index){
                                        console.log(this);
                                        layer.close(index);

                                        if(_this.$route.params.modelNo=='outStorage'
                                            && _this.$route.params.nodeno==='0040'){
                                            _this.getJieQing()
                                        }
                                        if(_this.$route.params.modelNo=='microPrint'
                                            && _this.$route.params.nodeno=='0050'){
                                            _this.getHetong();
                                        }
                                        if(_this.$route.params.modelNo=='p2pkaihuyongyin'
                                            && _this.$route.params.nodeno=='0050'){
                                            _this.getP2P();
                                        }


                                    }
                                })
                            }else{
                                _this.uptrue=false;
                                layer.open({
                                    content:'上传失败',
                                    btn:['知道了']
                                })
                            }

                        } else {
                            console.log(xhr.status);
                            layer.open({
                                content:'上传失败',
                                btn:['知道了']
                            })
                        }
                    }
                }


                // 发送表单数据
                xhr.send(formData);

            },
            checkSource(){
                var browser={
                    versions:function(){
                        var u = navigator.userAgent, app = navigator.appVersion;
                        return {
                            trident: u.indexOf('Trident') > -1, //IE内核
                            presto: u.indexOf('Presto') > -1, //opera内核
                            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                            iPad: u.indexOf('iPad') > -1, //是否iPad
                            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                            qq: u.match(/\sQQ/i) == " qq" //是否QQ
                        };
                    }(),
                    language:(navigator.browserLanguage || navigator.language).toLowerCase()
                }
                if(browser.versions.android){
                    return 1;
                }else if(browser.versions.ios){
                    return 2;
                }else{
                    return 0;
                }
            },
          getToday(){
                var now = new Date();
                var m=this.fixZero(now.getMonth()+1);
                var d =this.fixZero(now.getDate())
                return now.getFullYear()+'-'+m+'-'+d;
          },
          fixZero(p) {
            var str = '' + p;
            if (str.length == 1) {
              str = '0' + str;
            }
            return str;
          }
        },
        computed:{
            desc(){
                if(this.$route.params.modelNo=='business'){
                    if(this.$route.params.nodeno=='0020'||this.$route.params.nodeno=='0030'||this.$route.params.nodeno=='0040'||this.$route.params.nodeno=='0050'||this.$route.params.nodeno=='0060'){
                        if(this.presidentAmount==0){
                            return '同意金额：'+
                            this.amount+'万元，期限：'+
                            this.maturityDate+ '个月，利率：'+this.rate+'%'
                        }else{
                            return '同意金额：'+
                            this.presidentAmount+'万元，期限：'+
                            this.presidentMonth+ '个月，利率：'+this.presidentRate+'%'
                        }
                        
                    }

                }else if(this.$route.params.modelNo=='outOfAccount' && this.$route.params.nodeno=='0020'){
                    return '担保费实收金额：'+
                        this.guaranteefee+'元，担保费实收日期：'+
                        this.guaranteeDate
                }else{
                    return '同意';
                }

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input:focus,input:active{
        border-bottom:1px solid #ccc;
    }
    .back{
        position:absolute;
        left:.4rem;
        top:50%;
        width:.7rem;
        margin-top:-.7rem;
    }
    .top-bar{
        height:3.2rem;
    }
    .top-bar .title{
        line-height:3.2rem;
        color:#fff;
    }
    .top-bar .title2{
        position:absolute;
        left:1.6rem;
        top:0;
        font-size:.85rem;
        line-height:3.2rem;
        color:#ffffff;
    }
    .top-sure{
        font-size:.85rem;
        line-height:3.2rem;
        color:#ffffff;
    }
    .input-wrap{
        width:100%;
        height:2.5rem;
        line-height:2.3rem;
        border-bottom:1px solid #e5e5e5;
        background: #fff;
        position:relative;
    }
    .input-wrap input{
        border:0;
        font-size:.7rem;
        color: #666;
        padding-left:1rem;
    }
    .input-wrap span{
        position:absolute;
        right:1rem;
        top: .5rem;
        font-size:.8rem;
        color: #3D3D3D;
    }
    .select-box li{
        font-size:.8rem;
        color:#3d3d3d;
        background-color:#fff;
        border-bottom:1px solid #e5e5e5;
        padding:.8rem 0;
        line-height:1.8;

        position:relative;
    }
    .select-box li:last-child{
        border-bottom:none;
    }
    .select-box li label{
        width:80%;
        height:100%;
        display:block;
        padding:0 .75rem;
    }
    .select-box li input{
        opacity:0;
    }
    .select-box li input ~ span{
        position:absolute;
        right:1rem;
        top:.7rem;
        width:1rem;
        height:1rem;
        display:inline-block;
        background:url(business_select.svg) 0 0 no-repeat;
        background-size:1rem;
    }
    .select-box li input:checked ~ span{
        position:absolute;
        right:1rem;
        top:.7rem;
        width:1rem;
        height:1rem;
        display:inline-block;
        background:url(business_selected.svg) 0 0 no-repeat;
        background-size:1rem;
    }
    .list-block{
        margin:.75rem 0;
        font-size:.85rem;
    }
    .list-block .item-title{
        min-width:50%;
    }
    .list-block .item-myself{
        max-width:50%;
        white-space:nowrap;
        /*overflow:hidden;*/
        text-overflow:ellipsis;
    }
    .list-block .item-myself1{
        width:5.2rem;
        white-space:nowrap;
        /*overflow:hidden;*/
        text-overflow:ellipsis;
    }
    .list-block .item-myself.mutiple{
        max-width:50%;
        white-space:normal;
        font-size:.6rem;
    }
    .list-block ul:before{
        display:none;
    }
    .list-block ul:after{
        display:none;
    }
    .list-block .item-content{
        padding-left:0;
    }
    .list-block .item-inner{
        padding-left:.75rem;
    }
    .color-80{
        color:#808080;
    }
    .select-wrap{
        height:2.2rem;
        line-height:2.2rem;
        position:relative;
        padding-right:1.5rem;
    }
    .select-wrap:after{
        content:'';
        position:absolute;
        right: .2rem;
        top: .6rem;
        width:12px;
        height:12px;
        border-left:1px solid #ccc;
        border-bottom:1px solid #ccc;
        transform:rotate(-45deg);
    }
    .select-input{
        width:100%;
        height:2.2rem;
        line-height:2.2rem;
        display:block;
        border:0;
        font-size:.8rem;
        background:none;

    }
    .item-myself input{
        text-align: right;
    }
    .up-box{
        display:inline-block;
        width:2.5rem;
        height:2.5rem;
        position:relative;
    }
    .up-box img{
        position:absolute;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
        z-index:0;
    }.up-box input{
        position:absolute;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
        z-index:1;
        opacity:0;
    }
    .mb-10{ margin-bottom:1rem;}
    .wj{
        background: #fff;
        padding:0 .75rem;
        height:2.2rem;
        line-height:2.2rem;
        margin-bottom:.7rem;
    }
    .wj .fl{
        width:60%;
    }.wj .fr{
        width:40%;
    }
    .loading-box{
        position:fixed;
        width:100%;
        height:100%;
        left: 0;
        top: 0;
        z-index:10000;
        background-color:rgba(0,0,0,0.7);
    }
    .loading{
        width:120px;
        height:50px;
        line-height:50px;
        background-color:#fff;
        position:fixed;
        left: 50%;
        top: 50%;
        margin-left:-60px;
        margin-top:-25px;
        border-radius:5px;
        color: #333;
    }
    .loading img{
        width:32px;
        height:32px;
        vertical-align:middle;
        margin-right:10px;
    }
    .input-rk{
        padding:.75rem;
        background: #fff;
        overflow:hidden;
    }
    .input-rk label{
        float:left;
        width:35%;
        height:2rem;
        line-height:2rem;
        font-size:.8rem;
    }
    .input-rk input{
        float:left;
        width:60%;
        height:1.6rem;
        border:1px solid #ddd;
        border-radius:5px;
        padding-left:.4rem;
    }
    .mu-date-picker {
     display: inline-block;
     position: relative;
     width: 115px!important;
     margin-left: 1rem;
    margin-top:.4rem;
 }
    .mu-text-field{
        width: 115px!important;
    }
    .loading2{
        position:fixed;
        z-index:9999;
        width:100%;
        left: 0;
        bottom:40%;
    }
    .loading2 div{vertical-align:middle;}
    .vm{ vertical-align:middle;}
</style>
