import { currentRole } from '@/modules/auth/actions'
import { Navbar } from '@/modules/home/components/Navbar';
import { Footer } from '@/modules/home/components/Footer';
import { UserRole } from '@/lib/generated/prisma/enums';
import React from 'react'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await currentRole();
  const isAdmin = result?.success && result.role === UserRole.ADMIN;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar isAdmin={isAdmin} />
      <div className="relative flex flex-1 flex-col px-4 pb-4">
        <div
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] bg-size-[16px_16px] opacity-[0.08]"
        />
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;