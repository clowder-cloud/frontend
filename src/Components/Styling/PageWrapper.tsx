import React, { ReactNode } from 'react';
import App from '../../App';

interface Props {
	children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
	return (
		<div className="bg-gray-50 flex-auto rounded-3xl shadow p-5">
			{children}
		</div>
	);
}
