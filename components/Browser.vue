<template>
  <div class="browser-wrapper">
    <div class="browser-head">
      <div class="window-controls">
        <span><i class="fad fa-close"></i></span>
        <span><i class="fad fa-minus"></i></span>
        <span><i class="fad fa-plus"></i></span>
      </div>

      <div class="url-bar">
        <span class="url-controls">
          <span class="url-controls__item left">
            <i class="fad fa-lock"></i>
          </span>
        </span>

        <span class="url-protocol">
          <a href="https://patreon.com/classicminidiy" target="_blank"> https:// </a>
        </span>

        <a href="https://patreon.com/classicminidiy" target="_blank" class="url-txt"> patreon.com/classicminidiy </a>
      </div>
    </div>

    <div class="browser-inner"></div>
  </div>
</template>
<style lang="scss" scoped>
  a,
  a:hover,
  a:focus,
  a:active {
    color: inherit;
    text-decoration: none;
    transition: all 0.5s;
  }

  img {
    vertical-align: middle;
    max-width: 100%;
  }

  .browser-wrapper {
    display: block;
    max-width: 700px;
    width: 100%;
    margin: 3vh auto;
    height: 400px;
    background: #fff;
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 9px 9px 30px 0 rgba(1, 50, 101, 0.21);
  }

  .browser-head {
    display: flex;
    background: #fff;
    color: #1c4360;
    width: 100%;
    padding: 5px 25px;
    align-items: center;
    height: 80px;
  }

  .window-controls {
    display: flex;
    width: 110px;
    justify-content: center;
    margin-right: 20px;

    span {
      display: block;
      width: 18px;
      height: 18px;
      background: #ededed;
      border-radius: 50%;
      margin-left: 10px;

      .fa-close {
        left: 4px;
        top: -3px;
      }

      .fa-minus {
        left: 3px;
        top: -3px;
        font-size: 15px;
      }
      .fa-plus {
        left: 2px;
        top: -4px;
      }

      &:first-of-type {
        margin-left: 0;
      }
    }
  }

  .url-bar {
    display: flex;
    width: 100%;
    box-shadow: 0px 3px 21px 0px rgba(81, 81, 81, 0.11);
    padding: 10px 15px;
    border-radius: 6px;
    height: 50px;
    align-items: center;
    position: relative;
  }

  .url-controls {
    display: flex;

    &__item {
      display: block;
      width: 25px;
      pointer-events: none;

      &.left {
        display: block;
      }

      &.right {
        display: block;
      }
    }
  }

  .url-protocol {
    padding: 10px;
    background: #ededed;
    border-radius: 5px;
    margin: 0 20px 0 15px;
    color: #515151;
    opacity: 0.5;
    font-weight: 500;
  }

  .url-txt {
    display: block;
    color: #515151;
    opacity: 0.5;
    font-weight: 500;

    &:hover {
      opacity: 0.8;
    }
  }

  .url-next {
    display: block;
    width: 25px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .browser-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('/img/patreon-promo.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .scrollbar-track {
    background: transparent !important;
  }

  .scrollbar-thumb {
    background: rgba(50, 50, 50, 0.25) !important;
  }
</style>
