import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0 39px, var(--muted-foreground) 39px 40px)',
        }}
      />

      <div className="relative z-10 mb-8 flex items-center gap-1 font-mono text-2xl font-bold tracking-tight text-foreground">
        <span>Code</span>
        <span className="text-primary">Forge</span>
        <span className="ml-0.5 inline-block h-6 w-[3px] animate-[cf-blink_1.1s_steps(1)_infinite] bg-primary" />
      </div>

      {/* auth card — no padding here anymore, Clerk's card supplies its own */}
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-md border border-border bg-card">
        <div className="h-[3px] w-full bg-primary" />
        {children}
      </div>

      <p className="relative z-10 mt-6 select-none font-mono text-xs text-muted-foreground">
        ship code, not excuses
      </p>

      <style>{`
        @keyframes cf-blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default AuthLayout