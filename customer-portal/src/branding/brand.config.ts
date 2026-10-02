function value(input: string | undefined): string | undefined {
	const normalized = input?.trim()
	return normalized || undefined
}

function optionalUrl(input: string | undefined): string | undefined {
	const normalized = value(input)
	if (!normalized || normalized === "#") return undefined
	return normalized
}

export const brandConfig = {
	portalFallbackTitle:
		value(import.meta.env.VITE_BRAND_CUSTOMER_PORTAL_TITLE) ??
		value(import.meta.env.VITE_BRAND_APP_NAME) ??
		"Security Operations Portal",
	tagline:
		value(import.meta.env.VITE_BRAND_PORTAL_TAGLINE) ??
		"A clear view of security posture, incidents, coverage, and service health.",
	docsUrl: optionalUrl(import.meta.env.VITE_BRAND_DOCS_URL)
} as const
