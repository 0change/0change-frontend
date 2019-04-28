<template>
  <div class="generalModal" v-if="visible">
    <div class="bgMask" ref="bgMask" @click="hide()"></div>
    <div ref="modalBox" class="generalModalContent" :class="{floatHeight:floatHeight}">
      <div class="modalHeader flexContainer">
        <div class="flexItem">
          <span class="modal-title">{{title}}</span>
        </div>
        <div class="btnCloseModal" @click="hide()">
          <BaseIcon name="times"/>
        </div>
      </div>
      <div class="modalPadding">
        <slot></slot>
      </div>
    </div>

    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <div id="maskModal" v-if="showMask"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        visible: false,
        showMask: false,
        parentElement: null
      }
    },
    methods: {
      show(event) {
        this.parentElement = event ? event.currentTarget : null;
        this.visible = true;

        let comp = this;
        comp.showMask = false;
        setTimeout(function () {
          comp.showMask = true;
        }, 50);
        setTimeout(function () {
          comp.$refs.bgMask.style.opacity = 1;
        }, 100);
        // document.getElementsByTagName('html')[0].classList.add("is-clipped");
        this.$emit('show');
      },
      hide() {
        this.showMask = false;

        let comp = this;
        comp.$refs.bgMask.style.opacity = 0;
        setTimeout(function () {
          comp.visible = false;
          // document.getElementsByTagName('html')[0].classList.remove("is-clipped");
        }, 500);
        //this.visible = false;
        this.$emit('hide');
      },
      beforeEnter(el) {
        if (!this.parentElement)
          return;
        let rect = this.parentElement.getBoundingClientRect();
        el.style.left = rect.left + "px";
        el.style.top = rect.top + "px";
        el.style.width = rect.width + "px";
        el.style.height = rect.height + "px";
        el.style.display = "block";
        el.style.opacity = 1;
        el.style.transition = "none";
      },
      enter(el, done) {
        let modalBox = this.$refs.modalBox;
        modalBox.style.opacity = 0;
        if (this.parentElement) {
          modalBox.style.transition = "none";
          let rect = modalBox.getBoundingClientRect();
          el.style.left = rect.left + "px";
          el.style.top = rect.top + "px";
          el.style.width = rect.width + "px";
          el.style.height = rect.height + "px";
          el.style.transition = "all 300ms ease-out";
          el.style['-moz-transition'] = "all 300ms ease-out";
          el.style['-webkit-transition'] = "all 300ms ease-out";
          setTimeout(function () {
            el.style.transition = "all 100ms";
            el.style.opacity = 0;
            modalBox.style.opacity = 1;
            setTimeout(function () {
              el.style.transition = "none";
              el.style.display = "none";
            }, 100)
          }, 300);
        } else {
          modalBox.style.transition = "all 300ms ease-out";
          modalBox.style.opacity = 1;
        }

      },
      leave(el, done) {
        let modalBox = this.$refs.modalBox;
        el.style.display = "block";
        setTimeout(function () {
          el.style.transition = "opacity 100ms";
          el.style.opacity = 1;
        });
        if (this.parentElement) {
          modalBox.style.transition = "none";
          let rect = this.parentElement.getBoundingClientRect();
          setTimeout(function () {
            modalBox.style.display = "none";
            el.style.left = rect.left + "px";
            el.style.top = rect.top + "px";
            el.style.width = rect.width + "px";
            el.style.height = rect.height + "px";
            el.style.transition = "all 300ms ease-out";
            el.style['-moz-transition'] = "all 300ms ease-out";
            el.style['-webkit-transition'] = "all 300ms ease-out";
          }, 100);
        } else {
          modalBox.style.transition = "all 300ms ease-out";
          modalBox.style.opacity = 0;
        }
      },
    },
    props: {
      title: {
        type: String,
      },
      floatHeight: {
        type: Boolean,
        default: false,
      },
    }
  };
</script>

<style scoped>
  .modal-title{
    font-size: 1.2em;
    font-weight: bold;
  }
  #maskModal {
    position: absolute;
    background: #fff;
    border-radius: 5px;
  }

  .bgMask {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .3);
    transition: opacity 400ms ease-out;
    -moz-transition: opacity 400ms ease-out;
    -webkit-transition: opacity 400ms ease-out;
    opacity: 0;
    top: 0;
    left: 0;
  }

  .generalModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    z-index: 50;
    height: 100%;
    width: 100%;
  }

  .modalHeader {
    border-bottom: 1px solid #ddd;
    padding: 0 1em;
    line-height: 3em;
    color: #666;
  }

  .btnCloseModal {
    color: #ddd;
    text-align: center;
    display: inline-block;
    border-radius: 60px;
    border: 1px solid #ddd;
    cursor: pointer;
    line-height: 1em;
    margin: .5em 0;
    width: 2em;
    height: 2em;
    padding: .5em 0;
  }

  .btnCloseModal:hover {
    color: #aaa;
  }

  .modalPadding {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .generalModalContent {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    border-radius: 5px;
    width: 100%;
    /*height: 100%;*/
    max-width: 30em;
    max-height: 40em;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
  }

  .floatHeight {
    height: auto;
  }

  .input1 {
    background: #f7f7f7;
    border: 1px solid #ddd;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

</style>
