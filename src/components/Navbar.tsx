import { Search, Bell, ChevronDown, Play, Info, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import hexShowLogo from '@/assets/hexshow-logo.png';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', href: '/', active: location.pathname === '/' },
    { name: 'Series', href: '/series', active: location.pathname === '/series' },
    { name: 'Movies', href: '/movies', active: location.pathname === '/movies' },
    { name: 'New & Popular', href: '/new', active: location.pathname === '/new' },
    { name: 'My List', href: '/my-list', active: location.pathname === '/my-list' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-cyber-border z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={hexShowLogo} 
                alt="HexShow" 
                className="h-8 w-auto"
              />
              <span className="font-brand text-xl font-bold text-neon-green">
                HexShow
              </span>
            </Link>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden lg:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-neon-green ${
                    link.active 
                      ? 'text-neon-green border-b-2 border-neon-green pb-4' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hover:bg-cyber-card">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="hover:bg-cyber-card">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-1 hover:bg-cyber-card"
                >
                  <div className="w-8 h-8 rounded bg-gradient-to-r from-neon-green to-neon-purple flex items-center justify-center text-xs font-bold text-black">
                    U
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-cyber-card border-cyber-border">
                <DropdownMenuItem className="hover:bg-cyber-border focus:bg-cyber-border">
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-cyber-border focus:bg-cyber-border">
                  Manage Profiles
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-cyber-border focus:bg-cyber-border">
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-cyber-border focus:bg-cyber-border text-red-400">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;