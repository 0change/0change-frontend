<script>
export default {
  props: {
    loginProtect:{
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: '',
    },
    allowInsecure: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    target: {
      type: String,
      default: '_self'
    },
    _class: {
      type: String,
      default: ""
    }
  },
  computed: {
    routerLinkTo({ name, params }) {
      return {
        name,
        params,
        ...(this.to || {}),
      }
    },
    linkDisabled(){
      return this.loginProtect && !this.$auth.loggedIn;
    }
  },
  created() {
    this.validateProps()
  },
  methods: {
    protectionAlert(){
      alert('You are not logged in. Login please and try again.');
    },
    // Perform more complex prop validations than is possible
    // inside individual validator functions for each prop.
    validateProps() {
      if (process.env.NODE_ENV === 'production') return

      if (this.href) {
        // Check for non-external URL in href.
        if (!/^\w+:/.test(this.href)) {
          return console.warn(
            `Invalid <BaseLink> href: ${
              this.href
            }.\nIf you're trying to link to a local URL, provide at least a name or to`
          )
        }
        // Check for insecure URL in href.
        if (!this.allowInsecure && !/^https/.test(this.href)) {
          return console.warn(
            `Insecure <BaseLink> href: ${
              this.href
            }.\nWhen linking to external sites, always prefer https URLs. If this site does not offer SSL, explicitly add the allow-insecure attribute on <BaseLink>.`
          )
        }
      } else {
        // Check for insufficient props.
        if (!this.name && !this.to) {
          return console.warn(
            `Invalid <BaseLink> props:\n\n${JSON.stringify(
              this.$props,
              null,
              2
            )}\n\nEither a \`name\` or \`to\` is required for internal links, or an \`href\` for external links.`
          )
        }
      }
    },
  },
}
</script>

<template>
  <a :class="_class" v-if="linkDisabled" v-bind="$attrs" href="#" @click="protectionAlert">
      <slot/>
  </a>
  <a :class="_class" v-else-if="href" v-bind="$attrs" :href="href" target="_blank">
      <slot/>
  </a>
  <nuxt-link :class="_class" v-else v-bind="$attrs" :to="routerLinkTo" :target="target">
      <slot/>
  </nuxt-link>
</template>
