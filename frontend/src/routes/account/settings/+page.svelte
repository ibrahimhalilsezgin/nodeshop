<script lang="ts">
  export let data;
  import Navbar from "@/components/Navbar.svelte";
  import axios from "axios";
  import { getCookie } from "../../../utils/cookie.util";
  import { fade, slide } from "svelte/transition";
  import {OtpInput} from '@codersandip/svelte-otp';
  let formInputs = {
    idenityNumber:'',
    email: '',
    gsmNumber: '',
    registrationAddress: '',
    city: '',
    zipCode: '',
    activePassword: ''
  };
  
  let success = false;
  let error: string;
  let loading = false;
  let smsCode = {
    sended: false,
    verified: false,
    error: {
      status: false,
      message: ''
    }
  }
  let verifyCode = '';
  function handleOtpChange(newOtpValue:any) {
    verifyCode = newOtpValue;
  }
  const settings = async () => {
    loading = true;
    error = '';
    success = false;
    
    try {
      const response = await axios({
        url: data.PUBLIC_BACKENDURL + '/api/v1/user/settings',
        method:'POST',
        headers:{
          Authorization: 'Bearer ' + getCookie('token')
        },
        data:formInputs
      });
      
      if (response.status === 200) {
        success = true;
        // Reset form after 3 seconds
        setTimeout(() => {
          success = false;
        }, 3000);
      }
    } catch (err: any) {
      if (err.response?.status >= 400) {
        error = err.response.data.error;
      }
    } finally {
      loading = false;
    }
  };
    function isValidPhoneNumber(phone:any) {
      const regex = /^\+905\d{9}$/;
      return regex.test(phone);
    }

  const sendVerificationCode = async () => {
        if(!isValidPhoneNumber(formInputs.gsmNumber)){
          smsCode.error.status = true
          smsCode.error.message = "Telefon Numarsını doğru giriniz : +9055555555555"
          return;
        } else {
          smsCode.error.status = false
        }
    const response = await axios({
      url:data.PUBLIC_BACKENDURL + '/api/v1/user/sendverifycode',
      method:'POST',
      headers:{
        Authorization: 'Bearer ' + getCookie('token')
      },
      data:{
            phoneNumber: formInputs.gsmNumber
      }
    })

    if(response.status == 200) {
      smsCode.sended = true
      console.log(response.data.message)
    }
  }


  const verificationCode = async () => {
    try {

        const response = await axios({
            url:data.PUBLIC_BACKENDURL + '/api/v1/user/verifycode',
            method:'POST',
            headers: {
              Authorization: 'Bearer ' + getCookie('token')
            },
            data:{
              code: verifyCode,
              phoneNumber: formInputs.gsmNumber
            }
        })

        if(response.status == 200) {
          smsCode.verified = true
          smsCode.sended = false
          smsCode.error.status = false
        }
    } catch (err:any) {
      if(err.response.status >= 400) {
          smsCode.verified = false;
          smsCode.sended = false;
          smsCode.error.status = true
          smsCode.error.message = err.response.data.error
      }
    }
  }
  $: console.log(verifyCode)
</script>

<Navbar user={data.user} />

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16 sm:pt-20 md:pt-24" transition:fade>
  <div class="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
    <!-- Header -->
    <div class="text-center mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Hesap Ayarları</h1>
      <p class="text-sm sm:text-base text-gray-600">Kişisel bilgilerinizi güncelleyin</p>
    </div>

    <div class="bg-[#F8F7F4] rounded-lg sm:rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <!-- Form Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-3 sm:py-4">
        <h2 class="text-lg sm:text-xl font-semibold NodeShop flex items-center">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Kişisel Bilgiler
        </h2>
      </div>

      <form on:submit|preventDefault={settings} class="p-4 sm:p-6">
        <!-- Alert Messages -->
        {#if error}
          <div class="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start" transition:slide>
            <svg class="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-800 font-medium text-sm sm:text-base">{error}</span>
          </div>
        {/if}
        {#if smsCode.error.status}
          <div class="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start" transition:slide>
            <svg class="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-800 font-medium text-sm sm:text-base">{smsCode.error.message}</span>
          </div>
        {/if}
        {#if success}
          <div class="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-start" transition:slide>
            <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-green-800 font-medium text-sm sm:text-base">Ayarlar başarıyla güncellendi!</span>
          </div>
        {/if}
        {#if smsCode.sended}
          <div class="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-start" transition:slide>
            <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-green-800 font-medium text-sm sm:text-base">SMS doğrulama kodun gönderildi!</span>
          </div>
        {/if}
        {#if smsCode.verified}
          <div class="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-start" transition:slide>
            <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-green-800 font-medium text-sm sm:text-base">Telefon Numaran Başarıyla Doğrulandı!</span>
          </div>
        {/if}
        
        <!-- Form Fields -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <!-- Identity Number -->
          <div class="lg:col-span-2">
            <label for="idenityNumber" class="block text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
              </svg>
              Türkiye Cumhuriyeti Kimlik No *
            </label>
            <input 
              id="idenityNumber" 
              type="text" 
              bind:value={formInputs.idenityNumber} 
              required 
              maxlength="11"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="12345678901"
            />
          </div>

          <!-- Phone Number -->
          <div class="lg:col-span-1">
            <label for="gsmNumber" class="block text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Telefon Numarası
            </label>
            <input 
              id="gsmNumber" 
              type="tel" 
              bind:value={formInputs.gsmNumber} 
              placeholder="+905551112233"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-2 text-sm sm:text-base"
            />
            {#if smsCode.sended} 
            <div class="mt-2">
              <OtpInput
                length={6}
                inputType="number"
                placeholder="•"
                bind:value={verifyCode}
                onChange={handleOtpChange}
                inputWrapClass="custom-inputwrapper-class"
                inputClass="custom-input-class"
                containerClass="custom-container-class mb-2"
              />
            </div>
              <button 
                type="button" 
                class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 NodeShop font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
                on:click={() => verificationCode()}
              >
                Doğrula
              </button>
            {:else}
              <button 
                type="button" 
                class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 NodeShop font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
                on:click={() => sendVerificationCode()}  
                disabled={smsCode.verified}
              >
                Kod Gönder
              </button>
            {/if}
          </div>

          <!-- City -->
          <div class="lg:col-span-1">
            <label for="city" class="block text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              Şehir
            </label>
            <input 
              id="city" 
              type="text" 
              bind:value={formInputs.city}
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="İstanbul"
            />
          </div>

          <!-- Address -->
          <div class="lg:col-span-2">
            <label for="registrationAddress" class="block text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Adres
            </label>
            <textarea 
              id="registrationAddress" 
              bind:value={formInputs.registrationAddress}
              rows="3"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
              placeholder="Tam adresinizi yazın..."
            ></textarea>
          </div>

          <!-- ZIP Code -->
          <div class="lg:col-span-1">
            <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
              </svg>
              Posta Kodu
            </label>
            <input 
              id="zipCode" 
              type="text" 
              bind:value={formInputs.zipCode}
              maxlength="5"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="34000"
            />
          </div>

          <!-- Current Password -->
          <div class="lg:col-span-1">
            <label for="activePassword" class="block text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Mevcut Şifren *
            </label>
            <input 
              id="activePassword" 
              type="password" 
              bind:value={formInputs.activePassword}
              required
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="Mevcut şifrenizi girin"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6 sm:mt-8 flex justify-center sm:justify-end">
          <button 
            type="submit" 
            disabled={loading}
            class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 NodeShop font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
          >
            {#if loading}
              <svg class="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 NodeShop" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Güncelleniyor...
            {:else}
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Değişiklikleri Kaydet
            {/if}
          </button>
        </div>
      </form>
    </div>

    <!-- Help Section -->
    <div class="mt-6 sm:mt-8 bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
      <div class="flex items-start">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-blue-900 mb-2">Güvenlik Bilgilendirmesi</h3>
          <p class="text-blue-700 text-sm">
            Kişisel bilgilerinizi güncellerken mevcut şifrenizi girmeniz güvenlik amacıyla zorunludur. 
            Bilgileriniz SSL ile şifrelenerek güvenli bir şekilde iletilir.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom OTP Input Styling */
  :global(.custom-container-class) {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  :global(.custom-input-class) {
    width: 40px !important;
    height: 40px !important;
    text-align: center;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  :global(.custom-input-class:focus) {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
  
  @media (max-width: 640px) {
    :global(.custom-input-class) {
      width: 35px !important;
      height: 35px !important;
      font-size: 14px;
    }
  }
</style>