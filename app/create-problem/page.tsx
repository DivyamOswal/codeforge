import React from "react";
import { UserRole } from "@/lib/generated/prisma/enums";
import { getCurrentUserData } from "@/modules/auth/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateProblemPage = async () => {
  const user = await getCurrentUserData();

  if (user?.role !== UserRole.ADMIN) {
    redirect("/");
  }

  return (
    <section className="flex flex-col items-center justify-center container mx-4 my-4">
      <div className="flex flex-row justify-between items-center w-full">
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