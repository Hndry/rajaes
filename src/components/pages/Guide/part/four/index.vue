<script setup>
import { CdxLabel } from "@wikimedia/codex";
import Image from "@/assets/guide_4.png";
</script>

<template>
  <div class="my-[12px]">
    <img :src="Image" alt="image" class="w-100" />
  </div>
  <div class="px-[16px]">
    <CdxLabel class="text-[18px] pb-[12px]">Selesai!</CdxLabel>
    <p class="content pb">
      Selamat berkontribusi ke Wikidata Leksem dengan Lexica.
    </p>
    <br />
    <p class="content">
      Tip: Anda dapat melihat panduan ini kembali dari halaman Beranda.
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
