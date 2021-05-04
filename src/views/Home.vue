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

    <!--Displaying posts-->
    <div class="card" v-for="post in postsData" :key="post.id">
      <div class="card-content">
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

<script setup>
import { computed } from "vue";
import usePosts from "@/hooks/usePosts";

const searchQuery = "aww";
const postsState = usePosts(searchQuery);
console.log(searchQuery);

const postsData = computed(() => postsState.data.map((child) => child.data));
console.log(postsData);
</script>