import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, CheckCircle, Loader2, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterStudent } from "../hooks/useQueries";

const SUBJECTS = [
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

const GRADES = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "College / University",
];

const CITIES = [
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

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  grade: string;
  city: string;
  subjectsNeeded: string[];
}

const initialForm: FormData = {
  name: "",
  email: "",
  phoneNumber: "",
  grade: "",
  city: "",
  subjectsNeeded: [],
};

function validate(
  form: FormData,
): Partial<Record<keyof FormData | "subjects", string>> {
  const errors: Partial<Record<keyof FormData | "subjects", string>> = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Valid email is required";
  if (
    !form.phoneNumber.trim() ||
    !/^\d{10}$/.test(form.phoneNumber.replace(/\s|-/g, ""))
  )
    errors.phoneNumber = "Valid 10-digit phone number is required";
  if (!form.grade) errors.grade = "Please select your class/grade";
  if (!form.city) errors.city = "Please select your city";
  if (form.subjectsNeeded.length === 0)
    errors.subjects = "Select at least one subject";
  return errors;
}

export function RegisterStudentPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData | "subjects", string>>
  >({});
  const [success, setSuccess] = useState(false);
  const { mutateAsync, isPending } = useRegisterStudent();

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleSubject = (subj: string) => {
    setForm((prev) => ({
      ...prev,
      subjectsNeeded: prev.subjectsNeeded.includes(subj)
        ? prev.subjectsNeeded.filter((s) => s !== subj)
        : [...prev.subjectsNeeded, subj],
    }));
    setErrors((prev) => ({ ...prev, subjects: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Please fix the errors before submitting");
      return;
    }
    try {
      await mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        grade: form.grade,
        city: form.city,
        subjectsNeeded: form.subjectsNeeded.map((s) => ({ name: s })),
      });
      setSuccess(true);
      toast.success("Registered successfully! Welcome to TutorIndia.");
      setTimeout(() => navigate({ to: "/browse" }), 1800);
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  if (success) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-surface pattern-bg py-12 px-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-sm"
          data-ocid="register_student.success_state"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Registration Successful!
          </h2>
          <p className="text-muted-foreground mb-4">
            Welcome to TutorIndia! You're being redirected to browse tutors...
          </p>
          <Loader2 className="w-5 h-5 animate-spin text-india-blue mx-auto" />
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface pattern-bg py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 mb-4">
            <User className="w-7 h-7 text-india-blue" />
          </div>
          <Badge className="mb-3 bg-blue-50 text-india-blue border-blue-100 font-semibold">
            Student Registration
          </Badge>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Register as a Student
          </h1>
          <p className="text-muted-foreground">
            Create your profile to connect with the best tutors in your city.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-india-blue" />
                Student Information
              </CardTitle>
              <CardDescription>
                All fields are required to complete registration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="student-name"
                    className="font-semibold text-foreground"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="student-name"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                    autoComplete="name"
                    data-ocid="register_student.input"
                  />
                  {errors.name && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_student.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="student-email"
                    className="font-semibold text-foreground"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="priya@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    autoComplete="email"
                    data-ocid="register_student.input"
                  />
                  {errors.email && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_student.error_state"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="student-phone"
                    className="font-semibold text-foreground"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="student-phone"
                    type="tel"
                    placeholder="98765 43210"
                    value={form.phoneNumber}
                    onChange={(e) => update("phoneNumber", e.target.value)}
                    className={errors.phoneNumber ? "border-destructive" : ""}
                    autoComplete="tel"
                    data-ocid="register_student.input"
                  />
                  {errors.phoneNumber && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_student.error_state"
                    >
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Grade */}
                <div className="space-y-1.5">
                  <Label className="font-semibold text-foreground">
                    Class / Grade <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.grade}
                    onValueChange={(v) => update("grade", v)}
                  >
                    <SelectTrigger
                      className={errors.grade ? "border-destructive" : ""}
                      data-ocid="register_student.select"
                    >
                      <SelectValue placeholder="Select class / grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADES.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.grade && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_student.error_state"
                    >
                      {errors.grade}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label className="font-semibold text-foreground">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.city}
                    onValueChange={(v) => update("city", v)}
                  >
                    <SelectTrigger
                      className={errors.city ? "border-destructive" : ""}
                      data-ocid="register_student.select"
                    >
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_student.error_state"
                    >
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Subjects Needed */}
                <div className="space-y-3">
                  <Label className="font-semibold text-foreground">
                    Subjects Needed <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4 bg-muted/40 rounded-xl">
                    {SUBJECTS.map((subj, idx) => (
                      <label
                        key={subj}
                        htmlFor={`student-subj-${subj}`}
                        className="flex items-center gap-2 cursor-pointer group"
                        data-ocid={`register_student.checkbox.${idx + 1}`}
                      >
                        <Checkbox
                          id={`student-subj-${subj}`}
                          checked={form.subjectsNeeded.includes(subj)}
                          onCheckedChange={() => toggleSubject(subj)}
                          className="data-[state=checked]:bg-india-blue data-[state=checked]:border-india-blue"
                        />
                        <span className="text-sm font-medium cursor-pointer text-foreground/80 group-hover:text-foreground transition-colors">
                          {subj}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.subjects && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_student.error_state"
                    >
                      {errors.subjects}
                    </p>
                  )}
                  {form.subjectsNeeded.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {form.subjectsNeeded.map((s) => (
                        <Badge
                          key={s}
                          className="bg-india-blue/10 text-india-blue border-0 text-xs font-medium"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-india-blue hover:bg-india-blue/90 text-white font-bold py-6 text-base mt-2"
                  data-ocid="register_student.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register as Student"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
