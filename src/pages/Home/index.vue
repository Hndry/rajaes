<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/config";
import ButtonPrimary from "@/components/buttons/ButtonPrimary/index.vue";
import { login } from "@/api/Auth";

import { CdxIcon, CdxLabel } from "@wikimedia/codex";
import { cdxIconLogIn, cdxIconInfoFilled } from "@wikimedia/codex-icons";
import Unauth from "@/components/pages/Home/Unauth/index.vue";
import Auth from "@/components/pages/Home/Auth/index.vue";

import GuideDialog from "@/components/dialog/guide/index.vue";

import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const isAuth = ref(null);
const isGuide = ref(false);

onMounted(() => {
  isAuth.value = cookies.get("auth");
});
</script>

<template>
  <div class="p-[16px]">
    <div v-if="isAuth">
      <Auth @onHint="isGuide = true" />
    </div>

    <div v-else-if="!isAuth">
      <Unauth />
    </div>
  </div>

  <GuideDialog :open="isGuide" @onPrimaryAction="isGuide = false" />
</template>
