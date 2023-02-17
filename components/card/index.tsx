import { Quest } from '@/types/Quests';
import React, { FC } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Icon } from '@iconify/react';

interface CardProps {
	quest: Quest;
}

const Block = styled.div`
	cursor: pointer;
	width: 332px;
	padding: 6px 6px 17px 6px;
	background: #1d1c1a;
	border: 1px solid rgba(58, 58, 58, 0.5);
	border-radius: 10px;
`;

const Image = styled.img`
	border-radius: 7px;
	height: 106.11px;
	width: 100%;
	margin-bottom: 4px;
`;

const Title = styled.div`
	font-family: Cinzel;
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 19px;
	text-transform: uppercase;
	color: #ffffff;
	margin: 0px;
	margin-bottom: 8px;
	margin-left: 6px;
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
	color: ${({ blueColor,theme }: { blueColor?: boolean, theme: DefaultTheme }) => (blueColor ? theme.colors.blue : theme.colors.white)};
`;

const MainRow = styled.div`
	display: flex;
	justify-content: center;
	column-gap: 50px;
`;

const DiffRow = styled.div`
	display: flex;
`;

const Card: FC<CardProps> = ({ quest }) => {
	const difArr: number[] = [1, 2, 3, 4, 5];
	return (
		<Block>
			<Image src={quest.cover} alt='cover' />
			<Title>{quest.title}</Title>
			<MainRow>
				<Row>
					<Key>Skill tree</Key>
					<Value blueColor>{quest.skillTree}</Value>
					<Key>Skill</Key>
					<Value>{quest.skill}</Value>
					<Key>Type</Key>
					<Value>{quest.type}</Value>
				</Row>
				<Row>
					<Key>Difficulty</Key>
					<DiffRow>
						{difArr.map((el, i) => (
							<Icon width='13px' height='13px' icon='mdi:sword' color={i < quest.difficulty ? '#BEA77E' : '#8e8e8e'} />
						))}
					</DiffRow>
					<Key>Experience</Key>
					<Value>{quest.experience}</Value>
					<Key>Gold</Key>
					<Value>{quest.gold}</Value>
				</Row>
			</MainRow>
		</Block>
	);
};

export default Card;
