<template>
  <v-dialog v-model="confirmDialog" persistent max-width="300">
        <!-- <template v-slot:activator="{ on }">
          <v-btn icon @click.stop="handleDialog(on)">
            <v-icon>mdi-calendar-month</v-icon>
          </v-btn>
        </template> -->
        <v-card>
          <v-card-title class="headline" style="margin-bottom:12px">{{ caller && caller.title ? caller.title : 'Confirm' }}</v-card-title>
          <v-card-text style="padding-bottom:12px;color:black">
            {{ caller && caller.message ? caller.message : 'Do you want to continue?' }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="CancelClicked">Cancel</v-btn>
            <v-btn color="green darken-1" dark ref='btnOK' @click="OKClicked">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
//import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ConfirmDialog',

  data: () => ({
    confirmDialog: false,
    caller: null
  }),
  computed: {
  },

  methods: {
    showConfirm(caller){
      this.caller = caller
      this.confirmDialog = true
    },
    CancelClicked(){
      this.confirmDialog = false
      this.caller = null
    },
    OKClicked(){
      console.log('OKClicked', this.caller)
      if (this.caller && this.caller.callback){
        var target = this.caller.Target
        target[this.caller.callback]()
      }
      this.caller = null
      this.confirmDialog = false
    }
  },
  mounted() {
    this.$eventHub.$on('show-confirm-dialog', this.showConfirm)
  },
  beforeDestroy(){
    this.$eventHub.$off('show-confirm-dialog', this.showConfirm)
  }
};
</script>
