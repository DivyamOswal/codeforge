import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0B0D] px-4">
      {/* faint line-number gutter texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0 39px, #7D8590 39px 40px)',
        }}
      />

      {/* brand mark */}
      <div className="relative z-10 mb-8 flex items-center gap-1 font-mono text-2xl font-bold tracking-tight text-[#E7E9EA]">
        <span>Code</span>
        <span className="text-[#FF7A45]">Forge</span>
        <span className="ml-0.5 inline-block h-6 w-[3px] animate-[cf-blink_1.1s_steps(1)_infinite] bg-[#FF7A45]" />
      </div>

      {/* auth card */}
      <div className="relative z-10 w-full max-w-sm rounded-md border border-[#24272C] bg-[#121417]">
        <div className="h-[3px] w-full bg-[#FF7A45]" />
        <div className="px-6 py-8">{children}</div>
      </div>

      <p className="relative z-10 mt-6 select-none font-mono text-xs text-[#7D8590]">
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