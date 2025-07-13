<script lang="ts">
    import Footer from "@/components/Footer.svelte";
  import Navbar from "@/components/Navbar.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    for (let i = 1; i <= 6; i++) {
      const section = document.getElementById(`section${i}`);
      const icon = document.getElementById(`icon${i}`);
      section?.classList.add("expanded");
      icon?.classList.remove("fa-chevron-down");
      icon?.classList.add("fa-chevron-up");
    }
  });
</script>
    <Navbar />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .section-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-left: 4px solid #3b82f6;
            transition: all 0.3s ease;
        }
        
        .section-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .data-item {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 1px solid #10b981;
            transition: all 0.3s ease;
        }
        
        .data-item:hover {
            transform: scale(1.02);
        }
        
        .info-highlight {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid #f59e0b;
        }
        
        .rights-card {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-left: 4px solid #2563eb;
        }
        
        .fade-in {
            animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .icon-spin {
            animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .timeline-item {
            position: relative;
            padding-left: 40px;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
        }
        
        .timeline-dot {
            position: absolute;
            left: 8px;
            top: 8px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #3b82f6;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        .collapsible-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .collapsible-content {
            max-height: 500px;
        }
    </style>

<div class="py-12 px-4">
    <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 fade-in">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6">
                <i class="fas fa-shield-alt text-4xl text-blue-600 icon-spin"></i>
            </div>
            <h1 class="text-4xl font-bold gradient-text mb-4">KVKK Aydınlatma Metni</h1>
            <p class="text-lg text-white/90 max-w-3xl mx-auto">
                6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verilerinizin işlenmesi hakkında bilgilendirme
            </p>
        </div>

        <!-- Main Content -->
        <div class="glass-card rounded-2xl p-8 mb-8 fade-in">
            <!-- Introduction -->
            <div class="info-highlight rounded-xl p-6 mb-8">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <i class="fas fa-info-circle text-2xl text-amber-600"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Genel Bilgilendirme</h3>
                        <p class="text-gray-700 leading-relaxed">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; 
                            veri sorumlusu olarak tarafımızca aşağıda açıklanan kapsamda işlenebilecektir.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Timeline Sections -->
            <div class="space-y-6">
                <!-- Section 1: Veri Sorumlusu -->
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="section-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-building text-blue-600 mr-3"></i>
                                1. Veri Sorumlusu
                            </h2>
                            <button on:click={() => toggleSection('section1')} class="text-blue-600 hover:text-blue-800 transition-colors">
                                <i class="fas fa-chevron-down" id="icon1"></i>
                            </button>
                        </div>
                        <div id="section1" class="collapsible-content">
                            <p class="text-gray-700 leading-relaxed">
                                Kişisel verileriniz, veri sorumlusu sıfatıyla tarafımızdan işlenmektedir. 
                                Verilerinizin güvenliği ve gizliliği en yüksek önceliğimizdir.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Section 2: Hangi Veriler İşlenmektedir -->
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="section-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-database text-blue-600 mr-3"></i>
                                2. Hangi Veriler İşlenmektedir?
                            </h2>
                            <button on:click={() => toggleSection('section2') } class="text-blue-600 hover:text-blue-800 transition-colors">
                                <i class="fas fa-chevron-down" id="icon2"></i>
                            </button>
                        </div>
                        <div id="section2" class="collapsible-content">
                            <div class="grid md:grid-cols-2 gap-4 mt-4">
                                <div class="data-item rounded-lg p-4">
                                    <div class="flex items-center space-x-3">
                                        <i class="fas fa-user text-green-600"></i>
                                        <span class="font-medium text-gray-800">Ad, Soyad</span>
                                    </div>
                                </div>
                                <div class="data-item rounded-lg p-4">
                                    <div class="flex items-center space-x-3">
                                        <i class="fas fa-envelope text-green-600"></i>
                                        <span class="font-medium text-gray-800">E-posta Adresi</span>
                                    </div>
                                </div>
                                <div class="data-item rounded-lg p-4">
                                    <div class="flex items-center space-x-3">
                                        <i class="fas fa-network-wired text-green-600"></i>
                                        <span class="font-medium text-gray-800">IP Adresi ve Cihaz Bilgileri</span>
                                    </div>
                                </div>
                                <div class="data-item rounded-lg p-4">
                                    <div class="flex items-center space-x-3">
                                        <i class="fas fa-shopping-cart text-green-600"></i>
                                        <span class="font-medium text-gray-800">Satın Alma Geçmişi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 3: İşlenme Amaçları -->
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="section-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-target text-blue-600 mr-3"></i>
                                3. İşlenme Amaçları
                            </h2>
                            <button on:click={() => toggleSection('section3')} class="text-blue-600 hover:text-blue-800 transition-colors">
                                <i class="fas fa-chevron-down" id="icon3"></i>
                            </button>
                        </div>
                        <div id="section3" class="collapsible-content">
                            <div class="grid md:grid-cols-2 gap-4 mt-4">
                                <div class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-600 mt-1"></i>
                                    <span class="text-gray-700">Sipariş işlemleri</span>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-600 mt-1"></i>
                                    <span class="text-gray-700">Müşteri desteği</span>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-600 mt-1"></i>
                                    <span class="text-gray-700">Dolandırıcılığın önlenmesi</span>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <i class="fas fa-check-circle text-green-600 mt-1"></i>
                                    <span class="text-gray-700">Yasal yükümlülüklerin yerine getirilmesi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 4: Verilerin Aktarımı -->
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="section-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-share-alt text-blue-600 mr-3"></i>
                                4. Verilerin Aktarımı
                            </h2>
                            <button on:click={() => toggleSection('section4')} class="text-blue-600 hover:text-blue-800 transition-colors">
                                <i class="fas fa-chevron-down" id="icon4"></i>
                            </button>
                        </div>
                        <div id="section4" class="collapsible-content">
                            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-exclamation-triangle text-red-600"></i>
                                    <span class="text-red-800 font-medium">Önemli Bilgi</span>
                                </div>
                                <p class="text-red-700 mt-2">
                                    Verileriniz yalnızca yasal zorunluluklar kapsamında resmi kurumlara aktarılır. 
                                    Üçüncü şahıslarla paylaşım yapılmaz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 5: Saklama Süresi -->
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="section-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-clock text-blue-600 mr-3"></i>
                                5. Saklama Süresi
                            </h2>
                            <button on:click={() => toggleSection('section5')} class="text-blue-600 hover:text-blue-800 transition-colors">
                                <i class="fas fa-chevron-down" id="icon5"></i>
                            </button>
                        </div>
                        <div id="section5" class="collapsible-content">
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                <p class="text-blue-800">
                                    Verileriniz yasal gereklilikler ve iş süreçlerimizin gerektirdiği süre boyunca saklanır. 
                                    Saklama süresi sona erdiğinde, verileriniz güvenli şekilde imha edilir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 6: Haklarınız -->
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="rights-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-semibold text-gray-800 flex items-center">
                                <i class="fas fa-gavel text-blue-600 mr-3"></i>
                                6. Haklarınız
                            </h2>
                            <button on:click={() => toggleSection('section6')} class="text-blue-600 hover:text-blue-800 transition-colors">
                                <i class="fas fa-chevron-down" id="icon6"></i>
                            </button>
                        </div>
                        <div id="section6" class="collapsible-content">
                            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4">
                                <p class="text-gray-700 mb-4">
                                    KVKK madde 11 uyarınca aşağıdaki haklarınızı kullanmak için bizimle iletişime geçebilirsiniz:
                                </p>
                                <div class="grid md:grid-cols-2 gap-3">
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-check text-green-600"></i>
                                        <span class="text-sm text-gray-700">Bilgi talep etme</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-check text-green-600"></i>
                                        <span class="text-sm text-gray-700">Düzeltme talep etme</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-check text-green-600"></i>
                                        <span class="text-sm text-gray-700">Silme talep etme</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-check text-green-600"></i>
                                        <span class="text-sm text-gray-700">İşlemeye itiraz etme</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact Section -->
        <div class="glass-card rounded-2xl p-8 fade-in">
            <div class="text-center">
                <h3 class="text-2xl font-semibold text-gray-800 mb-4">İletişim</h3>
                <p class="text-gray-600 mb-6">
                    KVKK haklarınızı kullanmak veya sorularınız için bizimle iletişime geçin
                </p>
                <div class="flex justify-center space-x-6">
                    <a href="mailto:info@example.com" class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                        <i class="fas fa-envelope"></i>
                        <span>E-posta</span>
                    </a>
                    <a href="tel:+90-xxx-xxx-xxxx" class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                        <i class="fas fa-phone"></i>
                        <span>Telefon</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                        <i class="fas fa-question-circle"></i>
                        <span>Destek</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

</div>
    <Footer />
