<template>
    <div class="box">
        <div class="circle" ref="circle">
            <!-- <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div> -->
            
        </div>
        <div class="zhizhen" @click="handleBegin"></div>
        <button @click="handleReset">重 置</button>
 
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let circle = ref(null)

let flag = false
let needRest = false
const levelMap = [
    {
        level: 1,
        deg: 0,
    },
    {
        level: 7,
        deg: 51,
    },
    {
        level: 6,
        deg: 102,
    },
    {
        level: 5,
        deg: 153,
    },
    {
        level: 4,
        deg: 214,
    },
    {
        level: 3,
        deg: 265,
    },
    {
        level: 2,
        deg: 316,
    },

]
let cNum = 0
let timer = 0
let time = 100 // ms
let deg = 0


// handleReset
const handleReset = () => {
    if (flag) return
    deg = 0
    cNum = 0
    time = 100
    circle.value.style.transform = `rotate(0deg)`
    circle.value.style = ''
    needRest = false

}

// handleBegin
const handleBegin = () => {
    if (flag || needRest) return
    
    flag = true
    needRest = true
    console.log('kaishi lo  ===========================')
    cNum++
    deg = 0.36 * time

    circle.value.style.transition = `all linear 0.1s`;
    circle.value.style.transform = `rotate(${deg}deg)`
    
    handleTime()
    timer = setInterval(() => {
        cNum++
        time += 100
        deg = 0.36 * time
        circle.value.style.transform = `rotate(${deg}deg)`

        console.log(deg)
    }, 100);

}

// test
const test = () => {
    return new Promise((resolve, rejected) => {
        setTimeout(() => {
            resolve(2)
        }, 3000)
    })
}
// TODO：感觉需要用max和min 比较妥当一些
// handledeg
const handleDeg = (cDeg) => {
    const restDeg = (deg % 360)
    let restTime = 0
    console.log('restDeg:', restDeg)
    console.log('Deg:', deg)
    // 转了的角度 和 需要转的角度相比
    
    if (restDeg - cDeg > 0) {
        console.log('cDeg:', cDeg)
        restTime = ((360 - restDeg + cDeg) / 360).toFixed(1)
        console.log(restTime)
        console.log('ddd:', (360 - restDeg + cDeg))
        // circle.value.style.transition = `all ease-out ${restTime}s`
        // circle.value.style.transform = `rotate(${360 - restDeg + cDeg + deg}deg)`
    } else if (restDeg - cDeg < 0){
        restTime = ((360 - restDeg + cDeg) / 360).toFixed(1)
        console.log('ddd:', (cDeg - restDeg + deg))
        console.log(restTime)
        circle.value.style.transition = `all cubic-bezier(0, 0, 0.5, 0.96) ${restTime}s`
        circle.value.style.transform = `rotate(${cDeg - restDeg + deg}deg)`
        // circle.value.style.transform = `rotate(${1000}deg)`
    }
}
// handleTime
const handleTime = async () => {
    try {
        const reslut = await test()
        const item = levelMap.find((item) => {
            return item.level === reslut
        })
        console.log(item)
        clearInterval(timer)
        handleDeg(item.deg)
        console.log(deg)
        console.log(time)
        flag = false
        
    } catch (error) {
        flag = false
    }
}


onMounted(() => {
    console.dir(circle.value)
    console.log(circle.value.style)
})
</script>

<style scoped>
.box {
    width: 300px;
    height: 300px;
    position: relative;
}
.circle {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    position: relative;
    border: 2px solid #000;
    box-sizing: border-box;
    /* transform: rotate(360deg);
    transition: all linear 2s; */
    background-image: url(../assets/images/c_bg_2.webp);
    background-size: 100% 100%;
    background-position: center center;
    /* animation: ani 1s linear infinite; */
}

.line {
    width: 4px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #000;
}

/* .line:nth-child(2) {
    transform: translate(-50%, -50%) rotate(45deg);
}
.line:nth-child(3) {
    transform: translate(-50%, -50%) rotate(90deg);
}
.line:nth-child(4) {
    transform: translate(-50%, -50%) rotate(135deg);
} */

.zhizhen {
    width: 80px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(../assets/images/c_zhizhen.png);
    background-size: 100% 100%;
    
}
/* .zhizhen::after {
    content: "";
    display: block;
    border-bottom: 30px solid red;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateY(-50%);
} */

@keyframes ani {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>