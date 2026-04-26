import PublicTopBar from '@/components/layout/PublicTopBar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PublicTopBar />
      <main className="flex-1 overflow-y-auto relative z-0">
        {children}
      </main>
    </div>
  );
}
