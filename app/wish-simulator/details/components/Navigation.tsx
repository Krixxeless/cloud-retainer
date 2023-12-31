import NavigationButton from '@/app/wish-simulator/details/components/NavigationButton';
import { Sections } from '@/app/wish-simulator/details/page';
import { BannerTypes } from '@/lib/db/schema';

const Navigation = ({ bannerType }: { bannerType: BannerTypes }) => {
    const sections: { [key in Sections]?: string } = {
        'increased-chance': 'Повышенный шанс',
        'more-info': 'Подробности',
        'items-list': 'Список предметов',
    };

    if (bannerType === 'Standard Wish') {
        delete sections['increased-chance'];
    }

    return (
        <div
            className={
                'absolute bg-[radial-gradient(circle,rgba(232,223,207,1)_90%,rgba(232,223,207,0.1)_100%)] text-[#595252] text-[2.5vw] md:text-[1.3vw] w-[85%] md:w-[80%] h-[15%] md:h-[7.5%] top-[12.5%] left-[8%] md:left-[10%]'
            }
        >
            <div
                className={
                    'w-full h-full flex justify-between items-center border-y border-y-[#ede5d7]'
                }
            >
                {Object.entries(sections).map((section) => (
                    <NavigationButton
                        key={section[0]}
                        title={section[1]}
                        param={section[0] as Sections}
                    />
                ))}
            </div>
        </div>
    );
};

export default Navigation;
