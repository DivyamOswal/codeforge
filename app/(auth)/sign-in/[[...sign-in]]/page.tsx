import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
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
        elements: {
          rootBox: { width: '100%' },
          cardBox: {
            width: '100%',
            boxShadow: 'none',
            border: 'none',
            background: 'transparent',
          },
          card: {
            width: '100%',
            boxShadow: 'none',
            border: 'none',
            background: 'transparent',
            margin: 0,
            padding: '2rem 1.5rem',
          },
        },
      }}
    />
  );
}