<template>
  <v-app class="cc-app">
    <!-- :clipped="$vuetify.breakpoint.mdOnly" -->
    <v-navigation-drawer
      id="menuDrawer"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdOnly"
      class="d-lg-none d-xl-none"
      app
      style="width:302px"
    >
      <v-card class="mx-auto" max-width="400" style="box-shadow:none">
        <v-img class="white--text align-end" height="120px" :src="require('./assets/bg1.jpg')">
          <v-card-title>
            <span style="font-size:1rem">Username</span>
            <v-spacer></v-spacer>
            <span
              @click="$eventHub.$emit('sign-out')"
              style="cursor:pointer;font-size:0.9rem"
            >Sign Out</span>
          </v-card-title>
        </v-img>

        <v-list dense>
          <!-- 1st group -->

          <v-list-group no-action prepend-icon="mdi-table">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Reports</v-list-item-title>
              </v-list-item-content>
            </template>

            <template v-for="(item, index) in report_data">
              <template v-if="item.title !== 'divider'">
                <v-list-item :key="index" @click="navigateTo(item)">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-divider :key="index"></v-divider>
              </template>
            </template>
          </v-list-group>

          <!-- 2nd group -->

          <v-list-group no-action prepend-icon="mdi-table">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Data Entry</v-list-item-title>
              </v-list-item-content>
            </template>

            <template v-for="(item, index) in entry_data">
              <template v-if="item.title !== 'divider'">
                <v-list-item :key="index" @click="navigateTo(item)">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-divider :key="index"></v-divider>
              </template>
            </template>
          </v-list-group>

          <!-- 3rd group -->

          <v-list-group no-action prepend-icon="mdi-table">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Misc</v-list-item-title>
              </v-list-item-content>
            </template>

            <template v-for="(item, index) in misc_data">
              <template v-if="item.title !== 'divider'">
                <v-list-item :key="index" @click="navigateTo(item)">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-divider :key="index"></v-divider>
              </template>
            </template>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      dark
      fixed
      style="background-color: #1e2123 !important;height:64px !important"
    >
      <v-app-bar-nav-icon class="d-sm-flex d-md-none" @click.stop="drawer = !drawer" />
      <div
        class="d-flex align-center"
        style="padding:10px;pointer-style:hand"
        @click
        to="/dashboard"
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 d-none d-sm-flex"
          contain
          :src="require('./assets/excelitas_logo.png')"
          transition="scale-transition"
          width="150"
        />
        <span
          style="font-family: Archivo;letter-spacing:0.6rem;text-transform:uppercase;margin-left:10px;width:180px;text-align-center"
        >
        <div>
          <div style="text-align:center">CASH CALL</div>
          <!-- <div style="font-size:0.6rem;letter-spacing:0.3rem;">WW12.Q1.2020</div> -->
        </div>
        </span>
      </div>

      <!-- <v-divider class="mx-4 d-none d-md-flex" vertical style="margin-top:0px"></v-divider> -->

      <v-spacer></v-spacer>

      <v-menu :close-on-content-click="true" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary transparent d-none d-md-flex"
            dark
            v-on="on"
            class="menu-button"
          >Reports</v-btn>
        </template>

        <v-list style="min-width:320px" class="cc-menu-list">
          <template v-for="(item, index) in report_data">
            <template v-if="item.title !== 'divider'">
              <v-list-item @click="navigateTo(item)" :key="index" v-model="item.active" no-action>
                <v-list-item-action>
                  <v-icon color="white">{{ item.action}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <v-divider :key="index"></v-divider>
            </template>
          </template>
        </v-list>
      </v-menu>

      <v-menu :close-on-content-click="true" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary transparent d-none d-md-flex"
            dark
            v-on="on"
            class="menu-button"
          >Data Entry</v-btn>
        </template>

        <v-list style="min-width:270px" class="cc-menu-list">
          <template v-for="(item, index) in entry_data">
            <template v-if="item.title !== 'divider'">
              <v-list-item @click="navigateTo(item)" :key="index" v-model="item.active" no-action>
                <v-list-item-action>
                  <v-icon color="white">{{ item.action}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <v-divider :key="index"></v-divider>
            </template>
          </template>
        </v-list>
      </v-menu>

      <v-menu :close-on-content-click="true" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary transparent d-none d-md-flex"
            dark
            v-on="on"
            class="menu-button"
          >Misc</v-btn>
        </template>

        <v-list style="min-width:230px" class="cc-menu-list">
          <template v-for="(item, index) in misc_data">
            <template v-if="item.title !== 'divider'">
              <v-list-item @click="navigateTo(item)" :key="index" v-model="item.active" no-action>
                <v-list-item-action>
                  <v-icon color="white">{{ item.action}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <v-divider :key="index"></v-divider>
            </template>
          </template>
        </v-list>
      </v-menu>

      <v-divider vertical style="margin-left:10px" class="mx-4 d-none d-md-flex"></v-divider>

      <PeriodSelectDialog />
      <ConfirmDialog />
      <SessionTimeout ref='sessionTimeout' />

      <v-menu :close-on-content-click="true" bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon class="d-none d-md-flex">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-list style="min-width:230px" class="cc-menu-list">
          <template v-for="(item, index) in admin_menu">
            <template v-if="item.title !== 'divider'">
              <v-list-item @click="navigateTo(item)" :key="index" v-model="item.active" no-action>
                <v-list-item-action>
                  <v-icon color="white">{{ item.action}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <v-divider :key="index"></v-divider>
            </template>
          </template>
        </v-list>
      </v-menu>

      <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on" class="d-none d-md-flex">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-card class="mx-auto" max-width="400" style="box-shadow:none">
          <v-img
            class="white--text align-end"
            height="100px"
            width="250px"
            :src="require('./assets/bg1.jpg')"
          >
            <v-card-title>
              <span style="font-size:1rem">Username</span>
              <v-spacer></v-spacer>
              <span
                @click="$eventHub.$emit('sign-out')"
                style="cursor:pointer;font-size:0.9rem"
              >Sign Out</span>
            </v-card-title>
          </v-img>
        </v-card>
      </v-menu>

      <BackLogDialog />
      
    </v-app-bar>

    <v-snackbar v-model="alert" bottom left :color="alertType">
      {{ alertMsg }}
      <v-btn color="white" text  @click="alert = false" >
        Close
      </v-btn>
    </v-snackbar>


    <v-content class="main-app-content" style="padding:64px 0px 0px 0px">
      <router-view></router-view>
      
    </v-content>

    <v-footer dark app>
      <div style="font-size:0.7rem">Ready.</div>
      <v-spacer></v-spacer>
      <!-- <v-divider vertical style="background-color:#666;margin-right:10px" /> -->
      <div style="font-size:0.7rem;letter-spacing:0.2rem;">
        {{ userInfo.userId !== 0 ? `${userInfo.adLogin} : ${userInfo.roleDescription}` : '[Refresh page to get user info..]'}}
      </div>
      <v-divider vertical style="background-color:#666;margin-right:10px;margin-left:10px" />
      <div style="font-size:0.7rem;letter-spacing:0.2rem;">
        {{ current_period.weekOfYear ? `CURRENT: WW${current_period.weekOfYear}.Q${current_period.quarter}.${current_period.year}` : '[Getting current period info...]' }}
      </div>
    </v-footer>
  </v-app>
</template>

<style>
.v-application {
  font-family: "Archivo" !important;
}
.v-card header.v-toolbar{
  border-radius: 0px !important;
}
.main-app-content {
  padding: 64px 0px 0px 0px;
}
.v-list.cc-menu-list {
  background: rgba(0, 0, 0, 0.8) !important;
}
.v-list.cc-menu-list > .v-list-item .v-list-item__title {
  color: white !important;
}
@media (min-width: 960px) {
  .main-app-content {
    padding: 56px 0px 0px 0px;
  }
}
.cc-app .menu-button .v-btn__content {
  font-family: "Archivo", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  /* color: #000; */
  letter-spacing: 0.1875rem;
  text-transform: uppercase;
  padding: 1rem;
  cursor: pointer;
  line-height: 0px;
}
.cc-app .menu-button .v-btn__content:hover {
  /* color:yellow; */
  border-bottom: 2px solid greenyellow;
}
button.v-btn.transparent {
  background-color: transparent !important;
}
button.v-btn,
.v-list-item__title {
  font-family: "Archivo";
  font-size: 0.9rem;
}
.v-list-group__header > .v-list-item__icon:first-child {
  margin-right: 16px !important;
}
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 54px !important;
}
.v-list-item__title {
  font-size: 0.9rem !important;
}
.table-data-notice {
  margin-left: auto;
  margin-right: auto;
  font-size: 0.8rem;
  text-align: right;
  color: #555;
}
</style>

<script>
import { mapGetters, mapState } from 'vuex';
import GridStyle from './components/GridStyle.vue';
import EntryStyle from './components/EntryStyle.vue'
// import $ from 'jquery'
// import 'ms-signalr-client-jquery-3'
// import "signalr";

export default {
  name: 'App',

  components: {
    BackLogDialog: () => import('./components/BackLogDialog/BackLogDialog.vue'),
    PeriodSelectDialog: () => import('./components/PeriodSelectDialog.vue'),
    ConfirmDialog: () => import('./components/ConfirmDialog.vue'),
    SessionTimeout: () => import('./components/SessionTimeout.vue')
  },

  data: () => ({
    drawer: false,
    periodDialog: false,
    alertMsg: '',
    alertType: 'success',
    alert: false
  }),
  computed: {
    ...mapGetters({
      report_data: 'getReportDataMenu',
      entry_data: 'getDataEntryMenu',
      misc_data: 'getMiscMenu',
      admin_menu: 'getAdminMenu',
      period_type: 'getPeriodTypes',
      autoDrill: 'getAutoExpand',
    }),
    current_period: {
      get() {
        return this.$store.state.current_period;
      },
      set(value) {
        this.$store.commit('setCurrentPeriod', value);
      },
    },
    userInfo: {
      get(){
        return this.$store.state.userInfo
      }
    }
  },
  methods: {
    navigateTo(item) {
      console.log(item);
      if (item.route) {
        this.$router.push(item.route);
      }
    },
    GetCurrentPeriod() {
      const _this = this;
      console.log('GetCurrentPeriod')
      this.$http.get('/getcurrentperiod')
        .then((response) => {
        // console.log(response);
          _this.current_period = { ...response.data.result };
          _this.$store.commit('setPeriodFilterToCurrent');
        })
        .catch((error) => {
          console.log(error);
        })
    },
    GetUserInfo(){
      console.log('GetUserInfo')
      const _this = this;
      this.$http.get('/user/info')
      .then((response) => {      
      if (response.data !== ''){
        console.log(response);
        _this.$store.commit('setUserInfo', response.data.result);
      }
       
      })
      .catch((error) => {
        console.log(error);
      })
    },
    ShowAlert(result){
      console.log('ShowAlert', result)
      this.alertMsg = result.message;
      this.alertType = result.success ? 'info' : 'error'
      this.alert = true
    },
    HandleSessionTimeOut(){
      this.$refs.sessionTimeout.InvokeTimeOut()
    }
  },
  mounted() {
    
    this.$eventHub.$on('show-alert', this.ShowAlert);
    this.$eventHub.$on('session-timeout', this.HandleSessionTimeOut)
    this.$hub.$on('update-user-info', this.GetUserInfo)
    
    setTimeout(() => {
      this.GetCurrentPeriod()
      this.GetUserInfo()
    }, 5000)
  },
  updated(){
    console.log('updated')
  },
  created() {
    this.$hub.$on('hub-connected', this.registerHubID);    
  },
  beforeDestroy() {
    this.$hub.$off('hub-connected', this.registerHubID);
    this.$eventHub.$off('show-alert', this.ShowAlert);
    this.$eventHub.$off('session-timeout', this.HandleSessionTimeOut)
    this.$hub.$off('update-user-info', this.GetUserInfo)
  },
};
</script>
