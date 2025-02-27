import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormPropsType = {
	articleState: ArticleStateType;
	setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormPropsType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const articleParamsRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClick = (e: Event) => {
			if (!articleParamsRef.current?.contains(e.target as Node))
				setIsOpen(false);
		};

		if (isOpen) document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	const containerStyle = clsx({
		[styles.container]: true,
		[styles.containerOpen]: isOpen,
	});

	const [formState, setformState] = useState<ArticleStateType>(
		props.articleState
	);

	function handleReset() {
		setformState(defaultArticleState);
		props.setArticleState(defaultArticleState);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		props.setArticleState(formState);
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside className={containerStyle} ref={articleParamsRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<fieldset className={styles.fieldset}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(fontFamilyOption) => {
								setformState({ ...formState, fontFamilyOption });
							}}
							title={'шрифт'}
						/>
						<RadioGroup
							name={'fontSizes'}
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title={'Размер Шрифта'}
							onChange={(fontSizeOption) => {
								setformState({ ...formState, fontSizeOption });
							}}
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={(fontColor) => {
								setformState({ ...formState, fontColor });
							}}
							title={'Цвет шрифта'}
						/>
					</fieldset>

					<Separator />

					<fieldset className={styles.fieldset}>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							title={'Цвет фона'}
							onChange={(backgroundColor) => {
								setformState({ ...formState, backgroundColor });
							}}
						/>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							title={'Ширина контента'}
							onChange={(contentWidth) => {
								setformState({ ...formState, contentWidth });
							}}
						/>
					</fieldset>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
