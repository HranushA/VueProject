<template>
  <div class="task-block">
      <div class="column">
          <div v-bind:key="index" v-for="( item, index ) in toDoData">
            <div class="item">
                <div class="item-title">{{item.Title}}</div>
                <button @click="doing( index )">Doing</button>
                <button @click="done( index, 'toDoData' )">Done</button>
                <button @click="remove( index, 'toDoData' )">Remove</button>
                <div>{{item.Content}}</div>
            </div>
          </div>
          <div class="add-new">
              <button @click="addNew()">Add new</button>
          </div>
      </div>
      <div class="column">
          <div v-bind:key="index" v-for="( item, index ) in doingData">
              <div class="item">
                <div class="item-title">{{item.Title}}</div>
                <button @click="done( index, 'doingData' )">Done</button>
                <button @click="remove( index, 'doingData' )">Remove</button>
                <div>{{item.Content}}</div>
            </div>
          </div>
      </div>
      <div class="column">
          <div v-bind:key="index" v-for="( item, index ) in doneData">
              <div class="item">
                <div class="item-title">{{item.Title}}</div>
                <button @click="remove( index, 'doneData' )">Remove</button>
                <div>{{item.Content}}</div>
            </div>
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
              <div class="modal-row">
                  <button @click="saveNewTask">Save</button>
              </div>
          </div>
      </template>
  </div>
</template>

<script>
import axios from 'axios';
// const qs = require('querystring');
export default {
  name: 'Home',
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
        doing( index ){
             const requestBody = {
                params: {
                    Id: this.toDoData[index]["Id"],
                }
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                crossDomain: true,
                responseType: "text"
            }
            axios.post('http://mvc.loc/doingTask', JSON.stringify(requestBody), config)
            .then(response => {
                if( response.data.status === 'ok' ){
                    this.doingData.push(this.toDoData[index]);
                    this.toDoData.splice(index, 1);
                }
            })

        },
        done( index, from ){
            let list = this.toDoData;
            if( from === "doingData" ){
                list = this.doingData;
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
            axios.post('http://mvc.loc/doneTask', JSON.stringify(requestBody), config)
            .then(response => {
                if( response.data.status === 'ok' ){
                    this.doneData.push(list[index]);
                    list.splice(index, 1);  
                }
            })


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
                console.log(response.data);
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
                    let item = {};
                    item["Title"] = this.Title;
                    item["Content"] = this.Content;
                    this.toDoData.push(item);
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
        border: 1px solid #000;
        margin: 15px;
        padding: 5px;
        vertical-align: top;
    }   
    .column .item{
        border: 0.5px solid #ccc;
        padding: 5px;
    }
    .item-title{
        display: inline-block;
        width: 173px;
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
    }
</style>