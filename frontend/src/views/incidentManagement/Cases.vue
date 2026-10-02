<template>
	<div class="page">
		<PageHeader
			eyebrow="Incident management"
			title="Cases"
			description="Coordinate investigations, ownership, evidence, timelines, and response activity in one workspace."
		/>
		<div class="ui-panel ui-panel--padded">
			<CasesList :highlight />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRoute } from "vue-router"
import CasesList from "@/components/incidentManagement/cases/CasesList.vue"
import PageHeader from "@/components/ui/PageHeader.vue"

const route = useRoute()
const highlight = ref<string | undefined>(undefined)

onBeforeMount(() => {
	if (route.query?.case_id) highlight.value = route.query.case_id.toString() || undefined
})
</script>
