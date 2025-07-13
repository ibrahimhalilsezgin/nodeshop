<script>
    export let data;
    import Navbar from "@/components/Navbar.svelte";
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { goto } from "$app/navigation";
    import Footer from "@/components/Footer.svelte";
    
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
            content: "NodeShop'dan aldığım Websitem sorunsuz çalışıyor. Otomatik teslimat ve güvenli ödeme için teşekkürler!",
            rating: 5
        },
        {
            name: "Ayşe Demir",
            role: "Web Tasarımcısı",
            content: "Websitemi çok uygun fiyata aldım. Kurulum rehberi çok faydalıydı.",
            rating: 5
        },
        {
            name: "Mehmet Kaya",
            role: "İş Sahibi",
            content: "Ofisimiz için mükemmel bir websitesi yaptılar. Canlı destek ekibi çok yardımcı oldu.",
            rating: 5
        }
    ];
    
    
    const popularProducts = data.stats.formattedTopProducts
    
    onMount(() => {
        mounted = true;
        
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
        @keyframes floatingKeyframes {
            from { transform: translateY(0); }
            to { transform: translateY(-10px); }
            }

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
                <br>
                <div class="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-8">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                    Şuanda Madrid / İspanya Sunucumuza Bağlısınız.
                </div>
                <h1 class="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                    Otomatik Teslimat. <br class="hidden sm:block">
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
                     class="group bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 floating">
                        <svg class="w-10 h-10 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Güvenli Ödeme</h3>
                    <p class="text-gray-600 leading-relaxed mb-4">İyzico altyapısı ve 256-bit SSL şifreleme ile korunuyor</p>
                    <div class="flex justify-center space-x-2">
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">SSL</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">İyzico</span>
                    </div>
                </div>
                
                <div in:fly={{ y: 30, duration: 600, delay: 800 }} 
                     class="group bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 floating" style="animation-delay: 1s;">
                        <svg class="w-10 h-10 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Anında Teslimat</h3>
                    <p class="text-gray-600 leading-relaxed mb-4">Otomatik sistem ile 5 saniye içinde teslimat</p>
                    <div class="flex justify-center space-x-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Otomatik</span>
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Hızlı</span>
                    </div>
                </div>
                
                <div in:fly={{ y: 30, duration: 600, delay: 1000 }} 
                     class="group bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
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
                    <div class="mt-12 pt-8 border-t border-gray-300 mt-4">
                        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button on:click={() => goto('/products')} class="cursor-pointer bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
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
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Sıkça Sorulan Sorular</h2>
                <p class="text-xl text-gray-600">Merak ettiğiniz her şey burada</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div class="space-y-6">
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Websitelerini Siz mi yazıyorsunuz?</h3>
                        <p class="text-gray-600 leading-relaxed">Evet, tüm websitelerini biz yazıyoruz.</p>
                    </div>
                    
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Teslimat süresi nedir?</h3>
                        <p class="text-gray-600 leading-relaxed">Ödeme onaylandıktan sonra 10-20 dakika içinde email adresinize otomatik olarak gönderilir.</p>
                    </div>
                    
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
                        <p class="text-gray-600 leading-relaxed">Kredi kartı, banka kartı, havale/EFT ve online banking seçenekleri mevcuttur.</p>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Kurulum desteği veriyor musunuz?</h3>
                        <p class="text-gray-600 leading-relaxed">Evet, 7/24 canlı destek ekibimiz kurulum ve kullanım konularında size yardımcı olur.</p>
                    </div>
                    
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">İade politikanız nasıl?</h3>
                        <p class="text-gray-600 leading-relaxed">Websitelerimizi açık kaynak şeklinde teslim etmekteyiz. Kopyalanmaya karşı iade seçeneğimiz bulunmamaktadır. Lütfen Ürün Detaylarını kontrol edip</p>
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
    <Footer />
</div>