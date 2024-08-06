<script setup>
import { ref, onMounted } from 'vue';
import { vInfiniteScroll } from '@vueuse/components';
import { ProfileService } from '@/service/ProfileService';
import { useWebApp, useWebAppViewport } from 'vue-tg';
import { useToast } from 'primevue/usetoast';

let urlParams = new URLSearchParams(window.location.search);
const bot_id = urlParams.get('bot');

const toast = useToast();
const { initData } = useWebApp();
const { expand } = useWebAppViewport();

let params = {};
const profiles = ref([]);
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);
let canLoad = 0;
let last = 3000000000;

const carouselResponsiveOptions = ref([
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

const loadSettings = function () {
    profileService.getSettings(bot_id, initData).then((res) => {
        params = res;
        loadProfiles();
    });
};

function loadProfiles() {
    if (canLoad === 0 || (canLoad === 1 && coors())) {
        profileService.getProfiles(bot_id, initData, last).then((res) => {
            if (res.length > 0) {
                profiles.value = [...profiles.value, ...res];
                last = profiles.value[profiles.value.length - 1].last;
            }
            if (res.length < 10) {
                canLoad = -1;
            } else {
                canLoad = 1;
            }
        });
    }
}

const askStartingDialog = (user_id) => {
    profileService.askStartingDialog(bot_id, initData, user_id).then((res) => {
        if (res.ok) {
            toast.add({ severity: 'success', summary: getParam('ask_success'), life: 4000 });
        } else if (res.detail !== '') {
            toast.add({ severity: 'error', summary: getParam('ask_failed'), detail: res.detail, life: 7000 });
        } else {
            toast.add({ severity: 'error', summary: getParam('ask_failed'), life: 4000 });
        }
    });
};

const coors = function () {
    let elements = document.getElementById('profiles').children;
    return elements.item(elements.length - 2).getBoundingClientRect().top <= window.innerHeight;
};

const profileService = new ProfileService();

onMounted(() => {
    expand?.();
    loadSettings();
});

const getPhotos = (profile) => {
    return Array.from({ length: profile.photos }, (_, i) => i + 1);
};

const getParam = (key) => {
    return params[key];
};
</script>

<template>
    <DataView :value="profiles" :layout="layout" :paginator="false" :rows="10" :sortOrder="sortOrder" :sortField="sortField">
        <template #grid="slotProps">
            <div id="profiles" class="grid grid-nogutter" v-infinite-scroll="[loadProfiles, { interval: 200 }]">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 p-2">
                    <div class="p-2 border-1 surface-border surface-card border-round flex flex-column">
                        <div class="relative mx-auto">
                            <Carousel :value="getPhotos(item)" :numVisible="1" :numScroll="1" :responsiveOptions="carouselResponsiveOptions" :circular="true">
                                <template #item="props">
                                    <img :src="'https://tg-chat.online/api/photo?id=' + item.id + '&photo=' + props.data" class="w-full h-20rem border-round" style="object-fit: cover" alt="" />
                                </template>
                            </Carousel>
                            <div
                                class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2 absolute"
                                style="right: 45px; top: 6px; border-radius: 30px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.1)"
                            >
                                <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                <i class="pi pi-star-fill text-yellow-500"></i>
                            </div>
                            <Tag severity="success" class="absolute" style="left: 45px; bottom: 52px">
                                <div class="flex align-items-center gap-2 px-1">
                                    <img alt="Country" :src="'https://tg-chat.online/flags/' + item.lang + '.png'" style="width: 24px" />
                                    <span class="text-base">{{ item.age }}</span>
                                </div>
                            </Tag>
                        </div>
                        <div class="flex flex-row justify-content-between align-items-start gap-2">
                            <div>
                                <div class="text-lg font-normal text-700 mt-1">{{ item.about }}</div>
                                <div class="font-italic text-900 mt-2">{{ item.i18n_about }}</div>
                            </div>
                        </div>
                        <div class="flex flex-column gap-4 mt-4">
                            <div class="flex gap-2">
                                <Button icon="pi pi-comment" :label="getParam('ask_button')" @click="askStartingDialog(item.id)" class="flex-auto white-space-nowrap"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>
