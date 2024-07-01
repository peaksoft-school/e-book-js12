import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
	role: string;
	allowedRoles: string[];
	fallbackPath: string;
	component: React.ReactNode;
};

const PrivateRouter = ({
	role,
	allowedRoles,
	fallbackPath,
	component: Component
}: Props) => {
	if (allowedRoles.includes(role)) {
		return <>{Component}</>;
	}

	return <Navigate to={fallbackPath} />;
};

export default PrivateRouter;
