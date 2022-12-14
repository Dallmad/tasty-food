import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { requestAPI } from 'api';

const initialState: RecipesType = {
  count: 0,
  results: [],
  from: '0',
  size: '20',
  search: '',
};

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<RecipesType>) {
      state.count = action.payload.count;
      state.results = action.payload.results;
    },
    setNumberItems(state, action: PayloadAction<string>) {
      state.size = action.payload;
    },
    setPage(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const recipesReducer = slice.reducer;
export const { setRecipes, setNumberItems, setPage, setSearch } = slice.actions;

// thunks
export const fetchRecipes =
  (from: string, size: string, search?: string) => async (dispatch: Dispatch) => {
    try {
      const res = await requestAPI.getRecipes(from, size, search);

      dispatch(setRecipes(res.data));
      dispatch(setNumberItems(size));
      dispatch(setPage(from));
    } catch (error) {
      if (error instanceof Error) {
        console.log(`error${error}`);
      }
    }
  };

// types
export type RecipesType = {
  count: number;
  results: RecipeType[];
  from: string;
  size: string;
  search: string;
};
export type RecipeType = {
  is_one_top: boolean;
  cook_time_minutes: number;
  promotion: string;
  keywords: string;
  show: any;
  servings_noun_plural: string;
  canonical_id: string;
  show_id: number;
  draft_status: string;
  sections: any;
  tags: any;
  thumbnail_alt_text: string;
  credits: any;
  topics: any;
  slug: string;
  servings_noun_singular: string;
  video_url: string;
  prep_time_minutes: number;
  name: string;
  buzz_id: null;
  thumbnail_url: string;
  is_shoppable: boolean;
  video_id: number;
  compilations: any;
  num_servings: number;
  brand: null;
  nutrition: any;
  tips_and_ratings_enabled: boolean;
  video_ad_content: string;
  seo_title: string;
  country: string;
  instructions: any;
  language: string;
  brand_id: null;
  aspect_ratio: string;
  description: string;
  inspired_by_url: null;
  total_time_minutes: number;
  nutrition_visibility: string;
  facebook_posts: any;
  beauty_url: null;
  total_time_tier: any;
  yields: string;
  original_video_url: string;
  updated_at: number;
  renditions: any;
  created_at: number;
  approved_at: number;
  user_ratings: any;
  id: number;
};
