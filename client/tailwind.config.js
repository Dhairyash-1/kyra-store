/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'5': '#F3F3F3',
  				'10': '#E7E7E8',
  				'20': '#D0CFD11',
  				'80': '#424146',
  				'90': '#2B292F',
  				'100': '#A29FA9',
  				'200': '#8D8A94',
  				'300': '#77757C',
  				'400': '#575360',
  				'500': '#131118',
  				'600': '#14111C',
  				'700': '#151619',
  				'800': '#111214',
  				'900': '#14111C',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'5': '#FAFDF5',
  				'10': '#F6FAEB',
  				'20': '#EDF6D7',
  				'80': '#B5DA61',
  				'90': '#ACD64D',
  				'100': '#E1F1BC',
  				'200': '#CEE993',
  				'300': '#BCDE6B',
  				'400': '#AFD751',
  				'500': '#A3D139',
  				'600': '#97BD33',
  				'700': '#88A52A',
  				'800': '#798D21',
  				'900': '#626615',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: {
  				'5': '#FBF3F9',
  				'10': '#F7E8F3',
  				'20': '#F0D0E7',
  				'80': '#C144A1',
  				'90': '#BA2C95',
  				'100': '#F0B0D9',
  				'200': '#E67BC2',
  				'300': '#D846AB',
  				'400': '#CD0D98',
  				'500': '#B21589',
  				'600': '#AF0A87',
  				'700': '#9B0982',
  				'800': '#8A087C',
  				'900': '#6C0772',
  				DEFAULT: '#B21589'
  			},
  			dark: {
  				'5': '#F3F3F3',
  				'10': '#E7E7E8',
  				'20': '#D0CFD1',
  				'80': '#424146',
  				'90': '#2B292F',
  				'500': '#131118'
  			},
  			gray: {
  				'5': '#FAFAFB',
  				'10': '#F6F6F6',
  				'20': '#EDECEE',
  				'80': '#B6B4BB',
  				'90': '#ADAAB3',
  				'500': '#A4A1AA'
  			},
  			light: {
  				'20': '#F7F9F9',
  				'80': '#E1E7E7',
  				'90': '#DDE4E4',
  				'500': '#D9E1E1'
  			},
  			white: {
  				'5': '#F2F2F2',
  				'10': '#F3F3F3',
  				'20': '#F5F5F5',
  				'80': '#FCFCFC',
  				'90': '#FEFEFE',
  				'500': '#FFFFFF',
  				DEFAULT: '#FFFFFF'
  			},
  			options: {
  				'1': '#30BE82',
  				'2': '#30BEB6',
  				'3': '#5D30BE',
  				'4': '#304FBE'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-1': 'linear-gradient(135deg, #8FD80B 0%, #2ECC71 100%)',
  			'gradient-2': 'linear-gradient(135deg, #1ABC9C 0%, #3498DB 100%)',
  			'gradient-3': 'linear-gradient(135deg, #7B68EE 0%, #D80B9D 100%)'
  		},
  		screens: {
  			xs: '414px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1600px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  			'slide-in-from-left': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateX(20px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-from-right': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateX(-20px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateX(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  			'slide-in-from-left': 'slide-in-from-left 0.8s ease-in-out',
  			'slide-in-from-right': 'slide-in-from-right 0.8s ease-in-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [import("tailwindcss-animate")],
};
