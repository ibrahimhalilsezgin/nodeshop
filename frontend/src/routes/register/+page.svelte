<script lang="ts">
    import { fade } from "svelte/transition";
    import Links from "../../components/Links.svelte";
    import Navbar from "../../components/Navbar.svelte";
    import axios from "axios";
    import { BACKENDURL } from "$env/static/private";
    
    let formInputs = {
        firstName: { value: '' },
        lastName: { value: '' },
        email: { value: '' },
        password: { value: '' },
    };
    
    let errors: any = [];
    let isLoading = false;
    
    const register = async () => {
        isLoading = true;
        try {
            const response = await axios({
                url: BACKENDURL + '/auth/register',
                method: 'POST',
                data: {
                    firstName: formInputs.firstName.value,
                    lastName: formInputs.lastName.value,
                    email: formInputs.email.value,
                    password: formInputs.password.value
                }
            });
            if (response.status === 200) return window.location.assign('/login');
        } catch (error: any) {
            if (error.response?.status === 400) {
                errors = [];
                error.response.data.errors.forEach((err: any) => {
                    errors = [...errors, err];
                });
            }
        } finally {
            isLoading = false;
        }
    };
</script>

<Links />
<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4" transition:fade>
    <div class="w-full max-w-md">
        <!-- Form Container -->
        <div class=" rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Hesap Oluştur</h2>
                <p class="text-gray-600">Hemen üye olun ve başlayın</p>
            </div>

            <!-- Error Messages -->
            {#if errors.length > 0}
                <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div class="flex items-center mb-2">
                        <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-red-700 font-medium">Lütfen aşağıdaki hataları düzeltin:</span>
                    </div>
                    <ul class="text-red-600 text-sm space-y-1 ml-7">
                        {#each errors as error}
                            <li class="flex items-center">
                                <span class="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                {error}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}

            <!-- Form -->
            <form class="space-y-6" on:submit|preventDefault={register}>
                <!-- Name Fields Row -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="group">
                        <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">İsim</label>
                        <div class="relative">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="John"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus: group-hover:border-gray-400"
                                bind:value={formInputs.firstName.value}
                                required
                            />
                        </div>
                    </div>
                    <div class="group">
                        <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Soyisim</label>
                        <div class="relative">
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Doe"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus: group-hover:border-gray-400"
                                bind:value={formInputs.lastName.value}
                                required
                            />
                        </div>
                    </div>
                </div>

                <!-- Email Field -->
                <div class="group">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Adresi</label>
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
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus: group-hover:border-gray-400"
                            bind:value={formInputs.email.value}
                            required
                        />
                    </div>
                </div>

                <!-- Password Field -->
                <div class="group">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="En az 6 karakter"
                            minlength={6}
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus: group-hover:border-gray-400"
                            bind:value={formInputs.password.value}
                            required
                        />
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Şifreniz en az 8 karakter olmalıdır</p>
                </div>

                <!-- Terms and Conditions -->
                <div class="flex items-start space-x-3">
                    <input 
                        type="checkbox" 
                        required 
                        class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label class="text-sm text-gray-600 leading-relaxed">
                        <a href="/legal/termsofuse" class="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">
                            Kullanım koşulları
                        </a> 
                        ve 
                        <a href="/legal/privacypolicy" class="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">
                            gizlilik politikası
                        </a>nı 
                        okudum ve kabul ediyorum.
                    </label>
                </div>

                <!-- Submit Button -->
                <button 
                    type="submit" 
                    disabled={isLoading}
                    class="w-full bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {#if isLoading}
                        <div class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 " fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Hesap oluşturuluyor...
                        </div>
                    {:else}
                        <div class="flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                            </svg>
                            Hesap Oluştur
                        </div>
                    {/if}
                </button>
            </form>

            <!-- Login Link -->
            <div class="mt-8 text-center">
                <p class="text-gray-600">
                    Zaten hesabınız var mı? 
                    <a href="/login" class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
                        Giriş yapın
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>