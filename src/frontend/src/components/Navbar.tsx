import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Browse Tutors", to: "/browse" },
  { label: "For Students", to: "/register-student" },
  { label: "For Teachers", to: "/register-teacher" },
  { label: "Dashboard", to: "/dashboard" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const location = useLocation();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link.1"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-india-blue text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl text-india-blue">
            Tutor<span className="text-saffron">India</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-india-blue bg-blue-50 font-semibold"
                  : "text-foreground/70 hover:text-india-blue hover:bg-blue-50"
              }`}
              data-ocid={`nav.link.${i + 2}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Button */}
        <div className="hidden md:flex items-center gap-3">
          {isInitializing ? (
            <div className="w-20 h-9 rounded-lg bg-muted animate-pulse" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">
                {identity?.getPrincipal().toString().slice(0, 10)}...
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                className="border-india-blue text-india-blue hover:bg-india-blue hover:text-white"
                data-ocid="nav.button"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={loginStatus === "logging-in"}
              className="bg-india-blue hover:bg-india-blue/90 text-white font-semibold px-5"
              data-ocid="nav.button"
            >
              {loginStatus === "logging-in" ? "Signing in..." : "Sign In"}
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-india-blue bg-blue-50 font-semibold"
                  : "text-foreground/70 hover:text-india-blue hover:bg-blue-50"
              }`}
              data-ocid={`nav.link.${i + 7}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clear();
                  setMobileOpen(false);
                }}
                className="w-full border-india-blue text-india-blue"
                data-ocid="nav.button"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                className="w-full bg-india-blue text-white"
                data-ocid="nav.button"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// Keep BookOpen import used
const _unused = BookOpen;
void _unused;
