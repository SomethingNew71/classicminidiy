<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-base-content">Admin Login</h1>
          <p class="text-base-content/70 mt-2">Access Classic Mini DIY admin panel</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              v-model="credentials.username"
              type="text"
              placeholder="Enter username"
              class="input input-bordered w-full"
              :class="{ 'input-error': hasError }"
              required
              :disabled="isLoading"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model="credentials.password"
              type="password"
              placeholder="Enter password"
              class="input input-bordered w-full"
              :class="{ 'input-error': hasError }"
              required
              :disabled="isLoading"
            />
          </div>

          <div v-if="errorMessage" class="alert alert-error">
            <i class="fad fa-exclamation-triangle"></i>
            <span>{{ errorMessage }}</span>
          </div>

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full" :class="{ loading: isLoading }" :disabled="isLoading">
              <i v-if="!isLoading" class="fad fa-sign-in mr-2"></i>
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>
          </div>
        </form>

        <div class="divider"></div>

        <div class="text-center">
          <NuxtLink to="/" class="btn btn-ghost btn-sm">
            <i class="fad fa-arrow-left mr-2"></i>
            Back to Site
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // SEO and meta
  useHead({
    title: 'Admin Login - Classic Mini DIY',
    meta: [
      {
        name: 'description',
        content: 'Admin login for Classic Mini DIY management panel.',
      },
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    ],
  });

  // Reactive state
  const credentials = ref({
    username: '',
    password: '',
  });

  const isLoading = ref(false);
  const errorMessage = ref('');
  const hasError = computed(() => !!errorMessage.value);

  // No automatic redirect check - let users access login page freely

  // Login handler
  const handleLogin = async () => {
    if (!credentials.value.username || !credentials.value.password) {
      errorMessage.value = 'Please enter both username and password';
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials.value,
        credentials: 'include', // Ensure cookies are handled properly
      });

      console.log('Login response:', response);

      // Disable Vue reactivity and redirect immediately
      isLoading.value = false;
      
      // Use location.href instead of replace to ensure proper navigation
      window.location.href = '/admin';
    } catch (error: any) {
      console.error('Login error:', error);
      errorMessage.value = error.data?.message || error.message || 'Invalid username or password';
      isLoading.value = false;
    }
  };

  // Clear error when user starts typing
  watch(
    credentials,
    () => {
      if (errorMessage.value) {
        errorMessage.value = '';
      }
    },
    { deep: true }
  );
</script>
