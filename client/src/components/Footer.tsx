import React from "react";

const links = [
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Shipping Policy", href: "/shipping" },
  { name: "Contact Us", href: "/contact" },
  { name: "Cancellation and Refunds", href: "/refunds" },
];

export function Footer() {
  return (
    <footer className="w-full py-6 border-t bg-background text-center">
      <nav className="flex flex-wrap justify-center gap-6 text-sm">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:underline text-muted-foreground"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </footer>
  );
}
