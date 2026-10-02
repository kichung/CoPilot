<template>
	<div class="w-full max-w-96 min-w-64">
		<div>
			<Logo type="small" class="mb-4" max-height="40px" />
			<div class="font-display mb-4 text-4xl font-bold" data-test="login-title">
				{{ title }}
			</div>
			<div class="text-secondary text-lg">
				{{ brandConfig.tagline }}
			</div>
		</div>

		<transition name="transition-fade-move" mode="out-in" appear class="my-10">
			<SignIn v-if="type === 'signin'" key="signin" />
		</transition>
	</div>
</template>

<script lang="ts" setup>
import type { FormType } from "./types.d"
import { computed, onBeforeMount, ref } from "vue"
import Logo from "@/app-layouts/common/Logo.vue"
import { brandConfig } from "@/branding/brand.config"
import SignIn from "./SignIn.vue"

const props = defineProps<{
	type?: FormType
}>()

const type = ref<FormType>("signin")
const title = computed<string>(() => (type.value === "forgotpassword" ? "Forgot Password" : brandConfig.appName))

onBeforeMount(() => {
	if (props.type) {
		type.value = props.type
	}
})
</script>
