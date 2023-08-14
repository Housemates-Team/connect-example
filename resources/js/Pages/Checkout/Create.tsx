import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { useLocalStorage } from 'usehooks-ts';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { Input } from '@/components/ui/input';
import { Banner } from '@/Components/Banner';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const gradeLevelOptions = [
  { Label: 'Foundation', value: 'Foundation' },
  { Label: 'Undergraduate - First year', value: 'Undergraduate - First year' },
  {
    Label: 'Undergraduate - Second year',
    value: 'Undergraduate - Second year',
  },
  { Label: 'Undergraduate - Third year', value: 'Undergraduate - Third year' },
  {
    Label: 'Undergraduate - Placement year',
    value: 'Undergraduate - Placement year',
  },
  {
    Label: 'Postgraduate - Masters',
    value: 'Postgraduate - Masters',
  },
  {
    Label: 'Postgraduate - PhD',
    value: 'Postgraduate - PhD',
  },
  {
    Label: 'Other',
    value: 'Other',
  },
];

const Create = () => {
  const page = useTypedPage();
  const { data } = page.props.checkout;
  const { room_id } = page.props;
  const { data: formData, setData: setFormData } = useForm({
    session_token: data.session_token,
    paying_in_instalments: true,
    has_uk_based_guarantor: true,
    is_using_housing_hand: false,
    resident_details: {
      city: 'Manchester',
      region: 'Greater Manchester',
      country: 'gb',
      nationality: 'gb',
      postcode: 'M1 3DR',
      first_line: '120 high street',
      first_name: 'John',
      last_name: 'Doe',
      gender: 'male',
      email: 'john.doe@gmail.com',
      date_of_birth: '01-01-1990',
      contact_number: '+447904413565',
    },
    supporting_contact_details: {
      city: 'Manchester',
      region: 'Greater Manchester',
      country: 'gb',
      postcode: 'M1 3DR',
      first_line: '120 high street',
      second_line: "King's cross",
      first_name: 'Jane',
      last_name: 'Doe',
      relationship: 'Aunty',
      email: 'jane.doe@gmail.com',
      date_of_birth: '01-01-1970',
      contact_number: '+447898807865',
    },
    course_details: {
      university: 'Manchester University',
      year_of_study: 'Undergraduate - First year',
      course_title: 'B.Sc Computer Science',
    },
  });

  const [checkoutData, setCheckoutData] = useLocalStorage('checkoutData', {
    formData: formData,
    data: data,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCheckoutData({
      ...checkoutData,
      formData: formData,
      data: data,
    });

    router.visit(`/rooms/${room_id}/checkout/payment`);
  };

  return (
    <>
      <Head title="Confirm payment" />
      <Banner />
      <HeaderNavigation />
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div className="space-y-5 mt-10">
          <form className="space-y-10 divide-y divide-gray-900/10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Resident Details
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Details about the student who will be residing at the property.
                </p>
              </div>

              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          value={formData.resident_details.first_name}
                          className="block w-full"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                first_name: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="block w-full"
                          value={formData.resident_details.last_name}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                last_name: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md"
                        value={formData.resident_details.email}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            resident_details: {
                              ...formData.resident_details,
                              email: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="contact_number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact Number
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="contact_number"
                          name="contact_number"
                          type="text"
                          className="block w-full rounded-md"
                          value={formData.resident_details.contact_number}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                contact_number: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="date_of_birth"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date of birth
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="contact_number"
                          name="contact_number"
                          type="text"
                          className="block w-full rounded-md"
                          placeholder="DD-MM-YYYY"
                          value={formData.resident_details.date_of_birth}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                date_of_birth: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="nationality"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nationality
                      </Label>
                      <div className="mt-2">
                        <select
                          id="nationality"
                          name="nationality"
                          autoComplete="nationality"
                          className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                          defaultValue={formData.resident_details.nationality}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                nationality: e.target.value,
                              },
                            });
                          }}
                        >
                          <option value="gb">British</option>
                          <option value="ca">Canadian</option>
                          <option value="au">Australian</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender
                      </Label>
                      <div className="mt-2">
                        <select
                          id="gender"
                          name="gender"
                          autoComplete="gender"
                          className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                          defaultValue={formData.resident_details.gender}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                gender: e.target.value,
                              },
                            });
                          }}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country of residence
                      </Label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                          defaultValue={formData.resident_details.country}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                country: e.target.value,
                              },
                            });
                          }}
                        >
                          <option value="gb">United Kingdom</option>
                          <option value="au">Australia</option>
                          <option value="ca">Canada</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <Label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full"
                          value={formData.resident_details.first_line}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                first_line: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <Label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full"
                          value={formData.resident_details.city}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                city: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Region
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full"
                          value={formData.resident_details.region}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                region: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full"
                          value={formData.resident_details.postcode}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              resident_details: {
                                ...formData.resident_details,
                                postcode: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Emergency / Guarantor Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Contact information of the person supporting the student. This can be used as
                  emergency or guarantor.
                </p>
              </div>

              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full"
                          value={formData.supporting_contact_details.first_name}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                first_name: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="block w-full"
                          value={formData.supporting_contact_details.last_name}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                last_name: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md"
                          value={formData.supporting_contact_details.email}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                email: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="contact_number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact Number
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="contact_number"
                          name="contact_number"
                          type="text"
                          className="block w-full rounded-md"
                          value={formData.supporting_contact_details.contact_number}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                contact_number: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="date_of_birth"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date of birth
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="contact_number"
                          name="contact_number"
                          type="text"
                          className="block w-full rounded-md"
                          placeholder="DD-MM-YYYY"
                          value={formData.supporting_contact_details.date_of_birth}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                date_of_birth: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="nationality"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Relationship
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="contact_number"
                          name="contact_number"
                          type="text"
                          className="block w-full rounded-md"
                          placeholder="DD-MM-YYYY"
                          value={formData.supporting_contact_details.relationship}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                relationship: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <Label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </Label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                          defaultValue={formData.supporting_contact_details.country}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                country: e.target.value,
                              },
                            });
                          }}
                        >
                          <option value="gb">United Kingdom</option>
                          <option value="au">Australia</option>
                          <option value="ca">Canada</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <Label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full"
                          value={formData.supporting_contact_details.first_line}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                first_line: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <Label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full"
                          value={formData.supporting_contact_details.city}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                city: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Region
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full"
                          value={formData.supporting_contact_details.region}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                region: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full"
                          value={formData.supporting_contact_details.postcode}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              supporting_contact_details: {
                                ...formData.supporting_contact_details,
                                postcode: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Course Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please provide course information.
                </p>
              </div>

              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="university"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        University
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="university"
                          id="university"
                          className="block w-full"
                          value={formData.course_details.university}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              course_details: {
                                ...formData.course_details,
                                university: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="course_title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Course Title
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="course_title"
                          id="course_title"
                          className="block w-full"
                          value={formData.course_details.course_title}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              course_details: {
                                ...formData.course_details,
                                course_title: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <Label
                        htmlFor="year_of_study"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Year of study
                      </Label>
                      <div className="mt-2">
                        <select
                          id="year_of_study"
                          name="year_of_study"
                          className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                          defaultValue={formData.course_details.year_of_study}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              course_details: {
                                ...formData.course_details,
                                year_of_study: e.target.value,
                              },
                            });
                          }}
                        >
                          {gradeLevelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.Label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={'flex justify-end pt-10'}>
              <Button type="submit" className={'py-3 px-8'}>
                Make a payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
