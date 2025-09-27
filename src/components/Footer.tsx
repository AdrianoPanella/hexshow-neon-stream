const Footer = () => {
  const footerLinks = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'About HexShow', href: '/about' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-cyber-dark border-t border-cyber-border py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and Brand */}
          <div className="text-center">
            <h3 className="font-brand text-2xl font-bold text-neon-green mb-2">
              HexShow
            </h3>
            <p className="text-muted-foreground text-sm">
              Stream the future of entertainment
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-neon-green transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-cyber-border/50 w-full">
            <p className="text-xs text-muted-foreground">
              © 2024 HexShow. All rights reserved. | Streaming platform powered by cutting-edge technology.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;