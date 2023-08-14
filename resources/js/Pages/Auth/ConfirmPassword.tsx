import { useForm, Head } from '@inertiajs/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRoute } from '@/Hooks/useRoute';
import { AuthenticationCard } from '@/Components/AuthenticationCard';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Common/label';
import { Button } from '@/Common/button';
import { Input } from '@/Common/input';

function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className={cn('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Confirm
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}

export default ConfirmPassword;
