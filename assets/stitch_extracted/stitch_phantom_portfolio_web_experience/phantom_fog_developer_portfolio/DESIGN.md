---
name: Phantom Fog Developer Portfolio
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#af8782'
  outline-variant: '#5f3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e60012'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000d'
  secondary: '#fff9ef'
  on-secondary: '#3a3000'
  secondary-container: '#ffdb3c'
  on-secondary-container: '#725f00'
  tertiary: '#ffb3ad'
  on-tertiary: '#680008'
  tertiary-container: '#cc403b'
  on-tertiary-container: '#fff7f6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#8f1016'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 84px
    letterSpacing: 0.02em
  display-xl-mobile:
    fontFamily: Anton
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: 0.03em
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 2.5rem
---

## Brand & Style
The design system manifests an aggressive, kinetic intersection of high-octane graphic novel flair and psychological psychological survival-horror tension. Built explicitly for an elite developer portfolio, it rejects polite corporate minimalism in favor of visceral impact: jagged angular silhouettes, stark comic book contrast, halftone screentones, and haunted CRT scanlines.

The personality balances defiance with calculated precision. The UI evokes the sensation of infiltrating an encrypted system within an eerie, distorted alternate reality. The tone is kinetic, rebellious, and technically unapologetic.

Visual principles:
- **Kinetic Asymmetry:** Elements never sit completely flat or static; acute diagonal cuts, sheared containers (`-6deg` to `-8deg`), and dramatic layered overlaps propel user navigation.
- **Graphic Contrast:** Pure obsidian blacks clash instantly with visceral crimson red and stark paper white, punctuated by electric warning gold.
- **Atmospheric Decay:** Technical confidence meets psychological tension through static noise, faint CRT chromatic aberration on interaction, and subtle rolling fog displacement textures.

## Colors
The palette relies on stark, uncompromised contrast to produce graphic pop and atmospheric dread:

- **Phantom Red (`#E60012`):** The primary kinetic signal. Applied to prominent callouts, active focus states, hero backplates, and sharp accent cutouts.
- **Accent Gold (`#FFD700`):** Secondary warning signifier. Reserved for critical highlights, tech stack badges, system notices, and active hover underlines.
- **Abyssal Crimson (`#8A0B13`):** Tertiary shadow tone. Serves as intermediate depth shading behind primary red fills, hard drop shadow offsets, and alert states.
- **Obsidian Black (`#121212`):** Primary canvas ground. Deep, dense base preventing glare while amplifying graphic pop. Paired with secondary container black (`#080808`) and surface black (`#1A1A1A`).
- **Crisp White (`#FFFFFF`):** High-impact structural typography, hard comic outlines, and stark inverted panels.
- **Eerie Muted White (`#D0D0D0`):** Secondary body readability tone to temper high contrast fatigue over long reading sessions.
- **Fog Gray (`#333333`):** Muted structural gridlines, halftone dots, and deactivated component frames.

## Typography
Typographic scale hinges on three functional pillars:

1. **Massive Punch Headlines (Anton):** Used strictly uppercase. Delivers towering comic-book style presence, tight tracking, and immense graphic weight. Often paired with hard offset drop shadows (`4px 4px 0px #000000`).
2. **Sharp Angular Narrative (Space Grotesk):** Provides high legibility for project summaries, engineering architecture explanations, and about copy, maintaining quirky geometric cutouts without impeding reading cadence.
3. **Diagnostic Monospace Systems (JetBrains Mono):** Drives metadata, status indicators, system logs, code snippets, and UI tags. Always treated as an interactive or telemetry readout.

Typographic accents include selective diagonal rotation (`transform: rotate(-1.5deg)`), red highlighters behind stark white text spans, and bracketed code enclosures (`[EXEC::RUN]`).

## Layout & Spacing
The layout model employs a 12-column dynamic fluid grid on desktop (`> 1024px`), an 8-column grid on tablet (`768px - 1023px`), and a 4-column structured stack on mobile (`< 767px`). 

Key structural rules:
- **Diagonal Bleeds:** Hero banners, section dividers, and spotlight cards break standard horizontal containment using acute diagonal cuts (`clip-path: polygon(...)` or `transform: skewX(-7deg)`).
- **Z-Index Overlaps:** Content cards intentionally overlap section boundaries by `2rem` to `3rem` to dismantle rigid block-by-block web templates.
- **Mobile Rationalization:** Sheared angles are muted on mobile screens to `skewX(-3deg)` to prevent text clipping and horizontal overflow, preserving tap-target integrity while maintaining graphic attitude.

## Elevation & Depth
Elevation is strictly graphic, hard-edged, and physical—rejecting soft blurred drop shadows in favor of manga ink layers and terminal depth:

- **Hard Comic Drop Shadows:** Surfaces layer depth via directional un-blurred offsets. Default elevation uses `box-shadow: 6px 6px 0px #000000`, with interactive components shifting to `10px 10px 0px #E60012` on hover.
- **Halftone Screentones:** Backplanes and secondary surfaces use radial SVG dot patterns (`2px` black/dark red dots on a 6px repeat) to build textured comic book volume.
- **Atmospheric Fog & Scanlines:** Ambient background overlays utilize semi-transparent CSS scanlines (`repeating-linear-gradient` with 2px pitch) and a subtle dynamic noise/fog layer with SVG grain filters, simulating the dread of Silent Hill radio interference.
- **Stark Edge Borders:** 2px to 4px solid borders (`#FFFFFF` or `#000000`) delineate active structural boundaries.

## Shapes
Curves do not exist in this design language. Roundedness is strictly `0` (Sharp). 

Geometry is governed by cuts, diagonals, and acute angles:
- **The Parallelogram Slice:** Standard action elements use `transform: skewX(-7deg)`. Internal content reverses the skew (`transform: skewX(7deg)`) to ensure text remains horizontally aligned and legible.
- **Chamfered / Notched Corners:** Major cards and HUD dialog boxes use 45-degree corner clippings (`clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))`), reminiscent of tactical game menus.
- **Brutalist Slashes:** Dividers utilize thick 4px diagonal diagonal strikes with staggered line patterns.

## Components

### Buttons
- **Primary Kinetic Action:** Sharp angled parallelogram (`skewX(-7deg)`), filled with `#E60012`, bold white Anton lettering, and a solid `4px 4px 0px #000000` hard shadow. On hover, translates `-2px, -2px` with shadow expanding to `6px 6px 0px #FFD700`.
- **Secondary Ghost Action:** Transparent background with a `2px solid #FFFFFF` frame, monospaced JetBrains text, and an inverted hover state that fills completely with white and renders text in Obsidian Black.
- **Glitch Trigger:** Interactive icon-only or terminal buttons with subtle chromatic aberration (`text-shadow: -1px 0 red, 1px 0 cyan`) on mouseover.

### Cards & Project Showcase
- **Phantom Showcase Card:** Obsidian container with chamfered opposite corners, bordered by a crisp `2px solid #333333`. Top corner features a bright red angled ribbon declaring the project role/year.
- **Backing Plate:** A secondary sheared red/halftone panel sits offset by `8px` behind the main card, generating layered comic book dimensionality.
- **Glitch/Hover State:** Hovering forces the card border to `#E60012`, shifts image filters from monochrome high-contrast fog to full color, and renders an active scanline scan across the media.

### Chips & Tech Stack Badges
- Sharp rectangular tag with a `1px solid #FFD700` border, obsidian ground, and yellow `JetBrains Mono` label text preceded by a command prompt prefix (`> REACT`, `> RUST`).
- In active or filter states, inverts to solid `#FFD700` with jet-black text.

### Form Inputs & Terminal Fields
- Dark input wells (`#080808`) framed with a bottom-heavy border (`2px solid #333333`, bottom `4px solid #E60012`).
- Placeholder text styled in muted monospaced gray. On focus, the input border snaps to active Gold (`#FFD700`), flashing a blinking block cursor (`_`).

### Checkboxes & Selection Controls
- Diamond or angled square indicators with a `2px solid #FFFFFF` boundary.
- Checked state fills with `#E60012` and displays a bold graphic slash (`/`) rather than a conventional soft checkmark.

### Dialogs & HUD Overlays
- Heavy graphic modals inspired by calling cards and psychological alert screens. 
- Deep black fill overlaid with 20% opacity halftone dots, framed with alternating black-and-yellow hazard slashes on top and bottom rims, punctuated by an urgent Anton display header.