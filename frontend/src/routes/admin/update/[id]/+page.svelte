<script lang="ts">
    import axios from "axios";
    import Navbar from '@/components/Navbar.svelte';
    import { getCookie } from "@/utils/cookie.util.js";
    import { fade } from "svelte/transition";

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
    }
    async function Save(){
        try {
            
            const response = await axios({
                url: PUBLIC_BACKENDURL + '/api/v1/updateProduct/'+data.id,
                method:'POST',
                headers:{
                    Authorization: 'Bearer ' + getCookie('token')
                },
                data:{
                    title:formInputs.title.value,
                    details: formInputs.details.value,
                    stock:formInputs.stock.value,
                    tags: formInputs.tags.value,
                    price:formInputs.price.value
                }
            });
            
            if(response.status == 200) {
                success = true;
            }
        } catch (err) {
            
        }
    }
</script>


<!-- {JSON.stringify(data.products)} -->
<Navbar user={data.user} />
<!-- svelte-ignore a11y_label_has_associated_control -->

<div class="pt-32" transition:fade>
    {#if success}
        <div class="bg-green-500 w-1/3 mx-auto rounded-lg  text-center">
            Ürün Başarıyla Güncellendi.
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
                            <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" bind:value={formInputs.title.value}>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                            <textarea rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={formInputs.details.value}></textarea>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
                            <div class="flex flex-wrap gap-2 mb-2">
                                {#each formInputs.tags.value as tag}
                                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                                    <span class="bg-blue-100 hover:bg-red-600 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer" on:click={() => {
                                        formInputs.tags.value.splice(formInputs.tags.value.indexOf(tag), 1);
                                        formInputs.tags.value = [...formInputs.tags.value];
                                    }}>{tag} X</span>
                                {/each}
                            </div>
                            <input
                            type="text"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="tagsInput"
                            placeholder="Etiket ekleyip Enter'e basın"
                            on:keypress={(e) => {
                                if (e.key === "Enter") {
                                const input:any = document.getElementById("tagsInput");
                                if (input.value.trim()) {
                                    formInputs.tags.value = [...formInputs.tags.value, input.value.trim()];
                                    input.value = ""; // input'u temizle
                                }
                                }
                            }}
                            />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                                <input type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" bind:value={formInputs.stock.value}>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat</label>
                                <div class="relative">
                                    <span class="absolute left-5 top-3 text-black">₺</span>
                                    <input type="number" step="0.10" class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" bind:value={formInputs.price.value} >
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Ürün Resmi</label>
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="mt-1 text-sm text-gray-600">Resmi sürükleyip bırakın veya tıklayarak seçin</p>
                                <input type="file" hidden>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Form Butonları -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                        İptal
                    </button>
                    <button on:click={Save}  class="px-6 py-3 bg-blue-600  rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                        Ürünü Kaydet
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>