<template>
	<div class="ui-stat-tile" :class="`ui-stat-tile--${tone}`">
		<div class="ui-stat-tile__top">
			<span class="ui-stat-tile__label">{{ label }}</span>
			<slot name="icon" />
		</div>
		<div class="ui-stat-tile__value">{{ value }}</div>
		<div v-if="hint || $slots.hint" class="ui-stat-tile__hint"><slot name="hint">{{ hint }}</slot></div>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		label: string
		value: string | number
		hint?: string
		tone?: "neutral" | "info" | "success" | "warning" | "danger"
	}>(),
	{ tone: "neutral" }
)
</script>
