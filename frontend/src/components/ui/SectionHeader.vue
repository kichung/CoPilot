<template>
	<div class="ui-section-header">
		<div>
			<div v-if="eyebrow" class="ui-eyebrow">{{ eyebrow }}</div>
			<h2>{{ title }}</h2>
			<p v-if="description">{{ description }}</p>
		</div>
		<div v-if="$slots.actions" class="ui-section-header__actions"><slot name="actions" /></div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	description?: string
	eyebrow?: string
}>()
</script>
