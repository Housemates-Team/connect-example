/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import { Modal } from '@/Components/Modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputError } from '@/Components/InputError';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type EnquiryModalProps = {
  roomId: string;
  propertyId: string;
  operatorId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const EnquiryModal = ({
  roomId,
  propertyId,
  operatorId,
  isOpen,
  onClose,
}: EnquiryModalProps) => {
  const [formError, setFormError] = useState<string | undefined>();
  const { toast } = useToast();

  const form = useForm({
    operator_id: operatorId,
    property_id: propertyId,
    room_id: roomId,
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    contact_number: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      form.post(route('enquiry', { ...form.data }), {
        preserveScroll: true,
        replace: false,
        onSuccess: () => {
          toast({
            title: 'Successfully sent enquiry',
            description: 'We will get in contact with you shortly.',
          });
          onClose();
        },
        onError: (e) => {
          console.error(e);
          //setFormError('An unknown error occured');
        },
      });
    } catch (e) {
      console.error(e);
      setFormError('An unknown error occured');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 pt-8">
        <div>
          <h3 className="text-2xl font-bold">Send us an enquiry</h3>
          <p className="mt-2">
            Enquire about this property now. Fill out your details below and we'll do the rest.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor="first_name">First name</Label>
              <Input
                id="first_name"
                className="mt-1 block w-full"
                value={form.data['first_name']}
                onChange={(e) => form.setData('first_name', e.currentTarget.value)}
                required
              />
              <InputError className="mt-2" message={form.errors['first_name']} />
            </div>
            <div className="w-full">
              <Label htmlFor="last_name">Last name</Label>
              <Input
                id="last_name"
                className="mt-1 block w-full"
                value={form.data['last_name']}
                onChange={(e) => form.setData('last_name', e.currentTarget.value)}
                required
              />
              <InputError className="mt-2" message={form.errors['last_name']} />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              className="mt-1 block w-full"
              value={form.data['email']}
              onChange={(e) => form.setData('email', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={form.errors['email']} />
          </div>
          <div>
            <Label htmlFor="contact_number">Contact number</Label>
            <Input
              id="contact_number"
              className="mt-1 block w-full"
              value={form.data['contact_number']}
              onChange={(e) => form.setData('contact_number', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={form.errors['contact_number']} />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              className="mt-1 block w-full"
              value={form.data['message']}
              onChange={(e) => form.setData('message', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={form.errors['message']} />
          </div>
          <div className="self-end flex gap-2">
            <Button variant="outline" size="lg" onClick={onClose}>
              Cancel
            </Button>
            <Button size="lg">Send</Button>
          </div>
          {formError && <p className="text-sm text-red-600">{formError}</p>}
        </form>
      </div>
    </Modal>
  );
};
