<template>
	<div class="page @container">
		<VersionUpdateBanner class="mb-6" />

		<PageHeader
			eyebrow="Security operations"
			title="SOC Overview"
			description="A single operational view of incident workload, endpoint coverage, data services, and platform reliability."
		>
			<template #meta>
				<div class="overview-scope">
					<span class="overview-scope__dot" aria-hidden="true"></span>
					<span>{{ scopeSummary }}</span>
				</div>
			</template>
			<template #actions>
				<n-button size="small" type="primary" secondary @click="showQuickActions = true">
					<template #icon><Icon :name="QuickActionsIcon" /></template>
					Quick Actions
				</n-button>
			</template>
		</PageHeader>

		<section class="overview-control-strip mb-6">
			<div>
				<div class="font-semibold">Customer scope</div>
				<div class="text-secondary mt-1 text-xs">
					Use the global customer selection for incident and endpoint metrics on this page.
				</div>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-secondary text-xs">{{ useGlobalCustomerFilterToggle ? "Global scope enabled" : "All customers" }}</span>
				<n-switch v-model:value="useGlobalCustomerFilterToggle" size="small" />
			</div>
		</section>

		<section class="mb-7">
			<SectionHeader
				eyebrow="Operational posture"
				title="At a glance"
				description="Coverage and workload indicators across the currently selected scope."
			/>
			<div class="grid grid-flow-row-dense grid-cols-12 gap-4">
				<div class="xs:col-span-12 col-span-12 sm:col-span-4 min-[75rem]:col-span-2">
					<div class="ui-panel h-full"><AgentsCard class="h-full" :customer-codes="effectiveCustomerCodes" /></div>
				</div>
				<div class="xs:col-span-6 col-span-12 sm:col-span-4 min-[75rem]:col-span-2">
					<div class="ui-panel h-full"><HealthcheckCard class="h-full" /></div>
				</div>
				<div class="xs:col-span-6 col-span-12 sm:col-span-4 min-[75rem]:col-span-2">
					<div class="ui-panel h-full"><CustomersCard class="h-full" /></div>
				</div>
				<div class="col-span-12 sm:col-span-6 min-[75rem]:col-span-3">
					<div class="ui-panel h-full"><IncidentAlerts class="h-full" :customer-codes="effectiveCustomerCodes" /></div>
				</div>
				<div class="col-span-12 sm:col-span-6 min-[75rem]:col-span-3">
					<div class="ui-panel h-full"><IncidentCases class="h-full" :customer-codes="effectiveCustomerCodes" /></div>
				</div>
			</div>
		</section>

		<section class="overview-workbench mb-7">
			<div class="overview-workbench__heading">
				<div>
					<div class="ui-eyebrow">Operator workbench</div>
					<h2>Common workflows</h2>
					<p>Start frequently used assessment, response, and investigation workflows from one place.</p>
				</div>
			</div>
			<div class="overview-actions-grid">
				<StackProvisioningButton size="small" type="primary" secondary />
				<CloudSecurityAssessmentButton size="small" type="primary" secondary />
				<WebVulnerabilityAssessmentButton size="small" type="primary" secondary />
				<GitHubAuditButton size="small" type="primary" secondary />
				<ActiveResponseWizardButton size="small" type="primary" secondary />
				<ThreatIntelButton size="small" type="primary" secondary />
			</div>
		</section>

		<section class="mb-7">
			<SectionHeader
				eyebrow="Data plane"
				title="Index activity"
				description="Active data indices underpinning search, detection, and investigation workflows."
			/>
			<div class="ui-panel overview-panel--flush">
				<IndicesMarquee @click="routeIndex($event.index).navigate()" />
			</div>
		</section>

		<section class="mb-7">
			<SectionHeader
				eyebrow="Platform reliability"
				title="Search cluster health"
				description="Capacity and allocation signals for the indexing layer."
			/>
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div class="ui-panel ui-panel--padded"><ClusterHealth class="h-full" /></div>
				<div class="ui-panel ui-panel--padded"><NodeAllocation class="h-full" /></div>
			</div>
		</section>

		<section>
			<SectionHeader
				eyebrow="Detection engineering"
				title="Processing pipeline"
				description="Pipeline stages responsible for routing and enriching security events."
			/>
			<div class="ui-panel ui-panel--padded">
				<PipeList @open-rule="routeGraylogPipelines($event).navigate()" />
			</div>
		</section>

		<n-drawer
			v-model:show="showQuickActions"
			:width="360"
			style="max-width: 92vw"
			:trap-focus="false"
			display-directive="show"
		>
			<n-drawer-content title="Quick Actions" closable :native-scrollbar="false">
				<p class="text-secondary mb-5 text-xs leading-5">
					Launch an operational workflow without leaving the current context.
				</p>
				<div class="flex flex-col gap-3">
					<StackProvisioningButton size="small" type="primary" />
					<CloudSecurityAssessmentButton size="small" type="primary" />
					<WebVulnerabilityAssessmentButton size="small" type="primary" />
					<GitHubAuditButton size="small" type="primary" />
					<ActiveResponseWizardButton size="small" type="primary" />
					<ThreatIntelButton size="small" type="primary" />
				</div>
			</n-drawer-content>
		</n-drawer>
	</div>
</template>

<script setup lang="ts">
import { NButton, NDrawer, NDrawerContent, NSwitch } from "naive-ui"
import { computed, defineAsyncComponent, onMounted, ref } from "vue"
import ActiveResponseWizardButton from "@/components/activeResponse/ActiveResponseWizardButton.vue"
import CloudSecurityAssessmentButton from "@/components/cloudSecurityAssessment/CloudSecurityAssessmentButton.vue"
import Icon from "@/components/common/Icon.vue"
import VersionUpdateBanner from "@/components/common/VersionUpdateBanner.vue"
import GitHubAuditButton from "@/components/githubAudit/GitHubAuditButton.vue"
import PipeList from "@/components/graylog/Pipelines/PipeList.vue"
import ClusterHealth from "@/components/indices/ClusterHealth.vue"
import IndicesMarquee from "@/components/indices/Marquee.vue"
import NodeAllocation from "@/components/indices/NodeAllocation.vue"
import AgentsCard from "@/components/overview/AgentsCard.vue"
import CustomersCard from "@/components/overview/CustomersCard.vue"
import HealthcheckCard from "@/components/overview/HealthcheckCard.vue"
import IncidentAlerts from "@/components/overview/IncidentAlerts.vue"
import IncidentCases from "@/components/overview/IncidentCases.vue"
import StackProvisioningButton from "@/components/stackProvisioning/StackProvisioningButton.vue"
import WebVulnerabilityAssessmentButton from "@/components/webVulnerabilityAssessment/WebVulnerabilityAssessmentButton.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import PageHeader from "@/components/ui/PageHeader.vue"
import { useGlobalCustomerFilter } from "@/composables/useGlobalCustomerFilter"
import { useNavigation } from "@/composables/useNavigation"

const ThreatIntelButton = defineAsyncComponent(() => import("@/components/threatIntel/ThreatIntelButton.vue"))
const QuickActionsIcon = "ant-design:thunderbolt-outlined"
const showQuickActions = ref(false)
const { routeIndex, routeGraylogPipelines } = useNavigation()
const { globalCustomerCodes, isFiltering } = useGlobalCustomerFilter()
const useGlobalCustomerFilterToggle = ref(false)

const effectiveCustomerCodes = computed(() => (useGlobalCustomerFilterToggle.value ? globalCustomerCodes.value : []))
const scopeSummary = computed(() => {
	if (!useGlobalCustomerFilterToggle.value || !globalCustomerCodes.value.length) return "Scope: all customers"
	if (globalCustomerCodes.value.length === 1) return `Scope: ${globalCustomerCodes.value[0]}`
	return `Scope: ${globalCustomerCodes.value.length} customers`
})

onMounted(() => {
	if (isFiltering.value) useGlobalCustomerFilterToggle.value = true
})
</script>

<style lang="scss" scoped>
.overview-scope {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	padding: 5px 8px;
	border: 1px solid rgba(var(--border-color-rgb) / 0.65);
	border-radius: 999px;
	background: rgba(var(--bg-secondary-color-rgb) / 0.7);
}
.overview-scope__dot {
	width: 6px;
	height: 6px;
	border-radius: 999px;
	background: var(--success-color);
	box-shadow: 0 0 0 3px rgba(var(--success-color-rgb) / 0.12);
}

.overview-control-strip {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	padding: 14px 16px;
	border: 1px solid var(--product-panel-border);
	border-radius: var(--product-panel-radius-sm);
	background: var(--bg-secondary-color);
}

.overview-workbench {
	display: grid;
	grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.4fr);
	gap: 24px;
	align-items: center;
	padding: 20px;
	border: 1px solid var(--product-panel-border);
	border-radius: var(--product-panel-radius);
	background:
		linear-gradient(120deg, rgba(var(--primary-color-rgb) / 0.065), transparent 52%),
		var(--bg-default-color);
}
.overview-workbench h2 { margin: 0; font-family: var(--font-family-display); font-size: 1.12rem; font-weight: 720; }
.overview-workbench p { margin: 6px 0 0; color: var(--fg-secondary-color); font-size: 0.76rem; line-height: 1.55; }
.overview-actions-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.overview-panel--flush { overflow: hidden; padding: 4px 0; }

@media (max-width: 1050px) {
	.overview-workbench { grid-template-columns: 1fr; }
	.overview-actions-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 700px) {
	.overview-control-strip { align-items: flex-start; flex-direction: column; }
	.overview-actions-grid { grid-template-columns: 1fr; }
}
</style>
