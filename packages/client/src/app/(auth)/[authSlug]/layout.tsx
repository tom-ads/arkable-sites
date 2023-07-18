export default function AuthLayout({
  params,
  children,
}: {
  params: { authSlug: string };
  children: React.ReactNode;
}) {
  console.log(params);
  return (
    <main>
      <p>Auth Layout</p>
      {children}
    </main>
  );
}
