<script setup>
import Header from "@/components/layout/header/index.vue";
import Footer from "@/components/layout/footer/index.vue";
import { ref } from "vue";
import { CdxProgressBar, CdxLabel, CdxButton } from "@wikimedia/codex";
import successlogo from "@/assets/Success.svg";
import { useCookies } from "vue3-cookies";

const logout = ref(false);
const success = ref(false);
const { cookies } = useCookies();

const loggingOut = () => {
  logout.value = true;
  cookies.remove("auth");

  setTimeout(() => {
    success.value = true;
  }, 2000);
};

const reload = () => {
  window.location.reload();
};
</script>

<template>
  <div class="relative">
    <Header @logout="loggingOut" />
    <div class="min-h-[100vh] pb-[103px] pt-[54px] w-full">
      <slot v-if="!logout" />
      <div
        v-if="logout && !success"
        class="w-full text-center flex flex-col justify-center h-[80vh] p-[16px]"
      >
        <CdxLabel class="pb-[16px]">Sedang keluar log...</CdxLabel>
        <CdxProgressBar class="w-full"></CdxProgressBar>
      </div>
      <div
        v-else-if="logout && success"
        class="w-full text-center flex flex-col justify-center items-center h-[80vh] p-[16px]"
      >
        <img :src="successlogo" alt="success" />
        <CdxLabel class="pb-[16px]">Anda berhasil keluar log.</CdxLabel>
        <CdxButton
          weight="primary"
          action="progressive"
          class="w-full"
          @click="reload"
          >Oke</CdxButton
        >
      </div>
    </div>
    <Footer />
  </div>
</template>
