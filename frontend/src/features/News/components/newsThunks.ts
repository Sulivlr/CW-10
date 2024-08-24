import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import {News, NewsMutation} from '../../../types';

export const fetchNews = createAsyncThunk(
  'news/fetchAll',
  async () => {
    const {data: news} = await axiosApi.get<News[]>('/news');
    return news;
  }
);

export const createNews = createAsyncThunk<void, NewsMutation>(
  'news/create',
  async (newsMutation) => {
    const formData = new FormData();
    formData.append('title', newsMutation.title);
    formData.append('content', newsMutation.content);
    formData.append('createdAt', newsMutation.createdAt);
    if (newsMutation.image) {
      formData.append('image', newsMutation.image);
    }
    await axiosApi.post('/news', formData);
  }
);

export const fetchOneNews = createAsyncThunk<News, string>(
  'news/fetchOne',
  async (id) => {
    const {data: news} = await axiosApi.get<News>(`/news/${id}`);
    return news;
  }
);

export const removePost = createAsyncThunk<void, string>(
  'news/removePost',
  async (id) => {
    await axiosApi.delete(`/news/${id}`);
  }
);