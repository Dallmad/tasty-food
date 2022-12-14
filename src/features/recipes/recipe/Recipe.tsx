import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import style from './Recipe.module.scss';

import { ReturnComponentType } from 'common';
import { RecipeItem } from 'features/recipes/recipe/recipeItem/RecipeItem';
import { useTypedDispatch } from 'state';
import { fetchRecipe } from 'state/reducers/recipe/recipe-reducer';

type SmallRecipeType = {
  name?: string;
  url?: string;
  description?: string;
};

export const Recipe = ({
  name,
  url,
  description,
}: SmallRecipeType): ReturnComponentType => {
  const params = useParams();
  const recipeId = params.id;

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipe(+recipeId));
    }
  }, [recipeId]);

  return (
    <div className={style.container}>
      {recipeId ? (
        <RecipeItem />
      ) : (
        <>
          <h4 className={style.title}>{name || 'No name'}</h4>
          <img src={`${url}` || 'No logo'} alt="recipe-logo" className={style.logo} />
          <p className={style.description}>{description || 'No description'}</p>
        </>
      )}
    </div>
  );
};
