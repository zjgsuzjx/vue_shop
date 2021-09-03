<template>
  <div>
    <h3>Weclome!! Admin，现在是{{ nowDate }}</h3>
    <div class="block">
      <el-carousel height="450px" class="carousel" type="card" :interval="2000">
        <el-carousel-item v-for="item in images" :key="item.url">
          <img :src="item.url" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-alert
      title="忙碌了一天啦，要不要听一首歌放松一下呢~q(≧▽≦q)"
      type="success"
      show-icon
      class="song"
      center
      closable="false"
    >
    </el-alert>
    <meting-js
      server="netease"
      type="song"
      id="1311345874"
      list-max-height="190px"
      list-folded="true"
    >
    </meting-js>
    <div class="attetion">使用说明：不要把数据删完哇(っ °Д °;)っ</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { url: require("../assets/1.png") },
        { url: require("../assets/2.png") },
        { url: require("../assets/3.jpg") },
        { url: require("../assets/4.png") },
      ],
      nowDate: "",
    };
  },
  created() {
    setInterval(() => {
      this.current();
    }, 1000);
  },
  methods: {
    current() {
      this.nowDate = "";
      let d = new Date();
      this.nowDate += d.getFullYear() + "年"; //获取当前年份
      this.nowDate += d.getMonth() + 1 + "月"; //获取当前月份（0——11）
      this.nowDate += d.getDate() + "日 ";
      this.nowDate += d.getHours() + "时";
      this.nowDate += d.getMinutes() + "分";
      this.nowDate += d.getSeconds() + "秒";
    },
  },
};
</script>

<style lang="less" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  height: 100%;
  width: 100%;
}
.attetion {
  font-size: 24px;
  color: skyblue;
  text-align: center;
  margin-top: 30px;
}
.song {
  margin: 15px 0;
  font-size: 20px;
  font-weight: 700;
}
</style>
