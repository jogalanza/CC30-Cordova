<template>
  <v-dialog id="add-edit-user-dialog" v-model="dialog" persistent max-width="600" >
    <!-- <template v-slot:activator="{ on }">

    </template>-->
    <v-card :loading="loading">
      <v-card-title class="headline" style="margin-bottom:12px;background-color:#eee;text-transform:uppercase">
        {{ user.userId === -1 ? 'New User' : 'Edit User'}}
        <v-spacer />
        <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      <v-card-text style="padding-bottom:0px;max-height:400px;overflow-y:auto">
        <v-row>
          <v-col cols="12" :sm="user.roleId > 2 ? 6 : 12">
            <v-text-field
              outlined
              dense
              v-model="user.adLogin"
              label="User Name"
            />

            <v-text-field outlined dense v-model="user.name" label="Name of Person" />

            <!-- <v-text-field outlined dense v-model="user.notes" label="Notes" /> -->

            <v-select
              id="selectRole"
              v-model="user.roleId"
              dense
              label="Account Type"
              :items="userRoles"
              item-text="name"
              item-value="roleId"
              :hint="getRoleHint"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" :style="user.roleId > 2 ? '' : 'display:none'">
            <v-select
              v-model="user.restriction"
              dense
              label="Restriction Type"
              :items="restrictions"
              outlined
            ></v-select>

            <div id='restriction-filter-cont'>
              <v-text-field      
              clearable        
              solo
              hide-details
              dense
              filled
              :suffix="calc_selected"
              append-icon="mdi-filter"
              v-model="filter"
              label="Filter..."
              style="border-radius:5px 5px 0px 0px;"
            />

              <v-list-item-group
                v-if="user.restriction > 0"
                id="restriction_list"
                height="30px"
              >
                <v-list-item
                  dense
                  v-for="(item, index) in calc_array"
                  :key="index"
                  :class="item.selected ? 'user-selected' : ''"
                >
                  <v-list-item-icon @click="item.selected = !item.selected">
                    <v-icon :style="item.selected ? 'color:red' : ''">{{ item.selected ? 'mdi-minus-circle-outline' : 'mdi-plus-circle-outline'}}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions style="background-color:#eee">
        <v-spacer></v-spacer>
        <!-- <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn> -->
        <v-btn color="primary darken-1" style="color:white;width:100px" @click="SubmitUser">
          <v-icon small style="margin-right:10px">mdi-content-save</v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
#add-edit-user-dialog .v-messages__message{
  font-size: 0.7rem;
  color: blue;
}
#restriction-filter-cont .v-list-item__content{
  color: #bbb;
}
#restriction-filter-cont .v-text-field__suffix{
  font-size: 0.8rem;
}
#restriction-filter-cont .v-input__slot{
  background-color: #eee;
  border-bottom: 2px solid red;
}
#restriction_list.v-item-group .v-list-item--dense {
  font-size: 1rem;
}
#restriction_list.v-item-group .v-list-item--dense.user-selected {
  /* background-color: #4caf50; */
}
#restriction_list.v-item-group
  .v-list-item--dense.user-selected
  .v-list-item__content,
#restriction_list.v-item-group
  .v-list-item--dense.user-selected
  .v-list-item__icon
  .v-icon {
  color: darkgreen;
  font-weight: bold;
}
#restriction_list.v-item-group .v-list-item--dense .v-list-item__icon {
  margin-right: 10px;
}
#restriction_list {
  height: 250px;
  overflow-y: auto;
  border: 1px solid #aaa;
  border-radius: 0px 0px 5px 5px;
}
</style>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'AddEditUser',

  data: () => ({
    dialog: false,
    filter: null,
    loading: false,
    user: {
      adLogin: null,
      name: null,
      notes: null,
      roleId: 3,
      restriction: 1,
      siteAccess: [],
      productAccess: [],
    },
    restrictions: [
      { value: 1, text: 'Site Restricted' },
      { value: 2, text: 'Product Family Restricted' },
    ],
    userRoles: [],
  }),
  methods: {
    handleDialog(on) {
      this.dialog = true;
    },
    Invoke_AddEditUser(id){
      var _this = this
      this.loading = true
      this.dialog = true

      this.$http.post(`admin/user/${id}`)
      .then((response) => {
        console.log(response.data.result)
        if (response.data.result.length > 0){
          _this.user.siteAccess = []
          _this.user.productAccess = []
          _this.user = {...response.data.result[0]}                  
        }
        _this.loading = false  
      })
      .catch((error) => {
        console.error(error)
        _this.loading = false 
      })
    },
    SubmitUser(){
      var _this = this
      this.$http.post(`admin/user/save`, this.user)
      .then((response) => {
        console.log('SubmitUser', response.data.result)
        if (response.data.result.success){
          _this.dialog = false
          _this.$eventHub.$emit('refresh-users')
        } 
        _this.$eventHub.$emit('show-alert', response.data.result)
        
      })
      .catch((error) => {
        console.error(error)
        _this.loading = false 
      })
    },
    GetUserRoles(){
      var _this = this

      this.$http.post(`admin/user/roles`)
      .then((response) => {
        console.log(response.data.result)
        if (response.data.result.length > 0){
          _this.userRoles = []
          _this.userRoles = [...response.data.result]      
        }
      })
      .catch((error) => {
        console.error(error)
      })
    }
  },
  computed: {
    calc_array() {
      const forFilter = this.user.restriction === 1 ? this.user.siteAccess : this.user.productAccess;
      const _this = this;
      //Filter
      var result = forFilter.filter((x, index) => {
        if (_this.filter) {
          return x.name.toLowerCase().indexOf(_this.filter.toLowerCase()) > -1;
        } return true;
      });
      //Sort
      result.sort((a, b) => {
        return b.selected - a.selected
      })
      return result
    },
    calc_selected(){
      const total = this.user.restriction === 1 ? this.user.siteAccess.length : this.user.productAccess.length
      var selected = 0;
      this.calc_array.forEach((item, index) => {
        if (item.selected) selected++
      })
      return `${selected}/${total}`
    },
    getRoleHint(){
      var _this = this
      var description = ''

      this.userRoles.forEach(element => {
        if (element.roleId === _this.user.roleId) description = element.description
      });

      return description
    }
  },
  mounted(){
    this.GetUserRoles()
  }
};
</script>
