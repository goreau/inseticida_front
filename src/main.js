import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../node_modules/bulma/css/bulma.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import '../node_modules/tabulator-tables/dist/css/tabulator_bulma.min.css'


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faFilePdf, faFileExcel, faFileCsv, faFileLines, faTrash, faEdit, faPlusCircle, faCheck,
    faUser, faUsers, faHouse, faFileContract, faClockRotateLeft, faScrewdriverWrench, faSearch, faBuilding, faLock, 
    faHourglass, faEye, faEyeSlash, faFileInvoice, faBroom, faBan, faFlask, faCubes, faLocationDot, faTruckFast, faHandHolding, faGavel,
    faClone, faEnvelope, faPersonCircleCheck,} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faFilePdf, faFileExcel, faFileCsv, faFileLines, faTrash, faEdit, faPlusCircle, faCheck,
    faUser, faUsers, faHouse, faFileContract, faClockRotateLeft, faScrewdriverWrench, faSearch, faBuilding, faLock, 
    faHourglass, faEye, faEyeSlash, faFileInvoice, faBroom, faBan, faFlask, faCubes, faLocationDot, faTruckFast, faHandHolding, faGavel, 
    faClone, faEnvelope, faPersonCircleCheck );

createApp(App)
.use(store)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
