export const fangdou = function (fn: Function, delay = 500, ...args) {
    let timer = null as any
    return function() { 
        console.log(timer) 
        if (timer) {
            clearTimeout(timer)
        }
        const context = this
        console.log(context)
        timer = setTimeout(() => {
            fn.apply(context, args)
            clearTimeout(timer)
            timer = null
        }, delay)
    }
}

export const jieliu = function(fn: Function, delay = 500, ...args) {
    let flag = false
    return function () {
        if (flag) return
        flag = true
        const context = this
        const timer = setTimeout(() => {
            fn.apply(context, args)
            clearTimeout(timer)
            flag = false
        }, delay)
    }

}