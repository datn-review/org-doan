import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '@components/templates';
import { HomePage } from '@org/home';
import { Authorization, ConfirmEmailPage, LoginPage, RegisterPage } from '@org/auth';
import { SiteMap, TypeRolesEnum } from '@org/utils';
import { ParentPage, StaffPage, StudentsPage, UserTutorsPage, WebAdminPage } from '@org/users';
import {
  CertificationPage,
  GradeLevelPage,
  SubjectPage,
  SkillsPage,
  ChatBotPage,
} from '@org/settings';
import { ProfilePage } from '@org/profile';
import { LookForTutorPage } from '@org/look-for-tutor';
import { TutorPage } from '@org/tutor';
import {
  ClassNewDetailsPage,
  ClassNewPage,
  RegistrationPage,
  TutorClassPage,
  PostsPage,
  ReturnPayPage,
  ClassesPage,
  ClassesDetailsPage,
} from '@org/classes';
import { DashboardPage, PaymentPage } from '@org/manage';
import {
  AssignmentPage,
  CreateAssignmentPage,
  DoAssignmentPage,
  ExercisePage,
  QuestionPage,
  ReviewAssignmentPage,
} from '@org/assessment';
import { ChatPage } from '@org/chat';
import ProtectedRoute from './ProtectedRoute';
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: SiteMap.Dashboard.path,
        element: (
          <ProtectedRoute
            roles={SiteMap.Dashboard.roles}
            component={<DashboardPage />}
          />
        ),
      },
      {
        path: SiteMap.Payment.path,
        element: (
          <ProtectedRoute
            roles={SiteMap.Payment.roles}
            component={<PaymentPage />}
          />
        ),
      },
      {
        path: SiteMap.Users.Admin.path,
        element: <WebAdminPage />,
      },
      {
        path: SiteMap.Users.PesonalTutor.path,
        element: <UserTutorsPage />,
      },
      {
        path: SiteMap.Users.Staff.path,
        element: <StaffPage />,
      },
      {
        path: SiteMap.Users.Parent.path,
        element: <ParentPage />,
      },
      {
        path: SiteMap.Users.Student.path,
        element: <StudentsPage />,
      },
      {
        path: SiteMap.Settings.GradeLevel.path,
        element: <GradeLevelPage />,
      },
      {
        path: SiteMap.Settings.Certification.path,
        element: <CertificationPage />,
      },
      {
        path: SiteMap.Settings.Subject.path,
        element: <SubjectPage />,
      },
      {
        path: SiteMap.Settings.Skills.path,
        element: <SkillsPage />,
      },
      {
        path: SiteMap.Settings.ChatBot.path,
        element: <ChatBotPage />,
      },
      {
        path: SiteMap.Profile.path,
        element: <ProfilePage />,
      },
      {
        path: SiteMap.Profile.Me.path,
        element: <ProfilePage />,
      },
      {
        path: SiteMap.LookForTutor.path,
        element: <LookForTutorPage />,
      },
      {
        path: SiteMap.Tutor.path,
        element: <TutorPage />,
      },
      {
        path: SiteMap.TutorClass.path,
        element: <TutorClassPage />,
      },
      {
        path: SiteMap.ClassNew.path,
        element: <ClassNewPage />,
      },
      {
        path: SiteMap.ClassNew.Details.path,
        element: <ClassNewDetailsPage />,
      },
      {
        path: SiteMap.Manage.Registration.path,
        element: <RegistrationPage />,
      },
      {
        path: SiteMap.Pay.Return.path,
        element: <ReturnPayPage />,
      },
      {
        path: SiteMap.Manage.Classes.path,
        element: <ClassesPage />,
      },
      {
        path: SiteMap.Manage.Classes.Details.path,
        element: <ClassesDetailsPage />,
      },

      { path: SiteMap.Manage.PostsMe.path, element: <PostsPage /> },

      { path: SiteMap.Assessment.Exercise.path, element: <ExercisePage /> },
      { path: SiteMap.Assessment.Questions.path, element: <QuestionPage /> },
      { path: SiteMap.Assessment.Assignment.path, element: <AssignmentPage /> },

      { path: SiteMap.Assessment.Assignment.Create.path, element: <CreateAssignmentPage /> },
      { path: SiteMap.Assessment.Assignment.Do.path, element: <DoAssignmentPage /> },

      { path: SiteMap.Assessment.Assignment.Review.path, element: <ReviewAssignmentPage /> },
      {
        path: SiteMap.Chat.path,
        element: <ChatPage />,
      },

      // { path: SiteMap.Assessment.Exercise.path, element: <Ques /> },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/confirm-email/:hash',
        element: <ConfirmEmailPage />,
      },
    ],
  },
]);
