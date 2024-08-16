<template>
  <!--  loading  -->
  <div id="love_loading" class="position-fixed top-0 start-0 w-100 h-100">
      <ul class="m-0 p-0">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
      </ul>
  </div>
  <!--  loading end  -->
</template>

<script>
export default {

}
</script>

<style scoped>
/* 加载动画样式 */
#love_loading {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex; /*弹性盒模型*/
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center; /*主轴方向居中显示*/
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center; /*交叉轴方向居中显示*/
    height: 100vh;
    background-color: #232e6d;
    z-index: 999999;
}

#love_loading ul {
    height: 0;
}

#love_loading li {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 10px;
}

#love_loading li:nth-child(1) {
    background-color: #f62e74;
    -webkit-animation: love1 4s infinite;
    -moz-animation: love1 4s infinite;
    -o-animation: love1 4s infinite;
    animation: love1 4s infinite;
}

#love_loading li:nth-child(2) {
    background-color: #f45330;
    -webkit-animation: love2 4s infinite;
    -moz-animation: love2 4s infinite;
    -o-animation: love2 4s infinite;
    animation: love2 4s infinite;
    -webkit-animation-delay: 0.15s;
    -moz-animation-delay: 0.15s;
    -o-animation-delay: 0.15s;
    animation-delay: 0.15s;
}

#love_loading li:nth-child(3) {
    background-color: #ffc883;
    -webkit-animation: love3 4s infinite;
    -moz-animation: love3 4s infinite;
    -o-animation: love3 4s infinite;
    animation: love3 4s infinite;
    -webkit-animation-delay: 0.3s;
    -moz-animation-delay: 0.3s;
    -o-animation-delay: 0.3s;
    animation-delay: 0.3s;
}

#love_loading li:nth-child(4) {
    background-color: #30d268;
    -webkit-animation: love4 4s infinite;
    -moz-animation: love4 4s infinite;
    -o-animation: love4 4s infinite;
    animation: love4 4s infinite;
    -webkit-animation-delay: 0.45s;
    -moz-animation-delay: 0.45s;
    -o-animation-delay: 0.45s;
    animation-delay: 0.45s;
}

#love_loading li:nth-child(5) {
    background-color: #006cb4;
    -webkit-animation: love5 4s infinite;
    -moz-animation: love5 4s infinite;
    -o-animation: love5 4s infinite;
    animation: love5 4s infinite;
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    -o-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

#love_loading li:nth-child(6) {
    background-color: #784697;
    -webkit-animation: love4 4s infinite;
    -moz-animation: love4 4s infinite;
    -o-animation: love4 4s infinite;
    animation: love4 4s infinite;
    -webkit-animation-delay: 0.75s;
    -moz-animation-delay: 0.75s;
    -o-animation-delay: 0.75s;
    animation-delay: 0.75s;
}

#love_loading li:nth-child(7) {
    background-color: #ffc883;
    -webkit-animation: love3 4s infinite;
    -moz-animation: love3 4s infinite;
    -o-animation: love3 4s infinite;
    animation: love3 4s infinite;
    -webkit-animation-delay: 0.9s;
    -moz-animation-delay: 0.9s;
    -o-animation-delay: 0.9s;
    animation-delay: 0.9s;
}

#love_loading li:nth-child(8) {
    background-color: #f45330;
    -webkit-animation: love2 4s infinite;
    -moz-animation: love2 4s infinite;
    -o-animation: love2 4s infinite;
    animation: love2 4s infinite;
    -webkit-animation-delay: 1.05s;
    -moz-animation-delay: 1.05s;
    -o-animation-delay: 1.05s;
    animation-delay: 1.05s;
}

#love_loading li:nth-child(9) {
    background-color: #f62e74;
    -webkit-animation: love1 4s infinite;
    -moz-animation: love1 4s infinite;
    -o-animation: love1 4s infinite;
    animation: love1 4s infinite;
    -webkit-animation-delay: 1.2s;
    -moz-animation-delay: 1.2s;
    -o-animation-delay: 1.2s;
    animation-delay: 1.2s;
}

@-webkit-keyframes love1 {
    30%, 50% {
        height: 60px;
        -webkit-transform: translateY(-30px);
        transform: translateY(-30px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@-moz-keyframes love1 {
    30%, 50% {
        height: 60px;
        -moz-transform: translateY(-30px);
        transform: translateY(-30px);
    }
    75%, 100% {
        height: 20px;
        -moz-transform: translateY(0);
        transform: translateY(0);
    }
}

@-o-keyframes love1 {
    30%, 50% {
        height: 60px;
        -o-transform: translateY(-30px);
        transform: translateY(-30px);
    }
    75%, 100% {
        height: 20px;
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}

@keyframes love1 {
    30%, 50% {
        height: 60px;
        -webkit-transform: translateY(-30px);
        -moz-transform: translateY(-30px);
        -o-transform: translateY(-30px);
        transform: translateY(-30px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}

@-webkit-keyframes love2 {
    30%, 50% {
        height: 125px;
        -webkit-transform: translateY(-62.5px);
        transform: translateY(-62.5px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

}

@-moz-keyframes love2 {
    30%, 50% {
        height: 125px;
        -moz-transform: translateY(-62.5px);
        transform: translateY(-62.5px);
    }
    75%, 100% {
        height: 20px;
        -moz-transform: translateY(0);
        transform: translateY(0);
    }

}

@-o-keyframes love2 {
    30%, 50% {
        height: 125px;
        -o-transform: translateY(-62.5px);
        transform: translateY(-62.5px);
    }
    75%, 100% {
        height: 20px;
        -o-transform: translateY(0);
        transform: translateY(0);
    }

}

@keyframes love2 {
    30%, 50% {
        height: 125px;
        -webkit-transform: translateY(-62.5px);
        -moz-transform: translateY(-62.5px);
        -o-transform: translateY(-62.5px);
        transform: translateY(-62.5px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);
    }

}

@-webkit-keyframes love3 {
    30%, 50% {
        height: 160px;
        -webkit-transform: translateY(-75px);
        transform: translateY(-75px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@-moz-keyframes love3 {
    30%, 50% {
        height: 160px;
        -moz-transform: translateY(-75px);
        transform: translateY(-75px);
    }
    75%, 100% {
        height: 20px;
        -moz-transform: translateY(0);
        transform: translateY(0);
    }
}

@-o-keyframes love3 {
    30%, 50% {
        height: 160px;
        -o-transform: translateY(-75px);
        transform: translateY(-75px);
    }
    75%, 100% {
        height: 20px;
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}

@keyframes love3 {
    30%, 50% {
        height: 160px;
        -webkit-transform: translateY(-75px);
        -moz-transform: translateY(-75px);
        -o-transform: translateY(-75px);
        transform: translateY(-75px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}

@-webkit-keyframes love4 {
    30%, 50% {
        height: 180px;
        -webkit-transform: translateY(-60px);
        transform: translateY(-60px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@-moz-keyframes love4 {
    30%, 50% {
        height: 180px;
        -moz-transform: translateY(-60px);
        transform: translateY(-60px);
    }
    75%, 100% {
        height: 20px;
        -moz-transform: translateY(0);
        transform: translateY(0);
    }
}

@-o-keyframes love4 {
    30%, 50% {
        height: 180px;
        -o-transform: translateY(-60px);
        transform: translateY(-60px);
    }
    75%, 100% {
        height: 20px;
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}

@keyframes love4 {
    30%, 50% {
        height: 180px;
        -webkit-transform: translateY(-60px);
        -moz-transform: translateY(-60px);
        -o-transform: translateY(-60px);
        transform: translateY(-60px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}

@-webkit-keyframes love5 {
    30%, 50% {
        height: 190px;
        -webkit-transform: translateY(-45px);
        transform: translateY(-45px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@-moz-keyframes love5 {
    30%, 50% {
        height: 190px;
        -moz-transform: translateY(-45px);
        transform: translateY(-45px);
    }
    75%, 100% {
        height: 20px;
        -moz-transform: translateY(0);
        transform: translateY(0);
    }
}

@-o-keyframes love5 {
    30%, 50% {
        height: 190px;
        -o-transform: translateY(-45px);
        transform: translateY(-45px);
    }
    75%, 100% {
        height: 20px;
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}

@keyframes love5 {
    30%, 50% {
        height: 190px;
        -webkit-transform: translateY(-45px);
        -moz-transform: translateY(-45px);
        -o-transform: translateY(-45px);
        transform: translateY(-45px);
    }
    75%, 100% {
        height: 20px;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);
    }
}
</style>
