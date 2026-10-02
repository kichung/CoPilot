<template>
	<header class="ui-page-header">
		<div class="ui-page-header__copy">
			<div v-if="eyebrow" class="ui-eyebrow">{{ eyebrow }}</div>
			<div class="ui-page-header__title-row">
				<div>
					<h1>{{ title }}</h1>
					<p v-if="description">{{ description }}</p>
				</div>
				<div v-if="$slots.meta" class="ui-page-header__meta"><slot name="meta" /></div>
			</div>
		</div>
		<div v-if="$slots.actions" class="ui-page-header__actions"><slot name="actions" /></div>
	</header>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	description?: string
	eyebrow?: string
}>()
</script>
