import Link from "next/link";
import { Button } from "@/components/ui/button";
import { onBoardUser } from "@/modules/auth/actions";
import { ChevronRight, Code2, Flame, Globe2, Play, Star, Target, Trophy, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpButton } from "@clerk/nextjs";

export default async function Home() {
  const result = await onBoardUser();
  const user = result?.success ? result.user : null;

  const features = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Interactive Coding",
      description: "Practice with real-world coding challenges and get instant feedback on your solutions.",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics and achievement systems.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Global Community",
      description: "Learn from thousands of developers worldwide and share your knowledge.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Feedback",
      description: "Get instant feedback on your solutions with detailed explanations.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Problems Solved", icon: <Target className="h-4 w-4" /> },
    { number: "10K+", label: "Active Developers", icon: <Users className="h-4 w-4" /> },
    { number: "25+", label: "Programming Languages", icon: <Globe2 className="h-4 w-4" /> },
    { number: "98%", label: "Success Rate", icon: <Flame className="h-4 w-4" /> },
  ];

  const problemCategories = [
    {
      level: "Beginner",
      title: "Easy Problems",
      description: "Perfect for getting started with basic programming concepts and syntax.",
      count: "500+ Problems",
    },
    {
      level: "Intermediate",
      title: "Medium Problems",
      description: "Challenge yourself with data structures and algorithm problems.",
      count: "800+ Problems",
    },
    {
      level: "Advanced",
      title: "Hard Problems",
      description: "Master complex algorithms and compete in programming contests.",
      count: "300+ Problems",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(var(--muted-foreground) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-6 border-border bg-secondary text-secondary-foreground">
            <Star className="mr-2 h-4 w-4 text-primary" />
            Join 10,000+ developers already coding
          </Badge>

          <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground">
            // welcome to the forge
          </p>

          <h1 className="mb-8 text-2xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
            Master{" "}
            <span className="inline-block -rotate-1 transform rounded-2xl bg-primary px-6 py-3 text-primary-foreground shadow-lg">
              Problem
            </span>{" "}
            Solving
            <br />
            with{" "}
            <span className="inline-block rotate-1 transform rounded-2xl bg-foreground px-6 py-3 text-background shadow-lg">
              Code
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Challenge yourself with thousands of coding problems, compete with developers worldwide, and
            accelerate your programming journey with real-time feedback and expert solutions.
          </p>

          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {user ? (
              <Link href="/problems">
                <Button size="lg" className="group bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                  <Play className="mr-2 h-5 w-5" />
                  Start Coding Now
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <SignUpButton>
                <Button size="lg" className="group bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                  <Play className="mr-2 h-5 w-5" />
                  Start Coding Now
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignUpButton>
            )}
            <Link href="/problems">
              <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-accent">
                Browse Problems
              </Button>
            </Link>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.number}</div>
                <div className="font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-card py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground">// core features</p>
            <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
              Everything you need to <span className="text-primary">excel</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Our platform provides comprehensive tools and resources to help you become a better programmer
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-[3px] w-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section id="problems" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground">// pick your battle</p>
            <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
              Choose your <span className="text-primary">challenge</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              From beginner-friendly puzzles to advanced algorithmic challenges
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {problemCategories.map((category, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="h-[3px] w-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <CardHeader>
                  <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
                    {category.level}
                  </Badge>
                  <CardTitle className="text-foreground">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                  <div className="font-semibold text-primary">{category.count}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-primary/30 bg-primary px-8 py-16 text-center shadow-lg">
            <h2 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl">
              Ready to start your coding journey?
            </h2>
            <p className="mb-8 text-xl text-primary-foreground/80">
              Join thousands of developers who are improving their skills every day
            </p>
            {user ? (
              <Link href="/problems">
                <Button size="lg" className="group bg-background text-foreground shadow-lg hover:bg-background/90">
                  Go to Problems
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <SignUpButton>
                <Button size="lg" className="group bg-background text-foreground shadow-lg hover:bg-background/90">
                  Get Started for Free
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignUpButton>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}