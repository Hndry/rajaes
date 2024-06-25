<script setup>
import Logo from "@/assets/lexica_logo.svg";
import Login from "@/assets/login.svg";
import ButtonIcon from "@/components/buttons/ButtonIcon/index.vue";
import { onMounted, ref, watch, toRaw } from "vue";
import { useCookies } from "vue3-cookies";
import { CdxIcon, CdxButton, CdxMenuButton, CdxLabel } from "@wikimedia/codex";
import { cdxIconUserAvatar, cdxIconLogOut } from "@wikimedia/codex-icons";

const { cookies } = useCookies();

const testRef = ref(null);
const isAuth = ref(null);
const selected = ref(null);
const menu = ref(false);
const menuItems = [{ label: "Keyboard shortcuts", value: "logout" }];

const emit = defineEmits(["logout"]);

onMounted(() => {
  isAuth.value = cookies.get("auth");
});

watch(selected, () => {
  console.log(toRaw(selected.value));
});

const temp = (e) => {
  const a = testRef.value;

  const closeListerner = (event) => {
    if (catchOutsideClick(event, toRaw(a))) {
      window.removeEventListener("click", closeListerner);
      menu.value = false;
    }
  };

  window.addEventListener("click", closeListerner);
};

const catchOutsideClick = (event, dropdown) => {
  // When user clicks menu — do nothing
  if (dropdown == event.target) return false;

  // When user clicks outside of the menu — close the menu
  if (menu.value && dropdown != event.target) return true;
};
</script>

<template>
  <header
    class="h-[54px] border-b-[1px] border-[#C8CCD1] fixed flex justify-end items-center w-full bg-white left-0"
  >
    <div class="absolute w-full flex justify-center items-center h-full">
      <img :src="Logo" alt="lexica_logo" />
    </div>

    <button-icon v-if="!isAuth" :imgSrc="Login" alt="login" customClass="" />

    <button
      ref="testRef"
      v-else
      class="z-[5] dropdown border-0 bg-white p-[12px]"
      @click="
        (e) => {
          temp(e);
          menu = !menu;
        }
      "
    >
      <CdxIcon
        :icon="cdxIconUserAvatar"
        class="cursor-pointer pointer-events-none"
      />
      <div class="dropdown-content" :class="menu ? 'flex' : 'hidden'">
        <div class="flex gap-x-2">
          <CdxIcon :icon="cdxIconUserAvatar" />
          <CdxLabel class="text-[16px] p-0">Raisha (WXC)</CdxLabel>
        </div>

        <CdxButton @click="emit('logout')"
          ><CdxIcon :icon="cdxIconLogOut" /> Keluar log</CdxButton
        >
      </div>
    </button>
    <div class="z-[5] dropdown"></div>
  </header>
</template>

<style>
.dropdown-content {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: white;
  min-width: 160px;
  border: 1px solid black;
  z-index: 9999;
  padding: 16px 12px;

  flex-direction: column;
  row-gap: 16px;
}
</style>
