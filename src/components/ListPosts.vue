<script setup lang="ts">
import type { Post } from '~/types'
import { useRouter } from 'vue-router/auto'

import { englishOnly, formatDate } from '~/logics/index'

const props = defineProps<{
  type?: string
  posts?: Post[]
  extra?: Post[]
}>()

const router = useRouter()
const routes: Post[] = router.getRoutes()
  // .filter(i => i.path.endsWith('.vue'))
  .filter(i => i.path.startsWith('/posts') && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
  .filter(i => !i.path.endsWith('.html') && (i.meta.frontmatter.type || 'blog').split('+').includes(props.type))
  .map(i => ({
    path: i.meta.frontmatter.redirect || i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    lang: i.meta.frontmatter.lang,
    duration: i.meta.frontmatter.duration,
    recording: i.meta.frontmatter.recording,
    upcoming: i.meta.frontmatter.upcoming,
    redirect: i.meta.frontmatter.redirect,
    place: i.meta.frontmatter.place,
  }))
console.log(routes)

const posts = computed(() =>
  [...(props.posts || routes), ...props.extra || []]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .filter(i => !englishOnly.value || !i.lang || i.lang === 'en'),
)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Post, b?: Post) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Post) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="route, idx in posts" :key="route.path">
      <div
        v-if="!isSameGroup(route, posts[idx - 1])"
        select-none relative h20 pointer-events-none slide-enter
        :style="{
          '--enter-stage': idx - 2,
          '--enter-step': '60ms',
        }"
      >
        <span text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 text-stroke-hex-aaa op10>{{ getGroupName(route) }}</span>
      </div>
      <div
        class="slide-enter"
        :style="{
          '--enter-stage': idx,
          '--enter-step': '60ms',
        }"
      >
        <component
          :is="route.path.includes('://') ? 'a' : 'RouterLink'"
          v-bind="
            route.path.includes('://') ? {
              href: route.path,
              target: '_blank',
              rel: 'noopener noreferrer',
            } : {
              to: route.path,
            }
          "
          class="item block font-normal mb-6 mt-2 no-underline"
        >
          <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
              <span
                v-if="route.lang === 'zh'"
                align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 ml--12 mr2 my-auto hidden md:block"
              >中文</span>
              <span
                v-if="route.lang === 'ja'"
                align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 ml--15 mr2 my-auto hidden md:block"
              >日本語</span>
              <span align-middle>{{ route.title }}</span>
              <span
                v-if="route.redirect"
                align-middle op50 flex-none text-xs ml--1.5
                i-carbon-arrow-up-right
                title="External"
              />
            </div>

            <div flex="~ gap-2 items-center">
              <span
                v-if="route.inperson"
                align-middle op50 flex-none
                i-ri:group-2-line
                title="In person"
              />
              <span
                v-if="route.recording || route.video"
                align-middle op50 flex-none
                i-ri:film-line
                title="Provided in video"
              />
              <span
                v-if="route.radio"
                align-middle op50 flex-none
                i-ri:radio-line
                title="Provided in radio"
              />

              <span text-sm op50 ws-nowrap>
                {{ formatDate(route.date, true) }}
              </span>
              <span v-if="route.duration" text-sm op40 ws-nowrap>· {{ route.duration }}</span>
              <span v-if="route.platform" text-sm op40 ws-nowrap>· {{ route.platform }}</span>
              <span v-if="route.place" text-sm op40 ws-nowrap md:hidden>· {{ route.place }}</span>
              <span

                align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 my-auto md:hidden"
              >中文</span>
            </div>
          </li>
          <div v-if="route.place" op50 text-sm hidden mt--2 md:block>
            {{ route.place }}
          </div>
        </component>
      </div>
    </template>
  </ul>
</template>
