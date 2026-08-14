"use client";

import { UserRole } from "@/lib/generated/prisma/enums";
import Link from "next/link";
import React, { useState } from "react";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  userRole?: UserRole;
}

const NAV_LINKS = [
  { href: "/problems", label: "Problems" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
];

export const Navbar = ({ userRole }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 px-0 sm:w-full sm:px-4">
      <div className="rounded-2xl border border-border bg-card/70 shadow-lg shadow-black/20 backdrop-blur-md transition-colors duration-200 hover:bg-card/90">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="flex items-center gap-1 font-mono text-base font-bold tracking-tight text-foreground sm:text-lg"
          >
            <span>Code</span>
            <span className="text-primary">Forge</span>
          </Link>

          {/* desktop links */}
          <div className="hidden flex-row items-center justify-center gap-x-4 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* desktop auth */}
          <div className="hidden items-center gap-4 md:flex">
            <Show when="signed-in">
              {userRole === UserRole.ADMIN && (
                <Link href="/create-problem">
                  <Button variant="outline" size="default">
                    Create Problem
                  </Button>
                </Link>
              )}
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>
          </div>

          {/* mobile: user button always visible + hamburger toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="text-foreground"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* mobile dropdown */}
        {open && (
          <div className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-2 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            <Show when="signed-in">
              {userRole === UserRole.ADMIN && (
                <Link href="/create-problem" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="default" className="mt-1 w-full">
                    Create Problem
                  </Button>
                </Link>
              )}
            </Show>
            <Show when="signed-out">
              <div className="mt-1 flex flex-col gap-2">
                <SignInButton />
                <SignUpButton>
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </Show>
          </div>
        )}
      </div>
    </nav>
  );
};