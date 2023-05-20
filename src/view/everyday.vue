<template>
    <div>
        <h1>每日一题</h1>
        <div v-for="(item, index) in quesitonLists" :key="index">
            <h3>{{ (index + 1) + '、' +item.title }}</h3>
            <div class="content">{{ item.content || '空'}}</div>
        </div>
        <input type="text" @input="handleInput">
        <div class="box"> {{ flag ? '搜索中' : '搜索结果' }} </div>
        <button @click="handleClick">提交</button>
        <div class="box">{{ flags ? '您已经提交过了，请稍后' : 'qing提交' }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { handWriteQ } from '@/utils/questionLists'
import { fangdou, jieliu } from '@/utils/test'
const quesitonLists = ref(handWriteQ)
const flag = ref(false)
const flags = ref(false)
const test = () => {
    // fangdou
    function fangdou(fn, dealy = 500) {
        let timer = null
        return function() {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn()
            }, delay);
        }
    }
}

const handleInput = fangdou(() => {
    flag.value = true
    const timer = setTimeout(() => {
        flag.value = false
        clearTimeout(timer)
    }, 1000);
})

const handleClick = jieliu(() => {
    flags.value = true
    const timer = setTimeout(() => {
        flags.value = false
        clearTimeout(timer)
    }, 1000);
}, 1000)


</script>

<style scoped>
.content {
    margin: 6px 0 6px 12px;
    font-size: 20px;
}
.box {
    width: 300px;
    height: 200px;
    background: #ccc;
    border-radius: 6px;
    margin-top: 10px;
}

</style>