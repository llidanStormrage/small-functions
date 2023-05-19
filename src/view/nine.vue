<template>
  <div>
    <div class="top">
      <div
        :class="name == i.label ? 'box boxShan' : 'box'"
        v-for="i in list"
        :key="`${i}name`"
      >
        {{ i.value }}
      </div>
    </div>
    <div class="button" @click="start">
      {{ status === "start" ? "开始" : "结束" }}
    </div>
    <div>{{ persint }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const list = ref([
  { value: "奖品1", label: "1" },
  { value: "奖品2", label: "2" },
  { value: "奖品3", label: "3" },
  { value: "奖品4", label: "4" },
  { value: "奖品5", label: "5" },
  { value: "奖品6", label: "6" },
  { value: "奖品7", label: "7" },
  { value: "奖品8", label: "8" },
  { value: "奖品9", label: "9" },
]);
const name = ref(0);
let timer = ref(null);
let status = ref("start");
let persint = ref("");
//抽奖结果
let giftRes = ref();
const start = async () => {
  if (status.value === "start") {
    let startNum = 0;
    timer = setInterval(() => {
      if (startNum === 9) {
        startNum = 0;
      }
    //   console.log(startNum)
      name.value = list.value[startNum]?.label;
    //   console.log('name:', name.value)

      persint.value = list.value[startNum]?.value;
    //   console.log(name.value)
      

      startNum++;
    }, 100);
    // setTimeout(() => {
    //   console.log(name.value, "name.value");
    //   giftRes = { value: "奖品8", label: "8" };
    //   //返回抽奖结果
    //   // name.value = list.value[startNum]?.label;
    //   // alert(`${list.value[startNum]?.value}`)
    //   clearInterval(timer);
    // }, 1200);
  }
  const reslut = await test()
  giftRes.value = reslut.label
  console.log(name.value)
  console.log(reslut.label)
  clearInterval(timer)

  handle(100, name.value < reslut.label)
  
};

let timers = 0
//拿到结果之后得处理
const handle = (delay = 100, flag)=>{
    if (name.value == giftRes.value) return

    
    
    //拿到当前得选项
    //匹配还有几个
    timers = setTimeout(() => {
        if (!flag && name.value === 9) {
            name.value = 1
        } else {
            name.value = Number(name.value) + 1
        }

        persint.value = list.value[name.value -1 ]?.value;
        clearTimeout(timers)
        // dealy
        handle(delay + 50, flag)
    }, delay);
  
}

// test
const test = () => {
    return new Promise((resolve, rejetcted) => {
        setTimeout(() => {
            resolve( {value: "奖品8", label: "2"} )
        }, 2600);
    })
}
</script>

<style scoped>
.box,
.boxShan {
  width: 30%;
  height: 50px;
  border: 1px solid #bbb;
}
.boxShan {
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.5) inset;
}
.top {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
}
.button {
  width: 130px;
  height: 40px;
  background: linear-gradient(to bottom, #4eb5e5 0%, #389ed5 100%); /* W3C */
  border: none;
  border-radius: 5px;
  position: relative;
  border-bottom: 4px solid #2b8bc6;
  color: #fbfbfb;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  font-size: 15px;
  text-align: left;
  text-indent: 5px;
  box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  /* Just for presentation */
  display: block;
  /* margin: 0 auto; */
  margin-bottom: 20px;
  margin-top: 20px;
}
.button:active {
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.2);
  top: 1px;
}

.button:after {
  content: "";
  width: 0;
  height: 0;
  display: block;
  border-top: 20px solid #187dbc;
  border-bottom: 20px solid #187dbc;
  border-left: 16px solid transparent;
  border-right: 20px solid #187dbc;
  position: absolute;
  opacity: 0.6;
  right: 0;
  top: 0;
  border-radius: 0 5px 5px 0;
}
</style>
