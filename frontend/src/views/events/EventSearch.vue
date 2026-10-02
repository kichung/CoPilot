<template>
	<div class="page">
		<PageHeader
			eyebrow="Investigation"
			title="Event Search"
			description="Search normalized security telemetry, inspect raw event context, and pivot from findings into investigation workflows."
		/>
		<div class="ui-panel ui-panel--padded">
			<EventSearch />
		</div>
	</div>
</template>

<script setup lang="ts">
import EventSearch from "@/components/events/EventSearch.vue"
import PageHeader from "@/components/ui/PageHeader.vue"
</script>
