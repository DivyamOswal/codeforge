import Link from "next/link";
import { onBoardUser } from "@/modules/auth/actions";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "text-primary",
  Medium: "text-foreground",
  Hard: "text-destructive",
};

const MOCK_PROBLEMS = [
  { id: 1, title: "Two Sum", difficulty: "Easy", solved: true },
  { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", solved: false },
  { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", solved: false },
  { id: 4, title: "Merge Intervals", difficulty: "Medium", solved: true },
  { id: 5, title: "Valid Parentheses", difficulty: "Easy", solved: true },
];

export default async function Home() {
  const result = await onBoardUser();
  const user = result?.success ? result.user : null;

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pt-32 text-center sm:pt-40">
        <h1 className="text-2xl font-bold text-foreground sm:text-4xl">
          Sharpen your skills at the <span className="text-primary">Forge</span>
        </h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
          Practice problems, track your progress, and build the habits that make you fast under pressure.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <SignUpButton>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get started
            </Button>
          </SignUpButton>
          <Link href="/problems">
            <Button variant="outline">Browse problems</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-24 sm:px-6 sm:pt-28">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          {user.firstName ? `Welcome back, ${user.firstName}` : "Welcome"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {/* pick a problem and start forging */}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Solved</p>
          <p className="mt-1 text-xl font-bold text-primary sm:text-2xl">3</p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Attempted</p>
          <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">5</p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">0 days</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
          <span className="text-sm font-bold text-foreground">Problems</span>
          <span className="text-xs text-muted-foreground">{MOCK_PROBLEMS.length} total</span>
        </div>
        <ul className="divide-y divide-border">
          {MOCK_PROBLEMS.map((problem) => (
            <li
              key={problem.id}
              className="flex items-center justify-between gap-3 bg-background px-4 py-3 transition-colors hover:bg-card"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    problem.solved ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
                <span className="truncate text-sm text-foreground">{problem.title}</span>
              </div>
              <span
                className={`shrink-0 text-xs font-medium ${DIFFICULTY_STYLES[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}