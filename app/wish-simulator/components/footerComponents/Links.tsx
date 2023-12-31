'use client';
import FooterLink from '@/app/wish-simulator/components/footerComponents/FooterLink';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
import { getBannerStatName } from '@/app/wish-simulator/utils';

const Links = () => {
    const { selectedBanner } = useBannerContext();
    return (
        <div
            className={
                'h-4/5 flex flex-col gap-2 md:flex-row md:items-end md:gap-4 md:h-1/2'
            }
        >
            <FooterLink title={'Магазин'} link={'shop?section=paimonBargain'} />
            <FooterLink
                title={'Детали'}
                link={`details?id=${selectedBanner.id}&type=${
                    selectedBanner.type
                }&section=${
                    selectedBanner.type === 'Standard Wish'
                        ? 'more-info'
                        : 'increased-chance'
                }`}
            />
            <FooterLink
                title={'История'}
                link={`history?type=${getBannerStatName(selectedBanner.type)}`}
            />
        </div>
    );
};
export default Links;
