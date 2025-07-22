<template>
  <!-- Floating Chat Input -->
  <div class="fixed bottom-6 right-6 z-50 max-w-md w-full px-4">
    <div class="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-4">
      <form @submit.prevent="handleSubmit" class="relative">
        <div class="flex items-end gap-3 bg-base-200 rounded-2xl p-3 shadow-sm border border-base-300">
          <textarea
            ref="inputRef"
            v-model="input"
            @keydown="handleInputKeyDown"
            placeholder="Ask me anything about your Classic Mini..."
            class="flex-1 bg-transparent resize-none outline-none min-h-[1.5rem] max-h-32 placeholder-base-content/50"
            rows="1"
          ></textarea>

          <button type="submit" class="btn btn-circle btn-sm btn-primary flex-shrink-0" :disabled="!input.trim()">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>

      <!-- Small helper text -->
      <div class="flex justify-center mt-2">
        <span class="text-xs text-base-content/60">
          <i class="fa-solid fa-comments text-xs mr-1"></i>
          Chat with CMDIY Assistant
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const input = ref('');
  const inputRef = ref<HTMLTextAreaElement>();
  const router = useRouter();

  // Auto-resize textarea
  function autoResizeTextarea() {
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.style.height = 'auto';
        inputRef.value.style.height = inputRef.value.scrollHeight + 'px';
      }
    });
  }

  function handleInputKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
    autoResizeTextarea();
  }

  async function handleSubmit() {
    if (!input.value.trim()) return;

    const message = input.value.trim();

    // Navigate to chat page with the input as a query parameter
    await router.push({
      path: '/chat',
      query: { message: message },
    });
  }

  // Watch input for auto-resize
  watch(input, autoResizeTextarea);

  // Focus input on mount
  onMounted(() => {
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    });
  });
</script>

<style scoped>
  /* Ensure the floating input is above other content */
  .z-50 {
    z-index: 50;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .fixed.bottom-6.right-6 {
      bottom: 1rem;
      right: 1rem;
      left: 1rem;
      max-width: none;
    }
  }
</style>
