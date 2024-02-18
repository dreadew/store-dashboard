interface DashboardStoreLayoutProps {
	children: React.ReactNode
	params: {
		storeId: string
	}
}

export default async function DashboardStoreLayout({
	children,
	params,
}: DashboardStoreLayoutProps) {
	return <>{children}</>
}
