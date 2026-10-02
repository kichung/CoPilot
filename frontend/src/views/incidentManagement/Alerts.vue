<template>
	<div class="page">
		<PageHeader
			eyebrow="Incident management"
			title="Alerts"
			description="Triage, correlate, assign, and link security alerts into actionable investigation workflows."
		/>
		<div class="ui-panel ui-panel--padded">
			<AlertsList :highlight />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRoute } from "vue-router"
import AlertsList from "@/components/incidentManagement/alerts/AlertsList.vue"
import PageHeader from "@/components/ui/PageHeader.vue"

const route = useRoute()
const highlight = ref<string | undefined>(undefined)

onBeforeMount(() => {
	if (route.query?.alert_id) highlight.value = route.query.alert_id.toString() || undefined
})
</script>
