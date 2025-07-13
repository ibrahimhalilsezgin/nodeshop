<script lang="ts">
	import axios from "axios";
	import Navbar from "@/components/Navbar.svelte";
	import { goto } from "$app/navigation";
	import { Toaster, createToaster } from '@skeletonlabs/skeleton-svelte';
	import { getCookie } from "@/utils/cookie.util.js";
	import { fade } from "svelte/transition";
	import { PUBLIC_CDNURL } from "$env/static/public";

	const toaster = createToaster({});
	export let data;

	let selectedFileName = '';
    let base64String = '';
	let formInputs: any = {
		title: { value: '' },
		details: { value: '' },
		tags: { value: [] },
		stock: { value: 0 },
		price: { value: 0 },
		image: { value: '' },
		file: { value: '' }
	};

	let success = false;
	let error: string;

	async function Save() {
		try {
			const response = await axios({
				url: data.PUBLIC_BACKENDURL + '/api/v1/createProduct',
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + getCookie('token')
				},
				data: {
					title: formInputs.title.value,
					details: formInputs.details.value,
					stock: formInputs.stock.value,
					tags: formInputs.tags.value,
					price: formInputs.price.value,
					image: formInputs.image.value,
					file: formInputs.file.value
				}
			});

			if (response.status === 200) {
                const uploadRes = await axios.post(PUBLIC_CDNURL + '/upload', {
						id:response.data.id,
						file: `data:application/zip;base64,${base64String}`
					}, {
						headers: {
							Authorization: "Server PAPYABVPsUZMnAXSxUwVcbjZyTynKEZeMKwGGPACqbxpFnCHkxSzKhArNWzAQuUm"
						}
					});

					formInputs.file.value = uploadRes.data.url;
					console.log('ZIP dosyası CDN\'e yüklendi:', uploadRes.data.url);
				success = true;
				setTimeout(() => { goto('/admin/products') }, 1500);
			}
		} catch (err: any) {
			console.log(err);

			if (err?.response?.data?.error) {
				error = err.response.data.error;
				toaster.error({
					type: 'error',
					title: 'Hata Oluştu',
					description: err.response.data.error
				});
			}
		}
	}

	const fileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = error => reject(error);
		});
	};

	function arrayBufferToBase64(buffer: ArrayBuffer): string {
		let binary = '';
		const bytes = new Uint8Array(buffer);
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	const handleFileChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			const file = files[0];
			selectedFileName = file.name;

			try {
				const base64 = await fileToBase64(file);
				formInputs.image.value = base64;
				console.log('Base64 oluşturuldu:', base64.substring(0, 50) + '...');
			} catch (error) {
				console.error('Dosya yüklenirken hata:', error);
				toaster.error({
					type: 'error',
					title: 'Dosya Hatası',
					description: 'Resim yüklenemedi.'
				});
			}
		}
	};

	const handleFileChange2 = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			const file = files[0];
			selectedFileName = file.name;

			try {
				const reader = new FileReader();
				reader.readAsArrayBuffer(file);

				reader.onload = async () => {
					base64String = arrayBufferToBase64(reader.result as ArrayBuffer);
					const id = crypto.randomUUID();

					
				};
			} catch (error) {
				console.error('ZIP yükleme hatası:', error);
				toaster.error({
					type: 'error',
					title: 'Dosya Hatası',
					description: 'ZIP dosyası yüklenemedi.'
				});
			}
		}
	};
</script>



<!-- {JSON.stringify(data.products)} -->
<Navbar user={data.user}/>
<Toaster {toaster}></Toaster>


<div class="pt-32" transition:fade>
    {#if success}
        <div class="bg-green-500 w-1/3 mx-auto rounded-lg  text-center">
            Ürün Başarıyla Oluşturuldu.
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
                            <!-- svelte-ignore a11y_label_has_associated_control -->
                            <label class="block text-sm font-medium text-gray-700 mb-2">Ürün Adı</label>
                            <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" bind:value={formInputs.title.value}>
                        </div>
                        
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                            <textarea rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={formInputs.details.value}></textarea>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        <div>
                            <!-- svelte-ignore a11y_label_has_associated_control -->
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
                                if(input.value == null) return;
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
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label class="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                                <input type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" bind:value={formInputs.stock.value}>
                            </div>
                            <div>
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat</label>
                                <div class="relative">
                                    <span class="absolute left-5 top-3 text-black">₺</span>
                                    <input type="number" step="0.10" class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" bind:value={formInputs.price.value} >
                                </div>
                            </div>
                        </div>
                        
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ürün Resmi</label>
                        <div class="max-w-sm">
                            <label class="block">
                                <input 
                                    type="file" 
                                    class="hidden" 
                                    id="fileInput" 
                                    accept="image/*" 
                                    on:change={handleFileChange}
                                >
                                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                    <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    <p class="text-gray-600">Resim seç</p>
                                </div>
                            </label>
                            
                            {#if selectedFileName}
                                <div class="mt-3 text-sm text-gray-500">
                                    {selectedFileName}
                                </div>
                            {/if}
                            
                            {#if formInputs.image.value}
                                <div class="mt-3">
                                    <img src={formInputs.image.value} alt="Önizleme" class="w-full h-32 object-cover rounded-lg">
                                </div>
                            {/if}
                        </div>
                         <div>
                        <div class="max-w-sm mt-4">
                            <label class="block">
                                <input 
                                    type="file" 
                                    class="hidden" 
                                    id="fileInput" 
                                    accept=".zip, .rar" 
                                    on:change={handleFileChange2}
                                >
                                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                    <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    <p class="text-gray-600">Dosya seç</p>
                                </div>
                            </label>
                            
                            {#if selectedFileName}
                                <div class="mt-3 text-sm text-gray-500">
                                    {selectedFileName}
                                </div>
                            {/if}
                            
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
                        Ürünü Oluştur
                    </button>
                </div>
            </form>
        </div>
    </div>
    </div>
