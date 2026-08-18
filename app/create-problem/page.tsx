import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/generated/prisma/enums';
import { getCurrentUserData } from '@/modules/auth/actions';
import { CreateProblemForm } from '@/modules/problems/components/create-problem-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const CreateProblemPage = async () => {
  const result = await getCurrentUserData();

  if (!result.success || result.user.role !== UserRole.ADMIN) {
    redirect("/");
  }

  return (
    <section className="mx-auto flex max-w-4xl flex-col px-4 pb-16 pt-24 sm:px-6">
      <div className="mb-8 flex flex-row items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon" className="cursor-pointer rounded-sm">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground">
            </p>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              Welcome, {result.user.firstName || "Admin"}
            </h1>
          </div>
        </div>
        <ModeToggle />
      </div>

      <CreateProblemForm />
    </section>
  )
}

export default CreateProblemPage