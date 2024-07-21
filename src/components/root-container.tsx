export const RootContainer: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<div className="w-full h-full grid grid-cols-12 gap-3">{children}</div>
	);
};
