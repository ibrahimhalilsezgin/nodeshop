<script lang="ts">
  import Navbar from '../../components/Navbar.svelte';
  export let data;
  import { fade, fly, scale } from "svelte/transition";
  import { quintOut } from 'svelte/easing';
  
  interface Basket {
    id: string;
    basketItemName: string;
    type: boolean; // true = virtual
    price: number;
  }
  
  let itemAdded = false;
  let addedProductId = '';
  
  const addItemToBasket = async (
    id: string,
    basketItemName: string,
    type: boolean,
    price: number
  ): Promise<void> => {
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

    setTimeout(() => {
      itemAdded = false;
      addedProductId = '';
    }, 2000);
  };

</script>

<Navbar user={data.user} />

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20" transition:fade>
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

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Ürünlerimiz
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Özenle seçilmiş kaliteli ürünlerimizi keşfedin ve avantajlı fiyatlarla satın alın
      </p>
      <div class="mt-6 flex justify-center">
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {#each data.products as product, index}
        <div 
          class="group bg-[#F8F7F4] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2" 
          in:fly={{ y: 50, duration: 400, delay: index * 100, easing: quintOut }}
        >
          <!-- Product Image -->
          <div class="relative overflow-hidden">
            <img
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              src="{product.image}"
              alt={product.title}
            />
            
            <!-- Overlays -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Tags -->
            <div class="absolute top-3 left-3 flex flex-wrap gap-1">
              {#each product.tags as tag}
                <span class="bg-red-500  text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  {tag}
                </span>
              {/each}
              <span class="bg-green-500  text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                %25 İNDİRİM
              </span>
            </div>

            <!-- Wishlist Button -->
            <button class="absolute top-3 right-3 w-10 h-10 bg-[#F8F7F4]/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#F8F7F4] hover:scale-110">
              <svg class="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>

          <!-- Product Content -->
          <div class="p-6">
            <!-- Title and Description -->
            <div class="mb-4">
              <h2 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h2>
              <p class="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {product.details}
              </p>
            </div>

            <!-- Rating -->
            <div class="flex items-center mb-4">
              <div class="flex items-center">
                {#each Array(5) as _, i}
                  <svg class="w-4 h-4 {i < 4 ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                {/each}
              </div>
              <span class="text-gray-500 text-sm ml-2">4.8 (56 değerlendirme)</span>
            </div>

            <!-- Price and Add to Cart -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-2xl font-bold text-green-600">₺{(product.price * 0.75).toFixed(2)}</span>
                  <span class="text-sm text-gray-400 line-through">₺{product.price}</span>
                </div>
                <div class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  %25 İndirim
                </div>
              </div>

              <button
                on:click={() => addItemToBasket(product.id, product.title, true, product.price)}
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700  font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                disabled={addedProductId === product.id}
              >
                {#if addedProductId === product.id}
                  <div class="flex items-center" in:scale={{ duration: 200 }}>
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Eklendi!
                  </div>
                {:else}
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                    </svg>  
                    <span class="text-gray-950">Sepete Ekle</span>
                  </div>
                {/if}
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Empty State -->
    {#if data.products.length === 0}
      <div class="text-center py-16">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
        <h3 class="text-xl font-medium text-gray-900 mb-2">Henüz ürün bulunmuyor</h3>
        <p class="text-gray-500">Yakında yeni ürünler eklenecek, takipte kalın!</p>
      </div>
    {/if}

    <!-- CTA Section -->
    <div class="mt-16 text-center">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 ">
        <h2 class="text-3xl font-bold mb-4">Özel Fırsatları Kaçırmayın!</h2>
        <p class="text-lg mb-6 opacity-90">
          Yeni ürünler ve özel indirimlerden ilk siz haberdar olun
        </p>
        <button class="bg-[#F8F7F4] text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Bültene Abone Ol
        </button>
      </div>
    </div>
  </div>
</div>