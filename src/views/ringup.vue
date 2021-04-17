<template>
  <div>
    <van-form>
      <van-field
          v-model="phone"
          name="手机号码"
          label="手机号码"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
          @blur="fasong"
      />
      <van-field
          v-model="captcha"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
      />
      <div style="margin: 16px;" @click="submit">
        <van-button round block type="info" style="background-color: #D4473C;border: none">提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex"
import { Notify } from 'vant';
// import {getCaptcha,getCaptchaVerify} from "../api/login"
import {getCaptcha} from "../api/login"
export default {
  name: "register",
  data() {
    return {
      phone: "",
      captcha: ""
    }
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    ...mapActions(['addUser']),
    fasong(){
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if(reg.test(this.phone)){
        getCaptcha({"phone":this.phone}).then((data)=>{
          if(data.code === 200){
            // 成功通知
            Notify({ type: 'success', message: '验证码已发送' });
          }
        })
      }else {
        Notify({ type: 'warning', message: '请输入正确手机号码' });
      }
    },
    submit(){
      this.addUser({"phone":this.phone,"captcha":this.captcha});
    }
  }

}
</script>

<style scoped lang="less">

</style>