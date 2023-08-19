export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full max-w-[25.25rem] min-h-screen px-3 md:px-8 mx-auto">
      {children}
    </main>
  );
}
