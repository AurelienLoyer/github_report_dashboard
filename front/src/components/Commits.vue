<template lang="html">
  <div class="page">
    <h2><span v-if="repo.name">{{repo.name}} - </span>Commits</h2>

    <div class="filters">
      <div class="filter">
        Filtre Commits
        <label class="switch">
          <input type="checkbox" v-model="filtre">
          <div class="slider round"></div>
        </label>
      </div>
      <div class="filter">
        Commits Doublon
        <label class="switch">
          <input type="checkbox" v-model="doublon">
          <div class="slider round"></div>
        </label>
      </div>
      <br>
    </div>

    <div class="dates">
      <date-picker :date="startTime" :option="option" @change="dateChange()"></date-picker>
      <date-picker :date="endTime" :option="option" @change="dateChange()"></date-picker>
    </div>
    
    <v-commit :branch="'master'" :commits="filteredCommits['master']"></v-commit>

    <v-commit v-for="(datas, branch) in filteredCommits" v-if="branch !== 'master'" :branch="branch" :commits="datas"></v-commit>

    <div class="black_back" :class="{ 'active': settings }"></div>
    <div class="bloc_settings" :class="{ 'active': settings }">
      <h2>mail settings</h2>
      <input type="text" placeholder="To" v-model="mail.to" name="to" value="">
      <input type="text" placeholder="CC" v-model="mail.cc" name="cc" value="">
      <input type="text" placeholder="Subject" v-model="mail.subject" name="subject" value="">
      <input type="text" placeholder="Mail body" v-model="mail.body" name="body" value="">
      <div class="">
        -----<br>
        Commits list <br>
        -----<br>
      </div>
      <input type="text" placeholder="Mail end" v-model="mail.end" name="end" value="">
      <button type="button" name="button" @click="editMail()">SAVE</button>
    </div>

    <button class="editmail" type="button" name="button" @click="settings = true">
      <i class="fa fa-cog" aria-hidden="true"></i>
    </button>

    <button class="mail" type="button" name="button" @click="sendmail()">
      <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
      MAILER
    </button>

    <v-quota v-if="meta" :meta="meta"></v-quota>

  </div>
</template>

<script>

import env from '../env'
import auth from '../auth'
import Quota from './Quota.vue'
import Commit from './Commit.vue'
import moment from 'moment'
import Datepicker from 'vue-datepicker'
import {getQueryString} from '../utils';

export default {
  name: 'commits',
  data () {
    return {
      repo:{},
      filtre: false,
      doublon: false,
      meta: null,
      repo_params: null,
      commits: [],
      octopus: [],
      settings: false,
      mail:{},
      sha:[],

      startTime: {
        time: moment().format('YYYY-MM-DD') + ' 00:00'
      },
      endTime: {
        time: moment().format('YYYY-MM-DD') + ' 23:59'
      },
      option: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: '#42B983',
          headerText: 'white'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    }
  },
  components: {
    'v-quota':Quota,
    'date-picker': Datepicker,
    'v-commit': Commit
  },
  created(){

    if(localStorage.getItem('mail')) this.mail = JSON.parse(localStorage.getItem('mail'))

    if(this.$route.params.name ){
      this.repo.name = this.$route.params.name
      this.repo.owner = this.$route.params.owner
      this.repo_params = '&repo='+this.repo.name+'&owner='+this.repo.owner
    }

    this.getCommits()
  },
  computed: {
    filteredCommits(){
      this.sha = this.commits.filter(commit => commit.branch === 'master').map(data => data.sha)
      let filtered =  this.commits
                  .filter(data => this.valid_message(data.commit.message))
                  .filter(data => data.branch === 'master' || this.is_doublon(data.sha))
                  .reduce(function(rv, x) {
                    (rv[x['branch']] = rv[x['branch']] || []).push(x);
                    return rv;
                  }, {})
      
      return filtered;
    }
  },
  methods:{
    getCommits(){
      this.sha = []
      this.commits = [];
      let time_params = '&since=' + moment(this.startTime.time).toISOString() + '&until=' + moment(this.endTime.time).toISOString()

      this.$http.get(env.api+'/branches'+auth.urlToken()+this.repo_params).then(response => {
        this.meta = response.body.meta
        let promises = response.body.data.map(branch => {
          return this.$http.get(env.api+'/commits'+auth.urlToken()+'&branch=' + branch.name + this.repo_params + time_params)
        })
        Promise.all(promises).then(responses => {
          responses.forEach(response => {
            this.meta = response.body.meta
            if(response.body.data){
              this.commits = this.commits.concat(response.body.data.map(data => {
                data.branch = getQueryString('branch', response.url);
                return data;
              }))
            }
          })
        })
      })
    },
    dateChange(){
      this.getCommits()
    },
    editMail(){
      this.settings = false
      console.log(this.mail)
      if(this.mail){
        localStorage.setItem('mail',JSON.stringify(this.mail))
      }
    },
    valid_message(message){
      if(!this.filtre){
        return true
      }
      if ( message.match( /(FEATURE - |FIX - |TEST - |REFACTO - )/ ) ) {
        return true
      }
      return false
    },
    is_doublon(sha){
      if(!this.doublon){
        return true
      }
      if(this.sha.indexOf(sha) > -1){
        return false
      }
      this.sha.push(sha)
      return true
    },
    sendmail(){
      if(!this.mail || !this.mail.to){
        this.settings = true
        return
      }
      let today = moment().format('DD/MM/YYYY')
      let subject = this.mail.subject.replace('%today%',today)
      let to = this.mail.to
      let cc = this.mail.cc
      let end = this.mail.end
      let list = '\n\r'
      //this.master.map(data => { if(this.valid_message(data.commit.message)) list += '- '+data.commit.message+'\n' })
      //this.develop.map(data => { if(this.valid_message(data.commit.message)) list += '- '+data.commit.message+'\n' })
      //this.octopus.map(data => { if(this.valid_message(data.commit.message)) list += '- '+data.commit.message+'\n' })
      let body = this.mail.body.replace('%today%',today)+list+'  \n'+end
      window.location.href = 'mailto:'+this.mail.to+'?subject='+subject+'&cc='+this.mail.cc+'&body='+encodeURIComponent(body)
    }
  }

}
</script>

<style lang="scss">

.week ul{
  display: flex;
  justify-content: space-around;
}

.page{

  .filters{
    display: flex;
    justify-content: center;
    .filter{
      margin: 20px;
      display: flex;
      align-items: center;
      font-weight: bold;
      label{
        margin-left: 10px;
      }
    }
  }

  .black_back{
    position: fixed;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    &.active{
      display: block;
    }
  }

  .bloc_settings{
    position: fixed;
    width: 300px;
    left: 50%;
    margin-left: -150px;
    background: #ece9e9;
    padding: 20px;
    top: 20vh;
    z-index: 10;
    display: none;
    text-align: center;
    transition: all 0.2s;
    &.active{
      display: block;
    }
    h2{
      text-transform: uppercase;
    }
    input[type="text"]{
      max-width: 100%;
      width: 95%;
      padding: 6px 0px;
      margin: 5px 0px;
      border: none;
      font-size: 14px;
      padding-left: 5%;
    }
    button{
      margin: 10px 0px;
      width: 100%;
    }
  }

  button{
    border: none;
    color: white;
    background: #42b983;
    padding: 15px 20px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    &.editmail{
      right: 220px;
      bottom: 10px;
      position: fixed;
    }
    &.mail{
      width: 200px;
      right: 10px;
      bottom: 10px;
      position: fixed;
      .fa{
        margin-right: 10px;
        transition: all 0.2s;
      }
      &:hover{
        .fa{
          transform: scale(1.25) translateX(-10px);
        }
      }
    }

  }

}

</style>
