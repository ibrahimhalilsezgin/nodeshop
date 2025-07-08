<script lang="ts">
    import { onMount } from "svelte";
    import Navbar from "../../../components/Navbar.svelte";
    import { fade, fly } from "svelte/transition";
    export let data;
    
    onMount(() => {
        localStorage.setItem('basket', '')
    });
</script>

<Navbar user={data.user}/>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 pt-32" transition:fade>
    <div class="bg-[#F8F7F4] rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center relative overflow-hidden" 
         transition:fly={{ y: 20, duration: 600, delay: 200 }}>
        
        <!-- Background decoration -->
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-green-400 to-emerald-500 opacity-5 rounded-t-3xl"></div>
        
        <!-- Success icon with animation -->
        <div class="relative flex items-center justify-center w-24 h-24 mx-auto bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 rounded-full shadow-lg mb-6">
            <svg class="w-12 h-12 animate-pulse" fill="none" stroke="currentColor" stroke-width="2.5"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M5 13l4 4L19 7" />
            </svg>
            <!-- Decorative ring -->
            <div class="absolute inset-0 rounded-full border-2 border-green-200 animate-ping"></div>
        </div>
        
        <!-- Success message -->
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
            🎉 Ödeme Başarılı!
        </h1>
        
        <p class="text-gray-600 text-lg leading-relaxed mb-2">
            Ödemeniz başarıyla tamamlandı.
        </p>
        
        <p class="text-gray-500 text-sm mb-8">
            Sipariş bilgileriniz e-posta adresinize gönderildi.
        </p>
        
        <!-- Action buttons -->
        <div class="space-y-4">
            <a href="/" 
               class="inline-block w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600  font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                🏠 Ana Sayfaya Dön
            </a>
            
            <a href="/orders" 
               class="inline-block w-full px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200">
                📦 Siparişlerimi Görüntüle
            </a>
        </div>
        
        <!-- Additional info -->
        <div class="mt-8 pt-6 border-t border-gray-100">
            <p class="text-xs text-gray-400 mb-2">
                ✅ Güvenli ödeme tamamlandı
            </p>
            <p class="text-xs text-gray-400">
                Sorularınız için müşteri hizmetlerimizle iletişime geçebilirsiniz.
            </p>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute -top-4 -right-4 w-20 h-20 bg-green-100 rounded-full opacity-20"></div>
        <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-100 rounded-full opacity-20"></div>
    </div>
</div>

<style>
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .animate-float {
        animation: float 3s ease-in-out infinite;
    }
</style>