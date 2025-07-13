<script lang="ts">
    import { onMount } from "svelte";
    import Navbar from "../@/components/Navbar.svelte";
    import { fade, fly } from "svelte/transition";
    export let data;
    
    onMount(() => {
        // Keep basket data for retry attempt
        console.log('Payment failed - basket preserved for retry');
    });
</script>

<Navbar user={data.user}/>

<div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center p-4 pt-32" transition:fade>
    <div class="bg-[#F8F7F4] rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center relative overflow-hidden" 
         transition:fly={{ y: 20, duration: 600, delay: 200 }}>
        
        <!-- Background decoration -->
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-red-400 to-rose-500 opacity-5 rounded-t-3xl"></div>
        
        <!-- Failure icon with animation -->
        <div class="relative flex items-center justify-center w-24 h-24 mx-auto bg-gradient-to-r from-red-100 to-rose-100 text-red-600 rounded-full shadow-lg mb-6">
            <svg class="w-12 h-12 animate-pulse" fill="none" stroke="currentColor" stroke-width="2.5"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
            </svg>
            <!-- Decorative ring -->
            <div class="absolute inset-0 rounded-full border-2 border-red-200 animate-ping"></div>
        </div>
        
        <!-- Failure message -->
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
            ❌ Ödeme Başarısız!
        </h1>
        
        <p class="text-gray-600 text-lg leading-relaxed mb-2">
            Ödemeniz tamamlanamadı.
        </p>
        
        <p class="text-gray-500 text-sm mb-8">
            Lütfen ödeme bilgilerinizi kontrol edip tekrar deneyiniz.
        </p>
        
        <!-- Common failure reasons -->
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
            <h3 class="font-semibold text-red-800 mb-2">Olası Nedenler:</h3>
            <ul class="text-sm text-red-700 space-y-1">
                <li>• Yetersiz bakiye</li>
                <li>• Hatalı kart bilgileri</li>
                <li>• Güvenlik kodu hatası</li>
                <li>• Kart limitine ulaşılmış</li>
                <li>• Banka tarafından engellenmiş</li>
            </ul>
        </div>
        
        <!-- Action buttons -->
        <div class="space-y-4">
            <a href="/checkout" 
               class="inline-block w-full px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600  font-semibold rounded-xl hover:from-red-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                🔄 Tekrar Dene
            </a>
            
            <a href="/basket" 
               class="inline-block w-full px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200">
                🛒 Sepete Dön
            </a>
            
            <a href="/" 
               class="inline-block w-full px-8 py-3 bg-gray-50 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200">
                🏠 Ana Sayfaya Dön
            </a>
        </div>
        
        <!-- Support info -->
        <div class="mt-8 pt-6 border-t border-gray-100">
            <p class="text-xs text-gray-400 mb-2">
                ⚠️ Sorun devam ederse
            </p>
            <p class="text-xs text-gray-400 mb-3">
                Müşteri hizmetlerimizle iletişime geçebilirsiniz.
            </p>
            
            <div class="flex justify-center space-x-4">
                <a href="/contact" class="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                    📞 İletişim
                </a>
                <a href="/help" class="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                    ❓ Yardım
                </a>
                <a href="/faq" class="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                    📋 SSS
                </a>
            </div>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute -top-4 -right-4 w-20 h-20 bg-red-100 rounded-full opacity-20"></div>
        <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-rose-100 rounded-full opacity-20"></div>
    </div>
</div>

<style>
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    .animate-shake {
        animation: shake 0.5s ease-in-out;
    }
</style>