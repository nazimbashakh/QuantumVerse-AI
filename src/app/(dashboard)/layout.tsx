import Sidebar from '@/components/layout/Sidebar';
import DashboardTopBar from '@/components/layout/DashboardTopBar';
import FloatingBot from '@/components/bot/FloatingBot';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0D1F' }} data-theme="dashboard">
      {/* Ambient background glows for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #6D28D9, transparent 70%)' }} />
      </div>

      {/* Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col min-h-screen relative z-10">
        <DashboardTopBar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
      <FloatingBot />
    </div>
  );
}
