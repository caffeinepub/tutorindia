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
import { CheckCircle, GraduationCap, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterTeacher } from "../hooks/useQueries";

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
  qualifications: string;
  experienceYears: string;
  city: string;
  hourlyRate: string;
  subjects: string[];
}

const initialForm: FormData = {
  name: "",
  email: "",
  phoneNumber: "",
  qualifications: "",
  experienceYears: "",
  city: "",
  hourlyRate: "",
  subjects: [],
};

function validate(
  form: FormData,
): Partial<Record<keyof FormData | "subjectsErr", string>> {
  const errors: Partial<Record<keyof FormData | "subjectsErr", string>> = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Valid email is required";
  if (
    !form.phoneNumber.trim() ||
    !/^\d{10}$/.test(form.phoneNumber.replace(/\s|-/g, ""))
  )
    errors.phoneNumber = "Valid 10-digit phone number is required";
  if (!form.qualifications.trim())
    errors.qualifications = "Qualifications are required";
  if (
    !form.experienceYears ||
    Number.isNaN(Number(form.experienceYears)) ||
    Number(form.experienceYears) < 0
  )
    errors.experienceYears = "Enter valid years of experience";
  if (!form.city) errors.city = "Please select your city";
  if (
    !form.hourlyRate ||
    Number.isNaN(Number(form.hourlyRate)) ||
    Number(form.hourlyRate) < 0
  )
    errors.hourlyRate = "Enter valid hourly rate";
  if (form.subjects.length === 0)
    errors.subjectsErr = "Select at least one subject";
  return errors;
}

export function RegisterTeacherPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData | "subjectsErr", string>>
  >({});
  const [success, setSuccess] = useState(false);
  const { mutateAsync, isPending } = useRegisterTeacher();

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleSubject = (subj: string) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subj)
        ? prev.subjects.filter((s) => s !== subj)
        : [...prev.subjects, subj],
    }));
    setErrors((prev) => ({ ...prev, subjectsErr: undefined }));
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
        qualifications: form.qualifications.trim(),
        experienceYears: BigInt(Math.round(Number(form.experienceYears))),
        city: form.city,
        hourlyRate: BigInt(Math.round(Number(form.hourlyRate))),
        subjects: form.subjects.map((s) => ({ name: s })),
      });
      setSuccess(true);
      toast.success("Registered successfully! Welcome to TutorIndia.");
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
          data-ocid="register_teacher.success_state"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Registration Successful!
          </h2>
          <p className="text-muted-foreground mb-6">
            Welcome to TutorIndia! Your profile has been created. Students will
            be able to discover you in the browse section.
          </p>
          <Badge className="bg-india-blue/10 text-india-blue border-0 text-sm px-4 py-2">
            Your profile is now live 🎉
          </Badge>
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 mb-4">
            <GraduationCap className="w-7 h-7 text-saffron" />
          </div>
          <Badge className="mb-3 bg-orange-50 text-saffron border-orange-100 font-semibold">
            Teacher Registration
          </Badge>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Register as a Teacher
          </h1>
          <p className="text-muted-foreground">
            Create your tutor profile and connect with students in your city.
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
                <GraduationCap className="w-5 h-5 text-saffron" />
                Teacher Information
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
                    htmlFor="teacher-name"
                    className="font-semibold text-foreground"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="teacher-name"
                    placeholder="e.g. Rajesh Kumar"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                    autoComplete="name"
                    data-ocid="register_teacher.input"
                  />
                  {errors.name && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_teacher.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="teacher-email"
                    className="font-semibold text-foreground"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    placeholder="rajesh@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    autoComplete="email"
                    data-ocid="register_teacher.input"
                  />
                  {errors.email && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_teacher.error_state"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="teacher-phone"
                    className="font-semibold text-foreground"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="teacher-phone"
                    type="tel"
                    placeholder="98765 43210"
                    value={form.phoneNumber}
                    onChange={(e) => update("phoneNumber", e.target.value)}
                    className={errors.phoneNumber ? "border-destructive" : ""}
                    autoComplete="tel"
                    data-ocid="register_teacher.input"
                  />
                  {errors.phoneNumber && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_teacher.error_state"
                    >
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Qualifications */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="teacher-qual"
                    className="font-semibold text-foreground"
                  >
                    Qualifications <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="teacher-qual"
                    placeholder="e.g. M.Sc. Physics, B.Ed."
                    value={form.qualifications}
                    onChange={(e) => update("qualifications", e.target.value)}
                    className={
                      errors.qualifications ? "border-destructive" : ""
                    }
                    data-ocid="register_teacher.input"
                  />
                  {errors.qualifications && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_teacher.error_state"
                    >
                      {errors.qualifications}
                    </p>
                  )}
                </div>

                {/* Experience + Rate - 2 col */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="teacher-exp"
                      className="font-semibold text-foreground"
                    >
                      Years of Experience{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="teacher-exp"
                      type="number"
                      min="0"
                      max="60"
                      placeholder="e.g. 5"
                      value={form.experienceYears}
                      onChange={(e) =>
                        update("experienceYears", e.target.value)
                      }
                      className={
                        errors.experienceYears ? "border-destructive" : ""
                      }
                      data-ocid="register_teacher.input"
                    />
                    {errors.experienceYears && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="register_teacher.error_state"
                      >
                        {errors.experienceYears}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="teacher-rate"
                      className="font-semibold text-foreground"
                    >
                      Hourly Rate (INR){" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="teacher-rate"
                      type="number"
                      min="0"
                      placeholder="e.g. 500"
                      value={form.hourlyRate}
                      onChange={(e) => update("hourlyRate", e.target.value)}
                      className={errors.hourlyRate ? "border-destructive" : ""}
                      data-ocid="register_teacher.input"
                    />
                    {errors.hourlyRate && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="register_teacher.error_state"
                      >
                        {errors.hourlyRate}
                      </p>
                    )}
                  </div>
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
                      data-ocid="register_teacher.select"
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
                      data-ocid="register_teacher.error_state"
                    >
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Subjects Taught */}
                <div className="space-y-3">
                  <Label className="font-semibold text-foreground">
                    Subjects Taught <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4 bg-muted/40 rounded-xl">
                    {SUBJECTS.map((subj, idx) => (
                      <label
                        key={subj}
                        htmlFor={`teacher-subj-${subj}`}
                        className="flex items-center gap-2 cursor-pointer group"
                        data-ocid={`register_teacher.checkbox.${idx + 1}`}
                      >
                        <Checkbox
                          id={`teacher-subj-${subj}`}
                          checked={form.subjects.includes(subj)}
                          onCheckedChange={() => toggleSubject(subj)}
                          className="data-[state=checked]:bg-saffron data-[state=checked]:border-saffron"
                        />
                        <span className="text-sm font-medium cursor-pointer text-foreground/80 group-hover:text-foreground transition-colors">
                          {subj}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.subjectsErr && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="register_teacher.error_state"
                    >
                      {errors.subjectsErr}
                    </p>
                  )}
                  {form.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {form.subjects.map((s) => (
                        <Badge
                          key={s}
                          className="bg-saffron/10 text-saffron border-0 text-xs font-medium"
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
                  className="w-full bg-saffron hover:bg-saffron/90 text-white font-bold py-6 text-base mt-2"
                  data-ocid="register_teacher.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register as Teacher"
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
