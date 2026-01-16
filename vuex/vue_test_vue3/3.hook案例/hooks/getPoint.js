import {reactive,onMounted,onBeforeUnmount} from 'vue'
export default function(){
    let point = reactive({
        x:0,
        y:0
    })
    function savePoint(evt){
        point.x = evt.pageX
        point.y = evt.pageY
        console.log(point.x,point.y);
    }
    onMounted(()=>{
        window.addEventListener('click',savePoint)
    })
    onBeforeUnmount(()=>{
        window.removeEventListener('click',savePoint)
    })
    return point
}