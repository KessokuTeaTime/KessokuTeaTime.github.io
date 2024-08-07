<script setup lang="ts">
import { Color } from '@/scripts/color'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, onUnmounted, ref, type PropType } from 'vue'
import SafeTeleport from '../utils/SafeTeleport.vue'

const props = defineProps({
  avatar: {
    type: String,
    default: ''
  },
  color: {
    type: Color,
    default: Color.pink
  },
  links: {
    type: Array as PropType<{ name: string; url: string; faIcon?: string[] }[]>,
    default: () => []
  },
  tags: {
    type: Array as PropType<(string | { name: string; color: Color; textColor?: Color })[]>,
    default: () => []
  }
})

const tint = computed(() => {
  return props.color.withAlpha(1).toRGBA()
})
const tintSoft = computed(() => {
  return props.color.withAlpha(0.5).toRGBA()
})
const tintMute = computed(() => {
  return props.color.withAlpha(0.2).toRGBA()
})
const tintSelection = computed(() => {
  return props.color.withAlpha(0.1).toRGBA()
})

const refTitle = ref<HTMLElement | null>(null)
const refSubtitle = ref<HTMLElement | null>(null)

const refTags = ref<HTMLElement | null>(null)
const refLinks = ref<HTMLElement | null>(null)

function onMaskedScroll(event: Event) {
  if (event.target instanceof HTMLElement) {
    onMaskedElementScroll(event.target)
  }
}
function onMaskedElementScroll(el: HTMLElement) {
  const canScroll = el.scrollWidth > el.clientWidth
  const width = el.scrollWidth - el.clientWidth
  const scroll = 1 - Math.abs(el.scrollLeft / width)

  const start = canScroll ? (scroll <= 0 ? 1 : 0) : 1
  const end = canScroll ? (scroll >= 1 ? 1 : 0) : 1
  el.style.setProperty('--mask-opacity-start', String(start))
  el.style.setProperty('--mask-opacity-end', String(end))
}

onMounted(() => {
  function onTagsScroll() {
    if (refTags.value) {
      onMaskedElementScroll(refTags.value)
    }
  }
  onTagsScroll()
  window.addEventListener('resize', onTagsScroll)

  function onLinksScroll() {
    if (refLinks.value) {
      onMaskedElementScroll(refLinks.value)
    }
  }
  onLinksScroll()
  window.addEventListener('resize', onLinksScroll)

  onUnmounted(() => {
    window.removeEventListener('resize', onTagsScroll)
    window.removeEventListener('resize', onLinksScroll)
  })
})
</script>

<template>
  <div class="card blur font-space-grotesk">
    <div class="header">
      <img class="avatar" :src="avatar" />

      <div class="title" ref="refTitle">
        <div
          class="decoration-tags disable-scrollbars overflow-scroll-mask"
          ref="refTags"
          @scroll="onMaskedScroll"
        >
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="tag"
            :style="{
              '--color-tag': typeof tag === 'object' ? tag.color.toRGBA() : tint,
              '--color-tag-text':
                typeof tag === 'object' && tag.textColor
                  ? (tag.textColor || props.color).toRGBA()
                  : 'var(--color-background)'
            }"
          >
            <slot :name="`tag:${index}`">
              {{ typeof tag === 'object' ? tag.name : tag }}
            </slot>
          </div>
        </div>
      </div>

      <div class="subtitle" ref="refSubtitle">
        <div class="description">
          <slot name="description"></slot>
        </div>
      </div>

      <SafeTeleport :to="$screen.width >= 1024 ? refSubtitle : refTitle" auto-update>
        <div
          class="decoration-links disable-scrollbars overflow-scroll-mask"
          ref="refLinks"
          @scroll="onMaskedScroll"
        >
          <div v-for="(link, index) in links" :key="index" class="link">
            <a :href="link.url" class="link-name">{{ link.name }}</a>
            <a :href="link.url" class="link-icon">
              <slot :name="`link-icon:${link.name}`">
                <FontAwesomeIcon :icon="link.faIcon || ['fas', 'link']" />
              </slot>
            </a>
          </div>
        </div>
      </SafeTeleport>

      <SafeTeleport :to="$screen.width >= 1024 ? refTitle : refSubtitle" auto-update>
        <h1 class="name">
          <slot name="name"></slot>
        </h1>
      </SafeTeleport>
    </div>
    <div class="footer blur">
      <div class="body"></div>
    </div>
  </div>
</template>

<style scoped>
.blur {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.card {
  width: 100%;
  border-radius: 8px;

  background: var(--color-background-mute);
  border: 2px solid var(--color-background-soft);

  --color-link: v-bind(tint);
  --color-link-soft: v-bind(tintSoft);
  --color-link-mute: v-bind(tintMute);
  --color-selection: v-bind(tintSelection);

  display: grid;
  grid-template-areas:
    'header'
    'footer';

  &:hover {
    scale: 1.02;
  }

  transition: scale 0.4s;
  overflow: hidden;
}

.header {
  grid-area: header;

  padding: 1rem;
  column-gap: 1rem;

  display: grid;
  grid-template-areas:
    'avatar title   '
    'avatar subtitle';
  grid-template-columns: 5rem 1fr;
  grid-template-rows: 0.618fr 0.382fr;

  .avatar {
    grid-area: avatar;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: v-bind(tint);
  }

  .title {
    grid-area: title;

    display: grid;
    grid-template-areas: 'name tags';
    grid-template-columns: 1fr auto;
    gap: 1rem;

    .name {
      grid-area: name;

      display: flex;
      justify-content: flex-start;
      align-items: end;
    }

    .decoration-tags {
      grid-area: tags;

      gap: 0.5rem;

      display: flex;
      justify-content: flex-end;
      align-items: start;

      overflow: scroll;
    }
  }

  .subtitle {
    grid-area: subtitle;

    display: grid;
    grid-template-areas: 'desc links';
    grid-template-columns: 1fr auto;
    gap: 1rem;

    .description {
      grid-area: desc;

      display: flex;
      justify-content: flex-start;
      align-items: start;
    }

    .decoration-links {
      grid-area: links;

      gap: 0.8rem;

      display: flex;
      justify-content: flex-end;
      align-items: end;
    }
  }
}

.footer {
  grid-area: footer;

  display: grid;
  grid-template-areas: 'body';

  .body {
    grid-area: body;

    padding: 2rem;
    background: var(--color-background-soft);
  }
}

@media (width < 1024px) {
  .header {
    grid-template-areas:
      'avatar   title   '
      'subtitle subtitle';
    grid-template-columns: 5rem 1fr;
    gap: 1rem;

    .title {
      grid-template-areas:
        'tags '
        'links';
      grid-template-rows: auto 1fr;

      .decoration-links {
        grid-area: links;

        gap: 0.8rem;

        display: flex;
        justify-content: flex-end;
        align-items: end;

        overflow: scroll;
      }
    }

    .subtitle {
      grid-template-areas:
        'name'
        'desc';
      grid-template-rows: auto 1fr;
      gap: 0;
    }
  }
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  gap: 0.2rem;

  .link-icon {
    display: flex;
    justify-content: center;
    align-items: end;

    width: 1.5rem;
    aspect-ratio: 1/1;
    padding: 0.2rem;

    border: none;

    > * {
      width: 100%;
      height: 100%;
    }
  }

  .link-name {
    padding: 0.2rem 0 0 0;
    color: var(--color-link-soft);

    &:hover {
      color: var(--color-link);
    }
  }

  flex-shrink: 0;
}

.tag {
  display: flex;
  justify-content: center;
  align-items: first baseline;

  padding: 0.2rem 0.8rem;
  border-radius: 0.6rem;

  color: var(--color-tag-text);
  background: var(--color-tag);

  flex-shrink: 0;
}

.overflow-scroll-mask {
  --mask-fade-radius-start: 2rem;
  --mask-fade-radius-end: 2rem;

  mask: linear-gradient(
    to right,
    rgba(255, 255, 255, var(--mask-opacity-start)) 0%,
    black var(--mask-fade-radius-start),
    black calc(100% - var(--mask-fade-radius-end)),
    rgba(255, 255, 255, var(--mask-opacity-end)) 100%
  );
}
</style>
