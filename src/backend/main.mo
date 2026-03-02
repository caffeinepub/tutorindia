import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Subject = {
    name : Text;
  };

  type TeacherProfile = {
    name : Text;
    email : Text;
    subjects : [Subject];
    qualifications : Text;
    experienceYears : Nat;
    city : Text;
    hourlyRate : Nat; // INR
    phoneNumber : Text;
  };

  type StudentProfile = {
    name : Text;
    email : Text;
    grade : Text;
    subjectsNeeded : [Subject];
    city : Text;
    phoneNumber : Text;
  };

  type UserProfile = {
    name : Text;
    userType : { #teacher; #student };
  };

  type Inquiry = {
    studentId : Principal;
    teacherId : Principal;
    message : Text;
    subject : Text;
  };

  module TeacherProfile {
    func containsSubject(subjectList : [Subject], searchSubject : Text) : Bool {
      for (subject in subjectList.values()) {
        if (subject.name == searchSubject) {
          return true;
        };
      };
      false;
    };

    public func isMatch(teacher : TeacherProfile, subject : Text, city : Text) : Bool {
      containsSubject(teacher.subjects, subject) and teacher.city == city;
    };
  };

  let teacherProfiles = Map.empty<Principal, TeacherProfile>();
  let studentProfiles = Map.empty<Principal, StudentProfile>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let inquiries = Map.empty<Principal, List.List<Inquiry>>();

  // Helper function to check if user is a teacher
  func isTeacher(principal : Principal) : Bool {
    switch (userProfiles.get(principal)) {
      case (?profile) {
        switch (profile.userType) {
          case (#teacher) { true };
          case (#student) { false };
        };
      };
      case (null) { false };
    };
  };

  // Helper function to check if user is a student
  func isStudent(principal : Principal) : Bool {
    switch (userProfiles.get(principal)) {
      case (?profile) {
        switch (profile.userType) {
          case (#student) { true };
          case (#teacher) { false };
        };
      };
      case (null) { false };
    };
  };

  public shared ({ caller }) func registerTeacher(profile : TeacherProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    
    // Check if already registered as student
    if (isStudent(caller)) {
      Runtime.trap("Unauthorized: Already registered as student");
    };

    teacherProfiles.add(caller, profile);
    userProfiles.add(caller, {
      name = profile.name;
      userType = #teacher;
    });
  };

  public shared ({ caller }) func registerStudent(profile : StudentProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    
    // Check if already registered as teacher
    if (isTeacher(caller)) {
      Runtime.trap("Unauthorized: Already registered as teacher");
    };

    studentProfiles.add(caller, profile);
    userProfiles.add(caller, {
      name = profile.name;
      userType = #student;
    });
  };

  public query ({ caller }) func browseTutorsBySubjectAndCity(subject : Text, city : Text) : async [TeacherProfile] {
    // No authorization check - public browsing allowed
    teacherProfiles.values().toArray().filter(
      func(profile) { TeacherProfile.isMatch(profile, subject, city) }
    );
  };

  public shared ({ caller }) func sendInquiry(teacherId : Principal, message : Text, subject : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can send inquiries");
    };

    if (not isStudent(caller)) {
      Runtime.trap("Unauthorized: Only students can send inquiries");
    };

    // Verify teacher exists
    switch (teacherProfiles.get(teacherId)) {
      case (null) {
        Runtime.trap("Teacher not found");
      };
      case (?_) {};
    };

    let inquiry : Inquiry = {
      studentId = caller;
      teacherId;
      message;
      subject;
    };

    let existingList = switch (inquiries.get(caller)) {
      case (null) { List.empty<Inquiry>() };
      case (?list) { list };
    };
    existingList.add(inquiry);
    inquiries.add(caller, existingList);
  };

  public query ({ caller }) func getTeacherProfile() : async ?TeacherProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access this");
    };

    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can access this");
    };

    teacherProfiles.get(caller);
  };

  public query ({ caller }) func getStudentInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access this");
    };

    if (not isStudent(caller)) {
      Runtime.trap("Unauthorized: Only students can access this");
    };

    switch (inquiries.get(caller)) {
      case (null) { [] };
      case (?list) {
        list.reverse().toArray();
      };
    };
  };

  public query ({ caller }) func getTeacherInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access inquiries");
    };

    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can access inquiries");
    };

    let teacherInquiries = List.empty<Inquiry>();

    for ((_, studentInquiries) in inquiries.entries()) {
      for (inquiry in studentInquiries.values()) {
        if (inquiry.teacherId == caller) {
          teacherInquiries.add(inquiry);
        };
      };
    };

    teacherInquiries.reverse().toArray();
  };

  // Required profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
