'use client';
import BannerButton from '@/app/wish-simulator/components/headerComponents/BannerButton';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';

const BannerList = () => {
    const { currentBanners } = useBannerContext();
    return (
        <div
            className={
                'col-span-full row-start-2 flex items-center mx-2 gap-2 sm:mx-6 sm:gap-4 md:row-start-1 md:mx-0 md:col-start-3 md:col-end-9 xl:col-start-4 2xl:pl-20 2xl:col-end-9 2xl:gap-8'
            }
        >
            {currentBanners.map((banner) => {
                return (
                    <BannerButton key={banner.title + '-' + banner.id} banner={banner} />
                );
            })}
        </div>
    );
};

export default BannerList;
