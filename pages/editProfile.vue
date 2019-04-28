<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>Actions</strong></div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <label for="userNameInput">User name</label>
                  <input class="form-control" id="userNameInput" type="text" placeholder="Enter your username">
                </div>
                <div class="form-group">
                  <label for="firstNameInput">First name</label>
                  <input class="form-control" v-model="user.firstName" id="firstNameInput" type="text" placeholder="Enter your first name">
                </div>
                <div class="form-group">
                  <label for="lastNameInput">Last name</label>
                  <input class="form-control" v-model="user.lastName" id="lastNameInput" type="text" placeholder="Enter your last name">
                </div>
                <div class="form-group">
                  <label for="select1">Country</label>
                  <select class="form-control" id="select1" name="select1">
                    <option value="0">Please select your country</option>
                    <option value="1">Country #1</option>
                    <option value="2">Country #2</option>
                    <option value="3">Country #3</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input class="form-control" id="email" type="text" placeholder="user@company.com">
                </div>
                <div class="form-group">
                  <label for="phone-number">Phone number</label>
                  <input class="form-control" id="phone-number" type="text" placeholder="+98-xxx-xxx-xxxx">
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="avatar-container" style="cursor: pointer" onclick="document.getElementById('profileSelectInput').click()">
                  <img v-if="!!user.avatar" :src="user.avatar" alt="username">
                  <img v-else src="/imgs/profile-empty.jpg" alt="username">
                  <input id="profileSelectInput" type="file" style="display: none" @change="onAvatarSelect">
                </div>
                <h3>Username</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    layout: 'coreui',
    data() {
      return {
      }
    },
    computed: {
      ...mapState('auth', ['loggedIn', 'user'])
    },
    methods: {
    }
  }
</script>

<style>
  .user-info-table {
    font-size: 1.2em;
  }
  .user-info-table td{
    padding: 0.5em 1em;
  }
  .user-info-table td:nth-child(1){
    font-weight: bold;
    padding-right: 3em;
  }
  .user-info-table td:nth-child(3){
    color: #73818f;
    font-size: 0.8em;
  }
  .color-success{color: green}
  .color-danger{color: red}
  .avatar-container{
    width: 14em;
    height: 14em;
    border-radius: 25em;
    overflow: hidden;
    position: relative;
    border: 4px solid #aaa;
    margin: auto;
  }
  .avatar-container img{
    width: 100%;
    height: 100%;
  }
  .action-btn {
    width: 100%;
    padding: 0.5em 0;
    border-radius: 0.5em;
    background: #20a8d8;
    color: white;
    font-weight: bold;
    border: 1px solid #2088b6
  }
</style>