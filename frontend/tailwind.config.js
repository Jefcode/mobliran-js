/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		// screens: {
		//   xs: '320px',
		//   sm: '480px',
		//   md: '768px',
		//   lg: '1024px',
		//   xl: '1200px',
		// },
		extend: {
			colors: {
				primaryGray: '#F3F3F3',
				secondaryGray: '#FAFAFA',
				lightGray: '#929292',
				darkBlack: '#080808',
			},
			fontFamily: {
				sans: ['vassir', 'sans-serif'],
				heading: ['sahel', 'sans-serif'],
				english: ['Rubik', 'sans-serif'],
				both: ['vassir', 'Rubik', 'sans-serif'],
			},
			spacing: {
				120: '32rem',
				'50%': '50%',
			},
		},
	},
	plugins: [require('tailwindcss-rtl'), require('tailwind-scrollbar')],
};
