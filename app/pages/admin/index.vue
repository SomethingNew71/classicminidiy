<script setup lang="ts">
  import { HERO_TYPES } from '../../../data/models/generic';
  import type { RegistryItem } from '../../../data/models/registry';
  import { RegistryItemStatus } from '../../../data/models/registry';
  import type { IWheelsDataReviewItem } from '../../../data/models/wheels';
  import { WheelItemStatus } from '../../../data/models/wheels';

  // SEO and meta
  useHead({
    title: 'Admin Dashboard - Classic Mini DIY',
    meta: [
      {
        name: 'description',
        content: 'Admin dashboard for managing Classic Mini DIY submissions and content.',
      },
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    ],
  });

  // Define user type
  interface AuthUser {
    username: string;
    isAdmin: boolean;
    loginTime: string;
  }

  interface AuthResponse {
    authenticated: boolean;
    user: AuthUser;
  }

  // Get user info
  const { data: authData } = await useFetch<AuthResponse>('/api/auth/verify');
  const user = computed(() => authData.value?.user);

  // Fetch stats data
  const { data: registryStats, refresh: refreshRegistryStats } =
    await useFetch<RegistryItem[]>('/api/registry/queue/list');
  const { data: wheelsStats, refresh: refreshWheelsStats } =
    await useFetch<IWheelsDataReviewItem[]>('/api/wheels/review/list');

  // Refresh state
  const isRefreshing = ref(false);

  // Refresh function
  const refreshStats = async () => {
    isRefreshing.value = true;
    try {
      await Promise.all([refreshRegistryStats(), refreshWheelsStats()]);
    } catch (error) {
      console.error('Error refreshing stats:', error);
    } finally {
      isRefreshing.value = false;
    }
  };

  // Helper functions to check if items are pending
  const isPending = (item: RegistryItem) => !item.status || item.status === RegistryItemStatus.PENDING;
  const isWheelPending = (item: IWheelsDataReviewItem) => !item.status || item.status === WheelItemStatus.PENDING;

  // Computed stats
  const registryCount = computed(() => {
    if (!Array.isArray(registryStats.value)) return 0;
    return registryStats.value.filter(isPending).length;
  });

  const wheelsCount = computed(() => {
    if (!Array.isArray(wheelsStats.value)) return 0;
    return wheelsStats.value.filter(isWheelPending).length;
  });

  const lastUpdated = computed(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  });

  // Logout handler
  const handleLogout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
      await navigateTo('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if logout fails
      await navigateTo('/login');
    }
  };

  // Helper function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
</script>
<template>
  <div>
    <!-- Hero Section -->
    <Hero
      title="Admin Dashboard"
      subtitle="Manage submissions and content for Classic Mini DIY"
      :heroType="HERO_TYPES.TECH"
      textSize="text-4xl"
    />

    <!-- Breadcrumb Navigation -->
    <div class="container mx-auto px-4 pt-10">
      <div class="flex justify-between items-center">
        <div class="text-base breadcrumbs">
          <ul>
            <li>
              <div class="flex items-center">
                <i class="fa-duotone fa-home mr-1"></i>
                <NuxtLink to="/">Home</NuxtLink>
              </div>
            </li>
            <li>
              <span class="opacity-60">Admin</span>
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-sm text-base-content/70"> Welcome, {{ user?.username }} </span>
          <button @click="handleLogout" class="btn btn-ghost btn-sm">
            <i class="fad fa-sign-out mr-2"></i>
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Admin Components Grid -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Registry Review Card -->
        <div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <i class="fad fa-clipboard-list text-2xl text-primary"></i>
              </div>
              <h2 class="card-title text-xl">Registry Review</h2>
            </div>

            <p class="text-base-content/70 mb-6">Review and manage Classic Mini registry submissions from users.</p>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2 text-sm">
                <i class="fad fa-check-circle text-success"></i>
                <span>Approve submissions</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fad fa-times-circle text-error"></i>
                <span>Reject invalid entries</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fad fa-edit text-info"></i>
                <span>Edit submission details</span>
              </div>
            </div>

            <div class="card-actions justify-end">
              <NuxtLink to="/admin/registry/review" class="btn btn-primary">
                <i class="fad fa-arrow-right mr-2"></i>
                Manage Registry
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Wheels Review Card -->
        <div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <i class="fad fa-tire text-2xl text-secondary"></i>
              </div>
              <h2 class="card-title text-xl">Wheels Review</h2>
            </div>

            <p class="text-base-content/70 mb-6">Review and manage wheel and tire submissions from the community.</p>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2 text-sm">
                <i class="fad fa-check-circle text-success"></i>
                <span>Approve wheel data</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fad fa-times-circle text-error"></i>
                <span>Remove duplicates</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fad fa-edit text-info"></i>
                <span>Validate specifications</span>
              </div>
            </div>

            <div class="card-actions justify-end">
              <NuxtLink to="/admin/wheels/review" class="btn btn-secondary">
                <i class="fad fa-arrow-right mr-2"></i>
                Manage Wheels
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Future Admin Tools Card (Placeholder) -->
        <div class="card bg-base-100 shadow-xl border border-base-300 opacity-60">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                <i class="fad fa-plus text-2xl text-info"></i>
              </div>
              <h2 class="card-title text-xl">Future Tools</h2>
            </div>

            <p class="text-base-content/70 mb-6">Additional admin tools and management features will be added here.</p>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2 text-sm text-base-content/50">
                <i class="fad fa-cog"></i>
                <span>Site configuration</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-base-content/50">
                <i class="fad fa-users"></i>
                <span>User management</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-base-content/50">
                <i class="fad fa-chart-line"></i>
                <span>Analytics dashboard</span>
              </div>
            </div>

            <div class="card-actions justify-end">
              <button class="btn btn-info btn-disabled">
                <i class="fad fa-clock mr-2"></i>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Stats Section -->
      <div class="mt-16 max-w-4xl mx-auto">
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold">Quick Stats</h3>
              <button
                @click="refreshStats"
                :disabled="isRefreshing"
                class="btn btn-ghost btn-sm"
                :class="{ loading: isRefreshing }"
              >
                <i v-if="!isRefreshing" class="fad fa-refresh mr-2"></i>
                {{ isRefreshing ? 'Refreshing...' : 'Refresh' }}
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div class="stat">
                <div class="stat-figure text-primary">
                  <i class="fad fa-clipboard-list text-3xl"></i>
                </div>
                <div class="stat-title">Registry Queue</div>
                <div class="stat-value text-primary">{{ registryCount || '0' }}</div>
                <div class="stat-desc">Pending submissions</div>
              </div>

              <div class="stat">
                <div class="stat-figure text-secondary">
                  <i class="fad fa-tire text-3xl"></i>
                </div>
                <div class="stat-title">Wheels Queue</div>
                <div class="stat-value text-secondary">{{ wheelsCount || '0' }}</div>
                <div class="stat-desc">Pending reviews</div>
              </div>

              <div class="stat">
                <div class="stat-figure text-info">
                  <i class="fad fa-clock text-3xl"></i>
                </div>
                <div class="stat-title">Last Updated</div>
                <div class="stat-value text-info text-lg">{{ lastUpdated }}</div>
                <div class="stat-desc">{{ formatDate(new Date()) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
