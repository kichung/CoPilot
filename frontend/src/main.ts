import { createPinia } from "pinia"
import { createPersistedState } from "pinia-plugin-persistedstate"
import { createApp } from "vue"
import App from "@/App.vue"
import { brandConfig } from "@/branding/brand.config"
import i18n from "@/lang"
import router from "@/router"
import "@/assets/scss/index.scss"
import "./tailwind.css"

document.title = brandConfig.appName

const mobileTitle = document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-title"]')
if (mobileTitle) {
	mobileTitle.content = brandConfig.appName
}

const meta = document.createElement("meta")
meta.name = "naive-ui-style"
document.head.appendChild(meta)

const pinia = createPinia()
pinia.use(createPersistedState())

const app = createApp(App)
app.use(pinia)
app.use(i18n)
app.use(router)

app.mount("#app")

// TODO-FE: search for all <style/> tags and replace them with tailwind classes
