<script lang="ts">
    import {io} from "socket.io-client";
    import {PUBLIC_BACKENDURL} from "$env/static/public"
    io(PUBLIC_BACKENDURL)
    export let user;

</script>
 <!-- Navbar -->
    <nav class="bg-[#F8F7F4] shadow-lg fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img src="/nodeshop.png" alt="NodeShop" class="w-60" draggable="false">
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                        <a href="/products" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</a>
                </div>
                </div>  
                {#if !user}
                <div class="flex items-center space-x-4">
                    <a href="/login" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Sign in</a>
                </div>
                {/if}
                {#if user}
                    <div class="flex items-center space-x-4">
                        <a href="/payment" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Sepet</a>
                        <a href="/account" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Hesap</a>

                </div>
                    {#if user.isAdmin}
                    <div class="flex items-center space-x-4">
                        <a href="/admin" class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin</a>
                    </div>
                    {/if}
                {/if}
            </div>
        </div>
    </nav>