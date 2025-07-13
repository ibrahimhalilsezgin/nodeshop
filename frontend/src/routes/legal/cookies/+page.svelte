<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Çerez Politikası</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
            min-height: 100vh;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .cookie-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-left: 4px solid #10b981;
            transition: all 0.3s ease;
        }
        
        .cookie-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(16, 185, 129, 0.2);
        }
        
        .cookie-type {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .cookie-type:hover {
            transform: scale(1.05);
        }
        
        .essential-cookie {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border-left: 4px solid #ef4444;
        }
        
        .analytics-cookie {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-left: 4px solid #3b82f6;
        }
        
        .functional-cookie {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid #f59e0b;
        }
        
        .control-section {
            background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
            border-left: 4px solid #8b5cf6;
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
        
        .cookie-bounce {
            animation: cookieBounce 3s ease-in-out infinite;
        }
        
        @keyframes cookieBounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: #10b981;
        }
        
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        
        .progress-bar {
            height: 4px;
            background: linear-gradient(90deg, #10b981 0%, #059669 100%);
            border-radius: 2px;
            animation: progressFill 2s ease-out;
        }
        
        @keyframes progressFill {
            from {
                width: 0%;
            }
            to {
                width: 100%;
            }
        }
        
        .info-tooltip {
            position: relative;
            cursor: help;
        }
        
        .info-tooltip:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #1f2937;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
        }
    </style>
</head>
<body class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 fade-in">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6">
                <i class="fas fa-cookie-bite text-4xl text-green-600 cookie-bounce"></i>
            </div>
            <h1 class="text-4xl font-bold gradient-text mb-4">Çerez Politikası</h1>
            <p class="text-lg text-white/90 max-w-3xl mx-auto">
                Web sitemizde kullanılan çerezler hakkında detaylı bilgi ve yönetim seçenekleri
            </p>
            <div class="w-32 mx-auto mt-4">
                <div class="progress-bar"></div>
            </div>
        </div>

        <!-- Introduction -->
        <div class="glass-card rounded-2xl p-8 mb-8 fade-in">
            <div class="cookie-card rounded-xl p-6 mb-8">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <i class="fas fa-info-circle text-3xl text-green-600"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-3">Neden Çerez Kullanıyoruz?</h3>
                        <p class="text-gray-700 leading-relaxed">
                            Bu web sitesi, kullanıcı deneyimini artırmak ve site kullanım istatistiklerini analiz etmek 
                            amacıyla çerezler kullanmaktadır. Çerezler sayesinde size daha kişiselleştirilmiş bir deneyim sunabiliyoruz.
                        </p>
                    </div>
                </div>
            </div>

            <!-- What is Cookie -->
            <div class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-question-circle text-green-600 mr-3"></i>
                    1. Çerez Nedir?
                </h2>
                <div class="bg-gray-50 rounded-xl p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0">
                            <i class="fas fa-file-code text-2xl text-gray-600"></i>
                        </div>
                        <div>
                            <p class="text-gray-700 leading-relaxed">
                                Çerezler, ziyaret ettiğiniz siteler tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. 
                                Bu dosyalar sayesinde site sizi tanır ve tercihlerinizi hatırlar. Çerezler web deneyiminizi 
                                daha verimli ve kişiselleştirilmiş hale getirir.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cookie Types -->
            <div class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-layer-group text-green-600 mr-3"></i>
                    2. Kullanılan Çerez Türleri
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- Essential Cookies -->
                    <div class="essential-cookie rounded-xl p-6 cookie-type">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-shield-alt text-2xl text-red-600"></i>
                                <h3 class="text-lg font-semibold text-gray-800">Zorunlu Çerezler</h3>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked disabled>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p class="text-gray-700 text-sm leading-relaxed mb-3">
                            Sitenin temel işlevlerini sağlar. Güvenlik ve temel fonksiyonlar için gereklidir.
                        </p>
                        <div class="flex items-center space-x-2 text-xs text-gray-600">
                            <i class="fas fa-lock"></i>
                            <span>Devre dışı bırakılamaz</span>
                        </div>
                    </div>

                    <!-- Analytics Cookies -->
                    <div class="analytics-cookie rounded-xl p-6 cookie-type">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-chart-bar text-2xl text-blue-600"></i>
                                <h3 class="text-lg font-semibold text-gray-800">Analitik Çerezler</h3>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="analytics" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p class="text-gray-700 text-sm leading-relaxed mb-3">
                            Ziyaret istatistikleri ve kullanım verileri toplar. Site performansını artırmak için kullanılır.
                        </p>
                        <div class="flex items-center space-x-2 text-xs text-gray-600">
                            <i class="fas fa-chart-line"></i>
                            <span>İstatistiksel analiz</span>
                        </div>
                    </div>

                    <!-- Functional Cookies -->
                    <div class="functional-cookie rounded-xl p-6 cookie-type">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-cogs text-2xl text-amber-600"></i>
                                <h3 class="text-lg font-semibold text-gray-800">İşlevsel Çerezler</h3>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="functional" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p class="text-gray-700 text-sm leading-relaxed mb-3">
                            Dil tercihi ve kullanıcı ayarları gibi bilgileri hatırlar. Kişiselleştirilmiş deneyim sağlar.
                        </p>
                        <div class="flex items-center space-x-2 text-xs text-gray-600">
                            <i class="fas fa-user-cog"></i>
                            <span>Kişiselleştirme</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Control Section -->
            <div class="control-section rounded-xl p-6 mb-8">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-sliders-h text-purple-600 mr-3"></i>
                    3. Kontrol ve Yönetim
                </h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white rounded-lg p-4">
                        <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-browser text-blue-600 mr-2"></i>
                            Tarayıcı Ayarları
                        </h4>
                        <p class="text-gray-700 text-sm leading-relaxed mb-3">
                            Tarayıcınızın ayarlar menüsünden çerezleri yönetebilir, silebilir veya engelleyebilirsiniz.
                        </p>
                        <div class="flex space-x-2">
                            <span class="px-2 py-1 bg-gray-100 rounded text-xs">Chrome</span>
                            <span class="px-2 py-1 bg-gray-100 rounded text-xs">Firefox</span>
                            <span class="px-2 py-1 bg-gray-100 rounded text-xs">Safari</span>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-exclamation-triangle text-amber-600 mr-2"></i>
                            Önemli Uyarı
                        </h4>
                        <p class="text-gray-700 text-sm leading-relaxed">
                            Bazı çerezlerin devre dışı bırakılması, site deneyiminizi olumsuz etkileyebilir 
                            ve bazı özelliklerin çalışmamasına neden olabilir.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Cookie Management Panel -->
            <div class="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-cookie text-green-600 mr-3"></i>
                    Çerez Yönetim Paneli
                </h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div>
                            <h4 class="font-medium text-gray-800">Tüm Çerezleri Kabul Et</h4>
                            <p class="text-sm text-gray-600">Optimal deneyim için önerilen seçenek</p>
                        </div>
                        <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Kabul Et
                        </button>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div>
                            <h4 class="font-medium text-gray-800">Sadece Zorunlu Çerezler</h4>
                            <p class="text-sm text-gray-600">Minimum gereksinim, bazı özellikler çalışmayabilir</p>
                        </div>
                        <button class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            Seç
                        </button>
                    </div>
                </div>
            </div>

            <!-- Consent Section -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-handshake text-green-600 mr-3"></i>
                    4. Onay ve Kabul
                </h2>
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <i class="fas fa-check-circle text-2xl text-green-600"></i>
                    </div>
                    <div>
                        <p class="text-gray-700 leading-relaxed">
                            Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş sayılırsınız. 
                            Çerez tercihlerinizi istediğiniz zaman değiştirebilirsiniz.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center fade-in">
            <div class="glass-card rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Daha Fazla Bilgi</h3>
                <p class="text-gray-600 mb-6">
                    Çerezler hakkında sorularınız varsa veya tercihlerinizi güncellemek istiyorsanız
                </p>
                <div class="flex justify-center space-x-6">
                    <a href="#" class="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors">
                        <i class="fas fa-envelope"></i>
                        <span>İletişim</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors">
                        <i class="fas fa-cog"></i>
                        <span>Ayarlar</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors">
                        <i class="fas fa-shield-alt"></i>
                        <span>Gizlilik</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Cookie toggle functionality
        document.getElementById('analytics').addEventListener('change', function() {
            if (this.checked) {
                console.log('Analytics cookies enabled');
            } else {
                console.log('Analytics cookies disabled');
            }
        });

        document.getElementById('functional').addEventListener('change', function() {
            if (this.checked) {
                console.log('Functional cookies enabled');
            } else {
                console.log('Functional cookies disabled');
            }
        });

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    </script>
</body>
</html>