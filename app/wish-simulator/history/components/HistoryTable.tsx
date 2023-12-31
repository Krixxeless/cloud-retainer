'use client';
import { useCallback, useEffect, useState } from 'react';
import { BaseBannerStats, WishHistory } from '@/lib/banners';
import TablePagination from '@/app/wish-simulator/history/components/TablePagination';
import { WishHistoryTypes } from '@/lib/banners';
import GuaranteeStatus from '@/app/wish-simulator/history/components/GuaranteeStatus';

const HistoryTable = ({ type }: { type: WishHistoryTypes }) => {
    const [history, setHistory] = useState<WishHistory>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const wishState = localStorage.getItem(type);
        if (wishState) {
            setHistory(JSON.parse(wishState).history);
            setPage(1);
        }
    }, [type]);

    const removeHistory = useCallback(() => {
        let bannerStats: BaseBannerStats = JSON.parse(localStorage.getItem(type)!);
        bannerStats.history = [];
        localStorage.setItem(type, JSON.stringify(bannerStats));
        setHistory([]);
    }, [type]);

    if (history.length === 0) {
        return (
            <p
                className={
                    'absolute text-[#595252] w-full text-[3vw] md:text-[2.1vw] top-[45%] text-center'
                }
            >
                История по данному типу отсутствует!
            </p>
        );
    }

    return (
        <>
            <div
                className={
                    'absolute w-[81.5%] h-[60%] top-[24%] left-[9%] overflow-y-scroll genshin-scrollbar'
                }
            >
                <p className={'text-[3vw] md:text-[1vw] text-[#9a8e8e]'}>
                    Всего молитв сделано: {history.length}
                </p>
                <div className={'flex md:h-[13%] md:gap-12'}>
                    <div>
                        <p className={'text-[3vw] md:text-[1vw] text-[#9659c7]'}>
                            Всего предметов 4★ получено:&nbsp;
                            {history.filter((wish) => wish.item.rare === '4').length}
                        </p>
                        <p className={'text-[3vw] md:text-[1vw] text-[#bd6932]'}>
                            Всего предметов 5★ получено:&nbsp;
                            {history.filter((wish) => wish.item.rare === '5').length}
                        </p>
                    </div>
                    {(type === 'CharacterEventWish' || type === 'WeaponEventWish') && (
                        <div>
                            <GuaranteeStatus bannerType={type} rare={'4'} />
                            <GuaranteeStatus bannerType={type} rare={'5'} />
                        </div>
                    )}
                    <button
                        className={
                            'flex items-center justify-evenly mr-2 w-[20%] h-[20%] md:w-[25%] md:h-auto bg-red-300 transition  rounded-full text-[2vw] md:text-[1vw] cursor-genshin p-2 hover:bg-red-500'
                        }
                        onClick={removeHistory}
                    >
                        <svg
                            className={'h-full'}
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        </svg>
                        <p className={'hidden md:block'}>Удалить историю</p>
                    </button>
                </div>
                <table
                    className={
                        'absolute border mt-2 mr-2 border-[#dac69f] text-[2.5vw] md:text-[1.2vw] leading-tight'
                    }
                >
                    <thead>
                        <tr className={'text-[#595252]'}>
                            <th
                                className={
                                    'w-[15%] border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4'
                                }
                            >
                                Тип
                            </th>
                            <th
                                className={
                                    'w-1/4 border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4'
                                }
                            >
                                Имя
                            </th>
                            <th
                                className={
                                    'w-[35%] border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4'
                                }
                            >
                                Тип Молитвы
                            </th>
                            <th
                                className={
                                    'w-1/4 border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4'
                                }
                            >
                                Время молитвы
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {history
                            .slice((page - 1) * 5, (page - 1) * 5 + 5)
                            .map((wish, index) => (
                                <tr key={index} className={'text-[#9a8e8e]'}>
                                    <td
                                        className={
                                            'border border-[#dac69f] bg-[#f6f1e7] text-center p-2 md:p-4'
                                        }
                                    >
                                        {wish.type}
                                    </td>
                                    <td
                                        className={`border border-[#dac69f] bg-[#f6f1e7] text-center p-2 md:p-4 ${
                                            wish.item.rare === '5'
                                                ? 'text-[#bd6932]'
                                                : wish.item.rare === '4' &&
                                                  'text-[#9659c7]'
                                        }`}
                                    >
                                        {wish.item.name}
                                        {Number(wish.item.rare) > 3 &&
                                            ` (${wish.item.rare}★)`}
                                    </td>
                                    <td
                                        className={
                                            'border border-[#dac69f] bg-[#f6f1e7] text-center p-2 md:p-4'
                                        }
                                    >
                                        {wish.wishType}
                                    </td>
                                    <td
                                        className={
                                            'border border-[#dac69f] bg-[#f6f1e7] text-center p-2 md:p-4'
                                        }
                                    >
                                        {wish.date}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <TablePagination
                wishCount={history.length}
                currentPage={page}
                setPage={(pageNumber) => setPage(pageNumber)}
            />
        </>
    );
};

export default HistoryTable;
