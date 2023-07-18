export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <p>Auth Page</p>
      {children}
    </div>
  );
}
