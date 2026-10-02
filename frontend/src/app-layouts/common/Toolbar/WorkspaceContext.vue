<template>
	<div class="workspace-context" :title="tooltip">
		<span class="workspace-context__dot" aria-hidden="true"></span>
		<div class="workspace-context__copy">
			<span class="workspace-context__label">{{ brandConfig.environmentLabel }}</span>
			<span class="workspace-context__scope">{{ scopeLabel }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { brandConfig } from "@/branding/brand.config"
import { useGlobalCustomerFilter } from "@/composables/useGlobalCustomerFilter"

const { globalCustomerCodes, isFiltering } = useGlobalCustomerFilter()

const scopeLabel = computed(() => {
	if (!isFiltering.value) return "All customers"
	if (globalCustomerCodes.value.length === 1) return globalCustomerCodes.value[0]
	return `${globalCustomerCodes.value.length} customers`
})

const tooltip = computed(() => `${brandConfig.appName} · ${scopeLabel.value}`)
</script>

<style scoped lang="scss">
.workspace-context {
	display: flex;
	align-items: center;
	gap: 9px;
	min-width: 0;
	padding: 7px 10px;
	border: 1px solid rgba(var(--border-color-rgb) / 0.72);
	border-radius: 12px;
	background: rgba(var(--bg-default-color-rgb) / 0.7);
	backdrop-filter: blur(12px);
}

.workspace-context__dot {
	width: 7px;
	height: 7px;
	flex: 0 0 auto;
	border-radius: 999px;
	background: var(--success-color);
	box-shadow: 0 0 0 4px rgba(var(--success-color-rgb) / 0.12);
}

.workspace-context__copy {
	display: flex;
	min-width: 0;
	flex-direction: column;
	line-height: 1.05;
}

.workspace-context__label,
.workspace-context__scope {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.workspace-context__label {
	color: var(--fg-default-color);
	font-size: 10px;
	font-weight: 750;
}

.workspace-context__scope {
	margin-top: 3px;
	color: var(--fg-tertiary-color);
	font-size: 9px;
}

@media (max-width: 1050px) {
	.workspace-context { display: none; }
}
</style>
