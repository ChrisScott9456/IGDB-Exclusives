import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next/types';
import useSwr from 'swr';
import Main, { MainProps } from '../../components/main';
import { getPlatforms } from '../../igdb';
import { Image } from '@chakra-ui/react';
import { Game } from '../../interfaces/Game';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PlatformPage: NextPage<MainProps> = ({ platforms }) => {
	const router = useRouter();
	const platformId = router.query.id as string;
	const { data, error } = useSwr<Game[]>(platformId ? `/api/platform/${platformId}` : null, fetcher, { revalidateOnFocus: false });

	if (error) return <div>Failed to load platform!</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<div>
			<Main platformId={platformId} platforms={platforms} />
			{data?.length > 0 ? data.map((el) => <Image src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${el.cover}.png`} />) : 'None found!'}
			{JSON.stringify(data)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<MainProps> = async ({ req, res }) => {
	const platforms = await getPlatforms();
	return {
		props: {
			platforms,
		},
	};
};

export default PlatformPage;
