/**
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * Author: Jared Galanza 11-March-2020
 * Basic signalR implementation
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */
import 'signalr';
import { getServerAddress } from '../server-address.js';

export default {
  install(Vue) {
    const cchub = new Vue();
    Vue.prototype.$hub = cchub;


    let connection = null;
    let proxy = null;
    let startedPromise = null;
    let connected = false;

    const _this = this;

    // 'http://localhost:3567'
    var server_address = getServerAddress();
    if (window.cashcall.serverAddress) server_address = window.cashcall.serverAddress

    connection = $.hubConnection(server_address);
    proxy = connection.createHubProxy('cCHub');

    // console.log('signalr setup', connection, proxy, process.env.NODE_ENV);

    /**
     * create client methods here
     */

    proxy.on('hello', () => {
      console.log('hello from signalr');
      cchub.$emit('hello-called');
    });

    proxy.on('getUserInfo', () => {
      console.log('proxy.getUserInfo');
      cchub.$emit('update-user-info');
    });

    proxy.on('setSelectedWW', (data) => {
      console.log('setSelectedWW', data);
    });

    function start() {
      startedPromise = connection
        .start({ jsonp: true })
        .done(() => {
        // console.log('Hub connection: ' + connection.id)
          connected = true;
          // window.open(`http://localhost:3567/getuser/${connection.id}`)
          cchub.$emit('hub-connected', connection.id);
        })
        .fail(() => {
          console.warn('Could not connect to hub', _this.$store);
        });
    }

    start();


    /**
     * Invoke hub methods in the server here
     */

    cchub.sayhello = () => {
      // console.log('sayhello', connection, proxy.invoke)

      if (!startedPromise) return; // to ensure no invocation happens until the connection is established

      if (connected) {
        proxy.invoke('Hello');
      }
    };

    cchub.getUserInfo = (payload) => {
      console.log('cchub.getUserInfo', startedPromise, connected);
      if (!startedPromise) return; // to ensure no invocation happens until the connection is established

      if (connected) {
        proxy.invoke('GetUser', connection.id);
      }
    };
  },
};
