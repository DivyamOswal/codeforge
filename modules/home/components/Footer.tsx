import Link from "next/link";
import { SiGithub, SiX, SiLinkedin } from "@icons-pack/react-simple-icons";

const FOOTER_LINKS = {
  Product: [
    { label: "Problems", href: "/problems" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SOCIAL_LINKS = [
  { icon: <SiGithub size={16} />, href: "https://github.com", label: "GitHub" },
  { icon: <SiX size={16} />, href: "https://twitter.com", label: "Twitter" },
  { icon: <SiLinkedin size={16} />, href: "https://linkedin.com", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="h-[3px] w-full bg-primary" />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* brand + blurb */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-1 font-mono text-lg font-bold tracking-tight text-foreground">
              <span>Code</span>
              <span className="text-primary">Forge</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Practice problems, track your progress, and build the habits that make you fast under pressure.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} CodeForge. All rights reserved.
          </p>
          <p className="select-none font-mono text-xs text-muted-foreground">
            {"// ship code, not excuses"}
          </p>
        </div>
      </div>
    </footer>
  );
};