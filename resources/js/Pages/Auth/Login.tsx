import { Link, useForm, Head } from '@inertiajs/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRoute } from '@/Hooks/useRoute';
import { AuthenticationCard } from '@/Components/AuthenticationCard';
import { Checkbox } from '@/Components/Checkbox';
import { PrimaryButton } from '@/Components/PrimaryButton';
import { Input } from '@/components/ui/input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/components/ui/label';

type Props = {
  canResetPassword: boolean;
  status: string;
};

function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="login" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.currentTarget.value)}
            required
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="mt-4">
          <Label className="flex items-center">
            <Checkbox
              name="remember"
              checked={form.data.remember === 'on'}
              onChange={(e) => form.setData('remember', e.currentTarget.checked ? 'on' : '')}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </Label>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
          {canResetPassword && (
            <div>
              <Link
                href={route('password.request')}
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          <div className="flex items-center justify-end">
            <Link
              href={route('register')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Need an account?
            </Link>

            <PrimaryButton
              className={cn('ml-4', { 'opacity-25': form.processing })}
              disabled={form.processing}
            >
              Log in
            </PrimaryButton>
          </div>
        </div>
      </form>
    </AuthenticationCard>
  );
}

export default Login;
