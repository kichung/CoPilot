<template>
	<div class="logo" :class="`logo--${type}`">
		<Transition name="logo-fade" mode="out-in">
			<img
				v-if="logoSrc"
				:key="logoSrc"
				:src="logoSrc"
				:alt="`${brandConfig.companyName} logo`"
				:aria-label="`${brandConfig.companyName} logo`"
				class="logo-image"
			/>
			<div v-else :key="`wordmark-${type}`" class="wordmark" :aria-label="brandConfig.appName">
				<div class="wordmark-mark" aria-hidden="true">{{ initials }}</div>
				<div v-if="type !== 'small'" class="wordmark-copy">
					<div class="wordmark-product">{{ brandConfig.productName }}</div>
					<div v-if="type === 'large'" class="wordmark-company">{{ brandConfig.companyName }}</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { brandConfig, resolveBrandLogo } from "@/branding/brand.config"
import { useThemeStore } from "@/stores/theme"

interface Props {
	type?: "default" | "small" | "large"
	dark?: boolean
	maxHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
	type: "default",
	dark: undefined,
	maxHeight: "32px"
})

const themeStore = useThemeStore()
const isDark = computed<boolean>(() => props.dark ?? themeStore.isThemeDark)
const logoSrc = computed<string | undefined>(() => resolveBrandLogo(props.type, isDark.value ? "dark" : "light"))
const initials = computed(() =>
	brandConfig.productName
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(word => word[0]?.toUpperCase())
		.join("") || "SOC"
)
</script>

<style lang="scss" scoped>
.logo {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	min-width: 0;

	.logo-image {
		max-height: v-bind(maxHeight);
		height: 100%;
		width: auto;
		display: block;
		object-fit: contain;
	}
}

.wordmark {
	display: flex;
	align-items: center;
	gap: 10px;
	min-width: 0;
}

.wordmark-mark {
	display: grid;
	place-items: center;
	width: 32px;
	height: 32px;
	border-radius: 10px;
	background: linear-gradient(145deg, var(--primary-color), rgba(var(--primary-color-rgb) / 0.72));
	color: white;
	font-family: var(--font-family-display);
	font-size: 10px;
	font-weight: 800;
	letter-spacing: 0.06em;
	box-shadow: 0 8px 20px rgba(var(--primary-color-rgb) / 0.2);
}

.wordmark-copy {
	min-width: 0;
	line-height: 1.05;
	text-align: left;
}

.wordmark-product {
	overflow: hidden;
	color: var(--fg-default-color);
	font-family: var(--font-family-display);
	font-size: 13px;
	font-weight: 750;
	letter-spacing: -0.01em;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.wordmark-company {
	margin-top: 4px;
	overflow: hidden;
	color: var(--fg-secondary-color);
	font-size: 9px;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.logo--small .wordmark-mark {
	width: 30px;
	height: 30px;
	border-radius: 9px;
}

.logo-fade-enter-active,
.logo-fade-leave-active {
	transition: opacity 0.2s ease-in-out;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
	opacity: 0;
}
</style>
