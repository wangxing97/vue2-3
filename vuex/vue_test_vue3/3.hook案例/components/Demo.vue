<template>
   <hr>
   <h2>Demo Page</h2>
   <h3>x：{{point.x}}，y：{{point.y}}</h3>
</template>

<script>
import getPoint from '../hooks/getPoint';
export default {    
    name:'Demo',
    setup(){
        const point = getPoint()
        return {
            point
        }
    }
}
</script>

<style>

</style>