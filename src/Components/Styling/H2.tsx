import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function H2({ children }: Props) {
	return <h2 className="text-2xl mb-5">{children}</h2>;
}
