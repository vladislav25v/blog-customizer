import { CSSProperties, useState } from 'react';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import styles from './styles/index.module.scss';

export const App = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);
  return (
    <main
      className={styles.main}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
          '--image-width':
            articleState.contentWidth.value === '948px' ? '100%' : 'clamp(100%, 100vw, 1600px)',
        } as CSSProperties
      }>
      <ArticleParamsForm currentState={articleState} onApply={setArticleState} />
      <Article />
    </main>
  );
};
