<script>
    import Navbar from "@/components/Navbar.svelte";
    import { fade, fly, slide } from "svelte/transition";
  export let lastUpdated = "09 Temmuz 2025";
</script>

<Navbar user={null}/>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" transition:fade>
  <div class="max-w-4xl mx-auto p-8 space-y-12">
    
    <!-- Header Section -->
    <div class="text-center space-y-4 pt-8" in:fly>
      <div class="inline-block">
        <div class="flex items-center justify-center space-x-3 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
        </div>
        <div class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          <h1 class="text-5xl font-bold tracking-tight">Gizlilik Politikası</h1>
        </div>
        <div class="h-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mt-2"></div>
      </div>
      <p class="text-gray-600 text-lg font-medium">Son güncelleme: {lastUpdated}</p>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      
      <!-- Section 1 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Toplanan Kişisel Veriler</h2>
        </div>
        <p class="text-gray-700 leading-relaxed text-lg mb-6">
          Platformumuzda aşağıdaki kişisel veriler toplanmakta ve işlenmektedir:
        </p>
        <div class="grid gap-4">
          <div class="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
            <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Kimlik Bilgileri</h3>
              <p class="text-gray-600">Ad, Soyad, T.C. Kimlik Numarası</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">İletişim Bilgileri</h3>
              <p class="text-gray-600">E-posta adresi, GSM numarası, adres bilgileri</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-400">
            <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Giriş Bilgileri</h3>
              <p class="text-gray-600">IP adresi, şifre, sistem bağlantı zamanları</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-400">
            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">İşlem Bilgileri</h3>
              <p class="text-gray-600">Satın alma geçmişi, kullanıcı etkinlikleri</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Kişisel Verilerin İşlenme Amaçları</h2>
        </div>
        <p class="text-gray-700 leading-relaxed text-lg mb-6">
          Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:
        </p>
        <div class="grid gap-3">
          <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <p class="text-gray-700 text-lg">Kullanıcı hesabı oluşturma, doğrulama ve yönetimi</p>
          </div>
          <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p class="text-gray-700 text-lg">Hizmetlerin sunumu ve kullanıcı deneyiminin geliştirilmesi</p>
          </div>
          <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
            <div class="w-2 h-2 bg-pink-500 rounded-full"></div>
            <p class="text-gray-700 text-lg">Satın alma işlemlerinin takibi ve faturalandırma</p>
          </div>
          <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl">
            <div class="w-2 h-2 bg-rose-500 rounded-full"></div>
            <p class="text-gray-700 text-lg">Hukuki yükümlülüklerin yerine getirilmesi</p>
          </div>
          <div class="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <p class="text-gray-700 text-lg">Güvenlik ve sistem yönetimi</p>
          </div>
        </div>
      </div>

      <!-- Section 3 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Kişisel Verilerin Paylaşımı</h2>
        </div>
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400">
          <p class="text-gray-700 leading-relaxed text-lg">
            Kişisel verileriniz, kanunen zorunlu olmadıkça üçüncü taraflarla paylaşılmamaktadır. Verileriniz platformumuzun güvenlik politikaları kapsamında korunmaktadır.
          </p>
        </div>
      </div>

      <!-- Section 4 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Veri Saklama Süresi</h2>
        </div>
        <div class="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-l-4 border-yellow-400">
          <p class="text-gray-700 leading-relaxed text-lg">
            Kişisel verileriniz, hesabınız aktif olduğu sürece ve yasal gereklilikler kapsamında saklanmaktadır. Hesabınızın kapatılması veya silinmesi halinde verileriniz sistemlerimizden kalıcı olarak silinir.
          </p>
        </div>
      </div>

      <!-- Section 5 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Kullanıcı Hakları</h2>
        </div>
        <p class="text-gray-700 leading-relaxed text-lg mb-6">
          KVKK ve ilgili mevzuatlar kapsamında aşağıdaki haklara sahipsiniz:
        </p>
        <div class="grid gap-4">
          <div class="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
            <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="text-gray-700 text-lg">Kişisel verilerinize erişme hakkı</p>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-400">
            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="text-gray-700 text-lg">Yanlış veya eksik verilerin düzeltilmesini talep etme</p>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
            <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="text-gray-700 text-lg">Verilerinizin silinmesini veya işlenmesinin durdurulmasını isteme</p>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="text-gray-700 text-lg">Veri işleme faaliyetlerine itiraz etme</p>
          </div>
        </div>
      </div>

      <!-- Section 6 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">İletişim</h2>
        </div>
        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border-l-4 border-teal-400">
          <p class="text-gray-700 leading-relaxed text-lg">
            Kişisel verilerinizle ilgili taleplerinizi ve sorularınızı 
            <a href="mailto:mail@ibrahimhalilsezgin.fun" class="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors duration-200">
              mail@ibrahimhalilsezgin.fun
            </a> 
            adresine iletebilirsiniz.
          </p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="text-center py-12">
      <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div class="space-y-4">
          <div class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">Teşekkürler</h3>
          <p class="text-gray-600 text-lg">
            Gizlilik politikamızı okuyup anladığınız için teşekkür ederiz.
          </p>
        </div>
      </div>
    </footer>

  </div>
</div>