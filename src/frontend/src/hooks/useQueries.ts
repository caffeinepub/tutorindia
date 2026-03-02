import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentProfile, TeacherProfile } from "../backend.d";
import { useActor } from "./useActor";

// ── Browse Tutors ────────────────────────────────────────────
export function useBrowseTutors(subject: string, city: string, enabled = true) {
  const { actor, isFetching } = useActor();
  return useQuery<TeacherProfile[]>({
    queryKey: ["tutors", subject, city],
    queryFn: async () => {
      if (!actor) return [];
      return actor.browseTutorsBySubjectAndCity(subject, city);
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

// ── Teacher Profile ──────────────────────────────────────────
export function useTeacherProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<TeacherProfile | null>({
    queryKey: ["teacherProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTeacherProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── User Role ────────────────────────────────────────────────
export function useUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Student Inquiries ────────────────────────────────────────
export function useStudentInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["studentInquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudentInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Teacher Inquiries ────────────────────────────────────────
export function useTeacherInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["teacherInquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeacherInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Register Student ─────────────────────────────────────────
export function useRegisterStudent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: StudentProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerStudent(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRole"] });
    },
  });
}

// ── Register Teacher ─────────────────────────────────────────
export function useRegisterTeacher() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: TeacherProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerTeacher(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRole"] });
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
    },
  });
}

// ── Send Inquiry ─────────────────────────────────────────────
export function useSendInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      teacherId,
      message,
      subject,
    }: {
      teacherId: Principal;
      message: string;
      subject: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendInquiry(teacherId, message, subject);
    },
  });
}
