<style>
  input[type="file"]{
    position: absolute;
    top: -500px;
  }

  table.file-listing{
    width: 100%;
  }

  table.file-listing thead tr{
    border-bottom: 1px solid #ccc;
  }

  span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
  }
</style>
<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </label>
    </div>
    <div v-if="files.length > 0" class="large-12 medium-12 small-12 cell">
      <table class="file-listing">
        <thead>
        <tr>
          <th>#</th>
          <th>File Name</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(file, key) in files">
          <td>{{key+1}}</td>
          <td>{{ file.name }} </td>
          <td><span class="remove-file" v-on:click="removeFile( key )">Remove</span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <br>
    <div v-if="buttonsVisible" class="large-12 medium-12 small-12 cell">
      <button v-on:click="addFiles()">Add Files</button>
    </div>
    <br>
    <div v-if="buttonsVisible" class="large-12 medium-12 small-12 cell">
      <button v-on:click="submitFiles()">Submit</button>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      targetUrl: {
        type: String,
        required: true
      },
      multiple: {
        type: Boolean,
        default: true
      },
      buttonsVisible: {
        type: Boolean,
        default: true
      },
      extraFields: {
        type: Object,
        default: {}
      }
    },
    /*
      Defines the data used by the component
    */
    data(){
      return {
        files: []
      }
    },
    methods: {
      /*
        Adds a file
      */
      addFiles(){
        this.$refs.files.click();
      },

      getFormData(){
        /*
          Initialize the form data
        */
        let formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          formData.append(`attachments[]`, file);
        }

        // append extra data to the formData
        Object.keys(this.extraFields).map(key => formData.append(key, this.extraFields[key]));

        return formData;
      },


      /*
        Submits files to the server
      */
      submitFiles(){
        /*
          Make the request to the POST targetURL
        */
        axios.post( this.targetUrl, this.getFormData(),
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
          .catch(function(){
            console.log('FAILURE!!');
          });
      },

      /*
        Handles the uploading of files
      */
      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;

        /*
          Adds the uploaded file to the files array
        */
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },

      /*
        Removes a select file the user has uploaded
      */
      removeFile( key ){
        this.files.splice( key, 1 );
      },

      clearFiles(){
        this.files = [];
      }
    }
  }
</script>
