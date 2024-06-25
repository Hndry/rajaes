<script setup>
import ButtonPrimary from "@/components/buttons/ButtonPrimary/index.vue";
import { login } from "@/api/Auth";
import Logo from "@/assets/home_logo.svg";

import { CdxIcon, CdxLabel, CdxSelect, CdxButton } from "@wikimedia/codex";
import {
  cdxIconLogIn,
  cdxIconInfoFilled,
  cdxIconPlay,
} from "@wikimedia/codex-icons";

import Lightbulb from "@/assets/lightbulb.svg";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["onHint"]);
</script>

<template>
  <div
    class="flex flex-col items-center border-b-[1px] border-[#C8CCD1] mb-[12px]"
  >
    <img :src="Logo" alt="home_logo" />
    <CdxLabel class="] mb-[13px] text-[18px]"> Halo, Raisha (WSC) </CdxLabel>
  </div>

  <div class="text-[16px] pb-[12px]">
    <span>Kontribusi untuk leksem berbahasa:</span>
  </div>
  <div class="text-[16px] pb-[12px]">
    <CdxSelect
      class="w-full"
      disabled
      default-label="Bahasa Indonesia (id)"
      :menuItems="[{ value: id, label: 'Bahasa Indonesia (id)' }]"
      selected="id"
    />
  </div>

  <div class="flex gap-x-2 pb-[24px]">
    <CdxIcon :icon="cdxIconInfoFilled" />
    <CdxLabel
      >Untuk sementara, Lexica hanya tersedia untuk leksem Bahasa
      Indonesia.</CdxLabel
    >
  </div>

  <div class="w-full flex flex-col gap-y-2 items-center">
    <CdxButton
      weight="primary"
      action="progressive"
      class="w-full"
      @click="router.push('/session')"
    >
      <CdxIcon :icon="cdxIconPlay" /> Mulai kontribusi</CdxButton
    >
    <CdxButton class="w-full" @click="emit('onHint')">
      <img :src="Lightbulb" alt="Lightbulb" /> Lihat panduan</CdxButton
    >
  </div>
</template>
