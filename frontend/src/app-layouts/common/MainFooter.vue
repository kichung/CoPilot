<template>
	<footer class="footer py-4" :class="{ boxed }">
		<div class="wrap flex items-center justify-end gap-3">
			<div class="copy">
				<span>© {{ year }} </span>
				<a v-if="brandConfig.websiteUrl" :href="brandConfig.websiteUrl" target="_blank" rel="noopener noreferrer" class="font-bold no-underline">
					{{ brandConfig.companyName }}
				</a>
				<span v-else class="font-bold">{{ brandConfig.companyName }}</span>
				<span>. All rights reserved.</span>
			</div>
		</div>
	</footer>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { brandConfig } from "@/branding/brand.config"

const { boxed } = defineProps<{
	boxed: boolean
}>()

const year = ref(new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	font-size: 13px;

	.wrap {
		overflow: hidden;
		width: 100%;
		max-width: 100%;
		margin: 0 auto;
		padding: 0 var(--view-padding);

		.copy {
			line-height: 1.6;
		}
	}

	&.boxed {
		.wrap {
			max-width: var(--boxed-width);
		}
	}

	@media (max-width: 700px) {
		font-size: 10px;
	}
}
</style>
