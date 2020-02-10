<template>
  <div class="circle-container">
    <!-- canvas标签用于创建画布 需要绑定canvasId -->
    <canvas :style="{width:width+'px',height:height+'px'}" :canvas-id="'canvasId'+canvasId"></canvas>
  </div>
</template>

<script>
export default {
  // 父组件传过来的值  如果需要修改 最好不要直接修改
  // 而是声明一个变量储存(如果是对象等复杂类型最好进行深拷贝)
  props: {
    // 画布id
    canvasId: {
      type: Number,
      default: 0
    },
    // 学习进度
    progress: {
      type: Number,
      default: 0
    },
    // 画布宽度
    width: {
      type: Number,
      default: 55
    },
    // 画布高度
    height: {
      type: Number,
      default: 55
    },
    // 画布线宽
    lineWidth: {
      type: Number,
      default: 5
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: "#f3f3f3"
    },
    // 前景颜色
    foregroundColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // 前景颜色
      myForegroundColor: ""
    };
  },
  methods: {
    drawCircle() {
      // 获取canvas上下文 createCanvasContext(canvasId:string , this(作为组件时需要传))
      let ctx = uni.createCanvasContext(`canvasId${this.canvasId}`, this);
      // 绘制背景圆圈

      // 设置颜色
      ctx.strokeStyle = this.backgroundColor;
      // 设置线宽
      ctx.lineWidth = this.lineWidth;
      // 画圆 宽 高 半径 起始角度 结束角度 是否逆时针
      ctx.arc(
        this.width / 2,
        this.height / 2,
        this.width / 2 - this.lineWidth,
        0,
        2 * Math.PI,
        false
      );
      // 绘制当前路径的边框
      ctx.stroke();

      // 绘制前景圆圈

      // 创建新路径 路径:理解为画中的另一个事物,像是笔起笔落
      ctx.beginPath();
      // 通过学习进度判断前景颜色
      if (this.progress <= 30) {
        this.myForegroundColor = "#f00";
      } else if (this.progress > 30 && this.progress < 50) {
        this.myForegroundColor = "#ff783b";
      } else {
        this.myForegroundColor = "#b4d66e";
      }
      // 设置颜色
      ctx.strokeStyle = this.myForegroundColor;
      // 设置线 两端的形状 圆
      ctx.setLineCap("round");
      // 通过学习进度 计算前景圆圈的结束角度  除以100获得百分比 在乘以2(2=360度=一圈) 再减去0.5的起始角度
      let eAngle = ((this.progress / 100) * 2 - 0.5) * Math.PI;
      // 画圆(宽, 高, 半径, 起始角度, 结束角度, 是否逆时针)
      ctx.arc(
        this.width / 2,
        this.height / 2,
        this.width / 2 - this.lineWidth,
        -0.5 * Math.PI,
        eAngle,
        false
      );
      // 绘制当前路径(上面的都是配置项,配置完后进行绘制)
      ctx.stroke();

      // 绘制文本

      // 创建新路径
      ctx.beginPath();
      // 设置文字颜色
      ctx.fillStyle = this.myForegroundColor;
      // 设置文字在画布的位置 由于需求为居中显示 所以根据字体多少有不同的位置
      if (this.progress > 99) {
        ctx.fillText(
          this.progress + "%",
          this.width / 2 - 13,
          this.height / 2 + 3
        );
      } else {
        ctx.fillText(
          this.progress + "%",
          this.width / 2 - 10,
          this.height / 2 + 3
        );
      }
      // 完成绘画
      ctx.draw();
    }
  },
  created() {
    // 通过深拷贝将父组件传的值赋值给自己的data中的变量
    this.myForegroundColor = JSON.parse(JSON.stringify(this.foregroundColor));
  },
  mounted() {
    // 在渲染完成后调用方法创建画布
    this.drawCircle();
  }
};
</script>
