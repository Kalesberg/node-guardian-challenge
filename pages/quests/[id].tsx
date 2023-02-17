import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const MainBlock = styled.main`
	max-width: 775px;
	margin: 0 auto;
	margin-top: 50px;
	background: #1d1c1a;
	border: 1px solid rgba(58, 58, 58, 0.5);
	border-radius: 10px;
`;
const CoverRow = styled.div`
	position: relative;
	margin-bottom: 7px;
	padding: 4px;
`;

const Cover = styled.img`
	width: 100%;
	height: 270px;
	border-radius: 8px 8px 0px 0px;
`;

const Close = styled.img`
	cursor: pointer;
	position: absolute;
	right: 10px;
	top: 12px;
`;

const TitleBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 10px;

	@media (max-width: 750px) {
		img {
			display: none;
		}
	}
`;

const Title = styled.h2`
	margin: 0px;
	font-family: Cinzel;
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 27px;
	color: #ffffff;
`;

const Desc = styled.p`
	font-family: Lato;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 17px;
	color: ${(props) => props.theme.colors.grey};
	margin-top: 12px;
`;
const InfoRow = styled.div`
	padding: 0px 23px 25px 15px;
`;

const FooterRow = styled.div`
	margin-top: 107px;
	display: flex;
	justify-content: space-between;
	align-items: end;

	@media (max-width: 750px) {
		margin-top: 40px;
	}
`;
const RewardsTitle = styled.h4`
	font-family: Cinzel;
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 19px;
	color: #ffffff;
	text-transform: uppercase;
`;

const RewardsButtonRow = styled.div`
	border: 1px solid #bea77e;
	width: 58.1px;
	height: 58.1px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const BackButton = styled.button`
	cursor: pointer;
	font-family: Cinzel;
	font-style: normal;
	font-weight: 700;
	font-size: 12px;
	line-height: 16px;
	border: 0.6px solid #bea77e;
	border-radius: 2.5px;
	padding: 9px 20px;
	text-transform: uppercase;
	background: #1d1c1a;
	color: #ffffff;
`;

const Exp = styled.div`
	font-family: Cinzel;
	font-style: normal;
	font-weight: 700;
	font-size: 8px;
	line-height: 11px;
	color: #ffffff;
`;

const Row = styled.div`
	font-family: Lato;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 18px;
	grid-row-gap: 18px;
`;

const Key = styled.div`
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 14px;
	color: #bea77e;
`;

const Value = styled.div`
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 14px;
	color: ${({ blueColor, theme }: { blueColor?: boolean; theme: DefaultTheme }) =>
		blueColor ? theme.colors.blue : theme.colors.white};
`;

const MainRow = styled.div`
	margin-top: 5px;
	display: flex;
	column-gap: 100px;

	@media (max-width: 750px) {
		flex-direction: column;
		row-gap: 20px;
	}
`;

const DiffRow = styled.div`
	display: flex;
`;

const fetchQuestById = async (id: string | undefined | string[]) => {
	const data = await axios.get('/api/quests/' + id);
	return data;
};

const QuestPage = () => {
	const router = useRouter();
	const ID = typeof router.query?.id === 'string' ? router.query.id : '';
	const { data } = useQuery({
		queryKey: ['quest', ID],
		queryFn: async () => await fetchQuestById(ID)
	});
	const difArr: number[] = [1, 2, 3, 4, 5];

	return (
		<MainBlock>
			<CoverRow>
				<Cover src={data?.data?.cover} alt='cover' />
				<Link href='/'>
					<Close src='/Close.png' alt='close' />
				</Link>
			</CoverRow>
			<InfoRow>
				<TitleBlock>
					<img src='/leftImg.png' alt='left' />
					<Title>{data?.data?.title}</Title>
					<img src='/rightImg.png' alt='left' />
				</TitleBlock>
				<MainRow>
					<Row>
						<Key>Skill tree</Key>
						<Value>{data?.data?.skillTree} </Value>
						<Key>Skill</Key>
						<Value>{data?.data?.skill}</Value>
					</Row>
					<Row>
						<Key>Difficulty</Key>
						<DiffRow>
							{difArr.map((el, i) => (
								<Icon width='13px' height='13px' icon='mdi:sword' color={i < data?.data?.difficulty ? '#BEA77E' : '#8e8e8e'} />
							))}
						</DiffRow>
						<Key>Quest type</Key>
						<Value>{data?.data?.type}</Value>
					</Row>
				</MainRow>
				<Desc>
        {data?.data?.description}
				</Desc>
				<FooterRow>
					<div>
						<RewardsTitle>QUEST REWARDS</RewardsTitle>
						<RewardsButtonRow>
							<img src='/EXP.png' alt='exp' />
							<Exp>+{data?.data?.rewards.experience}</Exp>
						</RewardsButtonRow>
					</div>
					<Link href='/'>
						<BackButton>Go back</BackButton>
					</Link>
				</FooterRow>
			</InfoRow>
		</MainBlock>
	);
};

export default QuestPage;
