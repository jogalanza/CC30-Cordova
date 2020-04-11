<template>
  <v-card class="user-maintenance">
    <v-toolbar color="green" flat extended extension-height="70">
      <v-toolbar-title style="color:white">User Maintenance</v-toolbar-title>

      <v-spacer></v-spacer> 

      <!-- <q-pagination
          v-model="page"
          :max="5"
          :input="true"
          style="max-width:200px"
        >
        </q-pagination> -->

      <AddEditUserDialog :dialog="dialog" ref="addedituser" />

      <!-- <v-btn icon>
        <v-icon color="white">mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-card
      class="max-auto"
      max-width="90%"
      style="margin-top:-74px;margin-left:auto;margin-right:auto;border-radius:10px">
      <v-toolbar flat style="border-radius:10px !important">
        <!-- <v-toolbar-title class="grey--text">Title</v-toolbar-title> -->
        
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ x }">
            <v-btn outlined color="primary" v-on="x" style="margin-right:10px">
              <span style="margin-left:10px">ACTIONS</span>
            </v-btn>
          </template>
          <span>Add New User</span>
        </v-tooltip> -->

        <v-menu
          bottom
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn outlined color="primary" v-on="on" style="margin-right:10px">
              <v-icon>mdi-menu</v-icon>
              <span style="margin-left:10px">ACTIONS</span>
            </v-btn>
          </template>
          <v-list id="action-list">
            <v-list-item @click="refreshData">
              <v-list-item-action>
                  <v-icon>mdi-delete</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Delete Selected</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item @click="refreshData">
              <v-list-item-action style="margin-right:16px">
                  <v-icon>mdi-refresh</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>REFRESH</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tooltip bottom>
          <template v-slot:activator="{ x }">
            <v-btn outlined color="primary" v-on="x" @click.stop="userEditClicked(-1)">
              <v-icon>mdi-plus</v-icon>
              <span style="margin-left:10px">Add New</span>
            </v-btn>
          </template>
          <span>Add New User</span>
        </v-tooltip>

        <v-spacer></v-spacer>

        <v-text-field
          color="primary"
          dense
          outlined
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
          label="Search"
          style="margin-right:10px;max-width:200px"
        />
        
        
      <span>
        
      </span>
        

        <!-- <span>
          <v-pagination v-model="page" :length="25" :total-visible="7" circle></v-pagination>
        </span> -->

        <!-- <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              size="md"
              class="my-0"
        ></b-pagination>-->
      </v-toolbar>

      <v-card-text style="overflow:hidden;height:calc(100vh - 230px);padding-top:0px">
        <UserGrid
          :fields="fields"
          :items="items"
        />
      </v-card-text>
    </v-card>
    <!-- <div style="padding:10px">

    </div>-->
  </v-card>
</template>
<style scoped>
</style>
<style>
/* #fxrates-grid {
  max-height: calc(100vh - 144px);
  height: calc(100vh - 144px);
} */
.user-maintenance{
  padding-bottom: 10px;
  height: 100vh;
}
.user-maintenance .q-table__card{
  box-shadow: none;
}
.q-btn{
  width:30px;
}
#action-list .v-list-item{
  min-height: 34px;
  text-transform: uppercase;
}
#action-list .v-list-item-action{
  margin-right: 16px;
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import { Quasar, QPagination } from 'quasar';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'UserMaintenance',
  components: {
    AddEditUserDialog: () => import('../../components/UserMaintenance/AddEditUserDialog.vue'),
    UserGrid: () => import('../../components/UserMaintenance/UsersQGrid.vue'),
    QPagination,
  },
  mixins: [mixin],
  data: () => ({
    page: 1,
    dialog: false,
    items: [],
  }),
  methods: {
    handleDialog() {
      console.log('handleDialog');
      this.$refs.addedituser.handleDialog();
    },
    colwidthCalc(key) {
      // console.log('BusinessToSitePriorWeek.colwidthCalc')
      return {
        width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '100px',
      };
    },
    refreshData() {
      const _this = this;
      this.$http.post('admin/getusers')
        .then((response) => {
          var x = response.data.result
          x.map((data, i) => { data.index = i})
          _this.items = [...x];
        })
        .catch((error) => {
          console.warn(error);
        });
    },
    userEditClicked(id){
      console.log('userEditClicked', id)
      this.$refs.addedituser.Invoke_AddEditUser(id)
    }
  },
  computed: {
    ...mapGetters({
      fields: 'getUserMaintenanceFields',
    }),
  },
  mounted() {
    this.refreshData();
    this.$eventHub.$on('user-edit', this.userEditClicked)
    this.$eventHub.$on('refresh-users', this.refreshData)
  },
  beforeDestroy() {
    this.$eventHub.$off('user-edit', this.userEditClicked)
    this.$eventHub.$off('refresh-users', this.refreshData)
  },
  updated() {},
};
</script>
