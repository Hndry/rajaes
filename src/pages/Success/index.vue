<script setup>
import { CdxProgressBar, CdxLabel } from "@wikimedia/codex";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";

const route = useRoute();
const router = useRouter();

const { cookies } = useCookies();

onMounted(() => {
  cookies.set("auth", route.query.code);

  setTimeout(() => {
    router.push("/");
  }, 2000);
});
</script>

<template>
  <div class="min-h-screen flex justify-center items-center w-full p-[16px]">
    <div class="w-full text-center">
      <CdxLabel class="pb-[16px]">Memuat...</CdxLabel>
      <CdxProgressBar class="w-full"></CdxProgressBar>
    </div>
  </div>
</template>
