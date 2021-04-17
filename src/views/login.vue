<template>
  <div>
    <div class="userfrom">
      <h1>用户登录</h1>
      <div class="form" v-if="!login">
        <div class="username">
          <span class="iconfont icon-denglu1"></span>
          <input type="text" placeholder="输入手机号" v-model="phone" />
        </div>
        <div class="username">
          <span class="iconfont icon-mima"></span>
          <input type="password" placeholder="输入密码" v-model="password" @keyup.13="submit" />
        </div>
        <div class="submit" @click="submit">登录</div>
      </div>
      <div class="chenggong" v-else>
        <h1>已登录</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Notify } from "vant";
import { getlogin } from "../api/login";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["login"]),
  },
  methods: {
    ...mapActions(["logins", "setcookie"]),
    submit() {
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      let reg1 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$.%^&*]+$/;
      if (reg.test(this.phone) && reg1.test(this.password)) {
        getlogin({ phone: this.phone, password: this.password }).then(
          (data) => {
            if (data.code == 200) {
              this.setcookie({ data: data.cookie, name: "cookie" });
              this.setcookie({ data: data.profile, name: "user" });
              this.logins(true);
              this.$router.push({
                path: "/user",
              });
              Notify({ type: "success", message: "登录成功" });
            } else {
              Notify({ type: "warning", message: "登录失败" });
            }
          }
        );
      } else {
        Notify({ type: "warning", message: "账号密码错误" });
      }
      if (!reg.test(this.captcha)) {
        return;
      }
    },
  },
};
</script>

<style scoped lang="less">
.userfrom {
 width: 100%;
 height: 100vh;
  background-color: #d4473c;
  padding-top: 124px;
  box-sizing: border-box;
  h1{
    font-size: 40px;
    color: #fff;
    
  }
}
h1 {
  text-align: center;
  margin-top: 0;
}
input {
  outline: none;
  border: none;
}

.form {
  margin-top: 130px;
  span {
    display: inline-block;
    font-size: 20px;
    margin-left: 15px;
  }
  .username {
    margin: 0 auto;
    margin-bottom: 30px;
    font-size: 20px;
    width: 70%;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    background: #f0f0f0;
    input {
      width: 88%;
      margin-left: 10px;
      background: transparent;
    }
  }
 
  .submit {
    margin: 0 auto;
    margin-top: 30px;
    font-size: 20px;
    width: 60%;
    height: 50px;
    line-height: 50px;
    border-radius: 30px;
    background: #f0f0f0;
    text-align: center;
  }
}
.chenggong {
  margin-top: 100px;
  h1 {
    text-align: center;
  }
}
// .btns {
//   margin: 20px 0;
//   display: flex;
//   justify-content: space-around;

//   div {
//     width: 40%;
//     height: 0.78125rem;
//     line-height: 0.78125rem;
//     font-size: 0.46875rem;
//     font-weight: bold;
//     text-align: center;
//     color: #fff;
//     border: 2px solid #ffc0cb;
//   }

//   .col {
//     background-color: #d4473c;
//     color: #fff;
//   }
// }
// .registerdiv {
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ul {
//     width: 60%;
//     height: 40%;
//     li {
//       width: 100%;
//       height: 20%;
//       line-height: 54px;
//       vertical-align: middle;
//       text-align: center;
//       &:nth-child(even) {
//         border-top: 1px solid #8d8e8f;
//         border-bottom: 1px solid #8d8e8f;
//       }
//     }
//   }
// }
</style>