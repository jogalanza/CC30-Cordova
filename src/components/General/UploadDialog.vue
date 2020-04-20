<template>
  <v-dialog v-model="uploadDialog" tabindex="0" @keyup.ctrl.76="alert('asdf')" fullscreen hide-overlay transition="dialog-bottom-transition" style="overflow:hidden" draggable>
      <v-card id="UploadDialog">
        <v-toolbar dark color="rgb(30, 33, 35)">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="uploadDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        
        <v-toolbar id="menu-bar" color="green" dense > 
          <v-file-input v-if="uploadDialog"
            ref="file"  
            prepend-icon=""       
            light
            dense
            :placeholder="inputLabel"          
            outlined
            show-size
            clearable
            hide-details
            truncate-length="30"
            @change="HandleFileUpload"
            style="max-width:500px"
            class="cc-input cc-file"
            >
               <template v-slot:append>
                  <v-btn color="blue" elevation="0" style="margin-top:0px;height:30px" dark @click="SubmitFile">Upload</v-btn>
                </template>
            </v-file-input>
            <v-spacer/>
            
            <ExpandExport 
              target="upload-dialog"
              icon-color="white"
              :hide-add-new="false"
              :hide-save-all="false"
              :hide-paste="false"
              :hide-delete="false"
              :hide-refresh="true"
              :hide-export-level="true" 
              :hide-export-all="true" 
              :hide-currency="true"
              :hide-expand="true"
              :hide-edit="true"
              :hide-import="true"
              />
        </v-toolbar>

        <div style="padding:16px">
          <InlineEditGrid
            ref="uploadEditGrid"
            class="inline-edit-grid"
            :model-api="modelApi"
            :fields="fields"
            :items="items"
            :info="info"
            :filter-key="key"
            :level="level"
            :start-at-site="startAtSite"
            :main-info="mainInfo"
            :selected-count="getSelectedCount"
          />           

        </div>

      </v-card>
    </v-dialog>
</template>
<style>
#UploadDialog  #menu-bar,
#UploadDialog  #menu-bar .v-toolbar__content{
  height: 54px !important;
}
#UploadDialog .v-text-field--outlined fieldset{
  border:none;
}
#UploadDialog .cc-input.cc-file .v-input__slot{
  background-color: white;
  padding-right: 8px;
}
#UploadDialog .cc-input.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  -webkit-box-shadow: none;
  box-shadow: none;
}
#UploadDialog .inline-edit-grid{
  max-width: 1485px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
  border-radius: 4px;
}
#UploadDialog .inline-edit-grid {
  height: calc(100vh - 150px);
}
#UploadDialog .inline-edit-grid .q-table tbody.q-virtual-scroll__content > tr:last-child > td {
  border-bottom: 1px solid #eee;
}
</style>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'UploadDialog',
  components: {
    InlineEditGrid: () => import('./InlineEditGrid.vue'),
    ExpandExport: () => import('./ExpandExport.vue')
  },
  props: {
    title: {
      type: String,
      default: 'Import'
    },
    uploadApi: {
      type: String,
      default: null
    },
    pasteApi: {
      type: String,
      default: null
    },
    modelApi: {
      type: String,
      default: null
    },
    fields: {
      type: Array
    },
    inputLabel: {
      type: String,
      default: 'Select a file...'
    },
    targetName: {
      type: String,
      default: 'upload-dialog'
    },
  },
  data: () => ({
    uploadDialog: false,
    file: null,
    items: [],
    filter: null,
    key: 1,
    level: 5,
    startAtSite: false,
    mainInfo: null,
    info: null
  }),
  methods: {
    toggleDialog() {
      this.uploadDialog = !this.uploadDialog;
    },
    InvokeDialog(data) {
      this.uploadDialog = true;             
    },
    HandleFileUpload(e){
      console.log('HandleFileUpload', this.$refs.file,this.$refs.file.$refs.input.files, e)
      this.file = e
      this.SubmitFile()
    },
    MapRowNum(){
      this.items.map((element, index) => {
        element.RowNum = index + 1
        element.isNew = true
        element.dirty = true
      })
    },
    SubmitFile(){
      if (this.file && this.uploadApi){
        let formData = new FormData()
        formData.append('file', this.file)
        var _this = this

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log(percentCompleted)
          }
        }

        this.$http.post(this.uploadApi, formData,config)
          .then((response) => {
            console.log('SubmitFile', response)
            if (response.data !== ''){
              if (response.data.result.success){
                _this.items = [...response.data.result.payload]
                _this.MapRowNum()
                //_this.$refs.uploadEditGrid.OverrideItems(response.data.result.payload)
              }else this.$eventHub.$emit('show-alert', response.data.result)
              
            }else this.$eventHub.$emit('session-timeout')          
        }).catch((err) => {
          console.warn(err)
          this.NotifyRequestError(error)
        })
      }
      
    },
    HandlePaste(e){
      if (this.uploadDialog){
        console.log('paste', e)
        navigator.clipboard.readText().then(clipText => {
          console.log(this, clipText)
          var text = clipText
          var _this = this

          this.$http.post(this.pasteApi, {
            text: clipText
          })
            .then((response) => {
              console.log('HandlePaste', response)
              if (response.data !== ''){
                if (response.data.result.success){
                  console.log(response.data.result.payload)
                  //_this.$refs.uploadEditGrid.MergeItems(response.data.result.payload) 
                  _this.items = [..._this.items, ...response.data.result.payload]   
                  _this.MapRowNum()              
                }else this.$eventHub.$emit('show-alert', response.data.result)
                
              }else this.$eventHub.$emit('session-timeout')          
          }).catch((err) => {
            console.warn(err)
            this.NotifyRequestError(err)
          })
        });
      }
    },
    DeleteConfirmation(e){    
      console.log(this.getSelectedCount, this.targetName, e)  
      if (this.getSelectedCount > 0 && this.targetName === e){
        this.ConfirmDelete(this, 'RemoveSelected', 'Are you sure you want to delete the selected item(s)?', 'Delete');
      }      
    },
    RemoveSelected(){
      var indeces = []
      this.items.forEach((element, index) => {
          if (element.selected){ indeces.push(index) }        
        });
      indeces.reverse().map(index => {
        this.items.splice(index, 1)
      })
      this.items.forEach((element, index) => {
          element.RowNum = index + 1;
          this.$set(element, 'selected', false)
        });
    },
    InsertNew(e){
      console.log(e, this.modelApi, this.targetName)
      if (this.modelApi && this.targetName === e){
        var _this = this
        this.$http.post(this.modelApi, this.periodFilters)
        .then((response) => {
          if (response.data !== ''){
            this.items = [...this.items, response.data.result]
            this.items.map((element, index) => {
              element.RowNum = index + 1
            })
          }else this.$eventHub.$emit('session-timeout')   
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
        })
      }      
    },  
  },
  computed: {
    ...mapGetters({
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
    getSelectedCount(){
      var count = 0
      this.items.forEach((element, index) => {
          if (element.selected) count++      
        });
        return count
    },
  },
  mounted() {
    console.log(this.$refs)
    window.addEventListener('paste', this.HandlePaste);
    this.$eventHub.$on('add-new', this.InsertNew)   
    this.$eventHub.$on('delete-selected', this.DeleteConfirmation)
    this.$eventHub.$on('paste', this.HandlePaste)
  },
  beforeDestroy() {
    window.removeEventListener('paste', this.HandlePaste)
    this.$eventHub.$off('add-new', this.InsertNew)   
    this.$eventHub.$off('delete-selected', this.DeleteConfirmation)
    this.$eventHub.$off('paste', this.HandlePaste)
  },
};
</script>
