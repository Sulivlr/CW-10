import {News} from '../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createNews, fetchNews, fetchOneNews} from './newsThunks';

export interface NewsState {
  news: News[];
  newsFetching: boolean;
  isCreating: boolean;
  post: News | null;
  oneFetching: boolean;
}

const initialState: NewsState = {
  news: [],
  newsFetching: false,
  isCreating: false,
  post: null,
  oneFetching: false,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.newsFetching = true;
    }).addCase(fetchNews.fulfilled, (state, {payload: news}) => {
      state.newsFetching = false;
      state.news = news;
    }).addCase(fetchNews.rejected, (state) => {
      state.newsFetching = false;
    });

    builder.addCase(createNews.pending, (state) => {
      state.isCreating = true;
    }).addCase(createNews.fulfilled, (state) => {
      state.isCreating = false;
    }).addCase(createNews.rejected, (state) => {
      state.isCreating = false;
    });

    builder.addCase(fetchOneNews.pending, (state)=> {
      state.post = null;
      state.oneFetching = true;
    }).addCase(fetchOneNews.fulfilled, (state, {payload: post}) => {
      state.post = post;
      state.oneFetching = false;
    }).addCase(fetchOneNews.rejected, (state) => {
      state.oneFetching = false;
    });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectNewsFetching: (state) => state.newsFetching,
    selectNewsCreating: (state) => state.isCreating,
    selectOnePost: (state) => state.post,
    selectOnePostFetching: (state) => state.oneFetching,
  }
});

export const newsReducer = newsSlice.reducer;

export const {
  selectNews,
  selectNewsFetching,
  selectNewsCreating,
  selectOnePost,
  selectOnePostFetching,
} = newsSlice.selectors;