<script lang="ts">
    import Navbar from "@/components/Navbar.svelte";
    import { fade } from "svelte/transition";
    import { quadIn } from "svelte/easing";
    import { goto } from "$app/navigation";

    export let data;
</script>

<Navbar user={data.user} />

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24" transition:fade>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header Section -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Hesabım</h1>
            <p class="text-gray-600">Hesap bilgilerinizi ve satın alma geçmişinizi görüntüleyin</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- User Profile Card -->
            <div class="lg:col-span-1">
                <div class="bg-[#F8F7F4] rounded-xl shadow-lg border border-gray-200 p-6">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class=" text-2xl font-bold">
                                {data.user.firstName.charAt(0)}{data.user.lastName.charAt(0)}
                            </span>
                        </div>
                        <h2 class="text-xl font-semibold text-gray-900">
                            {data.user.firstName} {data.user.lastName}
                        </h2>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                            <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">{data.userDetails.email}</span>
                        </div>

                        <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                            <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span class="text-gray-700 text-sm">{data.userDetails.gsmNumber}</span>
                        </div>
                        <div class="flex items-center p-3 bg-gray-50 rounded-lg">

                            <button on:click={() => goto('/account/settings')} class="w-full bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">Düzenle</button>
                            <button on:click={() => goto('/logout')} class="w-full bg-red-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">Çıkış Yap</button>
                        
                        </div>
                    </div>
                </div>

                <!-- Address Card -->
                <div class="bg-[#F8F7F4] rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
                    <div class="flex items-center mb-4">
                        <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <h3 class="text-lg font-semibold text-gray-900">Kayıtlı Adres</h3>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        {data.userDetails.registrationAddress}
                    </p>
                </div>
            </div>

            <!-- Purchase History -->
            <div class="lg:col-span-2">
                <div class="bg-[#F8F7F4] rounded-xl shadow-lg border border-gray-200 p-6">
                    <div class="flex items-center mb-6">
                        <svg class="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <h3 class="text-xl font-semibold text-gray-900">Geçmiş Satın Alımlar</h3>
                    </div>

                    <div class="space-y-6">
                        {#each data.userDetails.purchases as purchaseGroup, groupIndex}
                            {#each purchaseGroup as purchase, index}
                                <div class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                    <!-- Purchase Header -->
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center">
                                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <span class="text-blue-600 font-semibold text-sm">#{groupIndex + 1}</span>
                                            </div>
                                            <div>
                                                <p class="font-medium text-gray-900">Sipariş ID: {purchase.basketId}</p>
                                                <p class="text-sm text-gray-500">
                                                    {purchase.items.length} ürün
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <!-- Payment Method -->
                                        <div class="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                                            {#if purchase.cardAssociation == "MASTER_CARD"}
                                                <img 
                                                    src="/Mastercard.png" 
                                                    alt="Master Card" 
                                                    class="w-6 h-6 mr-2 aspect-video"
                                                >
                                            {:else if purchase.cardAssociation == "VISA"}
                                                <img src="/Visa.png" alt="Visa Card" class="h-4 w-10 mr-4">
                                            {/if}
                                            <span class="text-sm font-mono text-gray-600 aspect-video">
                                                {purchase.binNumber}******{purchase.lastFourDigits}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Items List -->
                                    <div class="space-y-2">
                                        {#each purchase.items as item}
                                            <div class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-700 font-medium">{item.productTitle}</span>
                                                <span class="text-green-600 font-semibold">{item.price}₺</span>
                                            </div>
                                        {/each}
                                    </div>

                                    <!-- Total -->
                                    <div class="flex justify-end mt-4 pt-4 border-t border-gray-200">
                                        <div class="text-right">
                                            <p class="text-sm text-gray-500">Toplam</p>
                                            <p class="text-lg font-bold text-gray-900">
                                                {purchase.items.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}₺
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/each}
                    </div>

                    {#if data.userDetails.purchases.length === 0}
                        <div class="text-center py-12">
                            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Henüz satın alma geçmişi yok</h3>
                            <p class="text-gray-500">İlk alışverişinizi yapmak için mağazaya göz atın</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>