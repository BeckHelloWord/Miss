<!--添加银行卡页面 hmc-->
<!--* 验证交易密码接口-->
<!--*-->
<!--h3. * 接口名称：-->
<!--&gt; > 修改交易密码接口-->
<!--h3. * 接口访问地址：-->
<!--&gt; > wd_api/userCenter/checkOutPassword-->
<!--h3. * 接口输入参数：-->
<!--&gt; > outPassword：交易密码-->
<!--h3. * 接口返回参数：-->
<!--&gt; > 返回类型：APIResponse-->
<!--&gt; > > int size：每页显示的记录条数-->
<!--&gt; > > int page：当前多少页-->
<!--&gt; > > long totalCount：总记录条数-->
<!--&gt; > > Object data：List数据对象-->
<!--&gt; > > > 无数据-->
<!--&gt; > > int status：状态码(200：正常，201：验证失败，500：系统异常)-->
<!--&gt; > > String message：需要返回的提示信息-->
<!--&gt; > > boolean isSuccess：接口处理是否成功-->


<template>
  <div class="recharge-all">
    <div id="addBankCard" class="addBankCard">
      <div class="page-part">
        <mt-field label="持卡人" placeholder="请输入持卡人姓名" v-model="realName" :readonly="re"></mt-field>
        <mt-field label="身份证" placeholder="请输入持卡人身份证" v-model="idCard" :readonly="re"></mt-field>
      </div>
      <div class="page-part">
        <div @click="aloneBank"class="selBank">
          <mt-field label="所属银行" placeholder="请选择所属银行" v-model="bankName" readonly="readonly" :class="test"></mt-field>
        </div>
        <mt-field label="银行卡卡号" placeholder="请输入银行卡卡号" v-model="bankAccount"></mt-field>
        <mt-cell title="开户城市" is-link  @click.native="popupVisible4 = true" size="large" class="selCity">
          <span class="bankProvince" >{{ addressProvince }} {{ addressCity }}</span>
        </mt-cell>
        <mt-field label="开户支行" placeholder="请选择开户支行" v-model="bankSubName"></mt-field>
      </div>
      <p class="module-list-p"> * 为了您能顺利提现，请正确填写您的开户信息</p>
      <div :class="btnClass" @click="checkOutPassword">确认</div>
    </div>
    <div v-show="false" id="bankList">
      <bank-list></bank-list>
    </div>
    <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
      <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    </mt-popup>
    <div v-if="getWithDrawVerifyNo" id="getWithDrawVerifyNo">
      <get-add-bank-verify-no></get-add-bank-verify-no>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Field,Cell,Picker,Toast,Popup } from 'mint-ui';
  import bankList from '../../public/bankList';
  import getAddBankVerifyNo from './getAddBankVerifyNo';

  const address = {
    "北京":["北京市"],
    "天津":["天津市"],
    "上海":["上海市"],
    "重庆":["重庆市"],
    "辽宁":["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","阜新市","营口市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"],
    "吉林":["长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州"],
    "黑龙江":["哈尔滨市","齐齐哈尔市","鸡西市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区"],
    "河北":["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"],
    "山西":["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"],
    "河南":["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","省直辖"],
    "山东":["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"],
    "江苏":["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"],
    "安徽":["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","六安市","亳州市","池州市","宣城市"],
    "江西":["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"],
    "浙江":["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"],
    "福建":["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"],
    "广东":["广州市","韶关市","深圳市",
      "珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"],
    "海南":["海口市","三亚市","三沙市","省直辖"],
    "贵州":["贵阳市","六盘水市","遵义市","安顺市","铜仁市","黔西南布依族苗族自治州","毕节市","黔东南苗族侗族自治州","黔南布依族苗族自治州"],
    "云南":["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"],
    "四川":["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州"],
    "湖南":["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州"],
    "湖北":["武汉市","黄石市","十堰市","宜昌市","襄阳市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州","省直辖"],
    "陕西":["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"],
    "甘肃":["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"],
    "青海":["西宁市","海东地区","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州"],
    "内蒙古自治区":["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒盟","阿拉善盟"],
    "西藏自治区":["拉萨市","昌都地区","山南地区","日喀则地区","那曲地区","阿里地区","林芝地区"],
    "新疆维吾尔自治区":["乌鲁木齐市","克拉玛依市","吐鲁番地区","哈密地区","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","阿克苏地区","克孜勒苏柯尔克孜自治州","喀什地区","和田地区","伊犁哈萨克自治州","塔城地区","阿勒泰地区","自治区直辖"],
    "广西壮族自治区":["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"],
    "宁夏回族自治区":["银川市","石嘴山市","吴忠市","固原市","中卫市"],
    "台湾":["台北市","高雄市","基隆市","台中市","台南市","新竹市","嘉义市","省直辖"],
    "香港特别行政区":["香港岛","九龙","新界"],
    "澳门特别行政区":["无堂区划分区域","澳门离岛","澳门半岛"]
  };
  export default {
    components:{
      mtField:Field,
      mtCell:Cell,
      mtPicker:Picker,
      mtPopup:Popup,
      Toast,
      bankList:bankList,
      getAddBankVerifyNo:getAddBankVerifyNo
    },
    data: function() {
      return {
        realName:"",
        idCard: "",
        bankAccount: "",
        bankName:"",
        bankSubName:'',
        addressProvince: '北京',
        addressCity: '北京市',
        mobile:'',
        getWithDrawVerifyNo:false,
        re:false,
        test:"off",
        popupVisible4: false,
        addressSlots: [
          {
            flex: 1,
            values: Object.keys(address),
            className: 'slot1',
            textAlign: 'center',
            defaultIndex:0
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['北京市'],
            className: 'slot3',
            textAlign: 'center',
            defaultIndex:0
          }
        ],
        btnClass:"gary",
      }
    },
    watch:{
      realName:function () {
        this.btnFun();
      },
      idCard:function () {
        this.btnFun();
      },
      bankAccount:function () {
        this.btnFun();
      },
      bankName:function () {
        this.btnFun();
      },
      bankSubName:function () {
        this.btnFun();
      }
    },
    methods: {
      onAddressChange(picker, values) {
        picker.setSlotValues(1, address[values[0]]);
        this.addressProvince = values[0];
        this.addressCity = values[1];
      },
      aloneBank(){
        $("#bankList").show();
        $("#addBankCard").hide();
        window.Hub.$emit('setTitle', "所有支持银行", false, this.closeBankList, " ", null);
      },
      closeBankList(){
        $("#addBankCard").show();
        $("#bankList").hide();
        window.Hub.$emit('setTitle', "添加银行卡", false, null, " ", null)
      },
      // 交易密码验证
      checkOutPassword(){
        if(this.btnClass == "gary"){
          return;
        }
        var sendPwdData = {outPassword:this.password};
        Public.API_GET({
          url : 'checkOutPassword',
          data:sendPwdData,
          success : (result) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }
            $("#addBankCard").hide();
            $("#getAddBankVerifyNo").show();
            this.getWithDrawVerifyNo = true;
          }
        });
      },
      btnFun(){
        if(this.realName != "" && this.idCard != "" && this.bankName != "" && this.bankAccount != "" && this.addressProvince != "" && this.addressCity != "" && this.bankSubName != ""){
          this.btnClass = "red";
        }else{
          this.btnClass = "gary";
          return;
        }
      },
    },
    mounted: function() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "添加银行卡", false, null, " ", null);
      window.Hub.$emit('setFooter', false);

      //如果有手机号直接显示
      if(window.Hub.addBankMobile){
        this.mobile = window.Hub.addBankMobile;
      }
      //已经绑卡名字
      if(window.Hub.addBankRealName){
        this.realName = window.Hub.addBankRealName;
        this.re = true;
      }
      //已经绑卡卡号
      if(window.Hub.addBankIdCard){
        this.idCard = window.Hub.addBankIdCard;
        this.re = true;
      }

      window.Hub.$on('bankName', (event) => {
        this.bankName = event;
        this.test="on";
        $("#addBankCard").show();
        $("#bankList").hide();
        window.Hub.$emit('setTitle', "提现", false, null, " ", null);
      });

      $(".recharge-all").height($(window).height() - 50);//按钮
      $(".picker-slot-wrapper").css({transform: "translate(0px, 72px) translateZ(0px)"});
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../../assets/skin";
  .recharge-all{
    .addBankCard{
      .page-part:nth-child(1){margin-top:pxToRem(20);}
      .page-part:nth-child(2){margin-top:pxToRem(30);}
      .module-list-p {padding: 10px;font-size: pxToRem(24);color:#aaa;}
      .addBankCardBtn{@include btn;}
    }
  .mint-popup{width:100%;}
  .bankProvince{color:#000;}
  .red{@include btn;}
  .gary{@include btn;background:$gary;color:$garyFont;}
  }
</style>

