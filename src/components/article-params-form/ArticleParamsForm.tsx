import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
  ArticleStateType,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  currentState: ArticleStateType;
  onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ currentState, onApply }: ArticleParamsFormProps) => {
  const [formState, setFormState] = useState<ArticleStateType>(currentState);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormState(currentState);
  }, [currentState]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClick);
    }

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  const handleApply = (event: React.FormEvent) => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Text as='h2' size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title='Шрифт'
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(selected) => setFormState({ ...formState, fontFamilyOption: selected })}
          />
          <RadioGroup
            title='Размер шрифта'
            name='fontSize'
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(selected) => setFormState({ ...formState, fontSizeOption: selected })}
          />
          <Select
            title='Цвет шрифта'
            selected={formState.fontColor}
            options={fontColors}
            onChange={(selected) => setFormState({ ...formState, fontColor: selected })}
          />
          <Separator />
          <Select
            title='Цвет фона'
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(selected) => setFormState({ ...formState, backgroundColor: selected })}
          />
          <Select
            title='Ширина контента'
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(selected) => setFormState({ ...formState, contentWidth: selected })}
          />
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </div>
  );
};
