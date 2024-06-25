<script setup>
import { CdxLabel, CdxIcon, CdxButton } from "@wikimedia/codex";
import {
  cdxIconInfoFilled,
  cdxIconClose,
  cdxIconLogoWikidata,
} from "@wikimedia/codex-icons";
import { reactive, ref, toRaw, Transition } from "vue";
import Logo from "@/assets/lexica_footer.svg";

const isInfo = ref(false);

const emit = defineEmits(["backtoItem, onHold, onRelease"]);

const props = defineProps({
  data: Object,
});

const statements = reactive(
  [...Object.entries(props?.data?.statements)].filter((item) => item?.[1])
);

const translate = (data) => {
  if (data === "image") {
    return "gambar";
  } else if (data === "instanceOf") {
    return "contoh";
  }
};

const setInfo = () => {
  isInfo.value = !isInfo.value;
};
</script>

<template>
  <div class="relative w-full">
    <div
      class="header p-[16px] text-white flex test justify-between gap-x-2"
      :style="{
        background: '#096450',
        alignItems: 'flex-start',
        transition: 'all 0.4s ease-in-out',
      }"
      @mousedown="emit('onHold')"
      @mouseup="emit('onRelease')"
    >
      <div>
        <CdxLabel class="text-[18px] pb-0">{{ props?.data?.label }}</CdxLabel>

        <div class="flex items-center gap-x-2">
          <CdxIcon :icon="cdxIconLogoWikidata" class="text-white" />
          <p><b>butir Wikidata</b></p>
        </div>

        <!-- This is for header Expand animation helper. Sudden change on header's height will screw with the animation, so we need to delay the text changes so the height can adapt  -->

        <p
          :key="2"
          class="overflow-hidden text-ellipsis"
          :style="{
            whiteSpace: 'wrap',
          }"
        >
          {{ props?.data?.description }}
        </p>
      </div>
      <div>
        <CdxIcon
          :icon="cdxIconClose"
          class="text-white cursor-pointer"
          @click="emit('backtoItem')"
        />
      </div>
    </div>
    <div class="p-[16px] overflow-auto" style="height: calc(100vh - 320px)">
      <CdxLabel class="text-[16px]" style="padding-bottom: 12px"
        >Pernyataan</CdxLabel
      >
      <div
        v-for="(value, index) in statements"
        :key="index"
        class="border border-[#A2A9B1] rounded-[2px] p-[12px] mb-[12px]"
      >
        <div class="flex gap-x-2">
          <img
            v-if="value[0] === 'image'"
            :src="value?.[1]?.data?.[0]?.url"
            :alt="value?.[1]?.data?.[0]?.value"
            class="h-[48px] w-[48px]"
          />
          <div>
            <CdxLabel class="text-[16px]"
              >{{ translate(value[0]) }} ({{ value?.[1]?.property }})</CdxLabel
            >
            <p class="text-[16px] font-normal text-[#54595D] pb-[0]">
              {{ value?.[1]?.data?.[0]?.value }}
            </p>
          </div>
        </div>
      </div>

      <!-- <CdxLabel class="text-[16px] pt-[4px]" style="padding-bottom: 12px"
        >Terjemahan</CdxLabel
      >

      <div
        v-for="n in 2"
        :key="n"
        class="border border-[#A2A9B1] rounded-[2px] p-[12px] mb-[12px]"
      >
        <div class="flex gap-x-2">
          <div class="border border-black h-[48px] w-[48px]" />
          <div>
            <CdxLabel class="text-[16px]">Malam (Qn)</CdxLabel>
            <p class="text-[16px] font-normal text-[#54595D] pb-[0]">
              {{ n }}
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

.fade-detail-enter-active {
  transition: all 0.5s ease-out;
}

.fade-detail-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-detail-enter-from,
.fade-detail-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
