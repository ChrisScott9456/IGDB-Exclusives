import { useRouter } from 'next/router';
import useSwr from 'swr';
import { Platform } from '../../interfaces/Platform';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PlatformPage() {
	const router = useRouter();
	const { data, error } = useSwr<Platform[]>(router.query.id ? `/api/platform/${router.query.id}` : null, fetcher);

	if (error) return <div>Failed to load platform!</div>;
	if (!data) return <div>Loading...</div>;

	return <div>{JSON.stringify(data)}</div>;
}
