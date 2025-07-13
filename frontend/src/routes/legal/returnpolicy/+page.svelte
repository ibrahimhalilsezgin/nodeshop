<script>
    import Footer from "@/components/Footer.svelte";
    import Navbar from "@/components/Navbar.svelte";

</script>


    <Navbar />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
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
        
        .info-card {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            border-left: 4px solid #f59e0b;
        }
        
        .warning-card {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border-left: 4px solid #ef4444;
        }
        
        .success-card {
            background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
            border-left: 4px solid #10b981;
        }
        
        .icon-bounce {
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
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
        
        .hover-scale {
            transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
            transform: scale(1.02);
        }
    </style>
<div class="py-12 px-4">
    <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 fade-in">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
                <i class="fas fa-shield-alt text-3xl text-blue-600 icon-bounce"></i>
            </div>
            <h1 class="text-4xl font-bold  mb-4">İade Politikası</h1>
            <p class="text-lg text-white/90 max-w-2xl mx-auto">
                Dijital ürünlerimiz için geçerli olan iade koşulları ve önemli bilgiler
            </p>
        </div>

        <!-- Main Content -->
        <div class="glass-card rounded-2xl p-8 mb-8 fade-in hover-scale">
            <!-- Digital Product Info -->
            <div class="info-card rounded-xl p-6 mb-8">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <i class="fas fa-code text-2xl text-amber-600"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Dijital Ürün Bilgilendirmesi</h3>
                        <p class="text-gray-700 leading-relaxed">
                            Satın aldığınız ürün <strong>açık kaynaklı dijital bir ürün</strong> olup, 
                            indirme işlemi tamamlandıktan sonra anında erişilebilir hale gelir.
                        </p>
                    </div>
                </div>
            </div>

            <!-- No Return Policy -->
            <div class="warning-card rounded-xl p-6 mb-8">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">İade Politikası</h3>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Ürün teslim edildikten sonra <strong>hiçbir koşulda iade veya iptal işlemi yapılamaz</strong>.
                        </p>
                        <p class="text-gray-700 leading-relaxed">
                            Dijital içerikler doğası gereği kopyalanabilir ve çoğaltılabilir olduğundan, 
                            ürün tesliminden sonra <strong>iade süreci geçerli değildir</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Important Notice -->
            <div class="success-card rounded-xl p-6 mb-8">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <i class="fas fa-lightbulb text-2xl text-green-600"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Satın Alma Önerisi</h3>
                        <p class="text-gray-700 leading-relaxed">
                            Satın almadan önce ürün açıklamalarını dikkatlice okumanızı ve 
                            ihtiyacınıza uygun olduğundan emin olmanızı önemle tavsiye ederiz.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Key Points -->
            <div class="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-list-check text-blue-600 mr-3"></i>
                    Önemli Noktalar
                </h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                            <i class="fas fa-check text-blue-600 text-sm"></i>
                        </div>
                        <p class="text-gray-700">Dijital ürün anında teslim</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                            <i class="fas fa-times text-red-600 text-sm"></i>
                        </div>
                        <p class="text-gray-700">İade veya iptal mümkün değil</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                            <i class="fas fa-shield text-green-600 text-sm"></i>
                        </div>
                        <p class="text-gray-700">Güvenli ödeme sistemi</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                            <i class="fas fa-code text-purple-600 text-sm"></i>
                        </div>
                        <p class="text-gray-700">Açık kaynak kod</p>
                    </div>
                </div>
            </div>

            <!-- Agreement -->
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <i class="fas fa-handshake text-2xl text-blue-600"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Kabul Beyanı</h3>
                        <p class="text-gray-700 leading-relaxed">
                            Satın alma işlemini tamamlayan kullanıcılar bu iade politikasını kabul etmiş sayılır.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center fade-in">
            <p class="text-white/80 mb-4">
                Sorularınız için bizimle iletişime geçebilirsiniz
            </p>
            <div class="flex justify-center space-x-6">
                <a href="#" class="text-white/80 hover:text-white transition-colors">
                    <i class="fas fa-envelope text-xl"></i>
                </a>
                <a href="#" class="text-white/80 hover:text-white transition-colors">
                    <i class="fas fa-phone text-xl"></i>
                </a>
                <a href="#" class="text-white/80 hover:text-white transition-colors">
                    <i class="fas fa-question-circle text-xl"></i>
                </a>
            </div>
        </div>
    </div>
</div>
<Footer />