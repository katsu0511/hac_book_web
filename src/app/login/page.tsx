import { AuthRedirectToHome } from '@/lib/auth/AuthRedirect';
import LoginForm from '@/components/Organisms/LoginForm';

export default function Login() {
  return (
    <AuthRedirectToHome>
      <LoginForm />
    </AuthRedirectToHome>
  );
}
