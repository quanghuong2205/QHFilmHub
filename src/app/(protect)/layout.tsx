import RouteProtector from './_components/route-protector';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RouteProtector>{children}</RouteProtector>;
}
