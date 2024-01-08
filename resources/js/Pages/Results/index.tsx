import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import route from 'ziggy-js';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { Banner } from '@/Components/Banner';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { SearchLocation } from '@/Components/CitySearchDropdown';
import { Footer } from '@/Layouts/Footer';
import { updateQueryParam } from '@/lib/navigation';
import { Hero } from './Hero';
import { Filters } from './Filters';
import { SearchResult } from './SearchResult';
import { EnquiryModal } from '@/Pages/Listing/EnquiryModal';
import GeneralEnquiryModal from '@/Pages/Listing/GeneralEnquiryModal';

const Results = () => {
    const [openGeneralEnquiryModal, setOpenGeneralEnquiryModal] = useState(false);
    const page = useTypedPage();
    const { rooms } = page.props;
    const location = page.props.location as SearchLocation;

    // Compute the filters props from the url parameters
    const defaultFilters = useMemo(() => {
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;

        // Get individual query parameters
        const minPrice = Number(searchParams.get('min_price') ?? undefined);
        const maxPrice = Number(searchParams.get('max_price') ?? undefined);
        let date: Date | undefined = undefined;
        let amenities: string[] | undefined = undefined;

        try {
            const dateParam = searchParams.get('date')!.split('-');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const month = Number(dateParam[0]);
            const year = Number(dateParam[1]);

            if (isNaN(year) || year < currentYear) {
                throw new Error('Invalid year');
            }
            if (isNaN(month) || month <= 0 || month > 12) {
                throw new Error('Invalid month');
            }

            date = new Date(`${year}-${month}`);
        } catch {
            /* empty */
        }

        try {
            const amenityParam = searchParams.get('amenities');
            if (amenityParam !== null) {
                amenities = JSON.parse(amenityParam);
            }
        } catch (e) {
            /* empty */
        }

        return {
            prices: !isNaN(minPrice) && !isNaN(maxPrice) ? ([minPrice, maxPrice] as const) : undefined,
            amenities,
            date,
        };
    }, []);

    return (
        <>
            <Head title='Rooms' />
            <Banner />
            <HeaderNavigation />
            <main>
                <Hero
                    citySlug={location.type === 'city' ? location.slug : location.city.slug}
                    locationName={location.name}
                    handleGeneralEnquiryClick={() => setOpenGeneralEnquiryModal(true)}
                />
                <div className='bg-gray-50 border-t py-16'>
                    <div className='container flex'>
                        <>
                            <Filters
                                defaultFilters={defaultFilters}
                                onFilterChange={({ prices, amenities, date }) => {
                                    const newUrl = updateQueryParam(window.location, {
                                        min_price: prices ? String(prices[0]) : undefined,
                                        max_price: prices ? String(prices[1]) : undefined,
                                        amenities: amenities ? JSON.stringify(amenities) : undefined,
                                        date: date
                                            ? String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear()
                                            : undefined,
                                        page: '1',
                                    });
                                    window.location.href = newUrl;
                                }}
                            />
                            {!page.props.no_rooms && (
                                <SearchResult rooms={rooms.data.items} meta={rooms.data.meta} />
                            )}
                            {page.props.no_rooms && (
                                <div className='h-min bg-white border w-full ml-8 p-10'>
                                    <h1 className='text-2xl font-bold'>No results found</h1>
                                    <p className='max-w-xl mt-2 text-gray-600'>
                                        Sorry! No rooms were found for the current search. Please try again with
                                        different filters or browse our{' '}
                                        <a
                                            className='text-semibold underline hover:text-black'
                                            href={route('home.index')}
                                        >
                                            others locations
                                        </a>
                                    </p>
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </main>
            <Footer />
            <GeneralEnquiryModal
                isOpen={openGeneralEnquiryModal}
                onClose={() => setOpenGeneralEnquiryModal(false)}
            />
        </>
    );
};

export default Results;
