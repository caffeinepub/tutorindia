import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudentProfile {
    city: string;
    name: string;
    email: string;
    subjectsNeeded: Array<Subject>;
    grade: string;
    phoneNumber: string;
}
export interface Inquiry {
    studentId: Principal;
    subject: string;
    message: string;
    teacherId: Principal;
}
export interface Subject {
    name: string;
}
export interface UserProfile {
    userType: Variant_teacher_student;
    name: string;
}
export interface TeacherProfile {
    subjects: Array<Subject>;
    city: string;
    name: string;
    hourlyRate: bigint;
    qualifications: string;
    email: string;
    experienceYears: bigint;
    phoneNumber: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_teacher_student {
    teacher = "teacher",
    student = "student"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    browseTutorsBySubjectAndCity(subject: string, city: string): Promise<Array<TeacherProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getStudentInquiries(): Promise<Array<Inquiry>>;
    getTeacherInquiries(): Promise<Array<Inquiry>>;
    getTeacherProfile(): Promise<TeacherProfile | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerStudent(profile: StudentProfile): Promise<void>;
    registerTeacher(profile: TeacherProfile): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendInquiry(teacherId: Principal, message: string, subject: string): Promise<void>;
}
