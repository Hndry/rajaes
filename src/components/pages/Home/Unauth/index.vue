<script setup>
import ButtonPrimary from "@/components/buttons/ButtonPrimary/index.vue";
import { login } from "@/api/Auth";
import { CdxIcon, CdxLabel } from "@wikimedia/codex";
import { cdxIconLogIn, cdxIconInfoFilled } from "@wikimedia/codex-icons";
</script>

<template>
  <h1 class="pb-[12px] mb-[13px] border-b-[1px] border-[#C8CCD1]">
    Selamat datang!
  </h1>
  <div class="text-[16px] pb-[12px]">
    <span
      ><b>Lexica</b> merupakan sebuah perkakas eksperimental untuk
      bserkontribusi ke Wikidata Leksem dengan mudah.</span
    >
  </div>
  <div class="text-[16px] pb-[32px]">
    <span>Dengan menggunakan Lexica, Anda menyetujui </span
    ><a class="text-decoration-underline">Kebijakan Privasi Lexica.</a>
  </div>

  <a
    href="https://www.mediawiki.org/w/rest.php/oauth2/authorize?client_id=c373636e79ec684127469b81aae43c37&response_type=code"
  >
    <ButtonPrimary><CdxIcon :icon="cdxIconLogIn" /> Masuk</ButtonPrimary>
  </a>

  <div class="flex gap-x-2 pt-[32px]">
    <CdxIcon :icon="cdxIconInfoFilled" />
    <CdxLabel
      >Untuk sementara, Lexica hanya tersedia untuk leksem Bahasa
      Indonesia.</CdxLabel
    >
  </div>
</template>
