import '@/assets/styles/app.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/style.css'
// import VueQrcodeReader from 'vue-qrcode-reader'

const app = createApp(App)

import headPart from '@/components/default/headPart.vue'
import notification from '@/components/default/notificationDefault.vue'
import inputField from '@/components/default/inputField.vue'
import laUserSelect from '@/components/default/laUserSelect.vue'
import laSelect from '@/components/default/laSelect.vue'
import laCheckbox from '@/components/default/laCheckbox.vue'
import textareaField from '@/components/default/textareaField.vue'
import uploadPhoto from '@/components/default/uploadPhoto.vue'
import uploadFile from '@/components/default/uploadFile.vue'
import searchInput from '@/components/default/searchInput.vue'
import tabList from './components/default/tabList.vue'
import Paginate from 'vuejs-paginate-next';

app.component('paginate', Paginate)
app.component('la-tabs', tabList)
app.component('la-checkbox', laCheckbox)
app.component('la-search', searchInput)
app.component('la-uploadphoto', uploadPhoto)
app.component('la-uploadfile', uploadFile)
app.component('la-textarea', textareaField)
app.component('la-select', laSelect)
app.component('la-users', laUserSelect)
app.component('la-input', inputField)
app.component('headPart', headPart)
app.component('notificationPart', notification)

// app.use(VueQrcodeReader)
app.use(createPinia())
app.use(router)

app.mount('#app')
