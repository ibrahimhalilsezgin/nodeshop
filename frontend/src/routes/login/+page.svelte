<script lang="ts">
  import axios from "axios";
  import { setCookie } from "@/utils/cookie.util";
  import { fade } from "svelte/transition";
  export let data;
  let formInputs = {
    username: { value: '' },
    email: { value: '' },
    password: { value: '' },
  };
  
  let error = {
    status: false,
    message: ''
  };
  
  let loading = false;
  let showPassword = false;
  
  const login = async () => {
    loading = true;
    error.status = false;
    error.message = '';
    
    try {
      const response = await axios({
        url: data.PUBLIC_BACKENDURL +'/auth/login',
        method: 'POST',
        data: {
          email: formInputs.email.value,
          password: formInputs.password.value
        }
      });
      
      if (response.status === 200) {
        setCookie('token', response.data.token, 1);
        return window.location.assign('/account');
      }
    } catch (err: any) {
      if (err.response?.status >= 400) {
        error.status = true;
        error.message = err.response.data.error;
      }
    } finally {
      loading = false;
    }
  };
  
  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };
</script>


<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" transition:fade>
  <div class="w-full max-w-md">
    <!-- Login Card -->
    <div class=" rounded-2xl shadow-xl p-8 space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center">
          <svg class="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Hoş Geldiniz</h1>
        <p class="text-gray-600">Hesabınıza giriş yapın</p>
      </div>
      
      <!-- Error Message -->
      {#if error.status}
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-red-700 text-sm">{error.message}</span>
        </div>
      {/if}
      
      <!-- Form -->
      <form class="space-y-6" on:submit|preventDefault={login}>
        <!-- Email Input -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">
            E-posta Adresi
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@gmail.com"
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              bind:value={formInputs.email.value}
              required
            />
          </div>
        </div>
        
        <!-- Password Input -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="•••••••••"
              minlength={6}
              class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              bind:value={formInputs.password.value}
              required
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              on:click={togglePasswordVisibility}
            >
              {#if showPassword}
                <svg class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              {:else}
                <svg class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              {/if}
            </button>
          </div>
        </div>
        
        
        <!-- Submit Button -->
        <button
          type="submit"
          disabled={loading}
          class="w-full bg-gradient-to-r from-blue-500 to-indigo-600  py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {#if loading}
            <div class="flex items-center justify-center space-x-2">
              <svg class="animate-spin h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Giriş yapılıyor...</span>
            </div>
          {:else}
            Giriş Yap
          {/if}
        </button>
      </form>
      
      <!-- Footer -->
      <div class="text-center space-y-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2  text-gray-500">veya</span>
          </div>
        </div>
        
        <p class="text-sm text-gray-600">
          Hesabınız yok mu? 
          <a href="/register" class="text-blue-600 hover:text-blue-500 font-medium transition-colors">
            Kayıt Ol
          </a>
        </p>
        
        <a href="#" class="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          Şifremi Unuttum
        </a>
      </div>
    </div>
  </div>
</div>