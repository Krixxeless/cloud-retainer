'use client';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react';
import { Banners } from '@/app/types/banner';
import { Weapon } from '@/app/types/weapon';
import { Character } from '@/app/types/character';
import { currentGamePhase, currentGameVersion } from '@/app/types/common';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
	getBannerDrop,
	getBannersSet,
	getButtonsPortraitsUrl,
	getPreviewsUrlForCurrentBanners
} from '@/app/wish-simulator/utils';
import WishDrop from '@/app/wish-simulator/components/WishDrop';

type BannerContextProviderProps = {
	children: React.ReactNode;
	allGameBanners: Banners[];
	characters: Character[];
	weapons: Weapon[];
};

type BannerContext = {
	characters: Character[];
	weapons: Weapon[];
	currentBanners: Banners[];
	currentBannersPortraits: string[][];
	selectedBanner: Banners;
	selectedBannerPreviewUrl: string;
	selectedBannerDrop: (Character | Weapon)[];
	switchBanner: (
		banner: Banners,
		trigger: 'Banner button' | 'Arrow button'
	) => void;
	isAnimate: boolean;
	setDroppedItems: React.Dispatch<React.SetStateAction<(Character | Weapon)[]>>;
};
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({
	children,
	allGameBanners,
	characters,
	weapons
}: BannerContextProviderProps) {
	const supabase = createClientComponentClient();

	const backgroundMusic = useRef<HTMLAudioElement | undefined>(
		typeof Audio !== 'undefined'
			? new Audio('/sounds/statue-of-the-seven.mp3')
			: undefined
	);
	const [currentBanners, setCurrentBanners] = useState<Banners[]>(
		getBannersSet(allGameBanners, currentGameVersion, currentGamePhase)
	);
	const [currentBannersPortraits, setCurrentBannersPortraits] = useState(
		getButtonsPortraitsUrl(supabase, currentBanners, characters, weapons)
	);
	const [currentBannersPreviewsUrl, setCurrentBannersPreviewsUrl] = useState<
		string[]
	>(getPreviewsUrlForCurrentBanners(supabase, currentBanners));
	const [selectedBanner, setSelectedBanner] = useState<Banners>(
		currentBanners[0]
	);
	const [selectedBannerPreviewUrl, setSelectedBannerPreviewUrl] =
		useState<string>(currentBannersPreviewsUrl[0]);
	const [selectedBannerDrop, setSelectedBannerDrop] = useState<
		(Character | Weapon)[]
	>(getBannerDrop(selectedBanner, characters, weapons));
	const [isAnimate, setIsAnimate] = useState(false);
	const [droppedItems, setDroppedItems] = useState<(Character | Weapon)[]>([]);

	useEffect(() => {
		if (droppedItems.length > 0) {
			backgroundMusic.current?.pause();
		} else {
			backgroundMusic.current?.play();
			backgroundMusic.current!.loop = true;
		}
	}, [backgroundMusic, droppedItems.length]);

	const switchBanner = useCallback(
		(banner: Banners, trigger: 'Banner button' | 'Arrow button') => {
			const soundEffect = new Audio();
			if (trigger === 'Banner button') {
				soundEffect.src = '/sounds/click-on-banner.mp3';
			} else {
				soundEffect.src = '/sounds/click-on-arrow.mp3';
			}
			soundEffect.play();
			if (banner !== selectedBanner) {
				setIsAnimate(true);
				const bannerIndex = currentBanners.indexOf(banner);
				setSelectedBanner(banner);
				setSelectedBannerPreviewUrl(currentBannersPreviewsUrl[bannerIndex]);
				setSelectedBannerDrop(getBannerDrop(banner, characters, weapons));
				setTimeout(() => setIsAnimate(false), 100);
			}
		},
		[
			characters,
			currentBanners,
			currentBannersPreviewsUrl,
			selectedBanner,
			weapons
		]
	);

	return (
		<BannerContext.Provider
			value={{
				characters,
				weapons,
				currentBanners,
				currentBannersPortraits,
				selectedBanner,
				selectedBannerPreviewUrl,
				selectedBannerDrop,
				switchBanner,
				isAnimate,
				setDroppedItems
			}}
		>
			{children}
			{droppedItems.length > 0 ? <WishDrop droppedItems={droppedItems} /> : ''}
		</BannerContext.Provider>
	);
}

export function useBannerContext() {
	const context = useContext(BannerContext);
	if (context === null) {
		throw new Error(
			'useBannerContext must be used within a BannerContextProvider'
		);
	}
	return context;
}