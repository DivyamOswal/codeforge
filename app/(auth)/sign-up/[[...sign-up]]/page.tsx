import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: '#FF7A45',
          colorBackground: '#121417',
          colorForeground: '#E7E9EA',
          colorMutedForeground: '#7D8590',
          colorInput: '#0A0B0D',
          colorInputForeground: '#E7E9EA',
          borderRadius: '0.375rem',
          fontFamily: 'var(--font-mono, monospace)',
        },
        elements: {
          card: 'shadow-none border-0 bg-transparent',
        },
      }}
    />
  );
}