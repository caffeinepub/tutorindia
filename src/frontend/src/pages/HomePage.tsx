import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  MessageSquare,
  Search,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const subjects = [
  { name: "Mathematics", icon: "📐", color: "bg-blue-50 border-blue-100" },
  { name: "Physics", icon: "⚛️", color: "bg-purple-50 border-purple-100" },
  { name: "Chemistry", icon: "🧪", color: "bg-green-50 border-green-100" },
  { name: "Biology", icon: "🌿", color: "bg-emerald-50 border-emerald-100" },
  { name: "English", icon: "📚", color: "bg-yellow-50 border-yellow-100" },
  { name: "Hindi", icon: "🗣️", color: "bg-orange-50 border-orange-100" },
  { name: "History", icon: "🏛️", color: "bg-amber-50 border-amber-100" },
  { name: "Science", icon: "🔬", color: "bg-teal-50 border-teal-100" },
];

const howItWorks = [
  {
    step: "01",
    title: "Search Tutors",
    description:
      "Browse verified tutors by subject, city, and availability. Filter by experience and rate.",
    icon: Search,
    color: "text-india-blue",
    bg: "bg-blue-50",
  },
  {
    step: "02",
    title: "Connect & Discuss",
    description:
      "Contact your chosen tutor directly via phone. Discuss requirements and schedule.",
    icon: MessageSquare,
    color: "text-saffron",
    bg: "bg-orange-50",
  },
  {
    step: "03",
    title: "Start Learning",
    description:
      "Begin personalized home tutoring sessions. Track progress and achieve your goals.",
    icon: BookOpen,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const benefits = [
  {
    icon: Star,
    title: "Verified Tutors",
    description:
      "All tutors go through a thorough verification process. Qualifications and experience are checked.",
    color: "text-saffron",
    bg: "bg-orange-50",
  },
  {
    icon: Users,
    title: "Personalized Learning",
    description:
      "One-on-one attention at home. Tutors adapt to your child's learning style and pace.",
    color: "text-india-blue",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Safe & Trusted",
    description:
      "Background-verified tutors, transparent profiles, and direct communication for peace of mind.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const stats = [
  { value: "10,000+", label: "Registered Tutors" },
  { value: "50,000+", label: "Happy Students" },
  { value: "25+", label: "Cities Covered" },
  { value: "4.8★", label: "Average Rating" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[540px] flex items-center overflow-hidden"
        data-ocid="home.section"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x500.jpg"
            alt="Tutor teaching student"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-india-blue/90 via-india-blue/70 to-india-blue/20" />
        </div>

        {/* Decorative Ashoka-inspired ring */}
        <div className="absolute right-8 bottom-8 opacity-10 hidden lg:block">
          <div className="w-40 h-40 rounded-full border-[12px] border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" />
        </div>

        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <Badge className="mb-4 bg-saffron/20 text-saffron border-saffron/30 font-semibold px-3 py-1">
              🇮🇳 India's Trusted Tutor Platform
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Find the Best <span className="text-saffron">Home Tutors</span> in
              India
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Connect with qualified, verified tutors in your city. Personalized
              learning at your doorstep for Classes 1–12 and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/browse" data-ocid="home.primary_button">
                <Button
                  size="lg"
                  className="bg-saffron hover:bg-saffron/90 text-white font-bold px-8 shadow-lg shadow-orange-500/25 w-full sm:w-auto"
                >
                  Find a Tutor
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/register-teacher" data-ocid="home.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-india-blue font-bold px-8 w-full sm:w-auto bg-transparent"
                >
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <section className="bg-india-blue border-t border-white/10">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-saffron">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-20 bg-surface pattern-bg" data-ocid="home.section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge className="mb-3 bg-blue-50 text-india-blue border-blue-100 font-semibold">
              Simple Process
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Finding the perfect tutor for your child is easy with TutorIndia.
              Follow these simple steps to get started.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.step} variants={itemVariants}>
                  <Card className="text-center border-0 shadow-card card-hover p-2">
                    <CardContent className="pt-8 pb-6 px-6">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${step.bg} mb-5`}
                      >
                        <Icon className={`w-7 h-7 ${step.color}`} />
                      </div>
                      <div className="font-display text-4xl font-bold text-border mb-3">
                        {step.step}
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Popular Subjects ──────────────────────────────────── */}
      <section className="py-20 bg-white" data-ocid="home.section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-orange-50 text-saffron border-orange-100 font-semibold">
              All Subjects
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Subjects
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Expert tutors available across all major school and college
              subjects.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {subjects.map((subject) => (
              <motion.div key={subject.name} variants={itemVariants}>
                <Link to="/browse" data-ocid="home.button">
                  <div
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${subject.color} cursor-pointer card-hover text-center`}
                  >
                    <span className="text-3xl">{subject.icon}</span>
                    <span className="font-semibold text-sm text-foreground">
                      {subject.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link to="/browse" data-ocid="home.secondary_button">
              <Button
                variant="outline"
                className="border-india-blue text-india-blue hover:bg-india-blue hover:text-white font-semibold px-8"
              >
                Browse All Tutors
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why TutorIndia ────────────────────────────────────── */}
      <section className="py-20 bg-surface pattern-bg" data-ocid="home.section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Badge className="mb-3 bg-blue-50 text-india-blue border-blue-100 font-semibold">
              Our Advantage
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why TutorIndia?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We're committed to quality education and student success.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={benefit.title} variants={itemVariants}>
                  <Card className="border-0 shadow-card card-hover overflow-hidden">
                    <CardContent className="p-7">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${benefit.bg} mb-5`}
                      >
                        <Icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Transparent profiles",
                          "Direct communication",
                          "Flexible scheduling",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-16 hero-gradient" data-ocid="home.section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of students and tutors across India. Register today
              and transform your educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-student" data-ocid="home.primary_button">
                <Button
                  size="lg"
                  className="bg-saffron hover:bg-saffron/90 text-white font-bold px-10 shadow-lg shadow-orange-500/25 w-full sm:w-auto"
                >
                  Register as Student
                </Button>
              </Link>
              <Link to="/register-teacher" data-ocid="home.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-india-blue font-bold px-10 w-full sm:w-auto bg-transparent"
                >
                  Register as Teacher
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
