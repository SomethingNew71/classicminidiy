<script lang="ts" setup>
  const route = useRoute();

  // Function to check if a route is active
  const isActive = (path: string): boolean => {
    return route.path === path || route.path.startsWith(path + '/');
  };

  // Function to close mobile dropdown
  const closeMobileDropdown = () => {
    // Remove focus from the dropdown trigger to close it
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };
</script>

<template>
  <div class="navbar bg-base-100 py-3">
    <div class="navbar-start">
      <NuxtLink :to="'/'" class="d-inline-block">
        <nuxt-img
          alt="Classic Mini DIY Logo"
          src="https://classicminidiy.s3.amazonaws.com/misc/Small-Black.png"
          class="w-32"
        />
      </NuxtLink>
    </div>
    <div class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal px-1 text-base">
        <li>
          <a href="https://classicminidiy.substack.com/" target="_blank">
            <span><i class="fad fa-pencil"></i></span> Blog</a
          >
        </li>
        <li>
          <nuxt-link to="/maps" :class="{ active: isActive('/maps') }">
            <span><i class="fad fa-computer-classic"></i></span> Maps</nuxt-link
          >
        </li>
        <li>
          <a href="https://store.classicminidiy.com/" target="_blank">
            <span><i class="fad fa-store"></i></span> Store</a
          >
        </li>
        <li>
          <nuxt-link to="/archive" :class="{ active: isActive('/archive') }">
            <span><i class="fad fa-books"></i></span> Archive</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/technical" :class="{ active: isActive('/technical') }">
            <span><i class="fad fa-toolbox"></i></span> Toolbox</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/chat" :class="{ active: isActive('/chat') }">
            <span><i class="fad fa-comments"></i></span> Chat</nuxt-link
          >
        </li>
      </ul>
      <LanguageSwitcher />
      <a class="btn donate" href="https://patreon.com/classicminidiy"> <i class="fab fa-patreon"></i>Join CMDIY</a>
    </div>
    <div class="navbar-end lg:hidden">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a href="https://classicminidiy.substack.com/" target="_blank" @click="closeMobileDropdown">
              <span><i class="fad fa-pencil"></i></span> Blog</a
            >
          </li>
          <li>
            <nuxt-link to="/maps" :class="{ active: isActive('/maps') }" @click="closeMobileDropdown">
              <span><i class="fad fa-computer-classic"></i></span> Maps</nuxt-link
            >
          </li>
          <li>
            <a href="https://store.classicminidiy.com/" target="_blank" @click="closeMobileDropdown">
              <span><i class="fad fa-store"></i></span> Store</a
            >
          </li>
          <li>
            <nuxt-link to="/archive" :class="{ active: isActive('/archive') }" @click="closeMobileDropdown">
              <span><i class="fad fa-books"></i></span> Archive</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/technical" :class="{ active: isActive('/technical') }" @click="closeMobileDropdown">
              <span><i class="fad fa-toolbox"></i></span> Toolbox</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/chat" :class="{ active: isActive('/chat') }" @click="closeMobileDropdown">
              <span><i class="fad fa-comments"></i></span> Chat</nuxt-link
            >
          </li>
          <li class="border-t pt-2 mt-2">
            <div class="px-4 py-2">
              <LanguageSwitcher />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .donate {
    background-color: #f96854;
    color: #fff;
  }
</style>
