import { AuthRedirectToHome } from '@/lib/auth/AuthRedirect';
import SignupForm from '@/components/Organisms/SignupForm';

export default function Signup() {
  return (
    <AuthRedirectToHome>
      <SignupForm />
    </AuthRedirectToHome>
  );
}
