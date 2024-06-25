<script setup>
import { CdxLabel, CdxIcon, CdxButton, CdxSearchInput } from "@wikimedia/codex";
import { cdxIconInfoFilled } from "@wikimedia/codex-icons";
import { ref, toRaw } from "vue";
import { useGeneralStore } from "@/store/general";
import Logo from "@/assets/add.svg";
import wikimedia from "@/assets/lexica_footer.svg";

const isInfo = ref(false);

const store = useGeneralStore();
const emit = defineEmits(["backtoItem, onHold, onRelease"]);
const props = defineProps({
  headerRef: Object,
  data: Object,
  detail: Object,
});

const setInfo = () => {
  isInfo.value = !isInfo.value;
};
</script>

<template>
  <div class="relative w-full flex flex-col">
    <div
      class="p-[16px] text-white flex test justify-between gap-x-2 header"
      :style="{
        background: '#54595D',
        alignItems: 'center',
      }"
      :ref="props.headerRef"
      @mousedown="emit('onHold')"
      @mouseup="emit('onRelease')"
    >
      <CdxLabel class="text-[18px] pb-0 text-white">Pratinjau</CdxLabel>
    </div>
    <div
      class="p-[16px] overflow-auto pb-[45px]"
      style="height: calc(100vh - 255px)"
    >
      <CdxLabel class="text-[16px]" style="padding-bottom: 16px"
        >Leksem</CdxLabel
      >
      <div class="border border-[#A2A9B1] rounded-[2px] p-[12px] mb-[8px]">
        <div class="flex gap-x-2">
          <img
            :src="props?.data?.statements?.image?.data?.[0]?.url"
            class="h-[48px] w-[48px]"
          />
          <div>
            <CdxLabel class="text-[16px]"
              >{{ props?.data?.lemma }} ({{ props?.data?.sensesId }})</CdxLabel
            >
            <p class="text-[16px] font-normal text-[#54595D] pb-[0]">
              {{ props?.data?.gloss }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="arrow"></div>
      </div>
      <div class="p-[12px] bg-[#eaecf0]" v-if="props?.detail">
        <div class="flex gap-x-2">
          <img :src="Logo" alt="lexica_footer" />
          <CdxLabel class="text-[16px]" style="padding-bottom: 16px"
            >Pernyataan baru: butir untuk makna ini (P5137)</CdxLabel
          >
        </div>
        <div class="border border-[#A2A9B1] rounded-[2px] p-[12px]">
          <div class="flex gap-x-2">
            <img
              :src="
                props?.detail?.statements?.image?.data?.[0]?.url || wikimedia
              "
              class="h-[48px] w-[48px]"
            />
            <div>
              <CdxLabel class="text-[16px]"
                >{{ props?.detail?.label }} ({{ props?.detail?.id }})</CdxLabel
              >
              <p class="text-[16px] font-normal text-[#54595D] pb-[0]">
                {{ props?.detail?.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-[12px] bg-[#eaecf0]" v-if="!props?.detail">
        <div class="flex gap-x-2">
          <CdxIcon :icon="cdxIconInfoFilled" />
          <div>
            <CdxLabel class="text-[16px] p-0">Tidak ada perubahan</CdxLabel>
            <p class="text-[16px] text-[#54595D] pt-[5px]">
              <i>Carilah butir secara manual.</i>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-[-48px] w-full h-66px border-t border-[#A2A9B1] p-[16px] flex justify-between align-center bg-white"
    >
      <CdxButton @click="emit('backtoItem')" class="w-[124px]"
        >Sunting lagi</CdxButton
      >
      <CdxButton
        weight="primary"
        action="progressive"
        class="w-[124px]"
        @click="emit('onDone')"
        >Selanjutnya</CdxButton
      >
    </div>
  </div>
</template>

<style>
.arrow {
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #eaecf0;
}
</style>
