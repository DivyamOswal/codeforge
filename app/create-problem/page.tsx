import React from "react";
import { UserRole } from "@/lib/generated/prisma/enums";
import { getCurrentUserData } from "@/modules/auth/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateProblemPage = async () => {
  const result = await getCurrentUserData();

  if (!result.success || result.user.role !== UserRole.ADMIN) {
    redirect("/");
  }

  return (
    <section className="container mx-4 my-4 flex flex-col items-center justify-center">
      <div className="flex w-full flex-row items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CreateProblemPage;