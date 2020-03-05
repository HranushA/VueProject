<template>
  <div class="task-block">
      <div class="column">
        <h4>To do list</h4>
        <div class="list">
            <draggable 
                class="warp-div" 
                v-model="toDoData" 
                :options="{group:'people'}" 
                @change="changeToDoData"
                @start="drag=true" 
                @end="drag=false">
                    <div class="item" 
                        v-for="(item, index) in toDoData" 
                        :key="item.Id">
                            <div class="item-title">{{item.Title}}</div>
                            <button @click="remove( index, 'toDoData' )"><Delete /></button>
                            <div>{{item.Content}}</div>
                    </div>
            </draggable>
        </div>
        <div class="add-new">
            <button @click="addNew()" class="add-new-task">Add new task</button>
        </div>
      </div>
      <div class="column">
        <h4>Doing list</h4>
        <div class="list">
            <draggable 
                class="warp-div" 
                v-model="doingData" 
                :options="{group:'people'}" 
                @change="changeDoingData"
                @start="drag=true" 
                @end="drag=false">
                    <transition-group 
                        tag="div" 
                        mode="out-in" 
                        name="disabled">
                        <div class="item" 
                            v-for="( item, index ) in doingData" 
                            :key="item.Title">
                                <div class="item-title">{{item.Title}}</div>
                                <button @click="remove( index, 'doingData' )"><Delete /></button>
                                <div>{{item.Content}}</div>
                            </div>
                    </transition-group>
            </draggable>
        </div>
      </div>
      <div class="column">
        <h4>Done list</h4>
        <div class="list">
           <draggable 
                class="warp-div" 
                v-model="doneData" 
                :options="{group:'people'}" 
                @change="changeDoneData"
                @start="drag=true" 
                @end="drag=false">
                    <transition-group 
                        tag="div" 
                        mode="out-in" 
                        name="disabled">
                            <div class="item" 
                                v-for="( item, index ) in doneData" 
                                :key="item.Title">
                                    <div class="item-title">{{item.Title}}</div>
                                    <button @click="remove( index, 'doneData' )"><Delete /></button>
                                    <div>{{item.Content}}</div>
                            </div>
                    </transition-group>
            </draggable> 
        </div>
      </div>
      <template v-if="visible">
          <div class="modal">
              <div class="modal-row">
                <div class="title">Title</div>
                <input v-model="Title" />
              </div>
              <div class="modal-row">
                <div class="title">Content</div>
                <textarea v-model="Content"></textarea>
              </div>
              <div class="add-new">
                  <button @click="saveNewTask">Save</button>
                  <button @click="visible=false ">Cancel</button>
              </div>
          </div>
      </template>
  </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable' 
import Delete from 'vue-material-design-icons/Delete.vue';

export default {
  name: 'Home',
  components: {
      draggable,
      Delete
  },
  data: function () {
    return {
      toDoData: [],
      doingData: [],
      doneData: [],
      visible: false,
        Title: '',
        Content: '',
    }
  },
  created: function () {
      
    const requestBody = {}
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        responseType: "text"
    }
    axios.post('http://mvc.loc/getTasks', JSON.stringify(requestBody), config)
    .then(response => {
        this.toDoData = Object.assign([],response.data.openResult);
        this.doingData = Object.assign([],response.data.carrentResult);
        this.doneData = Object.assign([],response.data.closeResult);
    })

  },
  methods: {
      changeToDoData(val){
          if(val.added){
            this.changeStatus(val.added.element.Id, "ToDo");
          }
      },
       changeDoingData(val){
          if(val.added){
             this.changeStatus(val.added.element.Id, "Doing");
          }
      },
       changeDoneData(val){
          if(val.added){
            this.changeStatus(val.added.element.Id, "Done");
          }
      },
       changeStatus( id, status ){
           if(id!==""){
                const requestBody = {
                    params: {
                        Id: id,
                        Status: status
                    }
                }
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    crossDomain: true,
                    responseType: "text"
                }
                axios.post('http://mvc.loc/changeStatus', JSON.stringify(requestBody), config)
                .then(response => {
                    if( response.data.status === 'ok' ){
                        console.log("Task is changed");
                    }
                })
           }else{
               console.log("Id is empty");
           }
       },

        remove( index, from ){
            let list = this.toDoData;
            if( from === "doingData" ){
                list = this.doingData;
            } else if( from === "doneData" ){
                list = this.doneData;
            }

            const requestBody = {
                params: {
                    Id: list[index]["Id"]
                }
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                crossDomain: true,
                responseType: "text"
            }
            axios.post('http://mvc.loc/removeTask', JSON.stringify(requestBody), config)
            .then(response => {
                if( response.data.status === 'ok' ){
                   list.splice(index, 1);    
                }
            })

        },
        addNew(){   
            this.Title = '';
            this.Content = '';
            this.visible = true;
        },
        saveNewTask(){
            
            const requestBody = {
                params: {
                    Title: this.Title,
                    Content: this.Content,
                }
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                crossDomain: true,
                responseType: "text"
            }
            axios.post('http://mvc.loc/addTask', JSON.stringify(requestBody), config)
            .then(response => {
                if( response.data.status === 'ok' ){
                    this.toDoData = Object.assign([],response.data.openResult);
                    this.visible = false;
                }
            })

        },
  }
}
</script>
    
<style scoped>
    .column{
        width: 350px;
        display: inline-block;
        margin: 15px;
        padding: 5px;
        vertical-align: top;
    }   
    .list{
        border: 1px solid #000;
    }
    .column .item{
        border: 0.5px solid #ccc;
        padding: 5px;
    }
    .item-title{
        display: inline-block;
        width: 305px;
    }
    .modal{
        position: absolute;
        top: 10vh;
        left: 42vw;
        background: #fff;
        border: 1px solid #000;
        padding: 20px;
    }
    button{
        cursor: pointer;
        border: none;
        background: transparent;
    }
    .add-new-task{
        border: 1px solid #000; 
        padding: 5px;
    }
    .add-new{
        padding: 15px 0;
        text-align: right;
    }
    .material-design-icon{
        color: #d01f1f;
        font-size: 16px;
    }
    input, textarea{
        width: 100%;
    }
</style>