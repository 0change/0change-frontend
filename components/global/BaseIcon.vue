<script>
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
  import camelCase from 'lodash/camelCase'

  export default {
    components: {
      FontAwesomeIcon,
    },
    props: {
      source: {
        type: String,
        default: 'font-awesome',
      },
      name: {
        type: String,
        required: true,
      },
    },
    computed: {
      // https://fontawesome.com/icons
      fontAwesomeIcon() {
        return {
          // Add new icons to this list as you need them
          sync: require('@fortawesome/free-solid-svg-icons/faSync').definition,
          signOut: require('@fortawesome/free-solid-svg-icons/faSignOutAlt').definition,
          user: require('@fortawesome/free-solid-svg-icons/faUser').definition,
          times: require('@fortawesome/free-solid-svg-icons/faTimes').definition,
          plus: require('@fortawesome/free-solid-svg-icons/faPlus').definition,
          minus: require('@fortawesome/free-solid-svg-icons/faMinus').definition,
          chevronDown: require('@fortawesome/free-solid-svg-icons/faChevronDown').definition,
          chevronUp: require('@fortawesome/free-solid-svg-icons/faChevronUp').definition,
          chevronLeft: require('@fortawesome/free-solid-svg-icons/faChevronLeft').definition,
          chevronRight: require('@fortawesome/free-solid-svg-icons/faChevronRight').definition,
          mapMarker: require('@fortawesome/free-solid-svg-icons/faMapMarkerAlt').definition,
          plane: require('@fortawesome/free-solid-svg-icons/faPlane').definition,
          spinner: require('@fortawesome/free-solid-svg-icons/faSpinner').definition,
          star: require('@fortawesome/free-solid-svg-icons/faStar').definition,
          sort: require('@fortawesome/free-solid-svg-icons/faSort').definition,
          filter: require('@fortawesome/free-solid-svg-icons/faFilter').definition,
          check: require('@fortawesome/free-solid-svg-icons/faCheck').definition,
          globe: require('@fortawesome/free-solid-svg-icons/faGlobe').definition,
          phone: require('@fortawesome/free-solid-svg-icons/faPhone').definition,
          utensils: require('@fortawesome/free-solid-svg-icons/faUtensils').definition,
          home: require('@fortawesome/free-solid-svg-icons/faHome').definition,
          bars : require('@fortawesome/free-solid-svg-icons/faBars').definition,
          lock: require('@fortawesome/free-solid-svg-icons/faLock').definition,
          cog: require('@fortawesome/free-solid-svg-icons/faCog').definition,
          hotel: require('@fortawesome/free-solid-svg-icons/faHotel').definition,
          edit: require('@fortawesome/free-solid-svg-icons/faEdit').definition,
          download: require('@fortawesome/free-solid-svg-icons/faDownload').definition,
          caretRight: require('@fortawesome/free-solid-svg-icons/faCaretRight').definition,
          caretLeft: require('@fortawesome/free-solid-svg-icons/faCaretLeft').definition,
          mug: require('@fortawesome/free-solid-svg-icons/faMugHot').definition,
          thumbsUp: require('@fortawesome/free-solid-svg-icons/faThumbsUp').definition,
          commentDots: require('@fortawesome/free-solid-svg-icons/faCommentDots').definition,
        }[this.name]
      },
      // Gets a CSS module class, e.g. iconCustomLogo
      customIconClass() {
        return this.$style[camelCase('icon-custom-' + this.name)]
      },
    },
  }
</script>

<template>
  <FontAwesomeIcon
    v-if="source === 'font-awesome'"
    :icon="fontAwesomeIcon"
    class="fa fa-fw"
    v-bind="$attrs"
  />
  <span
    v-else-if="source === 'custom'"
    :class="customIconClass"
  />
</template>
