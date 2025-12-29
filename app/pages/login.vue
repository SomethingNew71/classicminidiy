<template>
  <div class="min-h-screen flex items-center justify-center bg-muted">
    <UCard class="w-full max-w-md">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold">{{ $t('title') }}</h1>
        <p class="opacity-70 mt-2">{{ $t('subtitle') }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormField :label="$t('username_label')">
          <UInput
            v-model="credentials.username"
            type="text"
            :placeholder="$t('username_placeholder')"
            class="w-full"
            :color="hasError ? 'error' : undefined"
            required
            :disabled="isLoading"
          />
        </UFormField>

        <UFormField :label="$t('password_label')">
          <UInput
            v-model="credentials.password"
            type="password"
            :placeholder="$t('password_placeholder')"
            class="w-full"
            :color="hasError ? 'error' : undefined"
            required
            :disabled="isLoading"
          />
        </UFormField>

        <UAlert v-if="errorMessage" color="error" icon="i-heroicons-exclamation-triangle" :title="errorMessage" />

        <div class="mt-6">
          <UButton type="submit" color="primary" class="w-full" :disabled="isLoading">
            <span v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            <i v-else class="fad fa-sign-in mr-2"></i>
            {{ isLoading ? $t('signing_in') : $t('sign_in') }}
          </UButton>
        </div>
      </form>

      <USeparator class="my-4" />

      <div class="text-center">
        <UButton to="/" variant="ghost" size="sm">
          <i class="fad fa-arrow-left mr-2"></i>
          {{ $t('back_to_site') }}
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  // SEO and meta
  useHead({
    title: $t('page_title'),
    meta: [
      {
        name: 'description',
        content: $t('page_description'),
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
      errorMessage.value = $t('validation_error');
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
      errorMessage.value = error.data?.message || error.message || $t('login_error');
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

<i18n lang="json">
{
  "en": {
    "page_title": "Admin Login - Classic Mini DIY",
    "page_description": "Admin login for Classic Mini DIY management panel.",
    "title": "Admin Login",
    "subtitle": "Access Classic Mini DIY admin panel",
    "username_label": "Username",
    "username_placeholder": "Enter username",
    "password_label": "Password",
    "password_placeholder": "Enter password",
    "sign_in": "Sign In",
    "signing_in": "Signing in...",
    "back_to_site": "Back to Site",
    "validation_error": "Please enter both username and password",
    "login_error": "Invalid username or password"
  },
  "es": {
    "page_title": "Inicio de Sesión Admin - Classic Mini DIY",
    "page_description": "Inicio de sesión de administrador para el panel de gestión de Classic Mini DIY.",
    "title": "Inicio de Sesión Admin",
    "subtitle": "Accede al panel de administración de Classic Mini DIY",
    "username_label": "Nombre de Usuario",
    "username_placeholder": "Ingresa nombre de usuario",
    "password_label": "Contraseña",
    "password_placeholder": "Ingresa contraseña",
    "sign_in": "Iniciar Sesión",
    "signing_in": "Iniciando sesión...",
    "back_to_site": "Volver al Sitio",
    "validation_error": "Por favor ingresa tanto el nombre de usuario como la contraseña",
    "login_error": "Nombre de usuario o contraseña inválidos"
  },
  "fr": {
    "page_title": "Connexion Admin - Classic Mini DIY",
    "page_description": "Connexion administrateur pour le panneau de gestion Classic Mini DIY.",
    "title": "Connexion Admin",
    "subtitle": "Accédez au panneau d'administration Classic Mini DIY",
    "username_label": "Nom d'utilisateur",
    "username_placeholder": "Entrez le nom d'utilisateur",
    "password_label": "Mot de passe",
    "password_placeholder": "Entrez le mot de passe",
    "sign_in": "Se connecter",
    "signing_in": "Connexion en cours...",
    "back_to_site": "Retour au Site",
    "validation_error": "Veuillez entrer à la fois le nom d'utilisateur et le mot de passe",
    "login_error": "Nom d'utilisateur ou mot de passe invalide"
  },
  "it": {
    "page_title": "Login Admin - Classic Mini DIY",
    "page_description": "Login amministratore per il pannello di gestione Classic Mini DIY.",
    "title": "Login Admin",
    "subtitle": "Accedi al pannello di amministrazione Classic Mini DIY",
    "username_label": "Nome utente",
    "username_placeholder": "Inserisci nome utente",
    "password_label": "Password",
    "password_placeholder": "Inserisci password",
    "sign_in": "Accedi",
    "signing_in": "Accesso in corso...",
    "back_to_site": "Torna al Sito",
    "validation_error": "Inserisci sia il nome utente che la password",
    "login_error": "Nome utente o password non validi"
  },
  "de": {
    "page_title": "Admin Anmeldung - Classic Mini DIY",
    "page_description": "Administrator-Anmeldung für das Classic Mini DIY Verwaltungspanel.",
    "title": "Admin Anmeldung",
    "subtitle": "Zugriff auf das Classic Mini DIY Admin-Panel",
    "username_label": "Benutzername",
    "username_placeholder": "Benutzername eingeben",
    "password_label": "Passwort",
    "password_placeholder": "Passwort eingeben",
    "sign_in": "Anmelden",
    "signing_in": "Anmeldung läuft...",
    "back_to_site": "Zurück zur Seite",
    "validation_error": "Bitte geben Sie sowohl Benutzername als auch Passwort ein",
    "login_error": "Ungültiger Benutzername oder Passwort"
  },
  "pt": {
    "page_title": "Login Admin - Classic Mini DIY",
    "page_description": "Login de administrador para o painel de gerenciamento Classic Mini DIY.",
    "title": "Login Admin",
    "subtitle": "Acesse o painel de administração Classic Mini DIY",
    "username_label": "Nome de usuário",
    "username_placeholder": "Digite o nome de usuário",
    "password_label": "Senha",
    "password_placeholder": "Digite a senha",
    "sign_in": "Entrar",
    "signing_in": "Entrando...",
    "back_to_site": "Voltar ao Site",
    "validation_error": "Por favor, digite tanto o nome de usuário quanto a senha",
    "login_error": "Nome de usuário ou senha inválidos"
  },
  "ru": {
    "page_title": "Вход Админа - Classic Mini DIY",
    "page_description": "Вход администратора в панель управления Classic Mini DIY.",
    "title": "Вход Админа",
    "subtitle": "Доступ к панели администрирования Classic Mini DIY",
    "username_label": "Имя пользователя",
    "username_placeholder": "Введите имя пользователя",
    "password_label": "Пароль",
    "password_placeholder": "Введите пароль",
    "sign_in": "Войти",
    "signing_in": "Вход...",
    "back_to_site": "Назад к Сайту",
    "validation_error": "Пожалуйста, введите как имя пользователя, так и пароль",
    "login_error": "Неверное имя пользователя или пароль"
  },
  "ja": {
    "page_title": "管理者ログイン - Classic Mini DIY",
    "page_description": "Classic Mini DIY管理パネルの管理者ログイン。",
    "title": "管理者ログイン",
    "subtitle": "Classic Mini DIY管理パネルにアクセス",
    "username_label": "ユーザー名",
    "username_placeholder": "ユーザー名を入力",
    "password_label": "パスワード",
    "password_placeholder": "パスワードを入力",
    "sign_in": "サインイン",
    "signing_in": "サインイン中...",
    "back_to_site": "サイトに戻る",
    "validation_error": "ユーザー名とパスワードの両方を入力してください",
    "login_error": "無効なユーザー名またはパスワード"
  },
  "zh": {
    "page_title": "管理员登录 - Classic Mini DIY",
    "page_description": "Classic Mini DIY管理面板的管理员登录。",
    "title": "管理员登录",
    "subtitle": "访问Classic Mini DIY管理面板",
    "username_label": "用户名",
    "username_placeholder": "输入用户名",
    "password_label": "密码",
    "password_placeholder": "输入密码",
    "sign_in": "登录",
    "signing_in": "登录中...",
    "back_to_site": "返回网站",
    "validation_error": "请输入用户名和密码",
    "login_error": "无效的用户名或密码"
  },
  "ko": {
    "page_title": "관리자 로그인 - Classic Mini DIY",
    "page_description": "Classic Mini DIY 관리 패널의 관리자 로그인.",
    "title": "관리자 로그인",
    "subtitle": "Classic Mini DIY 관리 패널에 액세스",
    "username_label": "사용자명",
    "username_placeholder": "사용자명 입력",
    "password_label": "비밀번호",
    "password_placeholder": "비밀번호 입력",
    "sign_in": "로그인",
    "signing_in": "로그인 중...",
    "back_to_site": "사이트로 돌아가기",
    "validation_error": "사용자명과 비밀번호를 모두 입력해주세요",
    "login_error": "잘못된 사용자명 또는 비밀번호"
  }
}
</i18n>
