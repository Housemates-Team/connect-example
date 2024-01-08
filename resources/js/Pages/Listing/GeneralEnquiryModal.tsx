import React, { useState } from 'react';
import { Modal } from '@/Components/Modal';
import { Label } from '@/Common/label';
import { Input } from '@/Common/input';
import { InputError } from '@/Components/InputError';
import { Textarea } from '@/Common/textarea';
import { Button } from '@/Common/button';
import { useToast } from '@/Common/use-toast';
import { useForm } from '@inertiajs/react';
import route from 'ziggy-js';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};
const GeneralEnquiryModal = ({ isOpen, onClose }: Props) => {
    const [formError, setFormError] = useState<string | undefined>();
    const { toast } = useToast();

    const form = useForm({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
        contact_number: '',
    });
    const metadata = {
        enquiry_type: 'general',
        agent_id: '1P907TR',
        student_id: '1P7609E',
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();

        try {
            form.post(route('enquiry.general', {
                ...form.data,
                metadata: JSON.stringify(metadata),
            }), {
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
            <div className='p-6 pt-8'>
                <div>
                    <h3 className='text-2xl font-bold'>Send us an enquiry</h3>
                    <p className='mt-2'>
                        Please fill out the form below and we will get in contact with you shortly. Make sure to include
                        as much information as possible so we can help you with your enquiry.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <Label htmlFor='first_name'>First name</Label>
                            <Input
                                id='first_name'
                                className='mt-1 block w-full'
                                value={form.data['first_name']}
                                placeholder={'John'}
                                onChange={(e) => form.setData('first_name', e.currentTarget.value)}
                                required
                            />
                            <InputError className='mt-2' message={form.errors['first_name']} />
                        </div>
                        <div className='w-full'>
                            <Label htmlFor='last_name'>Last name</Label>
                            <Input
                                id='last_name'
                                className='mt-1 block w-full'
                                value={form.data['last_name']}
                                placeholder={'Smith'}
                                onChange={(e) => form.setData('last_name', e.currentTarget.value)}
                                required
                            />
                            <InputError className='mt-2' message={form.errors['last_name']} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor='email'>Email address</Label>
                        <Input
                            id='email'
                            className='mt-1 block w-full'
                            value={form.data['email']}
                            placeholder={'john.smith@gmail.com'}
                            onChange={(e) => form.setData('email', e.currentTarget.value)}
                            required
                        />
                        <InputError className='mt-2' message={form.errors['email']} />
                    </div>
                    <div>
                        <Label htmlFor='contact_number'>Contact number</Label>
                        <Input
                            id='contact_number'
                            className='mt-1 block w-full'
                            value={form.data['contact_number']}
                            placeholder={'+447904413565'}
                            onChange={(e) => form.setData('contact_number', e.currentTarget.value)}
                            required
                        />
                        <InputError className='mt-2' message={form.errors['contact_number']} />
                    </div>
                    <div>
                        <Label htmlFor='message'>Message</Label>
                        <Textarea
                            id='message'
                            className='mt-1 block w-full'
                            value={form.data['message']}
                            placeholder={'I am interested in booking a room ....'}
                            onChange={(e) => form.setData('message', e.currentTarget.value)}
                            required
                        />
                        <InputError className='mt-2' message={form.errors['message']} />
                    </div>
                    <div className='self-end flex gap-2'>
                        <Button variant='outline' size='lg' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button size='lg'>Send</Button>
                    </div>
                    {formError && <p className='text-sm text-red-600'>{formError}</p>}
                </form>
            </div>
        </Modal>
    );
};

export default GeneralEnquiryModal;
