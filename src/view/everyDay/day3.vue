<template>
    <div class="box">
        <div class="left">
            <div :class="['area', item.value === currentIndex ? 'active' : '']" v-for="(item, index) in diantiList" :key="index">{{ item.text }}</div>

        </div>
        <div class="right">
            <div :class="['area', btnList.has(item.value) ? 'active' : '']" v-for="(item, index) in diantiList" :key="index" @click="handleBtn(item.value)">{{ item.text }}</div>

        </div>
    </div>
    <div>
        今天写点啥呢？
    </div>
</template>

<script setup>
    import {ref, reactive, onMounted, computed} from 'vue'
    const diantiList = ref([])
    const currentIndex = ref(0) // 当前楼层的索引
    const number = 12 // 楼层
    const btnList = reactive(new Map()) // 按了的楼层
    const direction = ref(0) // 0 + 1 -
    const step = computed(() => {
        return direction.value ? -1 : 1
    })
    const handleDianTiList = () => {
        for (let i = 0; i < number; i++) {
            diantiList.value.push({
                value: i,
                text: `第${i + 1}楼`
            })
        }
        diantiList.value.reverse()
    }
    onMounted(() => {
        handleDianTiList()
        console.log(diantiList.value)
    })
    // 按按钮function TODO 后续加一个连点三次就取消了
    const handleBtn = (value) => {
        if (btnList.has(value)) return
        // 暂时 向上运行时 不能按低楼层的按钮
        // 但是需要btnList里有内容
        if (value < currentIndex.value && btnList.size) return
        btnList.set(value, value)
        // 电梯停止的时候
        if (timer) return
        // 切换方向
        if (value < currentIndex.value) {
            direction.value = -1
        } else {
            direction.value = 0

        }
        diantiRun()
        console.log(1)
    }
    let timer = 0

    // 电梯运行的function
    const diantiRun = () => {
        if (btnList.has(currentIndex.value)) {
            console.log('电梯到了')
            // 电梯到了 就要删除掉对应的楼层
            btnList.delete(currentIndex.value)
            // 判断方向 然后关门儿继续出发
            handleDianTi()
            return
        }
        timer = setTimeout(() => {
            currentIndex.value +=  step.value
            clearTimeout(timer)
            timer = 0
            diantiRun()
        }, 1000)
    }

    const handleDianTi = () => {
        // 首先判断方向
        console.log(btnList)
        // 比较是否有比当前楼层更大的
        const arr = [...btnList.keys()].sort((a, b) => a - b)
        console.log(arr)
        // 用最大的跟当前楼层对比
        if (arr[arr.length - 1] > currentIndex.value) {
            direction.value = 0 // shang   
        }
        if (arr[0] < currentIndex.value) {
            direction.value = 1 // shang   
        }
        console.log('开门儿')
        if (!btnList.size) {
            console.log('关门儿')
            return
        }
        const time = setTimeout(() => {
            console.log('关门儿')
            diantiRun()
            clearTimeout(time)
        }, 3000)
        // if (diantiList.size ) {

        // }
    }
</script>

<style scoped>
.box {
    display: flex;
    justify-content: space-around;
    background: #ccc;
}
.area {
    width: 120px;
    height: 40px;
    border: 2px solid #000;
}
.area.active {
    background: red;

}
</style>