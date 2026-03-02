import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  IndianRupee,
  LogIn,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { UserRole } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useStudentInquiries,
  useTeacherInquiries,
  useTeacherProfile,
  useUserRole,
} from "../hooks/useQueries";

function TeacherDashboard() {
  const { data: profile, isLoading } = useTeacherProfile();
  const { data: inquiries, isLoading: inqLoading } = useTeacherInquiries();

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="dashboard.loading_state">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className="border-0 shadow-card" data-ocid="dashboard.card">
        <CardContent className="p-8 text-center">
          <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            No teacher profile found
          </h3>
          <p className="text-muted-foreground mb-6">
            Complete your teacher registration to start accepting students.
          </p>
          <Link to="/register-teacher" data-ocid="dashboard.primary_button">
            <Button className="bg-saffron hover:bg-saffron/90 text-white font-bold">
              Register as Teacher
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const expNum = Number(profile.experienceYears);
  const rateNum = Number(profile.hourlyRate);

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card
          className="border-0 shadow-card overflow-hidden"
          data-ocid="dashboard.card"
        >
          <div className="h-2 bg-gradient-to-r from-saffron to-india-blue" />
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 font-display font-bold text-2xl text-saffron">
                {profile.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <CardTitle className="font-display text-2xl">
                  {profile.name}
                </CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {profile.city}
                  </span>
                </div>
                <Badge className="mt-2 bg-orange-50 text-saffron border-0 font-semibold">
                  Teacher Profile
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 text-india-blue mx-auto mb-1" />
                <div className="font-display font-bold text-xl text-foreground">
                  {expNum}yrs
                </div>
                <div className="text-xs text-muted-foreground">Experience</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <IndianRupee className="w-5 h-5 text-saffron mx-auto mb-1" />
                <div className="font-display font-bold text-xl text-foreground">
                  ₹{rateNum.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-muted-foreground">Per Hour</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <div className="font-display font-bold text-xl text-foreground">
                  {profile.subjects.length}
                </div>
                <div className="text-xs text-muted-foreground">Subjects</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <MessageSquare className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <div className="font-display font-bold text-xl text-foreground">
                  {inquiries?.length ?? 0}
                </div>
                <div className="text-xs text-muted-foreground">Inquiries</div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-india-blue mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Qualifications
                  </span>
                  <p className="text-sm text-foreground">
                    {profile.qualifications}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-india-blue" />
                <span className="text-sm text-foreground">
                  {profile.phoneNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-india-blue" />
                <span className="text-sm text-foreground">{profile.email}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                Subjects
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.subjects.map((s) => (
                  <Badge
                    key={s.name}
                    className="bg-blue-50 text-india-blue border-0 font-medium"
                  >
                    {s.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Inquiries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="border-0 shadow-card" data-ocid="dashboard.card">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-india-blue" />
              Student Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inqLoading ? (
              <div className="space-y-3" data-ocid="dashboard.loading_state">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : !inquiries || inquiries.length === 0 ? (
              <div
                className="text-center py-8"
                data-ocid="dashboard.empty_state"
              >
                <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  No inquiries yet. Share your profile!
                </p>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="dashboard.list">
                {inquiries.map((inq, i) => (
                  <div
                    key={`teacher-inq-${inq.subject}-${i}`}
                    className="p-4 rounded-xl border border-border/60 bg-muted/30"
                    data-ocid={`dashboard.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-india-blue/10 text-india-blue border-0 font-medium text-xs">
                        {inq.subject}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/80">{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function StudentDashboard() {
  const { data: inquiries, isLoading } = useStudentInquiries();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 shadow-card" data-ocid="dashboard.card">
          <div className="h-2 bg-gradient-to-r from-india-blue to-saffron" />
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-india-blue" />
              My Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3" data-ocid="dashboard.loading_state">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : !inquiries || inquiries.length === 0 ? (
              <div
                className="text-center py-10"
                data-ocid="dashboard.empty_state"
              >
                <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  No inquiries yet
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Browse tutors and contact them to get started.
                </p>
                <Link to="/browse" data-ocid="dashboard.primary_button">
                  <Button className="bg-india-blue hover:bg-india-blue/90 text-white font-bold">
                    Browse Tutors
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="dashboard.list">
                {inquiries.map((inq, i) => (
                  <div
                    key={`student-inq-${inq.subject}-${i}`}
                    className="p-4 rounded-xl border border-border/60 bg-muted/30"
                    data-ocid={`dashboard.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-saffron/10 text-saffron border-0 font-medium text-xs">
                        {inq.subject}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/80">{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-2 gap-4">
          <Link to="/browse" data-ocid="dashboard.secondary_button">
            <Card className="border-0 shadow-card card-hover cursor-pointer h-full">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-india-blue" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Find Tutors
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Browse & connect
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/register-teacher" data-ocid="dashboard.secondary_button">
            <Card className="border-0 shadow-card card-hover cursor-pointer h-full">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Become Tutor
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Teach & earn
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export function DashboardPage() {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: role, isLoading: roleLoading } = useUserRole();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { login } = useInternetIdentity();

  return (
    <main className="min-h-screen bg-surface pattern-bg py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge className="mb-3 bg-blue-50 text-india-blue border-blue-100 font-semibold">
            My Dashboard
          </Badge>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            {isLoggedIn ? "Welcome back!" : "Your Dashboard"}
          </h1>
          {isLoggedIn && identity && (
            <p className="text-muted-foreground text-sm">
              Principal: {identity.getPrincipal().toString().slice(0, 20)}...
            </p>
          )}
        </motion.div>

        {/* Not logged in */}
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-0 shadow-card" data-ocid="dashboard.card">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <LogIn className="w-8 h-8 text-india-blue" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Sign in to access your dashboard
                </h2>
                <p className="text-muted-foreground mb-7 max-w-sm mx-auto">
                  Sign in with Internet Identity to view your profile,
                  inquiries, and more.
                </p>
                <Button
                  size="lg"
                  onClick={login}
                  className="bg-india-blue hover:bg-india-blue/90 text-white font-bold px-10"
                  data-ocid="dashboard.primary_button"
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : roleLoading ? (
          <div className="space-y-4" data-ocid="dashboard.loading_state">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        ) : role === UserRole.user ? (
          // Could be teacher or student; check teacher profile
          <TeacherDashboard />
        ) : (
          <StudentDashboard />
        )}
      </div>
    </main>
  );
}

// Suppress unused import warning for User icon
const _u = User;
void _u;
