---
name: Nurtured Success
colors:
  surface: '#fbf8ff'
  surface-dim: '#d7d8f4'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2ff'
  surface-container: '#edecff'
  surface-container-high: '#e6e6ff'
  surface-container-highest: '#e0e0fc'
  on-surface: '#181a2e'
  on-surface-variant: '#5b403f'
  inverse-surface: '#2d2f44'
  inverse-on-surface: '#f1efff'
  outline: '#8f6f6e'
  outline-variant: '#e4bebc'
  surface-tint: '#bb152c'
  primary: '#b7102a'
  on-primary: '#ffffff'
  primary-container: '#db313f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b1'
  secondary: '#665e49'
  on-secondary: '#ffffff'
  secondary-container: '#ebdfc4'
  on-secondary-container: '#6b624d'
  tertiary: '#286182'
  on-tertiary: '#ffffff'
  tertiary-container: '#447a9c'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#eee1c7'
  secondary-fixed-dim: '#d1c5ac'
  on-secondary-fixed: '#211b0b'
  on-secondary-fixed-variant: '#4e4633'
  tertiary-fixed: '#c7e7ff'
  tertiary-fixed-dim: '#98cdf2'
  on-tertiary-fixed: '#001e2e'
  on-tertiary-fixed-variant: '#064c6b'
  background: '#fbf8ff'
  on-background: '#181a2e'
  surface-variant: '#e0e0fc'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

This design system is built on the philosophy of "Nurtured Growth"—combining the structured efficiency of a productivity tool with the warmth of a wellness app. The brand personality is high-energy yet composed, designed to feel like a premium companion rather than a rigid academic utility. It targets a Gen-Z demographic that values aesthetic cohesion, "dark-mode" compatibility (though defaulting to a warm light mode), and tactile feedback.

The visual style is **Modern Minimalist with Glassmorphic accents**. It borrows the spatial clarity of Apple’s HIG, the friendly geometry of Duolingo, and the soft, breathable layouts of Headspace. The interface uses generous whitespace to reduce cognitive load, while subtle translucent layers (glassmorphism) provide a sense of hierarchy and depth without cluttering the viewport.

## Colors

The palette is anchored by a vibrant, high-chroma primary red that commands attention for calls to action and progress indicators. To prevent visual fatigue, this is balanced against a "Soft Cream" and "Warm White" foundation, which creates a more sophisticated, "paper-like" reading experience than pure digital white.

- **Primary:** Used for main actions, active states, and brand-defining moments.
- **Secondary/Surface:** Used for large background containers to provide warmth.
- **Accents:** A dedicated "Success Green" for progress, "Productivity Blue" for focus modes, and "Achievement Gold" for gamified milestones.
- **Text:** A deep Charcoal is used instead of pure black to maintain a premium, editorial feel and improve legibility during long study sessions.

## Typography

This design system utilizes **Plus Jakarta Sans** across all levels to maintain a friendly, optimistic, and contemporary tone. The typeface’s open apertures and modern geometric shapes provide excellent readability for educational content while feeling "fresh."

The hierarchy is strictly enforced:
- **Display and Large Headlines** use a heavy weight (700-800) with slight negative letter-spacing to create a punchy, confident "Apple-esque" look.
- **Body Text** maintains a generous line height (1.6) to ensure long-form study notes are easy on the eyes.
- **Labels** utilize increased letter spacing and semi-bold weights to distinguish functional UI elements from content.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model optimized for mobile-first consumption. It relies on an 8px rhythmic scale to ensure consistent alignment across all components.

- **Mobile:** A 4-column system with 20px outer margins and 16px gutters.
- **Desktop:** The layout transitions to a 12-column fixed grid with a max-width of 1200px, centering content to maintain focus.
- **Rhythm:** Vertical spacing between cards and sections should primarily use `lg` (24px) or `xl` (32px) to ensure the "minimalist" feel and prevent the UI from feeling cramped.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**. Instead of heavy dropshadows, the design system uses multiple stacked low-opacity shadows with a subtle tint of the primary red or neutral charcoal to create a soft, natural lift.

- **Level 0 (Base):** Warm White or Cream surface.
- **Level 1 (Cards):** Subtle white fill with a 4% opacity shadow, used for secondary information.
- **Level 2 (Active/Floating):** Use of Glassmorphism (Background Blur: 20px, Fill: White 70% opacity) for navigation bars and modals.
- **Depth:** Elements should appear to "float" over the background. Use thin, low-contrast 1px borders (#000000 with 5% opacity) to define edges on light surfaces instead of heavy strokes.

## Shapes

The shape language is consistently **Rounded**, evoking friendliness and safety. 
- **Standard UI elements** (Buttons, Inputs) use a 0.5rem (8px) radius.
- **Container elements** (Cards, Modals) use `rounded-lg` (16px) or `rounded-xl` (24px) to create a soft, modern container.
- **Interactive Pill elements** (Chips, Tags) should be fully rounded (999px) to distinguish them from structural cards.

## Components

### Buttons
- **Primary:** Solid Primary Red with white text. High-contrast, rounded-md.
- **Secondary:** Soft Cream background with Charcoal text.
- **Tertiary/Ghost:** Transparent background with Primary Red text and a subtle 1px border.
- **States:** On hover/tap, buttons should scale down slightly (0.98) to provide tactile feedback.

### Cards
Cards are the primary container for student tasks and data. They should feature a white background, 16px corner radius, and the Level 1 shadow. Headers within cards should use `label-md` for metadata.

### Inputs & Forms
Input fields use a subtle Warm White fill with a 1px border that turns Primary Red on focus. Use `body-md` for input text and `label-sm` for floating labels.

### Chips & Tags
Used for subject categories (e.g., "Math," "History"). These should use a semi-transparent version of the accent colors (e.g., 10% opacity Blue fill with 100% opacity Blue text) for a "glassy" look.

### Mascot Integration
Incorporate the mascot through:
- **Empty States:** Subtle line-art illustrations of a ladybug.
- **Progress Indicators:** A small ladybug icon that moves along a progress bar as the student completes tasks.
- **Patterning:** Use a very faint (2% opacity) polka-dot pattern on certain section backgrounds to subtly reference the brand motif.
