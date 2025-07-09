<script lang="ts">
    import axios from "axios";
    import Navbar from '@/components/Navbar.svelte';
    import { getCookie } from "@/utils/cookie.util.js";
    import { goto } from "$app/navigation";

    export let data;

    let success = false;
    let formInputs:any = {
        title:{
            value: data.product.title
        },
        details:{
            value: data.product.details
        },
        tags:{
            value: data.product.tags
        },
        stock:{
            value: data.product.stock
        },
        price:{
            value: data.product.price
        },
        image:{
            value: data.product.image
        }
    }
    async function Delete(){
        try {
            
            const response = await axios({
                url: data.PUBLIC_BACKENDURL + '/api/v1/deleteProduct/'+data.id,
                method:'POST',
                headers:{
                    Authorization: 'Bearer ' + getCookie('token')
                }
            });
            
            if(response.status == 200) {
                success = true;
                setTimeout(() => {goto('/admin/products/')}, 1200)
            }
        } catch (err) {
            
        }
    }
</script>


<Navbar user={data.user} />
<!-- svelte-ignore a11y_label_has_associated_control -->

<div class="pt-32">
    {#if success}
        <div class="bg-green-500 w-1/3 mx-auto rounded-lg  text-center">
            Ürün Silindi.
        </div>
    {/if}
    <div class="form-container flex items-center justify-center p-4">
        <div class="w-full max-w-4xl  rounded-lg shadow-xl p-8">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Ürün Bilgileri</h2>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a href="#" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </a>
            </div>
            
            <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Ürün Adı</label>
                            <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" bind:value={formInputs.title.value} disabled>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                            <textarea rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={formInputs.details.value} disabled></textarea>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
                            <div class="flex flex-wrap gap-2 mb-2">
                                {#each formInputs.tags.value as tag}
                                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                                    <span class="bg-blue-100 hover:bg-red-600 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer" aria-disabled="true">{tag} X</span>
                                {/each}
                            </div>
                            <input
                            type="text"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="tagsInput"
                            disabled
                            />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                                <input type="number" disabled class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" bind:value={formInputs.stock.value}>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat</label>
                                <div class="relative">
                                    <span class="absolute left-5 top-3 text-black">₺</span>
                                    <input type="number" disabled step="0.10" class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" bind:value={formInputs.price.value} >
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Ürün Resmi</label>
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <img src="{formInputs.image.value}" class="rounded-lg">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Form Butonları -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                        İptal
                    </button>
                    <button on:click={Delete}  class="px-6 py-3 bg-red-600  rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium">
                        Ürünü Sil
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>