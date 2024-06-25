<script setup>
import Card from "@/components/pages/Session/Card/index.vue";
import CardItem from "@/components/pages/Session/Card/item/index.vue";
import CardItemDetail from "@/components/pages/Session/Card/detail/index.vue";
import CardSubItemDetail from "@/components/pages/Session/Card/subitem/index.vue";
import CardReview from "@/components/pages/Session/Card/review/index.vue";
import CardSplash from "@/components/pages/Session/Card/splash/index.vue";
import CardSubmitting from "@/components/pages/Session/Card/submitting/index.vue";

import cards from "@/dummy/cards.json";
import lintah from "@/dummy/lintah.json";
import tumpengan from "@/dummy/tumpengan.json";
import penghayatan from "@/dummy/penghayatan.json";

import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from "vue-router";

import { CdxLabel, CdxIcon, CdxButton, CdxMessage } from "@wikimedia/codex";
import {
  cdxIconHome,
  cdxIconSuccess,
  cdxIconUndo,
} from "@wikimedia/codex-icons";
import {
  computed,
  ref,
  watch,
  Transition,
  onMounted,
  reactive,
  toRaw,
} from "vue";
import skip from "@/assets/skip.svg";
import blank from "@/assets/blank_icon.svg";

import WarningDialog from "@/components/dialog/leaveWarning/index.vue";
import CompleteDialog from "@/components/dialog/complete/index.vue";

const router = useRouter();

const isWarning = ref(false);

const completeRef = ref(null);

const count = ref(3);
const data = reactive([...cards?.data]);
const tempData = ref(null);
const detail = ref(null);

const currMargin = ref(32);
const flip = ref(false);
const currMode = ref(1);
const next = ref(false);
const prev = ref(false);
const submit = ref(false);
const cardRef = ref(null);
const isMove = ref(true);

const splash = ref(true);
const submittingData = ref(false);
const undoWarn = ref(false);
const progress = ref(0);
const progress2 = reactive({ number: 0 });

const skipAll = ref(false);

const subDetail = ref(null);

const testing = ref(false);

const onHideCard = () => {
  tempData.value = data.pop();
  count.value = count.value - 1;
};

const recommendations = (lemma) => {
  if (lemma === "lintah") {
    return lintah?.data;
  } else if (lemma === "tumpengan") {
    return tumpengan?.data;
  } else if (lemma === "penghayatan") {
    return penghayatan?.data;
  }
};

const onStart = () => {
  isMove.value = false;

  if (flip) {
    flip.value = false;
  }
};

const onEnd = () => {
  isMove.value = true;

  if (!flip) {
    flip.value = true;
  }
};

const currCount = computed(() => {
  // return 5 - count.value + 1;
  return 4 - data?.length;
});

watch(
  () => [...data],
  (newData, oldData) => {
    // currMargin.value = currMargin.value - (count.value < 5 ? 8 : 0);

    if (newData?.length < oldData?.length)
      currMargin.value = currMargin.value - (data?.length < 3 ? 8 : 0);
    else if (newData?.length > oldData?.length)
      currMargin.value = currMargin.value + 8;
  },
  { immediate: true }
);

const nextCard = () => {
  next.value = true;

  setTimeout(() => {
    splash.value = true;

    onHideCard();
    setUndoWarn();

    currMode.value = 1;
    flip.value = false;
    next.value = false;
    disableSplash();
  }, 300);
};

const submitCard = () => {
  submittingData.value = true;

  setTimeout(() => {
    submit.value = true;
    submittingData.value = false;

    setTimeout(() => {
      splash.value = true;
      currMode.value = 1;

      onHideCard();
      setUndoWarn();

      flip.value = false;
      submit.value = false;
      disableSplash();
    }, 200);
  }, 1000);
};

const undoCard = () => {
  data.push(tempData.value);
  prev.value = true;

  tempData.value = null;
  setTimeout(() => {
    prev.value = false;
  }, 300);
};

const gotoDetail = (e) => {
  flip.value = !flip.value;

  setTimeout(() => {
    currMode.value = 2;
  }, 100);
};

const backtoItem = () => {
  flip.value = !flip.value;

  setTimeout(() => {
    currMode.value = 1;
  }, 100);
};

const gotoSubItemDetail = (data) => {
  flip.value = !flip.value;

  setTimeout(() => {
    currMode.value = 3;
    subDetail.value = data;
  }, 100);
};

const gotoReview = (data) => {
  flip.value = !flip.value;

  setTimeout(() => {
    currMode.value = 4;
    detail.value = data;
  }, 100);
};

const disableSplash = () => {
  setTimeout(() => {
    splash.value = false;
  }, 1500);
};

onMounted(() => {
  disableSplash();
});

const to = ref(null);

onBeforeRouteLeave(async (to, from) => {
  if (!skipAll.value) {
    if (currCount.value > 1 && currCount.value < 4) {
      const userInput = await testing?.value?.openModal();

      if (!userInput) {
        return false;
      } else {
        skipAll.value = true;

        const completeInput = await completeRef?.value?.openModal();

        if (!completeInput) {
          return false;
        }
      }
    }
  }

  // cancel the navigation and stay on the same page
});

const endEarly = async () => {
  if (currCount.value > 1 && currCount.value < 4) {
    const userInput = await testing?.value?.openModal();

    console.log(userInput);

    if (userInput) {
      skipAll.value = true;

      const completeInput = await completeRef?.value?.openModal();

      if (completeInput) {
        router.push("/");
      }
    }
  } else {
    skipAll.value = true;

    const completeInput = await completeRef?.value?.openModal();

    if (completeInput) {
      router.push("/");
    }
  }
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const setUndoWarn = async () => {
  undoWarn.value = true;

  const duration = 2750; // Total duration in milliseconds
  const interval = 27.5; // Update interval in milliseconds
  const steps = duration / interval;
  let currentStep = 0;

  const increment = () => {
    progress2.number = (currentStep / steps) * 100;
    currentStep++;

    if (currentStep <= steps) {
      setTimeout(increment, interval);
    }

    if (progress2.number === 100) {
      undoWarn.value = false;
    }
  };

  setTimeout(increment, interval);

  // let currtemp = 0;

  // const interval = setInterval(() => {
  //   console.log(progress2.number);
  // }, 27.5);

  // while (currtemp < 2750) {
  //   currtemp = currtemp + 27.5;
  //   progress2.number = Math.floor(100 * (currtemp / 2750));
  //   await timer(27.5);

  //   console.log("asd", currtemp);
  // }

  // if (currtemp === 2750 && progress2.number === 100) {
  //   progress2.number = 0;
  //   undoWarn.value = false;
  // }
};

watch(currCount, async () => {
  if (currCount.value === 4) {
    const userInput = await completeRef?.value?.openModal();

    if (userInput) {
      router.push("/");
    }
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-[#EAECF0] w-full"
    :style="{
      backgroundImage: `url(${blank})`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    }"
  >
    <div class="h-[54px] relative flex items-center z-[9] px-[16px]">
      <CdxButton
        weight="quiet"
        class="w-[44px] h-[44px] px-0 absolute left-[3px]"
        @click="endEarly"
      >
        <CdxIcon :icon="cdxIconHome" alt="home" />
      </CdxButton>
      <div class="absolute mx-auto left-0 right-0 w-fit">
        <CdxLabel class="text-[16px] pb-0">Kartu {{ currCount }}</CdxLabel>
      </div>
    </div>
    <div :class="[skipAll && 'skipall', 'px-[16px]']">
      <div
        class="flex justify-center w-full relative custom-height"
        :style="{
          marginTop: currMargin + 'px',
        }"
      >
        <Card
          :key="value"
          v-for="(value, index) in data"
          :style="{
            marginTop: -8 * index + 'px',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center',
            transition: !isMove ? '' : 'transform 0.5s',
            backfaceVisibility: 'hidden',
          }"
          @hideCard="nextCard"
          :headerRef="cardRef"
          :preventSwipe="undoWarn"
          :class="[
            data?.length === index + 1 && next ? 'next-card' : '',
            data?.length === index + 1 && prev ? 'prev-card' : '',
            data?.length === index + 1 && submit ? 'submit-card' : '',
            data?.length === index + 1 && flip ? 'is-flipped' : '',
          ]"
        >
          <div name="flip">
            <transition name="fade">
              <CardSplash
                :class="[
                  data?.length !== index + 1 ? 'bg-white' : 'bg-[#2A4B8D]',
                  'custom-height',
                ]"
                :data="value"
                v-if="splash === true || data?.length !== index + 1"
                :key="0"
              ></CardSplash>
            </transition>

            <transition name="fade">
              <CardSubmitting
                class="custom-height"
                v-if="submittingData === true"
                :key="0"
              ></CardSubmitting>
            </transition>

            <CardItem
              :key="1"
              :headerRef="cardRef"
              :recommendation="recommendations(value?.lemma)"
              :data="value"
              v-if="currMode === 1"
              @gotoDetail="gotoDetail"
              @gotoSubItemDetail="gotoSubItemDetail"
              @gotoReview="gotoReview"
              @onHold="onStart"
              @onRelease="onEnd"
            />
            <CardItemDetail
              :key="2"
              :data="value"
              v-else-if="currMode === 2"
              @backtoItem="backtoItem"
              :style="{
                backfaceVisibility: 'hidden',
              }"
              @onHold="onStart"
              @onRelease="onEnd"
            />
            <CardSubItemDetail
              :key="3"
              :data="subDetail"
              v-else-if="currMode === 3"
              @backtoItem="backtoItem"
              @onHold="onStart"
              @onRelease="onEnd"
              :style="{
                backfaceVisibility: 'hidden',
              }"
            />

            <CardReview
              :key="4"
              :data="value"
              :detail="detail"
              v-else-if="currMode === 4"
              @backtoItem="backtoItem"
              @onHold="onStart"
              @onRelease="onEnd"
              @onDone="submitCard"
              :style="{
                backfaceVisibility: 'hidden',
              }"
            />
          </div>
        </Card>
      </div>
    </div>
    <div class="flex absolute bottom-0 w-full p-[14px] justify-center left-0">
      <div class="flex justify-around max-w-[450px] w-full">
        <CdxButton
          weight="quiet"
          class="h-[34px]"
          @click="nextCard"
          :disabled="undoWarn"
        >
          <img :src="skip" alt="home" />
          <CdxLabel class="text-[16px] pb-0">Lewati</CdxLabel>
        </CdxButton>
        <CdxButton weight="quiet" class="h-[34px]" @click="endEarly">
          <CdxIcon :icon="cdxIconSuccess" alt="home" />
          <CdxLabel class="text-[16px] pb-0">Akhiri sesi</CdxLabel>
        </CdxButton>
      </div>
    </div>
    <Transition name="undo" mode="out-in">
      <div
        :key="undoWarn"
        v-if="undoWarn"
        :class="['absolute bottom-0 bg-black w-full']"
      >
        <v-progress-linear
          v-model="progress2.number"
          color="#3366CC"
          class="absolute"
        ></v-progress-linear>
        <div class="p-[16px] text-white flex items-center justify-between">
          <p>Kartu Dilewati.</p>
          <div
            class="flex gap-x-2 items-center cursor-pointer"
            @click="undoCard"
          >
            <CdxIcon class="text-white" :icon="cdxIconUndo" alt="undo" />
            <p style="padding-bottom: 0px"><b>Urungkan</b></p>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <WarningDialog :count="currCount - 1" ref="testing" />
  <CompleteDialog ref="completeRef" />
</template>

<style>
.is-flipped {
  transform: translateX(0) rotateY(360deg);
}

.undo-enter-active {
  transition: all 0.5s;
}

.undo-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.undo-enter-from,
.undo-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-height: 600px) {
  .custom-height {
    height: 70vh;
  }
}

@media (max-height: 700px) and (min-height: 601px) {
  .custom-height {
    height: 75vh;
  }
}

@media (max-height: 915px) and (min-height: 701px) {
  .custom-height {
    height: 80vh;
  }
}

@media (min-height: 916px) {
  .custom-height {
    height: 85vh;
  }
}

.v-progress-linear {
  transition-duration: 0ms !important;
}

.skipall {
  animation: swipeCardRight 0.3s;
  transform: translateX(1000px);
}

@keyframes swipeCardRight {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    transform: translateX(1000px);
    opacity: 0;
  }
}
</style>
