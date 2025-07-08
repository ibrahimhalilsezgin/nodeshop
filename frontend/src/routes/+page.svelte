<script>
  import Navbar from "@/components/Navbar.svelte";
  export let data;
</script>
<!-- Navigation -->

<Navbar user={data.user}/>
    <!-- Hero Section -->
    <section class="gradient-bg pt-20 pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="floating">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-[#F8F7F4] rounded-full mb-8">
                        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                </div>
                <h1 class="text-4xl md:text-6xl font-bold  mb-6">
                    Premium Digital Goods
                    <span class="block text-yellow-300">Delivered Instantly</span>
                </h1>
                <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                    Experience the future of digital commerce with our curated collection of virtual goods. Fast, secure, and reliable delivery guaranteed.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-[#F8F7F4] text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                        Explore Catalog
                    </button>
                    <button class="border-2 border-white  px-8 py-4 rounded-lg font-semibold hover:bg-[#F8F7F4] hover:text-primary transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Payment Security Banner -->
    <section class="bg-[#F8F7F4] py-8 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-center">
                <div class="flex items-center space-x-4">
                    <div class="text-green-600">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <span class="text-2xl font-bold text-gray-800">Pay Securely with</span>
                    <div class="bg-blue-600  px-6 py-2 rounded-lg font-bold text-xl">
                        iyzico
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose VirtualHub?</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">We're committed to delivering the best digital experience with unmatched reliability and quality.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Reliability -->
                <div class="bg-[#F8F7F4] rounded-2xl p-8 shadow-lg card-hover">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">100% Reliability</h3>
                    <p class="text-gray-600 mb-6">Our platform maintains 99.9% uptime with robust infrastructure ensuring your purchases are always accessible when you need them.</p>
                    <div class="flex items-center text-green-600 font-semibold">
                        <span class="text-3xl font-bold mr-2">99.9%</span>
                        <span>Uptime Guarantee</span>
                    </div>
                </div>

                <!-- Quality -->
                <div class="bg-[#F8F7F4] rounded-2xl p-8 shadow-lg card-hover">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
                    <p class="text-gray-600 mb-6">Every virtual good is carefully curated and verified to meet our high standards. Only the best makes it to our platform.</p>
                    <div class="flex items-center text-purple-600 font-semibold">
                        <span class="text-3xl font-bold mr-2">★★★★★</span>
                        <span>Verified Quality</span>
                    </div>
                </div>

                <!-- Fast Delivery -->
                <div class="bg-[#F8F7F4] rounded-2xl p-8 shadow-lg card-hover">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
                    <p class="text-gray-600 mb-6">Instant delivery of all virtual goods. No waiting, no delays. Your digital items are ready the moment you complete your purchase.</p>
                    <div class="flex items-center text-blue-600 font-semibold">
                        <span class="text-3xl font-bold mr-2">&lt;5</span>
                        <span>Seconds Delivery</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Trust Indicators -->
    <section class="py-16 bg-[#F8F7F4]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
                <p class="text-xl text-gray-600">Join our community of satisfied customers worldwide</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div class="p-6">
                    <div class="text-4xl font-bold text-primary mb-2">50K+</div>
                    <div class="text-gray-600">Happy Customers</div>
                </div>
                <div class="p-6">
                    <div class="text-4xl font-bold text-primary mb-2">1M+</div>
                    <div class="text-gray-600">Items Delivered</div>
                </div>
                <div class="p-6">
                    <div class="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div class="text-gray-600">Support Available</div>
                </div>
                <div class="p-6">
                    <div class="text-4xl font-bold text-primary mb-2">4.9★</div>
                    <div class="text-gray-600">Average Rating</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold  mb-6">Ready to Get Started?</h2>
            <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Discover our extensive catalog of premium virtual goods and experience the future of digital commerce today.
            </p>
            <button class="bg-[#F8F7F4] text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 pulse-animation">
                Browse Catalog Now
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900  py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Company Info -->
                <div class="col-span-1 md:col-span-2">
                    <h3 class="text-2xl font-bold mb-4">VirtualHub</h3>
                    <p class="text-gray-400 mb-6 max-w-md">
                        Your trusted partner for premium virtual goods and digital services. Fast, secure, and reliable delivery guaranteed.
                    </p>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <div class="flex space-x-4">
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <a href="#" class="text-gray-400 hover: transition-colors">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <a href="#" class="text-gray-400 hover: transition-colors">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                            </svg>
                        </a>
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <a href="#" class="text-gray-400 hover: transition-colors">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                        <!-- svelte-ignore a11y_invalid_attribute -->
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover: transition-colors">About Us</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">Terms of Service</a></li>
                        <li><a href="#" class="text-gray-400 hover: transition-colors">FAQ</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            support@virtualhub.com
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            +1 (555) 123-4567
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            24/7 Support Available
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">
                    © 2025 VirtualHub. All rights reserved.
                </p>
                <div class="flex items-center space-x-4 mt-4 md:mt-0">
                    <span class="text-gray-400 text-sm">Secure payments powered by</span>
                    <div class="bg-blue-600  px-4 py-1 rounded font-bold">
                        iyzico
                    </div>
                </div>
            </div>
        </div>
    </footer>
<style>
    
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
</style>