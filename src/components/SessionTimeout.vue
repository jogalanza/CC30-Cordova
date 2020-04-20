<template>
  <v-dialog v-model="sessionDialog" persistent max-width="400" overlay-opacity="0.85" no-click-animation>
        <!-- <template v-slot:activator="{ on }">
          <v-btn icon @click.stop="handleDialog(on)">
            <v-icon>mdi-calendar-month</v-icon>
          </v-btn>
        </template> -->
        <v-card>
          <v-card-title class="headline" style="margin-bottom:12px;background-color:#eee">Session Expired</v-card-title>
          <v-card-text style="padding-bottom:16px">
            <div style="font-size:1.2rem;color:black">Do you want to continue?</div>
            <div style="margin-top:10px;color:black">This will require page refresh and all unsaved work will be lost</div>             
          </v-card-text>
          <v-card-actions style="padding:16px">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="CancelClicked">No</v-btn>
            <v-btn color="green darken-1" dark ref='btnOK' @click="OKClicked" width="100">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
//import { mapGetters, mapState } from 'vuex';

export default {
  name: 'SessionTimeout',

  data: () => ({
    sessionDialog: false,
    caller: null
  }),
  computed: {
  },

  methods: {
    InvokeTimeOut(){
      this.sessionDialog = true
    },
    CancelClicked(){
      console.log(this.$http.defaults.baseURL)
      // this.$router.replace()
      // location.href = `${this.$http.defaults.baseURL}SessionTimeout`
      // this.$router.options.routes = []
      // window.location.replace(`${this.$http.defaults.baseURL}SessionTimeout`)
      var len = this.$router.options.routes.length
      this.$router.go((len -1) * -1)
      window.location.href = `${this.$http.defaults.baseURL}Logout/1`
    },
    OKClicked(){
      location.reload()
    }
  },
  mounted() {
  },
  beforeDestroy(){
  }
};
</script>
