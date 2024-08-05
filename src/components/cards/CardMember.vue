<script setup lang="ts">
import { Color } from '@/scripts/color'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, type PropType } from 'vue'

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
  return props.color.normalize().withAlpha(1).toCss()
})
const tintSoft = computed(() => {
  return props.color.normalize().withAlpha(0.5).toCss()
})
const tintMute = computed(() => {
  return props.color.normalize().withAlpha(0.2).toCss()
})
const tintSelection = computed(() => {
  return props.color.normalize().withAlpha(0.1).toCss()
})
</script>

<template>
  <div class="card blur font-space-grotesk">
    <div class="header">
      <img class="avatar" :src="avatar" />
      <div class="title">
        <h1 class="title-name">
          <slot name="name"></slot>
        </h1>

        <div class="decoration-tags">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="tag"
            :style="{
              '--color-tag': typeof tag === 'object' ? tag.color.toCss() : 'var(--color-tint)',
              '--color-tag-text':
                typeof tag === 'object' && tag.textColor
                  ? (tag.textColor || props.color).toCss()
                  : 'var(--color-background)'
            }"
          >
            <slot :name="`tag:${index}`">
              {{ typeof tag === 'object' ? tag.name : tag }}
            </slot>
          </div>
        </div>
      </div>

      <div class="subtitle">
        <div class="subtitle-description">
          <slot name="description"></slot>
        </div>

        <div class="decoration-links">
          <div v-for="(link, index) in links" :key="index" class="link">
            <a :href="link.url" class="link-name">{{ link.name }}</a>
            <a :href="link.url" class="link-icon">
              <slot :name="`link-icon:${link.name}`">
                <FontAwesomeIcon :icon="link.faIcon || ['fas', 'link']" />
              </slot>
            </a>
          </div>
        </div>
      </div>
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
  overflow: scroll;
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

    .title-name {
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
    }
  }

  .subtitle {
    grid-area: subtitle;

    display: grid;
    grid-template-areas: 'desc links';
    grid-template-columns: 1fr auto;

    .subtitle-description {
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

.link {
  display: flex;
  justify-content: center;
  align-items: center;
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
}

.tag {
  font-size: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: first baseline;

  padding: 0.1rem 0.8rem;
  border-radius: 0.4rem;

  color: var(--color-tag-text);
  background: var(--color-tag);
}
</style>
