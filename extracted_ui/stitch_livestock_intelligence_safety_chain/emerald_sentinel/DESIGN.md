---
name: Emerald Sentinel
colors:
  surface: '#f8faf6'
  surface-dim: '#d8dbd7'
  surface-bright: '#f8faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f1'
  surface-container: '#eceeeb'
  surface-container-high: '#e7e9e5'
  surface-container-highest: '#e1e3e0'
  on-surface: '#191c1b'
  on-surface-variant: '#404944'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#eff1ee'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#006780'
  on-secondary: '#ffffff'
  secondary-container: '#76dcff'
  on-secondary-container: '#006077'
  tertiary: '#4f1f19'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b342d'
  on-tertiary-container: '#ea9e93'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#6cd3f7'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e61'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#380d08'
  on-tertiary-fixed-variant: '#6e372f'
  background: '#f8faf6'
  on-background: '#191c1b'
  surface-variant: '#e1e3e0'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is built for a high-stakes intelligence environment where data accuracy and rapid risk assessment are paramount. The brand personality is authoritative yet calm, positioning the platform as a sophisticated guardian of food safety and public health.

The design style follows a **Corporate / Modern** aesthetic with a **Minimalist** focus on information density. It prioritizes clarity and high signal-to-noise ratios, utilizing generous whitespace to prevent data fatigue. Subtle futuristic touches—such as hairline borders and precision-engineered data visualizations—reinforce the platform's advanced analytical capabilities. The emotional response should be one of absolute confidence, security, and professional oversight.

## Colors
This design system utilizes a palette rooted in "Nature and Intelligence." The **Deep Forest Emerald** acts as the primary anchor, used for global navigation and primary actions to establish institutional authority. The **Intelligence Blue** is reserved for interactive data elements, links, and analytical highlights.

A semantic signaling system is strictly enforced:
- **Success Green:** Compliance met, safe levels detected.
- **Warning Amber:** Approaching MRL (Maximum Residue Limit) thresholds, heightened surveillance required.
- **Critical Red:** AMR (Antimicrobial Resistance) hotspots or limit violations.

The interface primarily uses a light mode with **Soft Off-White** backgrounds and **Pure White** cards to create a clear "layering" effect that separates global navigation from specific data insights.

## Typography
The typography system relies on **Inter** for its exceptional legibility and neutral, professional character. For specialized technical data, residue counts, and chemical IDs, **JetBrains Mono** is introduced to provide a distinct "data-driven" and technical feel.

**Scale and Weight:**
- Use **Display-LG** for primary dashboard metrics (e.g., global compliance percentages).
- **Headline-MD** and **SM** should be used for card titles and section headers.
- **Data-Label** is always uppercase when used for technical metadata or table headers.
- Maintain a high contrast ratio for all body text against the white surfaces to ensure accessibility.

## Layout & Spacing
The design system employs a **Fixed Grid** model for desktop, centered within a maximum width of 1440px to prevent excessive line lengths in data tables. A 12-column system is used with 24px gutters.

**Responsive Behavior:**
- **Desktop:** Sidebar navigation (collapsed or expanded) with a multi-column dashboard layout.
- **Tablet:** 8-column grid; cards reflow to a 2-column or 1-column stack.
- **Mobile:** 4-column grid; 16px margins; all cards become full-width.

Spacing follows a strict 4px baseline. Components like data tables should use "compact" vertical padding (8px) to maximize information density, while marketing or landing pages should use "relaxed" padding (32px+).

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Ambient Shadows**. 
- The base background is the lowest layer (Level 0).
- Information cards sit at Level 1, utilizing a subtle 1px border (#E5E7EB) and a soft, diffused shadow (0px 4px 12px rgba(0,0,0,0.03)).
- Hover states on interactive cards or buttons lift to Level 2 with a slightly deeper shadow and a border-color shift to the secondary Teal.
- Overlays and Modals sit at Level 3, using a background blur (Backdrop Filter: 8px) to maintain the "clean and futuristic" feel while focusing user attention.

## Shapes
The shape language balances approachability with professional precision. 
- **Standard UI Elements:** (Buttons, Inputs, Checkboxes) use `rounded-md` (0.5rem).
- **Surface Containers:** (Dashboard Cards, Modals) use `rounded-xl` (1.5rem) to soften the interface and create a modern, high-end SaaS feel.
- **Status Badges:** Use a fully rounded pill shape to distinguish them from interactive buttons.

## Components
**Buttons:**
- Primary: Deep Forest Emerald background with white text. High-contrast.
- Secondary: Intelligence Blue outline with teal text.
- Ghost: No background, Primary Emerald text for low-priority actions.

**Cards:**
- White background, 1.5rem corner radius, hairline grey border. 
- Titles should be Headline-SM, aligned to the top-left with a border-bottom separating the header from the content.

**Status Badges:**
- High-contrast background (e.g., Critical Red) with white text.
- Small JetBrains Mono text for the label.
- Used for MRL status, AMR risk level, and Compliance.

**Data Tables:**
- Alternate row striping using the soft off-white.
- Sticky headers with a subtle drop shadow on scroll.
- Interactive rows that highlight on hover using the Intelligence Blue at 5% opacity.

**Input Fields:**
- Minimalist design with a 1px border. 
- Focus state: Border color changes to Intelligence Blue with a 2px outer glow.