import Navbar from "@/components/custom/navbar";
import { validateRequest } from "@/lib/auth";
import SessionProvider from "@/lib/session-provider";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await validateRequest();
  if (!session.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};
export default MainLayout;
