<template>
  <div class="vue-content">
  <div>
    <draggable class="warp-div" v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <div class="div" :style="'background-color:'+element.color" v-for="element in myArray" :key="element.name">{{element.name}}</div>
    </draggable>
  </div>
  
  <div>
    <draggable class="warp-div" v-model="mySecondArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <transition-group tag="div" mode="out-in" name="disabled">
        <div class="div" :style="'background-color:'+element.color" v-for="element in mySecondArray" :key="element.name">{{element.name}}</div>
      </transition-group>
    </draggable>
  </div>

   <div>
    <draggable class="warp-div" v-model="myArray3" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <transition-group tag="div" mode="out-in" name="disabled">
        <div class="div" :style="'background-color:'+element.color" v-for="element in myArray3" :key="element.name">{{element.name}}</div>
      </transition-group>
    </draggable>
  </div>
  
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Content',
  components: {
      draggable,
  },
  data: function () {
    return {
        myArray: [
            {'name': 'A', order: 1},
            {'name': 'B', order: 2},
            {'name': 'C', order: 3}
          ],
        mySecondArray: [
            {'name': '1', order: 1},
            {'name': '2', order: 2},
            {'name': '3', order: 3}
          ],
        myArray3: [
            {'name': '&', order: 1},
            {'name': '*', order: 2},
            {'name': '$', order: 3}
          ]
        }
  },
}
</script>

<style scoped>
    .vue-content{
        border: 1px solid #000;
        padding: 20px;
        text-align: center;
        height: 91%;
    }
</style>
