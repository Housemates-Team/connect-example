import { useForm, Head } from '@inertiajs/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRoute } from '@/Hooks/useRoute';
import { AuthenticationCard } from '@/Components/AuthenticationCard';
import { Label } from '@/Common/label';
import { Button } from '@/Common/button';
import { Input } from '@/Common/input';
import { InputError } from '@/Components/InputError';

type Props = {
  token: string;
  email: string;
};

function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Reset Password" />

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
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="mt-4">
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={(e) => form.setData('password_confirmation', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={form.errors.password_confirmation} />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className={cn({ 'opacity-25': form.processing })} disabled={form.processing}>
            Reset Password
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}

export default ResetPassword;
