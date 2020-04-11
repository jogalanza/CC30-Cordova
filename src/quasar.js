import Vue from 'vue';

import 'quasar/dist/quasar.css';
import 'quasar/dist/quasar.ie.polyfills';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QInput,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QPagination,
  QSelect,
  QTable,
  QTh,
  QTr,
  QTd
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QInput,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QPagination,
    QSelect,
    QTable,
    QTh,
    QTr,
    QTd
  },
  directives: {
  },
  plugins: {
  },
});
