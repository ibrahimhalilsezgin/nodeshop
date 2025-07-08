<script>
    import { goto } from '$app/navigation';
    import Navbar from '@/components/Navbar.svelte';
    import { fade } from 'svelte/transition';
    export let data;
 
</script>

<Navbar user={data.user} />

<div class="min-h-screen bg-gray-50 pt-20" transition:fade>
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Ürün Yönetimi</h1>
            <p class="text-gray-600 text-lg">Mevcut ürünlerinizi görüntüleyin ve yönetin</p>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {#each data.products as product}
                <div class="bg-[#F8F7F4] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <!-- Product Image -->
                    <div class="relative h-48 overflow-hidden">
                        {#if product.image}
                            <img 
                                src={product.image} 
                                alt={product.title}
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        {:else}
                            <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                        {/if}
                        
                        <!-- Stock Badge -->
                        <div class="absolute top-3 right-3">
                            <span class="px-2 py-1 text-xs font-medium rounded-full {product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                {product.stock > 0 ? `${product.stock} stok` : 'Tükendi'}
                            </span>
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div class="p-6">
                        <!-- Title -->
                        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {product.title}
                        </h3>

                        <!-- Tags -->
                        {#if product.tags && product.tags.length > 0}
                            <div class="flex flex-wrap gap-1 mb-3">
                                {#each product.tags.slice(0, 2) as tag}
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        {tag}
                                    </span>
                                {/each}
                                {#if product.tags.length > 2}
                                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                        +{product.tags.length - 2}
                                    </span>
                                {/if}
                            </div>
                        {/if}

                        <!-- Description -->
                        <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                            {product.details}
                        </p>

                        <!-- Price -->
                        <div class="flex items-center justify-between mb-6">
                            <span class="text-2xl font-bold text-green-600">
                                {product.price} ₺
                            </span>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2">
                            <button 
                                class="flex-1 bg-blue-600 hover:bg-blue-700  px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                on:click={() => goto('/admin/update/' + product.id)}
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                                Düzenle
                            </button>
                            <button 
                                class="flex-1 bg-red-600 hover:bg-red-700  px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                on:click={() => goto('/admin/delete/' + product.id)}
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Empty State -->
        {#if data.products.length === 0}
            <div class="text-center py-16">
                <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Henüz ürün yok</h3>
                <p class="text-gray-600 mb-4">İlk ürününüzü ekleyerek başlayın</p>
                <button 
                    class="bg-blue-600 hover:bg-blue-700  px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    on:click={() => goto('/admin/create')}
                >
                    Ürün Ekle
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>