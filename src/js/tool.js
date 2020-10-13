//解析时间戳
const getTemplateDate=function(time){
    let date=new Date(time)
    let y=date.getFullYear()
    let M=date.getMonth()
    let d=date.getDate()
    let h=date.getHours()
    let m=date.getMinutes()
    M=prefixIntrger(M)
    d = prefixIntrger(d)
    h = prefixIntrger(h)
    m = prefixIntrger(m)
    return `${y}-${M}-${d} ${h}:${m}`
}
const prefixIntrger=function(n){
    n=n+''
    n=(0+n).substr(n.length-1)
    return n
}
export{getTemplateDate}