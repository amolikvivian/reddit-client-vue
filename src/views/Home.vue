<template>
  <div class="home">
    <!--Pre Loader-->
    <div v-if="postsState.loading" class="progress grey lighten-1">
      <div class="indeterminate orange darken-1"></div>
    </div>
    <!--Error Card-->
    <div v-if="postsState.error" class="card grey darken-2">
      <div class="card-content white-text">
        <span class="card-title center-align">{{ postsState.error }}</span>
      </div>
    </div>

    <div>
      <input
        class="input-search"
        type="text"
        name="search"
        v-model="searchQuery"
        placeholder="Search your favorite subreddit"
      />
      <button class="btn" style="margin-top: 5px" @click="getAll">Search</button>
    </div>

    <!--Displaying posts-->
    <div class="card" style="margin-top: 3%" v-for="post in postsData" :key="post.id">
      <div class="card-content">
        <img :src="post.thumbnail" alt="Image" />
        <span class="card-title activator grey-text text-darken-4">{{ post.title }}</span>
        <span class="grey-text text-darken-1">[ by {{ post.author }} ]</span>
        <p>
          <br />
          <a :href="`https://www.reddit.com${post.permalink}`">
            Expand post
            <i class="material-icons tiny">call_made</i>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import usePosts from "@/hooks/usePosts";

export default {
  setup() {
    const searchQuery = ref("");
    const postsData = ref(null);
    const postsState = ref("");

    function getAll() {
      this.postsState = usePosts(searchQuery.value);
      this.postsData = computed(() =>
        this.postsState.data.map((child) => child.data)
      );
    }
    return { getAll, postsData, searchQuery, postsState };
  },
};
</script>

<style scoped>
.input-search {
  color: white;
  letter-spacing: 1px;
}
.btn {
  text-transform: capitalize;
  font-size: 16px;
}
</style>