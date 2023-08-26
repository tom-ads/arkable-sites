export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="px-8 mx-auto max-w-[1440px]">{children}</main>;
}
