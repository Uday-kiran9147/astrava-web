/**
 * Astrava Design Tokens
 * Clean, high-contrast, crisp white/light theme tokens.
 */
export class DesignTokens {
  // Canvas & Surfaces (Light Theme)
  static readonly COLOR_BG = '#F8FAFC';             // Slate 50 canvas
  static readonly COLOR_SURFACE = '#FFFFFF';        // Pure white card
  static readonly COLOR_SURFACE_MUTED = '#F1F5F9';  // Slate 100 muted panel / row
  static readonly COLOR_SURFACE_HOVER = '#F8FAFC';  // Subtle hover state
  
  // Primary CTA & Accents
  static readonly COLOR_PRIMARY = '#1E50FF';        // Electric Cobalt
  static readonly COLOR_PRIMARY_HOVER = '#0038D1';  // Darker active cobalt
  static readonly COLOR_PRIMARY_LIGHT = '#EFF6FF';  // Selected chip fill / soft blue
  
  // Typography
  static readonly COLOR_TEXT = '#0F172A';          // Slate 900 (Headings, primary values)
  static readonly COLOR_TEXT_BODY = '#334155';     // Slate 700 (Readable copy)
  static readonly COLOR_TEXT_MUTED = '#64748B';    // Slate 500 (Labels, helper text)
  static readonly COLOR_TEXT_FAINT = '#94A3B8';    // Slate 400 (Dividers, breadcrumb slashes)
  
  // Borders
  static readonly COLOR_BORDER = '#E2E8F0';        // Slate 200 crisp border
  static readonly COLOR_BORDER_STRONG = '#CBD5E1'; // Slate 300 input border
  static readonly COLOR_BORDER_FOCUS = '#1E50FF';  // Focus ring

  // Semantic Statuses
  static readonly COLOR_SUCCESS = '#16A34A';       // Emerald 600
  static readonly COLOR_SUCCESS_BG = '#F0FDF4';    // Emerald 50
  static readonly COLOR_SUCCESS_BORDER = '#BBF7D0';// Emerald 200

  static readonly COLOR_WARNING = '#D97706';       // Amber 600
  static readonly COLOR_WARNING_BG = '#FFFBEB';    // Amber 50
  static readonly COLOR_WARNING_BORDER = '#FDE68A';// Amber 200

  static readonly COLOR_ERROR = '#DC2626';         // Red 600
  static readonly COLOR_ERROR_BG = '#FEF2F2';      // Red 50
  static readonly COLOR_ERROR_BORDER = '#FECACA';  // Red 200

  // Elevation & Radii
  static readonly RADIUS_SM = '6px';
  static readonly RADIUS_MD = '10px';
  static readonly RADIUS_LG = '14px';
  static readonly SHADOW_CARD = '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)';
  static readonly SHADOW_CTA = '0 4px 14px rgba(30, 80, 255, 0.35)';

  // Fonts
  static readonly FONT_SANS = "'Arial Unicode MS', 'Arial', 'Inter', system-ui, -apple-system, sans-serif";
  static readonly FONT_MONO = "'JetBrains Mono', 'SF Mono', Consolas, monospace";
}
