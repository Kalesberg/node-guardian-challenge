import Head from 'next/head';
import styled, { DefaultTheme } from 'styled-components';
import Image from 'next/image';
import Card from '@/components/card';
import Link from 'next/link';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const HeaderBlock = styled.div`
	margin: 12px 28px;
`;

const Main = styled.main`
	max-width: 1046px;
	margin: 0 auto;
`;

const Row = styled.div`
	margin-top: 132px;
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
	justify-content: center;
`;

const fetchQuests = async () => {
	const data = await axios.get('/api/quests/');
	return data;
};

export default function Home() {
	const { data } = useQuery({
		queryKey: ['quests'],
        queryFn: fetchQuests,
	});

	return (
		<>
			<Head>
				<title>Node Guardians</title>
				<meta name='description' content='Node Guardians frontend' />
			</Head>
			<div>
				<HeaderBlock>
					<Image src='/logo.svg' width={'285'} height={'34'} alt='Logo' />
				</HeaderBlock>
				<Main>
					<Row>
						{data?.data?.map((item: any) => (
							<Link href={'quests/' + item.id}>
								<Card quest={item} />
							</Link>
						))}
					</Row>
				</Main>
			</div>
		</>
	);
}

