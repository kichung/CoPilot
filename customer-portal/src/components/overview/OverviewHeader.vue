<template>
	<header class="portal-hero">
		<div class="min-w-0">
			<div class="portal-hero__eyebrow">Security service overview</div>
			<h1>Security posture</h1>
			<p>
				A concise view of current security workload, protected assets, recent activity, and SOC-delivered findings.
			</p>
		</div>

		<div class="flex min-w-0 flex-col items-end gap-3 max-[760px]:items-start">
			<div class="portal-scope-chip" :title="scopeTitle">
				<Icon name="carbon:filter" :size="14" />
				<span class="truncate">{{ scopeLabel }}</span>
			</div>
			<div class="text-tertiary flex items-center gap-3 font-mono text-xs">
				<span v-if="lastUpdated" class="tabular-nums">updated {{ formatDate(lastUpdated, dFormats.time) }}</span>
				<n-button
					size="small"
					quaternary
					:disabled="refreshing"
					aria-label="Refresh security overview"
					@click="emit('refresh')"
				>
					<template #icon>
						<Icon name="carbon:renew" :class="{ 'animate-spin': refreshing }" />
					</template>
				</n-button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui"
import { computed } from "vue"
import Icon from "@/components/common/Icon.vue"
import { useAuthStore } from "@/stores/auth"
import { useCustomerFilterStore } from "@/stores/customerFilter"
import { useSettingsStore } from "@/stores/settings"
import { formatDate } from "@/utils/format"

defineProps<{
	lastUpdated: Date | null
	refreshing: boolean
}>()

const emit = defineEmits<{ (e: "refresh"): void }>()
const authStore = useAuthStore()
const customerFilterStore = useCustomerFilterStore()
const dFormats = useSettingsStore().dateFormat

const scopeCodes = computed(() =>
	customerFilterStore.selectedCustomerCodes.length
		? customerFilterStore.selectedCustomerCodes
		: authStore.accessibleCustomerCodes
)

const scopeLabel = computed(() => {
	if (!customerFilterStore.selectedCustomerCodes.length && authStore.accessibleCustomerCodes.length > 1) {
		return `All customers (${authStore.accessibleCustomerCodes.length})`
	}
	return scopeCodes.value.join(", ") || "No customer scope"
})

const scopeTitle = computed(() => `Security data scope: ${scopeCodes.value.join(", ")}`)
</script>
