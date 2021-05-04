import { reactive, watch } from 'vue';

import api from '@/lib/api';

export default function usePosts(subreddit) {
  const postsState = reactive({
    loading: false,
    error: '',
    data: [],
  });

  async function loadData() {
    console.log('reloading data...');
    try {
      postsState.loading = true;
      postsState.error = '';
      postsState.data = [];

      const response = await api.getPosts(subreddit);
      postsState.data = response.data.children;
    } catch (error) {
      postsState.error = error;
    } finally {
      postsState.loading = false;
    }
  }

  watch(() => subreddit, loadData);
  loadData();
  return postsState;
}