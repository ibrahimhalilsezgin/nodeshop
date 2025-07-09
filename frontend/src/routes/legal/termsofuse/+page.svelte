<script>
    import Navbar from "@/components/Navbar.svelte";
    import { fade, fly } from "svelte/transition";
  export let lastUpdated = "09 Temmuz 2025";
</script>

<Navbar user={null} />

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" transition:fade>
  <div class="max-w-4xl mx-auto p-8 space-y-12">
    
    <!-- Header Section -->
    <div class="text-center space-y-4 pt-8" >
      <div class="inline-block">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          <h1 class="text-5xl font-bold tracking-tight">Kullanım Koşulları</h1>
        </div>
        <div class="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2"></div>
      </div>
      <p class="text-gray-600 text-lg font-medium">Son güncelleme: {lastUpdated}</p>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      
      <!-- Section 1 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
          <h2 class="text-2xl font-bold text-gray-800">Genel Hükümler</h2>
        </div>
        <p class="text-gray-700 leading-relaxed text-lg">
          Bu kullanım koşulları, platformumuzun kullanımını düzenler. Platformu kullanarak bu koşulları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız, lütfen hizmeti kullanmayınız.
        </p>
      </div>

      <!-- Section 2 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
          <h2 class="text-2xl font-bold text-gray-800">Hesap Oluşturma ve Güvenlik</h2>
        </div>
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <p class="text-gray-700 leading-relaxed text-lg">
            Kullanıcılar hesap oluştururken doğru ve güncel bilgileri vermekle yükümlüdür. İlk ad, soyad, e-posta, telefon gibi kişisel bilgilerinizin doğruluğu sizin sorumluluğunuzdadır. Hesap güvenliğiniz için şifrenizi kimseyle paylaşmayınız. Hesabınız üzerinden gerçekleşen tüm işlemlerden siz sorumlusunuz.
          </p>
        </div>
      </div>

      <!-- Section 3 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
          <h2 class="text-2xl font-bold text-gray-800">Hizmetin Kullanım Koşulları</h2>
        </div>
        <div class="grid gap-4">
          <div class="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
            <div class="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
            <p class="text-gray-700 text-lg">Platformumuzda yasalara aykırı faaliyetler gerçekleştirmek yasaktır.</p>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-400">
            <div class="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
            <p class="text-gray-700 text-lg">Kullanıcılar diğer kullanıcıların haklarını ihlal edecek, rahatsız edecek veya zarar verecek davranışlarda bulunamazlar.</p>
          </div>
          <div class="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
            <div class="w-2 h-2 bg-yellow-500 rounded-full mt-3"></div>
            <p class="text-gray-700 text-lg">Hizmetimizi kötü amaçlarla kullanmak, spam göndermek, zarar vermek yasaktır.</p>
          </div>
        </div>
      </div>

      <!-- Section 4 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
          <h2 class="text-2xl font-bold text-gray-800">Fikri Mülkiyet Hakları</h2>
        </div>
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400">
          <p class="text-gray-700 leading-relaxed text-lg">
            Platformumuzda yer alan her türlü içerik, yazılım, tasarım, görsel ve dokümanlar tarafımıza ait olup, izinsiz kullanımı, çoğaltılması veya dağıtılması yasaktır.
          </p>
        </div>
      </div>

      <!-- Section 5 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
          <h2 class="text-2xl font-bold text-gray-800">Hesap Askıya Alma ve Sonlandırma</h2>
        </div>
        <div class="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border-l-4 border-red-400">
          <p class="text-gray-700 leading-relaxed text-lg">
            Şüpheli veya yasadışı faaliyet tespit edilmesi halinde, platform hesabınız geçici veya kalıcı olarak askıya alınabilir veya kapatılabilir.
          </p>
        </div>
      </div>

      <!-- Section 6 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">6</div>
          <h2 class="text-2xl font-bold text-gray-800">Sorumluluk Reddi</h2>
        </div>
        <div class="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-l-4 border-yellow-400">
          <p class="text-gray-700 leading-relaxed text-lg">
            Hizmette yaşanabilecek teknik aksaklıklar, veri kayıpları veya gecikmelerden dolayı tarafımızca herhangi bir sorumluluk kabul edilmemektedir. Kullanıcılar bu riskleri kabul eder.
          </p>
        </div>
      </div>

      <!-- Section 7 -->
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">7</div>
          <h2 class="text-2xl font-bold text-gray-800">Değişiklikler</h2>
        </div>
        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border-l-4 border-teal-400">
          <p class="text-gray-700 leading-relaxed text-lg">
            Kullanım koşullarımızda değişiklik yapma hakkımız saklıdır. Değişiklikler platformda yayınlandığı anda yürürlüğe girer ve kullanıcıların hizmeti kullanmaya devam etmesi ile kabul edilmiş sayılır.
          </p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="text-center py-12">
      <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div class="space-y-4">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">İletişim</h3>
          <p class="text-gray-600 text-lg">
            Herhangi bir sorunuz varsa 
            <a href="mailto:mail@ibrahimhalilsezgin.fun" class="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200">
              mail@ibrahimhalilsezgin.fun
            </a> 
            adresinden bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </footer>

  </div>
</div>