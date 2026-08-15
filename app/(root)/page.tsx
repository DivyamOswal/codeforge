import Link from "next/link";
import { Button } from "@/components/ui/button";
import { onBoardUser } from "@/modules/auth/actions";
import { ArrowRight, Code2, Flame, Globe2, Play, Star, Target, Trophy, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpButton } from "@clerk/nextjs";

export default async function Home() {
  const result = await onBoardUser();
  const user = result?.success ? result.user : null;

  const features = [
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Interactive Coding",
      description: "Practice with real-world coding challenges and get instant feedback on your solutions.",
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics and achievement systems.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Global Community",
      description: "Learn from thousands of developers worldwide and share your knowledge.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
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
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(var(--muted-foreground) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-6 rounded-sm border-border bg-secondary text-secondary-foreground">
            <Star className="mr-2 h-3.5 w-3.5 text-primary" />
            Join 10,000+ developers already coding
          </Badge>

          <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground">
            // welcome to the forge
          </p>

          <h1 className="mb-8 text-2xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Master <span className="text-primary">problem solving</span>
            <br />
            with code.
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Challenge yourself with thousands of coding problems, compete with developers worldwide, and
            accelerate your programming journey with real-time feedback and expert solutions.
          </p>

          <div className="mb-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {user ? (
              <Link href="/problems">
                <Button size="lg" className="group cursor-pointer rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                  <Play className="mr-2 h-4 w-4" />
                  Start Coding Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <SignUpButton>
                <Button size="lg" className="group cursor-pointer rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                  <Play className="mr-2 h-4 w-4" />
                  Start Coding Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignUpButton>
            )}
            <Link href="/problems">
              <Button variant="outline" size="lg" className="cursor-pointer rounded-sm border-border text-foreground hover:bg-accent">
                Browse Problems
              </Button>
            </Link>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-sm border border-border text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-semibold text-foreground md:text-3xl">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
            <h2 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
              Everything you need to <span className="text-primary">excel</span>
            </h2>
            <p className="mx-auto max-w-xl text-base text-muted-foreground">
              Our platform provides comprehensive tools and resources to help you become a better programmer
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="rounded-md border-border shadow-none transition-colors duration-150 hover:border-primary/40"
              >
                <CardHeader>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm border border-border text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
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
            <h2 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
              Choose your <span className="text-primary">challenge</span>
            </h2>
            <p className="mx-auto max-w-xl text-base text-muted-foreground">
              From beginner-friendly puzzles to advanced algorithmic challenges
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {problemCategories.map((category, index) => (
              <Card
                key={index}
                className="rounded-md border-border bg-card shadow-none transition-colors duration-150 hover:border-primary/40"
              >
                <CardHeader>
                  <Badge variant="secondary" className="w-fit rounded-sm bg-secondary text-secondary-foreground">
                    {category.level}
                  </Badge>
                  <CardTitle className="text-base font-semibold text-foreground">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-sm text-muted-foreground">{category.description}</CardDescription>
                  <div className="text-sm font-medium text-primary">{category.count}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-md border border-border bg-card px-8 py-14 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
              Ready to start your coding journey?
            </h2>
            <p className="mb-8 text-base text-muted-foreground">
              Join thousands of developers who are improving their skills every day
            </p>
            {user ? (
              <Link href="/problems">
                <Button size="lg" className="group cursor-pointer rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                  Go to Problems
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <SignUpButton>
                <Button size="lg" className="group cursor-pointer rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignUpButton>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}