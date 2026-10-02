<template>
	<Provider>
		<a class="skip-link" href="#app-view">Skip to main content</a>
		<component
			:is="layoutComponent"
			id="app-layout"
			:class="[
				`theme-${themeName}`,
				`layout-${layoutComponentName}`,
				`route-${routeName}`,
				{ 'opacity-0': loading }
			]"
		>
			<RouterView v-slot="{ Component: RouterComponent }">
				<transition :name="`router-${routerTransition}`" mode="out-in" appear>
					<component :is="RouterComponent" id="app-page" :key="routeName + forceRefresh" />
				</transition>
			</RouterView>
		</component>

		<SplashScreen :show="loading" />
	</Provider>
</template>

<script lang="ts" setup>
import type { Component } from "vue"
import type { RouteLocationNormalized } from "vue-router"
import type { Layout, RouterTransition } from "@/types/theme"
import { computed, onBeforeMount, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import Blank from "@/app-layouts/Blank"
import Provider from "@/app-layouts/common/Provider.vue"
import SplashScreen from "@/app-layouts/common/SplashScreen.vue"
import HorizontalNav from "@/app-layouts/HorizontalNav"
import tokens from "@/design-tokens.json"
import { useAuthStore } from "@/stores/auth"
import { useMainStore } from "@/stores/main"
import { useThemeStore } from "@/stores/theme"
import { ThemeNameEnum } from "@/types/theme"
import { usePortalSettingsStore } from "./stores/portalSettings"
import { updateFavicon } from "./utils"

const layoutComponents = {
	HorizontalNav,
	Blank
}

const router = useRouter()
const route = useRoute()
const loading = ref(true)

const portalSettingsStore = usePortalSettingsStore()
const themeStore = useThemeStore()
const mainStore = useMainStore()
const authStore = useAuthStore()

const routeName = computed<string>(() => route?.name?.toString() || "")
const forceRefresh = computed<number>(() => mainStore.forceRefresh)
const forceLayout = ref<Layout | null>(null)
const layout = computed<Layout>(() => themeStore.layout)
const layoutComponentName = computed<Layout>(() => forceLayout.value || layout.value)
const layoutComponent = computed<Component>(() => layoutComponents[layoutComponentName.value])
const routerTransition = computed<RouterTransition>(() => themeStore.routerTransition)
const themeName = computed<ThemeNameEnum>(() => themeStore.themeName)

function checkThemeOverrides(currentRoute: RouteLocationNormalized) {
	if (currentRoute.meta?.theme?.layout !== undefined) {
		forceLayout.value = currentRoute.meta.theme.layout
	} else {
		forceLayout.value = null
	}
}

// Watch for logo changes and update favicon
watch(
	() => portalSettingsStore.portalLogo,
	newLogo => {
		if (newLogo) {
			updateFavicon(newLogo)
		}
	},
	{ immediate: true }
)

// Watch for title changes and update document title
watch(
	() => portalSettingsStore.portalTitle,
	newTitle => {
		if (newTitle) {
			document.title = newTitle
		}
	},
	{ immediate: true }
)

watch(
	() => portalSettingsStore.portalBrandColor,
	brandColor => {
		themeStore.setColor(ThemeNameEnum.Light, "primary", brandColor || tokens.colors.light.primary)
		themeStore.setColor(ThemeNameEnum.Dark, "primary", brandColor || tokens.colors.dark.primary)
	},
	{ immediate: true }
)

watch(layoutComponentName, () => {
	loading.value = false
})

// Re-resolve branding whenever the session changes: signing in may swap in the
// customer's own branding, signing out must fall back to the global defaults.
watch(
	() => authStore.isLogged,
	() => {
		portalSettingsStore.syncBranding()
	}
)

router.afterEach(currentRoute => {
	checkThemeOverrides(currentRoute)
})

onBeforeMount(async () => {
	await portalSettingsStore.fetchSettings()
	await portalSettingsStore.syncBranding()

	checkThemeOverrides(route)

	setTimeout(() => {
		loading.value = false
	}, 500)
})
</script>


<style scoped>
.skip-link {
	position: fixed;
	z-index: 9999;
	top: 10px;
	left: 10px;
	padding: 9px 12px;
	border-radius: 9px;
	background: var(--primary-color);
	color: white;
	font-size: 12px;
	font-weight: 700;
	text-decoration: none;
	transform: translateY(-180%);
	transition: transform 0.16s ease;
}
.skip-link:focus { transform: translateY(0); }
</style>
