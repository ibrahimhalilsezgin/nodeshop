<script lang="ts">
  import { goto } from "$app/navigation";
  export let data;
  import axios from "axios";
  import { onMount } from "svelte";
  import { getCookie } from "../../utils/cookie.util.js";
  import Navbar from "../../components/Navbar.svelte";
  import { fade, fly, scale, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
    import { BACKENDURL } from "$env/static/private";
  
  let totalPrice = 0;
  let basket: any = [];
  let isLoading = false;
  let animateTotal = false;
  let basketError = false;
  onMount(() => {
    if (!data.user) goto("/login");
   
    basket = JSON.parse(localStorage.getItem("basket") || "[]");
    const basketItems = basket.map((item: any) => ({
      basketItemId: item.id,
      name: item.basketItemName,
      category1: "Genel",
      itemType: item.type ? "VIRTUAL" : "PHYSICAL",
      price: item.price,
    }));
    basketItems.forEach((x: any) => (totalPrice += x.price));
  });

const removeFromBasket = (itemId: string, index: number) => {
  basket = [...basket]; // Önce kopya al (reaktiflik için önemli)
  basket.splice(index, 1); // index ile ürünü çıkar

  localStorage.setItem("basket", JSON.stringify(basket)); // localStorage güncelle

  // Toplam fiyatı yeniden hesapla
  totalPrice = basket.reduce((acc, item) => acc + item.price, 0);

  animateTotal = true;
  setTimeout(() => (animateTotal = false), 300);
};


  const clearBasket = () => {
    basket = [];
    localStorage.setItem("basket", JSON.stringify([]));
    totalPrice = 0;
  };
  
  const buyButton = async () => {
    if (basket.length === 0) return;
    
    isLoading = true;
    const rawBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    let price: number = 0;
    const basketItems = rawBasket.map((item: any) => ({
      basketItemId: item.id,
      name: item.basketItemName,
      category1: "Genel",
      itemType: item.type ? "VIRTUAL" : "PHYSICAL",
      price: item.price,
    }));
    basketItems.forEach((x: any) => (price += x.price));
    
    try {
      const response = await axios({
        url: BACKENDURL + "/api/v1/payment",
        method: "POST",
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
        data: {
          userID: data.user?.id,
          basketId: "basket-" + Math.floor(Math.random() * 1000000).toString(),
          basketItems,
        },
      });
      
      if (response.status == 200) {
        if(response.data.redirectURL === undefined) {
          return goto('/account/settings')
        }
        return window.location.assign(response.data.redirectURL);
      }
    } catch (e: any) {
      console.log(e?.response?.data);
    } finally {
      isLoading = false;
    }
  };
</script>

<Navbar user={data.user} />

<main class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center pt-32 pb-12 px-4" transition:fade>
  <div class="bg-[#F8F7F4] rounded-2xl shadow-2xl w-full max-w-4xl p-8 relative overflow-hidden">
    
    <!-- Background decoration -->
    <div class="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-5 rounded-t-2xl"></div>
    
    <!-- Header -->
    <div class="text-center mb-8 relative">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 rounded-full mb-4 shadow-lg">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7"/>
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🛒 Sepetiniz</h1>
      <p class="text-gray-600">Satın almak istediğiniz ürünleri gözden geçirin</p>
    </div>
        {#if basketError}
          <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center" transition:slide>
            <svg class="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-800 font-medium">Sepet Tutarı 100.000 veya üstü olamaz lütfen ürün çıkartın.!</span>
          </div>
        {/if}
    {#if basket.length === 0}
      <div class="text-center py-16" transition:scale>
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7"/>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Sepetiniz Boş</h2>
        <p class="text-gray-500 mb-8">Alışverişe başlamak için ürün ekleyin</p>
        <a href="/products" class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
          🛍️ Alışverişe Başla
        </a>
      </div>
    {:else}
      <!-- Basket Items -->
      <div class="space-y-4 mb-8">
        {#each basket as product, index (product.id + '-' + index)}

          <div 
            class="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-200 group"
            animate:flip={{ duration: 300 }}
            transition:fly={{ x: -20, duration: 300, delay: index * 50 }}
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 text-lg">{product.basketItemName}</h3>
                <p class="text-sm text-gray-500">{product.type ? 'Dijital Ürün' : 'Fiziksel Ürün'}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <span class="text-2xl font-bold text-green-600">₺{product.price}</span>
              <button
                on:click={() => removeFromBasket(product.id)}
                class="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors group-hover:scale-110 duration-200"
                title="Ürünü kaldır"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        {/each}
      </div>

      <!-- Summary Section -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">💰 Ödeme Özeti</h3>
        
        <div class="space-y-3">
          <div class="flex justify-between items-center text-gray-600">
            <span>Ara Toplam:</span>
            <span class="font-semibold">₺{totalPrice.toFixed(2)}</span>
          </div>
          
          <div class="flex justify-between items-center text-gray-600">
            <span>İşlem Ücreti:</span>
            <span class="font-semibold">₺{(0.2).toFixed(2)}</span>
          </div>
          
          <div class="flex justify-between items-center text-gray-600">
            <span>Kargo:</span>
            <span class="font-semibold text-green-600">Ücretsiz</span>
          </div>
          
          <hr class="border-gray-300">
          
          <div class="flex justify-between items-center text-xl font-bold text-gray-800" class:animate-pulse={animateTotal}>
            <span>Toplam:</span>
            <span class="text-green-600">₺{(totalPrice + 0.2).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="order-2 sm:order-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
          on:click={clearBasket}
        >
          🗑️ Sepeti Temizle
        </button>
      {#if totalPrice < 100000}
        <button
          class="order-1 sm:order-2 px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          on:click={buyButton}
          disabled={isLoading}
          class:animate-pulse={isLoading}
        >

          {#if isLoading}
            <div class="flex items-center justify-center space-x-2">
              <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>İşleniyor...</span>
            </div>
          {:else}
            🛒 Satın Al ({basket.length} Ürün)
          {/if}
        </button>
      {:else}
        <button
          class="order-1 sm:order-2 px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          on:click={() => basketError = true}
          disabled={isLoading}
          class:animate-pulse={isLoading}
        >
            <div class="flex items-center justify-center space-x-2">
              <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Satın Al({basket.length})<span>
            </div>
        </button>
      {/if}
      </div>

      <!-- Security Info -->
      <div class="mt-8 pt-6 border-t border-gray-200 text-center">
        <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span>Güvenli Ödeme</span>
          </div>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v0M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
            <span>Ücretsiz Kargo</span>
          </div>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>Müşteri Memnuniyeti</span>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Decorative elements -->
    <div class="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-20"></div>
    <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full opacity-20"></div>
  </div>
</main>

<style>
  @keyframes fadeInScale {
    0% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
  }
  
  .animate-fade-in-scale {
    animation: fadeInScale 0.3s ease-out;
  }
</style>