<template>
    <div>
        今天写点啥呢？
    </div>
</template>

<script setup>
    console.log(11111);
    const dataGet = ()=>{
        return new Promise(function(love){
            setTimeout(()=>{
                love(333)
            },5000)
        })
    }
    const getData = async ()=>{
        const res = await dataGet()
        console.log(res);
    }
    getData()
</script>

<style scoped>

</style>