<script lang="ts" setup>
  import { ArchiveItems, ToolboxItems } from '~/data/models/generic';
</script>

<template>
  <div class="navbar bg-base-100 py-3">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a href="https://classicminidiy.substack.com/" target="_blank">
              <span><i class="fad fa-pencil"></i></span> Blog</a
            >
          </li>
          <li>
            <nuxt-link to="/maps">
              <span><i class="fad fa-computer-classic"></i></span> Maps</nuxt-link
            >
          </li>
          <li>
            <a href="https://classicminidiy.substack.com/" target="_blank">
              <span><i class="fad fa-store"></i></span> Store</a
            >
          </li>
          <li>
            <p>Archive</p>
            <ul class="p-2">
              <li v-for="item in ArchiveItems">
                <nuxt-link :to="item.to"> <span v-html="item.iconHtml"></span> {{ item.title }} </nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <p>Parent</p>
            <ul class="p-2">
              <li v-for="item in ToolboxItems">
                <nuxt-link :to="item.to"> <span v-html="item.iconHtml"></span> {{ item.title }} </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <NuxtLink :to="'/'" class="d-inline-block">
        <nuxt-img
          alt="Classic Mini DIY Logo"
          src="https://classicminidiy.s3.amazonaws.com/misc/Small-Black.png"
          class="w-32"
        />
      </NuxtLink>
    </div>
    <div class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <a href="https://classicminidiy.substack.com/" target="_blank">
            <span><i class="fad fa-pencil"></i></span> Blog</a
          >
        </li>
        <li>
          <nuxt-link to="/maps">
            <span><i class="fad fa-computer-classic"></i></span> Maps</nuxt-link
          >
        </li>
        <li>
          <a href="https://classicminidiy.substack.com/" target="_blank">
            <span><i class="fad fa-store"></i></span> Store</a
          >
        </li>
        <li>
          <details>
            <summary><i class="fad fa-books"></i>Archive</summary>
            <ul class="p-2">
              <li v-for="item in ArchiveItems" class="w-40 z-50">
                <nuxt-link :to="item.to"> <span v-html="item.iconHtml"></span> {{ item.title }} </nuxt-link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary><i class="fad fa-toolbox"></i>Toolbox</summary>
            <ul class="p-2">
              <li v-for="item in ToolboxItems" class="w-40">
                <nuxt-link :to="item.to"> <span v-html="item.iconHtml"></span> {{ item.title }} </nuxt-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      <a class="btn donate" href="https://patreon.com/classicminidiy"> <i class="fab fa-patreon"></i>Join CMDIY</a>
    </div>
  </div>
</template>

<style lang="scss">
  .donate {
    background-color: #f96854;
    color: #fff;
  }
</style>
