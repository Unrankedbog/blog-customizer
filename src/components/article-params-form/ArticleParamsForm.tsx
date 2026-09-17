import clsx from 'clsx';
import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleArrowButtonClick = (): void => {
    setIsOpen((previousValue) => !previousValue);
  };
  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />

      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
