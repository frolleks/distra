import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="max-sm:ml-0 ml-64 p-2">{children}</main>
      </div>
    </div>
  );
}
