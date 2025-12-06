<script setup lang="ts">
  import { HERO_TYPES } from '../../../../data/models/generic';

  // SEO and meta
  useHead({
    title: 'Chat Threads - Admin - Classic Mini DIY',
    meta: [
      {
        name: 'description',
        content: 'View and manage LangGraph chat threads from users.',
      },
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    ],
  });

  // Define types
  interface Thread {
    thread_id: string;
    created_at: string;
    updated_at: string;
    metadata?: Record<string, any>;
    status?: string;
    values?: any;
  }

  interface ThreadsResponse {
    success: boolean;
    threads: Thread[];
    count: number;
    filters: {
      limit: number;
      status?: string;
      metadata?: any;
    };
  }

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

  // Reactive state
  const isLoading = ref(false);
  const filterStatus = ref<string>('');
  const searchQuery = ref('');

  // Fetch threads
  const { data: threadsData, refresh: refreshThreads } = await useFetch<ThreadsResponse>('/api/admin/threads/list', {
    query: {
      limit: 100,
    },
  });

  const threads = computed(() => threadsData.value?.threads || []);

  // Filter threads based on search and status
  const filteredThreads = computed(() => {
    let result = threads.value;

    // Filter by status
    if (filterStatus.value) {
      result = result.filter((t) => t.status === filterStatus.value);
    }

    // Filter by search query (thread ID or metadata)
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter((t) => {
        const matchesId = t.thread_id.toLowerCase().includes(query);
        const matchesMetadata = JSON.stringify(t.metadata || {})
          .toLowerCase()
          .includes(query);
        return matchesId || matchesMetadata;
      });
    }

    return result;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Navigate to thread details
  const viewThread = (thread: Thread) => {
    navigateTo(`/admin/threads/${thread.thread_id}`);
  };

  // Refresh data
  const handleRefresh = async () => {
    isLoading.value = true;
    try {
      await refreshThreads();
    } finally {
      isLoading.value = false;
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
      await navigateTo('/login');
    } catch (error) {
      console.error('Logout error:', error);
      await navigateTo('/login');
    }
  };

  // Get status badge color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'idle':
        return 'badge-success';
      case 'busy':
        return 'badge-warning';
      case 'interrupted':
        return 'badge-info';
      case 'error':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };
</script>

<template>
  <div>
    <!-- Hero Section -->
    <Hero
      title="Chat Threads"
      subtitle="View and manage LangGraph chat threads from users"
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
              <NuxtLink to="/admin">Admin</NuxtLink>
            </li>
            <li>
              <span class="opacity-60">Chat Threads</span>
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

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Stats and Controls -->
      <div class="card bg-base-200 shadow-lg mb-8">
        <div class="card-body">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 class="text-2xl font-bold">Thread Overview</h2>
              <p class="text-base-content/70">
                Total threads: <span class="font-semibold">{{ threads.length }}</span> | Filtered:
                <span class="font-semibold">{{ filteredThreads.length }}</span>
              </p>
            </div>
            <button
              @click="handleRefresh"
              :disabled="isLoading"
              class="btn btn-primary"
              :class="{ loading: isLoading }"
            >
              <i v-if="!isLoading" class="fad fa-refresh mr-2"></i>
              {{ isLoading ? 'Refreshing...' : 'Refresh' }}
            </button>
          </div>

          <!-- Filters -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Search threads</span>
              </label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by thread ID or metadata..."
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Filter by status</span>
              </label>
              <select v-model="filterStatus" class="select select-bordered">
                <option value="">All statuses</option>
                <option value="idle">Idle</option>
                <option value="busy">Busy</option>
                <option value="interrupted">Interrupted</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Threads Table -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Thread ID</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Metadata</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredThreads.length === 0">
                  <td colspan="6" class="text-center py-8 text-base-content/50">
                    <i class="fad fa-inbox text-4xl mb-2 block"></i>
                    No threads found
                  </td>
                </tr>
                <tr v-for="thread in filteredThreads" :key="thread.thread_id">
                  <td>
                    <code class="text-xs">{{ thread.thread_id }}</code>
                  </td>
                  <td>
                    <span class="badge" :class="getStatusColor(thread.status)">
                      {{ thread.status || 'unknown' }}
                    </span>
                  </td>
                  <td class="text-sm">{{ formatDate(thread.created_at) }}</td>
                  <td class="text-sm">{{ formatDate(thread.updated_at) }}</td>
                  <td class="max-w-xs truncate">
                    <span v-if="thread.metadata" class="text-xs opacity-70">
                      {{ JSON.stringify(thread.metadata) }}
                    </span>
                    <span v-else class="text-xs opacity-50">No metadata</span>
                  </td>
                  <td>
                    <button @click="viewThread(thread)" class="btn btn-sm btn-ghost">
                      <i class="fad fa-eye mr-1"></i>
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
