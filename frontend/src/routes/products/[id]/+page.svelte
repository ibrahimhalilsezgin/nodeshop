<script lang="ts">
  import Navbar from '@/components/Navbar.svelte';
  export let data;
  import { fade, fly, scale, slide } from "svelte/transition";
  import { quintOut, elasticOut } from 'svelte/easing';
 
  interface Basket {
    id: string;
    basketItemName: string;
    type: boolean; // true = virtual
    price: number;
  }
 
  let itemAdded = false;
  let addedProductId = '';
  let isLoading = false;
 
  const addItemToBasket = async (
    id: string,
    basketItemName: string,
    type: boolean,
    price: number
  ): Promise<void> => {
    isLoading = true;
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let storedBasket = localStorage.getItem('basket');
    let basket = [];
    if (storedBasket) {
      try {
        basket = JSON.parse(storedBasket);
      } catch {
        basket = [];
      }
    }
    
    // Yeni item objesi oluştur ve sepete ekle
    const newItem = { id, basketItemName, type, price };
    basket.push(newItem);
    
    // Güncellenmiş sepeti kaydet
    localStorage.setItem('basket', JSON.stringify(basket));
    
    // Görsel geri bildirim için state güncelle
    addedProductId = id;
    itemAdded = true;
    isLoading = false;
    
    setTimeout(() => {
      itemAdded = false;
      addedProductId = '';
    }, 3000);
  };
</script>

<Navbar user={data.user} />

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
  <!-- Background decorative elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
  </div>

  <!-- Success Notification -->
  {#if itemAdded}
    <div class="fixed top-24 right-4 z-50" transition:fly={{ y: -50, duration: 300 }}>
      <div class="bg-green-500  px-6 py-4 rounded-lg shadow-lg border border-green-400 flex items-center">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="font-medium">Ürün başarıyla sepete eklendi!</span>
      </div>
    </div>
  {/if}

  <!-- Main Content -->
  <div class="container mx-auto px-4 pt-32 pb-16 relative z-10">
    <div class="max-w-4xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        
        <!-- Product Image -->
        <div class="flex justify-center" transition:scale={{ duration: 600, easing: quintOut }}>
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img 
              src="{data.product.image}" 
              alt="{data.product.title}" 
              class="relative w-full max-w-md h-auto rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6" transition:fly={{ x: 50, duration: 600, easing: quintOut }}>
          <div class="space-y-4">
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              {data.product.title}
            </h1>
            
            <p class="text-lg text-gray-600 leading-relaxed">
              {data.product.details}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-center space-x-4">
            <span class="text-4xl font-bold text-emerald-600">
              {data.product.price} ₺
            </span>
            <div class="flex items-center space-x-1 text-yellow-500">
              {#each Array(5) as _, i}
                <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              {/each}
              <span class="text-gray-500 text-sm ml-2">(4.8/5)</span>
            </div>
          </div>

          <!-- Features -->
          <div class="grid grid-cols-2 gap-4 py-6">
            <div class="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-800">Hızlı Teslimat</p>
                <p class="text-sm text-gray-600">Anında erişim</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-800">Güvenli Ödeme</p>
                <p class="text-sm text-gray-600">%100 güvenli</p>
              </div>
            </div>
          </div>

          <!-- Add to Cart Button -->
          <button 
            on:click={() => addItemToBasket(data.product.id, data.product.title, true, data.product.price)}
            disabled={isLoading}
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700  font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
          >
            {#if isLoading}
              <svg class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sepete Ekleniyor...</span>
            {:else}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>Sepete Ekle</span>
            {/if}
          </button>

          <!-- Additional Info -->
          <div class="flex items-center justify-center space-x-6 text-sm text-gray-600 pt-4">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Ücretsiz İade</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span>Güvenli Ödeme</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.5a9.5 9.5 0 110 19 9.5 9.5 0 010-19z"></path>
              </svg>
              <span>24/7 Destek</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>