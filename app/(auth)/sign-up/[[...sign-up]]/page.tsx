import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: 'var(--primary)',
          colorBackground: 'var(--card)',
          colorForeground: 'var(--card-foreground)',
          colorMutedForeground: 'var(--muted-foreground)',
          colorInput: 'var(--input)',
          colorInputForeground: 'var(--foreground)',
          borderRadius: '0.375rem',
          fontFamily: 'var(--font-mono, monospace)',
        },
      }}
    />
  );
}