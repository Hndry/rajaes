<script setup>
import { CdxLabel, CdxIcon, CdxButton, CdxSearchInput } from "@wikimedia/codex";
import { cdxIconInfoFilled } from "@wikimedia/codex-icons";
import { reactive, ref, watch } from "vue";
import { useGeneralStore } from "@/store/general";
import wikimedia from "@/assets/lexica_footer.svg";
import debounce from "lodash.debounce";

const isInfo = ref(false);
const selectedItem = ref(null);
const detailData = ref(null);

const search = ref("");

const isSearch = ref(false);

const store = useGeneralStore();
const emit = defineEmits([
  "gotoDetail, gotoSubItemDetail, onHold, onRelease, gotoReview, selectItem",
]);
const props = defineProps({
  headerRef: Object,
  data: Object,
  recommendation: Array,
});

const recommendationSearch = ref([]);

const setInfo = () => {
  isInfo.value = !isInfo.value;
};

const selectItem = (n, value) => {
  selectedItem.value = n;
  detailData.value = value;
  emit("selectItem");
};

const onInput = debounce(() => {
  if (search.value === "") {
    isSearch.value = false;
    selectedItem.value = null;
    recommendationSearch.value = [];
  } else {
    recommendationSearch.value = [
      ...props?.recommendation.filter((item) =>
        item.label.toLowerCase().includes(search.value)
      ),
    ];

    isSearch.value = true;
  }
}, 500);
</script>

<template>
  <div class="relative w-full flex flex-col">
    <div
      class="p-[16px] text-white flex test justify-between gap-x-2 header"
      :style="{
        background: '#2A4B8D',
        alignItems: 'center',
      }"
      :ref="props.headerRef"
      @mousedown="emit('onHold')"
      @mouseup="emit('onRelease')"
    >
      <div
        :style="{
          minWidth: '200px',
        }"
      >
        <CdxLabel class="text-[18px] pb-0"
          >{{ props?.data?.lemma }} ({{ props?.data?.sensesId }})</CdxLabel
        >
        <!-- This is for header Expand animation helper. Sudden change on header's height will screw with the animation, so we need to delay the text changes so the height can adapt  -->

        <p
          class="overflow-hidden text-ellipsis"
          :style="{
            whiteSpace: 'nowrap',
          }"
        >
          {{ props.data.gloss }}
        </p>
      </div>
      <div>
        <CdxIcon
          :icon="cdxIconInfoFilled"
          class="text-white cursor-pointer"
          @click="(e) => emit('gotoDetail', e)"
        />
      </div>
    </div>
    <div class="p-[16px] overflow-auto" style="height: calc(100vh - 280px)">
      <CdxLabel class="text-[16px]" style="padding-bottom: 16px"
        >Leksem di atas memiliki makna yang sama dengan butir Wikidata
        apa?</CdxLabel
      >
      <CdxSearchInput
        aria-label="SearchInput default demo"
        placeholder="Cari butir atau QID"
        class="pb-[16px]"
        v-model="search"
        @input="onInput"
      />

      <div v-if="!isSearch && props?.recommendation?.length === 0">
        <p class="text-[16px] text-[#54595D]"><i>Tidak ada rekomendasi.</i></p>
        <p class="text-[16px] text-[#54595D]">
          <i>Carilah butir secara manual.</i>
        </p>
      </div>
      <div v-if="!isSearch && props?.recommendation?.length > 0">
        <p
          class="text-[16px] font-normal text-[#54595D] pb-[8px]"
          style="padding-bottom: 16px"
        >
          Rekomendasi ({{ props?.recommendation?.length }})
        </p>

        <div
          v-for="(value, index) in props.recommendation"
          :key="index"
          :class="[
            value.id === selectedItem
              ? 'border-[2px] border-[#3366CC] bg-[#EAF3FF]'
              : 'border border-[#A2A9B1]',
            'rounded-[2px] p-[12px] flex items-center gap-x-2 mb-[12px] cursor-pointer justify-between',
          ]"
          @click="selectItem(value.id, value)"
        >
          <div class="flex gap-x-2">
            <img
              :src="value?.statements?.image?.data?.[0]?.url || wikimedia"
              class="h-[48px] w-[48px]"
            />
            <div>
              <CdxLabel class="text-[16px]"
                >{{ value?.label }} ({{ value?.id }})</CdxLabel
              >
              <p
                class="text-[16px] font-normal text-[#54595D] pb-[8px]"
                style="padding-bottom: 16px"
              >
                {{ value?.description }}
              </p>
            </div>
          </div>
          <CdxIcon
            :icon="cdxIconInfoFilled"
            class="cursor-pointer"
            @click="emit('gotoSubItemDetail', value)"
          />
        </div>
      </div>

      <div v-else-if="isSearch">
        <div v-if="recommendationSearch.length !== 0">
          <p
            class="text-[16px] font-normal text-[#54595D] pb-[8px]"
            style="padding-bottom: 16px"
          >
            Hasil Pencarian ({{ recommendationSearch?.length }})
          </p>
          <div
            v-for="(value, index) in recommendationSearch"
            :key="index"
            :class="[
              value.id === selectedItem
                ? 'border-[2px] border-[#3366CC] bg-[#EAF3FF]'
                : 'border border-[#A2A9B1]',
              'rounded-[2px] p-[12px] flex items-center gap-x-2 mb-[12px] cursor-pointer justify-between',
            ]"
            @click="selectItem(value.id, value)"
          >
            <div class="flex gap-x-2">
              <img
                :src="value?.statements?.image?.data?.[0]?.url || wikimedia"
                class="h-[48px] w-[48px]"
              />
              <div>
                <CdxLabel class="text-[16px]"
                  >{{ value?.label }} ({{ value?.id }})</CdxLabel
                >
                <p
                  class="text-[16px] font-normal text-[#54595D] pb-[8px]"
                  style="padding-bottom: 16px"
                >
                  {{ value?.description }}
                </p>
              </div>
            </div>
            <CdxIcon
              :icon="cdxIconInfoFilled"
              class="cursor-pointer"
              @click="emit('gotoSubItemDetail', value)"
            />
          </div>
        </div>

        <div v-else>
          <CdxLabel class="text-[16px] text-[#D73333]"
            >Tidak ada hasil pencarian yang ditemukan.</CdxLabel
          >
          <CdxLabel class="text-[16px] text-[#D73333]"
            >Coba gunakan kata kunci lain.</CdxLabel
          >
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-[-48px] w-full h-66px border-t border-[#A2A9B1] p-[16px] flex justify-between align-center bg-white"
    >
      <CdxButton
        class="w-[124px]"
        @click="
          () => {
            selectedItem = null;
            emit('gotoReview');
          }
        "
        >Butir tidak ada</CdxButton
      >
      <CdxButton
        :disabled="!selectedItem"
        weight="primary"
        action="progressive"
        class="w-[124px]"
        @click="emit('gotoReview', detailData)"
        >Selanjutnya</CdxButton
      >
    </div>
  </div>
</template>

<style>
.cdx-text-input__input {
  height: 34px;
}
</style>
