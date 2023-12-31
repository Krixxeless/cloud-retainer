import Image from 'next/image';
import star from '@/public/common/star.webp';
import ItemCell from '@/app/wish-simulator/details/components/itemsListSection/ItemCell';
import { BannerTypes, Character, Rares, Weapon } from '@/lib/db/schema';
import clsx from 'clsx';

const getBaseChances = (
    bannerType: BannerTypes
): Partial<{
    [key in Rares]: { baseChance: string; includingGuarantee: string };
}> => {
    if (bannerType !== 'Weapon Event Wish') {
        return {
            5: { baseChance: '0,600%', includingGuarantee: '1,600%' },
            4: { baseChance: '5,100%', includingGuarantee: '13,000%' },
            3: { baseChance: '94,300%', includingGuarantee: '85,400%' },
        };
    } else {
        return {
            5: { baseChance: '0,700%', includingGuarantee: '1,850%' },
            4: { baseChance: '6,000%', includingGuarantee: '14,500%' },
            3: { baseChance: '93,300%', includingGuarantee: '83,650%' },
        };
    }
};

const ItemsTable = ({
    rare,
    items,
    mainItems,
    bannerType,
}: {
    rare: Rares;
    items: (Character | Weapon)[];
    mainItems?: Character[] | Weapon[] | null;
    bannerType: BannerTypes;
}) => {
    const headerClasses = clsx(
        'mt-4 h-[17%] flex justify-center items-center md:h-[12%]',
        {
            'bg-[#cfb383]': rare === '5',
            'bg-[#b6a8c9]': rare === '4',
            'bg-[#a9bcca]': rare === '3',
        }
    );

    const innerHeaderClasses = clsx('flex items-center pl-8 w-[99.5%] h-[90%] border-2', {
        'border-[#c5a875]': rare === '5',
        'border-[#ae9fc3]': rare === '4',
        'border-[#9fb4c1]': rare === '3',
    });

    const chances = getBaseChances(bannerType);

    return (
        <>
            <div className={headerClasses}>
                <div className={innerHeaderClasses}>
                    {Array.from(Array(Number(rare)).keys()).map((number) => (
                        <Image
                            key={number}
                            src={star}
                            alt={'Звезда'}
                            className={'h-[70%] w-auto drop-shadow'}
                        />
                    ))}
                    <p className={'text-white text-[2vw] md:text-[1.1vw] ml-4'}>
                        Базовый шанс получения предмета {rare}★:{' '}
                        {chances[rare]?.baseChance} (Включая гарантию:{' '}
                        {chances[rare]?.includingGuarantee})
                    </p>
                </div>
            </div>
            <table
                className={
                    'w-full text-[#595252] border border-[#dac69f] text-[2.3vw] md:text-[1.2vw]'
                }
            >
                <thead>
                    <tr>
                        <th
                            className={
                                'bg-[#ede1ca] w-[15%] border border-[#dac69f] font-normal p-1 md:p-2'
                            }
                        >
                            Тип
                        </th>
                        <th
                            className={
                                'bg-[#ede1ca] w-[30%] border border-[#dac69f] font-normal p-1 md:p-2'
                            }
                        >
                            Имя
                        </th>
                        <th
                            className={
                                'bg-[#ede1ca] w-[15%] border border-[#dac69f] font-normal p-1 md:p-2'
                            }
                        >
                            Тип
                        </th>
                        <th
                            className={
                                'bg-[#ede1ca] w-[30%] border border-[#dac69f] font-normal p-1 md:p-2'
                            }
                        >
                            Имя
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const nextItem = items[index + 1];
                        if (index % 2 === 0) {
                            return (
                                <tr key={index} className={'bg-[#f4f1ec] text-center'}>
                                    <ItemCell
                                        item={item}
                                        mainItems={mainItems}
                                        bannerType={bannerType}
                                    />
                                    {nextItem && (
                                        <ItemCell
                                            item={nextItem}
                                            mainItems={mainItems}
                                            bannerType={bannerType}
                                        />
                                    )}
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ItemsTable;
