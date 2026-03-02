import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  BookOpen,
  Clock,
  IndianRupee,
  MapPin,
  Phone,
  Search,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { TeacherProfile } from "../backend.d";
import { useBrowseTutors } from "../hooks/useQueries";

const SUBJECTS = [
  "All Subjects",
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "History",
  "Geography",
  "Computer Science",
  "Economics",
  "Accountancy",
];

const CITIES = [
  "",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Lucknow",
  "Chandigarh",
  "Noida",
  "Gurgaon",
  "Bhopal",
  "Indore",
];

// Demo tutors shown before any search
const DEMO_TUTORS: TeacherProfile[] = [
  {
    name: "Dr. Anita Sharma",
    email: "anita.sharma@example.com",
    phoneNumber: "98765 43210",
    city: "Delhi",
    qualifications: "Ph.D. Mathematics, IIT Delhi",
    experienceYears: BigInt(12),
    hourlyRate: BigInt(800),
    subjects: [{ name: "Mathematics" }, { name: "Physics" }],
  },
  {
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    phoneNumber: "87654 32109",
    city: "Mumbai",
    qualifications: "M.Sc. Chemistry, Mumbai University",
    experienceYears: BigInt(7),
    hourlyRate: BigInt(600),
    subjects: [{ name: "Chemistry" }, { name: "Science" }, { name: "Biology" }],
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phoneNumber: "76543 21098",
    city: "Bangalore",
    qualifications: "B.Ed., M.A. English Literature, Christ University",
    experienceYears: BigInt(5),
    hourlyRate: BigInt(500),
    subjects: [{ name: "English" }, { name: "History" }],
  },
  {
    name: "Suresh Gupta",
    email: "suresh.gupta@example.com",
    phoneNumber: "65432 10987",
    city: "Hyderabad",
    qualifications: "M.Tech. Computer Science, BITS Pilani",
    experienceYears: BigInt(9),
    hourlyRate: BigInt(700),
    subjects: [{ name: "Computer Science" }, { name: "Mathematics" }],
  },
  {
    name: "Kavitha Reddy",
    email: "kavitha.reddy@example.com",
    phoneNumber: "54321 09876",
    city: "Chennai",
    qualifications: "M.Com., CA Intermediate, University of Madras",
    experienceYears: BigInt(6),
    hourlyRate: BigInt(550),
    subjects: [{ name: "Accountancy" }, { name: "Economics" }],
  },
  {
    name: "Amit Singh",
    email: "amit.singh@example.com",
    phoneNumber: "43210 98765",
    city: "Lucknow",
    qualifications: "M.Sc. Physics, Lucknow University",
    experienceYears: BigInt(4),
    hourlyRate: BigInt(450),
    subjects: [
      { name: "Physics" },
      { name: "Mathematics" },
      { name: "Science" },
    ],
  },
];

function TutorCard({ tutor, index }: { tutor: TeacherProfile; index: number }) {
  const [showPhone, setShowPhone] = useState(false);

  const initials = tutor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const rateNum = Number(tutor.hourlyRate);
  const expNum = Number(tutor.experienceYears);

  // Deterministic pastel color from name
  const colors = [
    "bg-blue-100 text-india-blue",
    "bg-orange-100 text-saffron",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-teal-100 text-teal-700",
    "bg-pink-100 text-pink-700",
  ];
  const colorClass = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      data-ocid={`browse.item.${index + 1}`}
    >
      <Card className="border border-border/60 shadow-card card-hover overflow-hidden">
        <CardContent className="p-0">
          {/* Top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-india-blue to-saffron" />

          <div className="p-5">
            {/* Header row */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-2xl font-display font-bold text-lg flex-shrink-0 ${colorClass}`}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-foreground text-lg truncate">
                  {tutor.name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{tutor.city}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s <= 4 ? "text-saffron fill-current" : "text-border"}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    4.0
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-india-blue text-xl">
                  ₹{rateNum.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-muted-foreground">per hour</div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <Award className="w-4 h-4 text-india-blue mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 line-clamp-2">
                  {tutor.qualifications}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-saffron flex-shrink-0" />
                <span className="text-foreground/80">
                  {expNum} year{expNum !== 1 ? "s" : ""} of experience
                </span>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Subjects
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tutor.subjects.map((s) => (
                  <Badge
                    key={s.name}
                    className="bg-blue-50 text-india-blue border-0 text-xs font-medium px-2 py-0.5"
                  >
                    {s.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action */}
            {showPhone ? (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
                <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-semibold text-green-700 text-sm">
                  {tutor.phoneNumber}
                </span>
              </div>
            ) : (
              <Button
                onClick={() => setShowPhone(true)}
                className="w-full bg-india-blue hover:bg-india-blue/90 text-white font-semibold"
                data-ocid={`browse.button.${index + 1}`}
              >
                <Phone className="mr-2 w-4 h-4" />
                Contact Tutor
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TutorCardSkeleton() {
  return (
    <Card className="border border-border/60 overflow-hidden">
      <CardContent className="p-0">
        <div className="h-1 w-full bg-gradient-to-r from-border to-border" />
        <div className="p-5 space-y-4">
          <div className="flex gap-4">
            <Skeleton className="w-14 h-14 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export function BrowsePage() {
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [cityInput, setCityInput] = useState("");
  const [searchParams, setSearchParams] = useState<{
    subject: string;
    city: string;
  } | null>(null);

  const querySubject = searchParams
    ? searchParams.subject === "All Subjects"
      ? ""
      : searchParams.subject
    : null;

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useBrowseTutors(
    querySubject ?? "",
    searchParams?.city ?? "",
    searchParams !== null,
  );

  const handleSearch = () => {
    setSearchParams({ subject: selectedSubject, city: cityInput.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const displayTutors: TeacherProfile[] =
    searchParams !== null ? (searchResults ?? []) : DEMO_TUTORS;

  const isSearching = searchParams !== null && isLoading;

  if (isError) {
    toast.error("Failed to load tutors. Please try again.");
  }

  return (
    <main className="min-h-screen bg-surface py-10 px-4">
      <div className="container max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Badge className="mb-3 bg-blue-50 text-india-blue border-blue-100 font-semibold">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            {searchParams
              ? `${displayTutors.length} Tutors Found`
              : `${DEMO_TUTORS.length}+ Featured Tutors`}
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Browse Tutors
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Find verified home tutors by subject and city. All tutors are
            personally verified.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-card border border-border/60 p-5 mb-8"
          data-ocid="browse.panel"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">
                Subject
              </Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger data-ocid="browse.select">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">
                City
              </Label>
              <Input
                placeholder="e.g. Delhi, Mumbai..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={handleKeyDown}
                list="city-list"
                data-ocid="browse.search_input"
              />
              <datalist id="city-list">
                {CITIES.filter(Boolean).map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-india-blue hover:bg-india-blue/90 text-white font-bold h-10"
                data-ocid="browse.primary_button"
              >
                {isSearching ? (
                  <>
                    <Search className="mr-2 w-4 h-4 animate-pulse" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 w-4 h-4" />
                    Search Tutors
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {isSearching ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="browse.loading_state"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <TutorCardSkeleton key={k} />
            ))}
          </div>
        ) : displayTutors.length === 0 ? (
          <div
            className="text-center py-20 bg-white rounded-2xl border border-border/60"
            data-ocid="browse.empty_state"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              No tutors found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all tutors.
            </p>
            <Button
              variant="outline"
              className="border-india-blue text-india-blue hover:bg-india-blue hover:text-white"
              onClick={() => {
                setSearchParams(null);
                setSelectedSubject("All Subjects");
                setCityInput("");
              }}
              data-ocid="browse.secondary_button"
            >
              View All Tutors
            </Button>
          </div>
        ) : (
          <>
            {searchParams === null && (
              <div className="flex items-center gap-2 mb-5">
                <IndianRupee className="w-4 h-4 text-saffron" />
                <p className="text-sm text-muted-foreground font-medium">
                  Showing featured tutors. Use the search above to find tutors
                  in your city.
                </p>
              </div>
            )}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="browse.list"
            >
              {displayTutors.map((tutor, i) => (
                <TutorCard
                  key={`${tutor.name}-${tutor.city}`}
                  tutor={tutor}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
