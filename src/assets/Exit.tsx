import { JSX } from 'react';

export default function ExitLogo({
	className,
}: {
	className?: string;
}): JSX.Element {
	return (
		<svg
			width='22'
			height='22'
			viewBox='0 0 22 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				d='M11 14.75L14.75 11M14.75 11L11 7.25M14.75 11H1M1 5.06003V5.00025C1 3.60011 1 2.89953 1.27249 2.36475C1.51216 1.89434 1.89434 1.51216 2.36475 1.27249C2.89953 1 3.60011 1 5.00025 1H17.0002C18.4004 1 19.0995 1 19.6343 1.27249C20.1046 1.51216 20.4881 1.89434 20.7277 2.36475C21 2.899 21 3.59874 21 4.99614V17.0045C21 18.4019 21 19.1006 20.7277 19.6349C20.4881 20.1052 20.1046 20.4881 19.6343 20.7277C19.1 21 18.4013 21 17.0039 21H4.99614C3.59874 21 2.899 21 2.36475 20.7277C1.89434 20.4881 1.51216 20.1049 1.27249 19.6345C1 19.0998 1 18.4001 1 17V16.9375'
				stroke='#E0E0E0'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
