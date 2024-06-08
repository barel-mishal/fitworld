import plugin from "tailwindcss/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      // https://github.com/system-fonts/modern-font-stacks
      systemui: ["system-ui", "sans-serif"],
      transitional: [
        "Charter",
        "Bitstream Charter",
        "Sitka Text",
        "Cambria",
        "serif",
      ],
      oldstyle: [
        "Iowan Old Style",
        "Palatino Linotype",
        "URW Palladio L",
        "P052",
        "serif",
      ],
      humanist: [
        "Seravek",
        "Gill Sans Nova",
        "Ubuntu",
        "Calibri",
        "DejaVu Sans",
        "source-sans-pro",
        "sans-serif",
      ],
      geohumanist: [
        "Avenir",
        "Montserrat",
        "Corbel",
        "URW Gothic",
        "source-sans-pro",
        "sans-serif",
      ],
      classhuman: [
        "Optima",
        "Candara",
        "Noto Sans",
        "source-sans-pro",
        "sans-serif",
      ],
      neogrote: [
        "Inter",
        "Roboto",
        "Helvetica Neue",
        "Arial Nova",
        "Nimbus Sans",
        "Arial",
        "sans-serif",
      ],
      monoslab: ["Nimbus Mono PS", "Courier New", "monospace"],
      monocode: [
        "ui-monospace",
        "Cascadia Code",
        "Source Code Pro",
        "Menlo",
        "Consolas",
        "DejaVu Sans Mono",
        "monospace",
      ],
      industrial: [
        "Bahnschrift",
        "DIN Alternate",
        "Franklin Gothic Medium",
        "Nimbus Sans Narrow",
        "sans-serif-condensed",
        "sans-serif",
      ],
      roundsans: [
        "ui-rounded",
        "Hiragino Maru Gothic ProN",
        "Quicksand",
        "Comfortaa",
        "Manjari",
        "Arial Rounded MT",
        "Arial Rounded MT Bold",
        "Calibri",
        "source-sans-pro",
        "sans-serif",
      ],
      slabserif: [
        "Rockwell",
        "Rockwell Nova",
        "Roboto Slab",
        "DejaVu Serif",
        "Sitka Small",
        "serif",
      ],
      antique: [
        "Superclarendon",
        "Bookman Old Style",
        "URW Bookman",
        "URW Bookman L",
        "Georgia Pro",
        "Georgia",
        "serif",
      ],
      didone: [
        "Didot",
        "Bodoni MT",
        "Noto Serif Display",
        "URW Palladio L",
        "P052",
        "Sylfaen",
        "serif",
      ],
      handwritten: [
        "Segoe Print",
        "Bradley Hand",
        "Chilanka",
        "TSCu_Comic",
        "casual",
        "cursive",
      ],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        alert: {
          DEFAULT: "hsl(var(--alert))",
          foreground: "hsl(var(--alert-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        base: "var(--border-radius)",
        sm: "calc(var(--border-radius) + 0.125rem)",
        DEFAULT: "calc(var(--border-radius) + 0.25rem)",
        md: "calc(var(--border-radius) + 0.375rem)",
        lg: "calc(var(--border-radius) + 0.5rem)",
        xl: "calc(var(--border-radius) + 0.75rem)",
        "2xl": "calc(var(--border-radius) + 1rem)",
        "3xl": "calc(var(--border-radius) + 1.5rem)",
      },
      borderWidth: {
        base: "var(--border-width)",
        DEFAULT: "calc(var(--border-width) + 1px)",
        2: "calc(var(--border-width) + 2px)",
        4: "calc(var(--border-width) + 4px)",
        8: "calc(var(--border-width) + 8px)",
      },
      boxShadow: {
        base: "var(--shadow-base)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        inner: "var(--shadow-inner)",
      },
      strokeWidth: {
        0: "0",
        base: "var(--stroke-width)",
        1: "calc(var(--stroke-width) + 1px)",
        2: "calc(var(--stroke-width) + 2px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".press": {
          transform: "var(--transform-press)",
        },
        ".appear": {
          opacity: 1,
        },
        ".disappear": {
          opacity: 0,
        },
      });
    }),
  ],
  "tailwindCSS.experimental.classRegex": [
    // Matches the default Tailwind class regex --tw
    "tw(?:-[a-z0-9]+)?",
  ],
};
