export type BrandLogoSize = "default" | "small" | "large"
export type BrandTheme = "light" | "dark"

function value(input: string | undefined): string | undefined {
	const normalized = input?.trim()
	return normalized || undefined
}

function optionalUrl(input: string | undefined): string | undefined {
	const normalized = value(input)
	if (!normalized || normalized === "#") return undefined
	return normalized
}

const companyName = value(import.meta.env.VITE_BRAND_COMPANY_NAME) ?? "Security Operations"
const productName = value(import.meta.env.VITE_BRAND_PRODUCT_NAME) ?? "Operations Center"
const appName = value(import.meta.env.VITE_BRAND_APP_NAME) ?? `${companyName} ${productName}`

export const brandConfig = {
	companyName,
	productName,
	appName,
	tagline:
		value(import.meta.env.VITE_BRAND_TAGLINE) ??
		"Unified visibility, investigation, response, and reporting for modern security operations.",
	websiteUrl: optionalUrl(import.meta.env.VITE_BRAND_WEBSITE_URL),
	docsUrl: optionalUrl(import.meta.env.VITE_BRAND_DOCS_URL),
	supportUrl: optionalUrl(import.meta.env.VITE_BRAND_SUPPORT_URL),
	primaryColor: value(import.meta.env.VITE_BRAND_PRIMARY_COLOR),
	secondaryColor: value(import.meta.env.VITE_BRAND_SECONDARY_COLOR),
	accentColor: value(import.meta.env.VITE_BRAND_ACCENT_COLOR),
	environmentLabel: value(import.meta.env.VITE_BRAND_ENVIRONMENT_LABEL) ?? "SOC Platform"
} as const

const configuredLogos: Record<BrandLogoSize, Record<BrandTheme, string | undefined>> = {
	default: {
		light: value(import.meta.env.VITE_BRAND_LOGO_DEFAULT_LIGHT),
		dark: value(import.meta.env.VITE_BRAND_LOGO_DEFAULT_DARK)
	},
	small: {
		light: value(import.meta.env.VITE_BRAND_LOGO_SMALL_LIGHT),
		dark: value(import.meta.env.VITE_BRAND_LOGO_SMALL_DARK)
	},
	large: {
		light: value(import.meta.env.VITE_BRAND_LOGO_LARGE_LIGHT),
		dark: value(import.meta.env.VITE_BRAND_LOGO_LARGE_DARK)
	}
}

export function resolveBrandLogo(type: BrandLogoSize, theme: BrandTheme): string | undefined {
	return configuredLogos[type][theme]
}
