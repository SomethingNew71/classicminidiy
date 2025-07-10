<template>
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold">LangGraph Chat</h1>
        <p class="text-base-content/70">Configure your connection to get started</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- API URL -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">
              Deployment URL
              <span class="text-error">*</span>
            </span>
          </label>
          <input
            v-model="form.apiUrl"
            type="url"
            placeholder="http://localhost:2024"
            class="input input-bordered"
            required
          />
          <label class="label">
            <span class="label-text-alt text-base-content/60">
              URL of your LangGraph deployment (local or production)
            </span>
          </label>
        </div>

        <!-- Assistant ID -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">
              Assistant / Graph ID
              <span class="text-error">*</span>
            </span>
          </label>
          <input
            v-model="form.assistantId"
            type="text"
            placeholder="agent"
            class="input input-bordered"
            required
          />
          <label class="label">
            <span class="label-text-alt text-base-content/60">
              ID of the graph or assistant to connect to
            </span>
          </label>
        </div>

        <!-- API Key -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">LangSmith API Key</span>
          </label>
          <input
            v-model="form.apiKey"
            type="password"
            placeholder="lsv2_pt_..."
            class="input input-bordered"
          />
          <label class="label">
            <span class="label-text-alt text-base-content/60">
              Not required for local servers. Stored in browser localStorage.
            </span>
          </label>
        </div>

        <!-- Connection Status -->
        <div v-if="connectionStatus" class="alert" :class="connectionStatusClass">
          <Icon :name="connectionStatusIcon" class="h-5 w-5" />
          <span>{{ connectionStatus }}</span>
        </div>

        <!-- Submit Button -->
        <div class="form-control mt-6">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isConnecting || !form.apiUrl || !form.assistantId"
          >
            <Icon v-if="isConnecting" name="mdi:loading" class="h-4 w-4 animate-spin" />
            <Icon v-else name="mdi:arrow-right" class="h-4 w-4" />
            {{ isConnecting ? 'Connecting...' : 'Connect' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Configuration {
  apiUrl: string
  assistantId: string
  apiKey?: string
}

const emit = defineEmits<{
  configure: [config: Configuration]
}>()

// Form state
const form = ref({
  apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:2024',
  assistantId: process.env.NUXT_PUBLIC_ASSISTANT_ID || 'agent',
  apiKey: ''
})

const isConnecting = ref(false)
const connectionStatus = ref('')
const connectionError = ref(false)

const connectionStatusClass = computed(() => {
  return connectionError.value ? 'alert-error' : 'alert-success'
})

const connectionStatusIcon = computed(() => {
  return connectionError.value ? 'mdi:alert-circle' : 'mdi:check-circle'
})

const checkConnection = async (apiUrl: string, apiKey?: string) => {
  try {
    const response = await fetch(`${apiUrl}/info`, {
      headers: {
        ...(apiKey && { 'X-Api-Key': apiKey })
      }
    })

    return response.ok
  } catch (error) {
    console.error('Connection check failed:', error)
    return false
  }
}

const handleSubmit = async () => {
  if (!form.value.apiUrl || !form.value.assistantId) return

  isConnecting.value = true
  connectionStatus.value = 'Testing connection...'
  connectionError.value = false

  try {
    const isConnected = await checkConnection(
      form.value.apiUrl,
      form.value.apiKey || undefined
    )

    if (isConnected) {
      connectionStatus.value = 'Connected successfully!'
      connectionError.value = false

      // Emit configuration after a brief success message
      setTimeout(() => {
        emit('configure', {
          apiUrl: form.value.apiUrl,
          assistantId: form.value.assistantId,
          apiKey: form.value.apiKey || undefined
        })
      }, 1000)
    } else {
      connectionStatus.value = 'Failed to connect to the server. Please check your settings.'
      connectionError.value = true
    }
  } catch (error) {
    connectionStatus.value = 'Connection error occurred.'
    connectionError.value = true
  } finally {
    isConnecting.value = false
  }
}
</script>
