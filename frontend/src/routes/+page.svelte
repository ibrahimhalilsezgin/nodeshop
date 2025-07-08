<script>
    export let data;
    import Navbar from "@/components/Navbar.svelte";
    import { fade, fly, scale, blur } from "svelte/transition";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { goto } from "$app/navigation";
    
    let mounted = false;
    let currentTestimonial = 0;
    let statsVisible = false;
    
    // Stats animation
    const customerCount = tweened(0, { duration: 2000, easing: cubicOut });
    const orderCount = tweened(0, { duration: 2000, easing: cubicOut });
    const satisfactionRate = tweened(0, { duration: 2000, easing: cubicOut });
    
    // Testimonials data
    const testimonials = [
        {
            name: "Ahmet Yılmaz",
            role: "Yazılım Geliştiricisi",
            content: "NodeShop'dan aldığım Windows lisansı sorunsuz çalışıyor. Hızlı teslimat ve güvenli ödeme için teşekkürler!",
            rating: 5
        },
        {
            name: "Ayşe Demir",
            role: "Grafik Tasarımcısı",
            content: "Adobe Creative Suite lisansını çok uygun fiyata aldım. Kurulum rehberi çok faydalıydı.",
            rating: 5
        },
        {
            name: "Mehmet Kaya",
            role: "İş Sahibi",
            content: "Office 2021 lisansı ofisimiz için mükemmel. Canlı destek ekibi çok yardımcı oldu.",
            rating: 5
        }
    ];
    
    // Popular products with more details
    const popularProducts = [
        { 
            name: "Windows 11 Pro", 
            price: "299₺", 
            oldPrice: "399₺",
            image: "/windows-logo.png",
            features: ["Profesyonel Sürüm", "Ömür Boyu Geçerli", "Anında Teslimat"],
            badge: "En Popüler",
            badgeColor: "bg-red-500"
        },
        { 
            name: "Office 2021 Pro", 
            price: "189₺", 
            oldPrice: "249₺",
            image: "/office-logo.png",
            features: ["Word, Excel, PowerPoint", "Outlook Dahil", "Tek Seferlik Ödeme"],
            badge: "İndirim",
            badgeColor: "bg-green-500"
        },
        { 
            name: "Antivirus Premium", 
            price: "89₺", 
            oldPrice: "129₺",
            image: "/antivirus-logo.png",
            features: ["Gelişmiş Koruma", "1 Yıl Lisans", "Çoklu Cihaz"],
            badge: "Yeni",
            badgeColor: "bg-blue-500"
        },
        { 
            name: "Adobe Creative Suite", 
            price: "399₺", 
            oldPrice: "599₺",
            image: "/adobe-logo.png",
            features: ["Tüm Uygulamalar", "Profesyonel Sürüm", "Sürekli Güncellemeler"],
            badge: "Premium",
            badgeColor: "bg-purple-500"
        }
    ];
    
    onMount(() => {
        mounted = true;
        
        // Stats animation trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsVisible) {
                    statsVisible = true;
                    customerCount.set(data.stats.userLength);
                    orderCount.set(data.stats.totalPayment);
                    satisfactionRate.set(98);
                }
            });
        });
        
        const statsElement = document.querySelector('#stats-section');
        if (statsElement) observer.observe(statsElement);
        
        // Testimonial slider
        const interval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }, 5000);
        
        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    });
    
    // Floating animation keyframes
    const floatingKeyframes = `
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
    `;
</script>

<svelte:head>
    <style>
        {floatingKeyframes}
        .gradient-text {
            background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
    </style>
</svelte:head>

<Navbar user={data.user} />

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-24 relative overflow-hidden">
    <!-- Background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style="animation-delay: 4s;"></div>
    </div>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {#if mounted}
            <div in:fly={{ y: 50, duration: 800, delay: 200 }} class="text-center mb-16">
                <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    Türkiye'nin En Güvenilir Yazılım Satış Platformu
                </div>
                
                <h1 class="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                    Hızlı Teslimat. <br class="hidden sm:block">
                    Güvenli Ödeme. <br class="hidden sm:block">
                    <span class="gradient-text">NodeShop</span>
                </h1>
                
                <p class="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8 leading-relaxed">
                    Websitelerini güvenle satın al. Ödeme sonrası saniyeler içinde teslimat. 
                    <span class="text-blue-600 font-semibold">{data.stats.userLength}+</span> mutlu müşteri.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <button on:click={() => goto('/products')} class="group bg-gradient-to-r from-blue-600 to-purple-600  px-10 py-5 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl relative overflow-hidden">
                        <span class="relative z-10" >Mağazayı Keşfet</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
                
                <!-- Trust indicators -->
                <div class="flex flex-wrap justify-center items-center gap-8 mt-16 text-gray-500">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        SSL Güvenliği
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        İyzico Altyapısı
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        7/24 Destek
                    </div>
                </div>
            </div>
        {/if}
    </section>

    <!-- Stats Section -->
    <section id="stats-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12">
        {#if mounted}
            <div in:fly={{ y: 30, duration: 600, delay: 400 }} class="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div class="group">
                        <div class="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                            {Math.round($customerCount).toLocaleString()}+
                        </div>
                        <div class="text-gray-600 font-medium">Mutlu Müşteri</div>
                    </div>
                    <div class="group">
                        <div class="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                            {Math.round($orderCount).toLocaleString()}+
                        </div>
                        <div class="text-gray-600 font-medium">Başarılı Teslimat</div>
                    </div>
                    <div class="group">
                        <div class="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                            %{Math.round($satisfactionRate)}
                        </div>
                        <div class="text-gray-600 font-medium">Memnuniyet Oranı</div>
                    </div>
                </div>
            </div>
        {/if}
    </section>

    <!-- Features Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {#if mounted}
                <div in:fly={{ y: 30, duration: 600, delay: 600 }} 
                     class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 floating">
                        <svg class="w-10 h-10 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">%100 Güvenli Ödeme</h3>
                    <p class="text-gray-600 leading-relaxed mb-4">İyzico altyapısı ve 256-bit SSL şifreleme ile korunuyor</p>
                    <div class="flex justify-center space-x-2">
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">SSL</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">İyzico</span>
                    </div>
                </div>
                
                <div in:fly={{ y: 30, duration: 600, delay: 800 }} 
                     class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 floating" style="animation-delay: 1s;">
                        <svg class="w-10 h-10 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Anında Teslimat</h3>
                    <p class="text-gray-600 leading-relaxed mb-4">Otomatik sistem ile 30 saniye içinde email teslimi</p>
                    <div class="flex justify-center space-x-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Otomatik</span>
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Hızlı</span>
                    </div>
                </div>
                
                <div in:fly={{ y: 30, duration: 600, delay: 1000 }} 
                     class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 floating" style="animation-delay: 2s;">
                        <svg class="w-10 h-10 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">7/24 Canlı Destek</h3>
                    <p class="text-gray-600 leading-relaxed mb-4">Profesyonel destek ekibi ile kesintisiz hizmet</p>
                    <div class="flex justify-center space-x-2">
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Canlı</span>
                        <span class="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">7/24</span>
                    </div>
                </div>
            {/if}
        </div>
    </section>

    <!-- Popular Products Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-12">
        {#if mounted}
            <div in:fly={{ y: 30, duration: 600, delay: 1200 }} class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-12">Popüler Ürünler</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">En çok tercih edilen lisans anahtarları özel fiyatlarla</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {#each popularProducts as product, index}
                    <div in:fly={{ y: 30, duration: 600, delay: 1400 + (index * 100) }} 
                         class="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                        
                        <!-- Badge -->
                        <div class="absolute top-4 right-4 {product.badgeColor}  px-3 py-1 rounded-full text-sm font-medium">
                            {product.badge}
                        </div>
                        
                        <!-- Product Icon -->
                        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <div class="w-10 h-10 bg-white rounded-lg"></div>
                        </div>
                        
                        <!-- Product Info -->
                        <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">{product.name}</h3>
                        
                        <!-- Price -->
                        <div class="text-center mb-6">
                            <div class="flex items-center justify-center space-x-2">
                                <span class="text-3xl font-bold text-blue-600">{product.price}</span>
                                <span class="text-lg text-gray-400 line-through">{product.oldPrice}</span>
                            </div>
                        </div>
                        
                        <!-- Features -->
                        <ul class="space-y-2 mb-6">
                            {#each product.features as feature}
                                <li class="flex items-center text-sm text-gray-600">
                                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>
                        
                        <!-- Buy Button -->
                        <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600  py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Satın Al
                        </button>
                    </div>
                {/each}
            </div>
        {/if}
    </section>

    <!-- Customer Reviews Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-12">
        {#if mounted}
            <div in:fly={{ y: 30, duration: 600, delay: 1800 }} class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Müşteri Yorumları</h2>
                <p class="text-xl text-gray-600">Binlerce memnun müşterimizden bazıları</p>
            </div>
            
            <div class="relative">
                <div class="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
                    {#each testimonials as testimonial, index}
                        {#if index === currentTestimonial}
                            <div in:fade={{ duration: 500 }} class="text-center">
                                <!-- Stars -->
                                <div class="flex justify-center mb-6">
                                    {#each Array(testimonial.rating) as _, i}
                                        <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    {/each}
                                </div>
                                
                                <!-- Quote -->
                                <blockquote class="text-xl md:text-2xl text-gray-700 italic mb-8 max-w-4xl mx-auto leading-relaxed">
                                    "{testimonial.content}"
                                </blockquote>
                                
                                <!-- Author -->
                                <div>
                                    <div class="text-lg font-semibold text-gray-900">{testimonial.name}</div>
                                    <div class="text-gray-600">{testimonial.role}</div>
                                </div>
                            </div>
                        {/if}
                    {/each}
                    
                    <!-- Navigation dots -->
                    <div class="flex justify-center mt-8 space-x-2">
                        {#each testimonials as _, index}
                            <button 
                                class="w-3 h-3 rounded-full transition-all duration-300 {index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'}"
                                on:click={() => currentTestimonial = index}
                            ></button>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    </section>

    <!-- Trust Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {#if mounted}
            <div in:fly={{ y: 30, duration: 600, delay: 2000 }} class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 ">
                <div class="text-center mt-12 mb-12">
                    <h2 class="text-4xl md:text-5xl font-bold mb-8">Neden NodeShop?</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="flex flex-col items-center text-center">
                            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <svg class="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Otomatik Teslimat</h3>
                            <p class="text-gray-600 leading-relaxed">Ödeme sonrası 30 saniye içinde email ile güvenli teslimat</p>
                        </div>
                        
                        <div class="flex flex-col items-center text-center">
                            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <svg class="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Güvenli Ödeme</h3>
                            <p class="text-gray-600 leading-relaxed">İyzico altyapısı ve SSL şifreleme ile %100 güvenli ödeme sistemi</p>
                        </div>
                        
                        <div class="flex flex-col items-center text-center">
                            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <svg class="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Sürekli Destek</h3>
                            <p class="text-gray-600 leading-relaxed">7/24 canlı destek ile her zaman yanınızdayız</p>
                        </div>
                    </div>
                    
                    <!-- CTA Section -->
                    <div class="mt-12 pt-8 border-t border-white/20">
                        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button on:click={() => goto('/products')} class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Hemen Başla
                            </button>
     
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </section>

    <!-- FAQ Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {#if mounted}
            <div in:fly={{ y: 30, duration: 600, delay: 2200 }} class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Sıkça Sorulan Sorular</h2>
                <p class="text-xl text-gray-600">Merak ettiğiniz her şey burada</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Lisans anahtarları orijinal mi?</h3>
                        <p class="text-gray-600 leading-relaxed">Evet, tüm lisans anahtarları resmi kanallardan temin edilmiş ve %100 orijinaldir. Garanti belgesi ile birlikte teslim edilir.</p>
                    </div>
                    
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Teslimat süresi nedir?</h3>
                        <p class="text-gray-600 leading-relaxed">Ödeme onaylandıktan sonra 30 saniye içinde email adresinize otomatik olarak gönderilir.</p>
                    </div>
                    
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
                        <p class="text-gray-600 leading-relaxed">Kredi kartı, banka kartı, havale/EFT ve online banking seçenekleri mevcuttur.</p>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Kurulum desteği veriyor musunuz?</h3>
                        <p class="text-gray-600 leading-relaxed">Evet, 7/24 canlı destek ekibimiz kurulum ve kullanım konularında size yardımcı olur.</p>
                    </div>
                    
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">İade politikanız nasıl?</h3>
                        <p class="text-gray-600 leading-relaxed">Teknik sorun yaşandığında 7 gün içinde koşulsuz iade veya değişim hakkınız bulunur.</p>
                    </div>
                    
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Lisanslar kaç cihazda kullanılabilir?</h3>
                        <p class="text-gray-600 leading-relaxed">Her ürünün kendi lisans koşulları vardır. Ürün detaylarında belirtilen cihaz sayısı kadar kullanım hakkınız bulunur.</p>
                    </div>
                </div>
            </div>
        {/if}
    </section>

    <!-- Newsletter Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {#if mounted}
            <div in:fly={{ y: 30, duration: 600, delay: 2400 }} class="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl text-center">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Özel Fırsatları Kaçırma!</h2>
                <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Yeni ürünler, özel indirimler ve kampanyalardan ilk sen haberdar ol.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Email adresiniz" 
                        class="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-700"
                    >
                    <button class="bg-gradient-to-r from-blue-600 to-purple-600  px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Abone Ol
                    </button>
                </div>
                
                <p class="text-sm text-gray-500 mt-4">
                    Spam göndermiyoruz. İstediğiniz zaman aboneliğinizi iptal edebilirsiniz.
                </p>
            </div>
        {/if}
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900  py-16 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Company Info -->
                <div class="md:col-span-1">
                    <h3 class="text-2xl font-bold mb-4 gradient-text">NodeShop</h3>
                    <p class="text-gray-400 mb-6 leading-relaxed">
                        Türkiye'nin en güvenilir lisans anahtarı satış platformu. 
                        2020'den beri 25,000+ mutlu müşteriye hizmet veriyoruz.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                        <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                            </svg>
                        </a>
                        <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.162-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <!-- Services -->
                <div>
                    <h4 class="text-xl font-bold mb-6 text-white">Hizmetler</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Windows Lisansları</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Office Ürünleri</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Antivirus Yazılımları</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Adobe Ürünleri</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Oyun Lisansları</a></li>
                    </ul>
                </div>
                
                <!-- Support -->
                <div>
                    <h4 class="text-xl font-bold mb-6 text-white">Destek</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Canlı Destek</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Kurulum Rehberi</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Sıkça Sorulan Sorular</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">İletişim</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Ticket Sistemi</a></li>
                    </ul>
                </div>
                
                <!-- Legal -->
                <div>
                    <h4 class="text-xl font-bold mb-6 text-white">Yasal</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Gizlilik Politikası</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Kullanım Koşulları</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">İade Politikası</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">KVKK</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Çerez Politikası</a></li>
                    </ul>
                </div>
            </div>
            
            <!-- Bottom Footer -->
            <div class="mt-12 pt-8 border-t border-gray-700">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-400 text-center md:text-left">
                        © 2025 NodeShop. Tüm hakları saklıdır.
                    </p>
                    <div class="flex items-center space-x-6 mt-4 md:mt-0">
                        <img src="/ssl.png" alt="SSL" class="h-8">
                        <img src="/iyzico-logo.png" alt="İyzico" class="h-8">
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>