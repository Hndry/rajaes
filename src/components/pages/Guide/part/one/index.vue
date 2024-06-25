<script setup>
import { CdxLabel } from "@wikimedia/codex";
import Image from "@/assets/guide_1.png";
</script>

<template>
  <div class="my-[9px]">
    <img :src="Image" alt="image" class="w-100" />
  </div>
  <div class="px-[16px]">
    <CdxLabel class="text-[18px] pb-[12px]">Apa it Lexica?</CdxLabel>
    <p class="content pb">
      Lexica menyajikan tampilan penyuntingan Wikidata Leksem untuk memudahkan
      kontribusi cepat.
    </p>
    <br />
    <p class="content">
      Anda akan mengerjakan hal berikut: Mengaitkan sebuah leksem dengan butir
      Wikidata yang bermakna sama.
    </p>
  </div>
</template>

<style scoped>
.content {
  font-size: 16px;
  line-height: 25.6px;
  letter-spacing: -0.048px;
}
</style>
