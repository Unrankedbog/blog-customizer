import {
  fontFamilyOptions,
  defaultArticleState,
  type ArticleStateType,
  type OptionType,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleArrowButtonClick = (): void => {
    setIsOpen((previousValue) => !previousValue);
  };

  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const makeHandler = (
    field: keyof ArticleStateType
  ): ((option: OptionType) => void) => {
    return (option: OptionType): void => {
      setFormState((prev) => ({
        ...prev,
        [field]: option,
      }));
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />

      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text weight={800} fontStyle="normal" size={31} family="open-sans" uppercase>
            Задайте параметры
          </Text>

          <Select
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={makeHandler('fontFamilyOption')}
            title="Шрифт"
          />
          <RadioGroup
            name="radio"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={makeHandler('fontSizeOption')}
            title="размер шрифта"
          />
          <Select
            selected={formState.fontColor}
            options={fontColors}
            onChange={makeHandler('fontColor')}
            title="цвет шрифта"
          />
          <Separator />
          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={makeHandler('backgroundColor')}
            title="цвет фона"
          />
          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={makeHandler('contentWidth')}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
