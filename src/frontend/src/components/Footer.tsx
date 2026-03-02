import { Link } from "@tanstack/react-router";
import { GraduationCap, Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-india-blue text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Tutor<span className="text-saffron">India</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Connecting students with the best home tutors across India.
              Quality education, personalized learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Find a Tutor", to: "/browse" },
                { label: "Become a Tutor", to: "/register-teacher" },
                { label: "Student Registration", to: "/register-student" },
                { label: "Dashboard", to: "/dashboard" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-saffron text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">
              Popular Subjects
            </h4>
            <ul className="space-y-2">
              {[
                "Mathematics",
                "Physics",
                "Chemistry",
                "Biology",
                "English",
                "Computer Science",
              ].map((subj) => (
                <li key={subj}>
                  <span className="text-white/70 text-sm">{subj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-saffron flex-shrink-0" />
                support@tutorindia.in
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/60">
          <span>© {year} TutorIndia. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3.5 h-3.5 text-saffron fill-current" /> using{" "}
            <a
              href={caffeineLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron hover:text-saffron/80 underline underline-offset-2 transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
