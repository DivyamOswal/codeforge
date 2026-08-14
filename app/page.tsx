import { UserButton } from "@clerk/nextjs";
import { onBoardUser } from "@/modules/auth/actions";

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

  return (
    <div className="flex min-h-full flex-col bg-background font-mono">
      {/* nav */}
      <header className="flex h-16 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-1 text-lg font-bold tracking-tight text-foreground">
          <span>Code</span>
          <span className="text-primary">Forge</span>
        </div>
        <UserButton
          appearance={{
            variables: {
              colorPrimary: "var(--primary)",
              colorBackground: "var(--card)",
              fontFamily: "var(--font-mono, monospace)",
            },
          }}
        />
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        {/* greeting */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-foreground">
            {user?.firstName ? `Welcome back, ${user.firstName}` : "Welcome"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {/* pick a problem and start forging */}
          </p>
        </div>

        {/* stats strip */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <div className="rounded-md border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Solved</p>
            <p className="mt-1 text-2xl font-bold text-primary">3</p>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Attempted</p>
            <p className="mt-1 text-2xl font-bold text-foreground">5</p>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Streak</p>
            <p className="mt-1 text-2xl font-bold text-foreground">0 days</p>
          </div>
        </div>

        {/* problems list */}
        <div className="overflow-hidden rounded-md border border-border">
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <span className="text-sm font-bold text-foreground">Problems</span>
            <span className="text-xs text-muted-foreground">{MOCK_PROBLEMS.length} total</span>
          </div>
          <ul className="divide-y divide-border">
            {MOCK_PROBLEMS.map((problem) => (
              <li
                key={problem.id}
                className="flex items-center justify-between bg-background px-4 py-3 transition-colors hover:bg-card"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      problem.solved ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                  <span className="text-sm text-foreground">{problem.title}</span>
                </div>
                <span className={`text-xs font-medium ${DIFFICULTY_STYLES[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}