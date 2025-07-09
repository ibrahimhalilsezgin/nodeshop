<script lang="ts">
  import Navbar from '@/components/Navbar.svelte';
  import { onMount, onDestroy } from 'svelte';
  import axios from 'axios';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  
  export let data: any;
  
  let selectedPeriod = '7days';
  let statistics: any = {};
  let isLoading = false;
  let lastUpdateTime = '';
  let connectionStatus = 'connected';
  let updateInterval: NodeJS.Timeout | null = null;
  let errorCount = 0;
  let maxRetries = 3;

  // Real-time update function
  async function updateData() {
    if (isLoading || !browser) return; // Prevent multiple simultaneous requests and SSR issues
    
    isLoading = true;
    
    try {
      const response = await axios.get(data.BACKENDURL, {
        timeout: 5000 // 5 second timeout
      });
      
      statistics = response.data;
      connectionStatus = 'connected';
      errorCount = 0;
      lastUpdateTime = new Date().toLocaleTimeString('tr-TR');
      
      // Update charts after data changes
      updateCharts();
      
    } catch (error) {
      console.error('Data fetch error:', error);
      errorCount++;
      
      if (errorCount >= maxRetries) {
        connectionStatus = 'disconnected';
        if (updateInterval) {
          clearInterval(updateInterval);
          updateInterval = null;
        }
        // Try to reconnect after 30 seconds
        setTimeout(() => {
          startRealTimeUpdates();
        }, 60000);
      } else {
        connectionStatus = 'warning';
      }
    } finally {
      isLoading = false;
    }
  }

  // Start real-time updates
  function startRealTimeUpdates() {
    if (!browser) return; // Only run in browser
    
    errorCount = 0;
    connectionStatus = 'connected';
    updateData(); // Initial load
    
    // Update every 2 seconds for real-time feel
    updateInterval = setInterval(updateData, 60000);
  }

  // Stop real-time updates
  function stopRealTimeUpdates() {
    if (updateInterval) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  }

  // Manual refresh
  function manualRefresh() {
    updateData();
  }

  onMount(() => {
    startRealTimeUpdates();
  });

  onDestroy(() => {
    stopRealTimeUpdates();
  });

  // Sample data with real-time updates
  $: salesData = statistics.formattedSalesData || [];

  const categoryData = [
    { name: 'Elektronik', value: 35, color: '#3B82F6' },
    { name: 'Giyim', value: 28, color: '#10B981' },
    { name: 'Ev & Yaşam', value: 20, color: '#F59E0B' },
    { name: 'Spor', value: 17, color: '#EF4444' }
  ];

  const userActivityData = [
    { name: 'Ocak', users: 1200, activeUsers: 800 },
    { name: 'Şubat', users: 1400, activeUsers: 900 },
    { name: 'Mart', users: 1800, activeUsers: 1200 },
    { name: 'Nisan', users: 2200, activeUsers: 1500 },
    { name: 'Mayıs', users: 2800, activeUsers: 1800 },
    { name: 'Haziran', users: 3200, activeUsers: 2100 }
  ];

  $: recentOrders = statistics.recentPayments || [];

  $: topProducts = statistics.formattedTopProducts || [];

  $: statsData = [
    { title: 'Toplam Satış', value: '₺245,750', change: 12.5, icon: '💰', color: 'green' },
    { title: 'Siparişler', value: statistics.totalPayment, change: 8.2, icon: '🛒', color: 'blue' },
    { title: 'Kullanıcılar', value: statistics.userLength || '3,248', change: 5.4, icon: '👥', color: 'purple' },
    { title: 'Dönüşüm Oranı', value: '3.24%', change: -2.1, icon: '📈', color: 'yellow' }
  ];

  function getStatusColor(status: string) {
    switch(status) {
      case 'Tamamlandı': return 'bg-green-100 text-green-800';
      case 'Bekliyor': return 'bg-yellow-100 text-yellow-800';
      case 'İptal': return 'bg-red-100 text-red-800';
      case 'Hazırlanıyor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getConnectionStatusColor() {
    switch(connectionStatus) {
      case 'connected': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  function getStatColorClass(color: string) {
    const colorClasses: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600'
    };
    return colorClasses[color] || colorClasses.blue;
  }

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('');
  }

  // Chart functions
  function createBarChart(container: Element, data: any[]) {
    if (!browser) return; // Only run in browser
    
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas || !data.length) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxValue = Math.max(...data.map(d => d.sales));
    const barWidth = width / data.length;
    
    data.forEach((item, index) => {
      const barHeight = (item.sales / maxValue) * (height - 40);
      const x = index * barWidth;
      const y = height - barHeight - 20;
      
      // Draw bar with animation effect
      ctx.fillStyle = isLoading ? '#94A3B8' : '#3B82F6';
      ctx.fillRect(x + 10, y, barWidth - 20, barHeight);
      
      // Draw label
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.name, x + barWidth/2, height - 5);
    });
  }

  function createPieChart(container: Element, data: any[]) {
    if (!browser) return; // Only run in browser
    
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    ctx.clearRect(0, 0, width, height);
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    data.forEach(item => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = isLoading ? '#94A3B8' : item.color;
      ctx.fill();
      
      currentAngle += sliceAngle;
    });
  }

  function createLineChart(container: Element, data: any[]) {
    if (!browser) return; // Only run in browser
    
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxValue = Math.max(...data.map(d => Math.max(d.users, d.activeUsers)));
    const stepX = width / (data.length - 1);
    
    // Draw users line
    ctx.strokeStyle = isLoading ? '#94A3B8' : '#8B5CF6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((item, index) => {
      const x = index * stepX;
      const y = height - (item.users / maxValue) * (height - 40) - 20;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Draw active users line
    ctx.strokeStyle = isLoading ? '#94A3B8' : '#10B981';
    ctx.beginPath();
    data.forEach((item, index) => {
      const x = index * stepX;
      const y = height - (item.activeUsers / maxValue) * (height - 40) - 20;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  }

  function updateCharts() {
    if (!browser) return; // Only run in browser
    
    setTimeout(() => {
      const barChartContainer = document.querySelector('.bar-chart');
      const pieChartContainer = document.querySelector('.pie-chart');
      const lineChartContainer = document.querySelector('.line-chart');
      
      if (barChartContainer) createBarChart(barChartContainer, salesData);
      if (pieChartContainer) createPieChart(pieChartContainer, categoryData);
      if (lineChartContainer) createLineChart(lineChartContainer, userActivityData);
    }, 100);
  }

  onMount(() => {
    updateCharts();
  });

  // Update charts when data changes
  $: if (salesData) {
    updateCharts();
  }
</script>

<Navbar user={data.user}/>

<main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24" transition:fade>
  <!-- Header -->
  <header class="bg-[#F8F7F4] shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p class="mt-1 text-sm text-gray-600">Hoş geldiniz! İşte gerçek zamanlı verileriniz.</p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Real-time Status Indicator -->
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 {getConnectionStatusColor()} rounded-full {isLoading ? 'animate-pulse' : ''}"></div>
            <span class="text-sm text-gray-600">
              {#if connectionStatus === 'connected'}
                Canlı
              {:else if connectionStatus === 'warning'}
                Bağlantı Sorunu
              {:else}
                Bağlantı Kesildi
              {/if}
            </span>
          </div>
          
          <!-- Last Update Time -->
          {#if lastUpdateTime}
            <span class="text-xs text-gray-500">Son güncelleme: {lastUpdateTime}</span>
          {/if}
          
          <!-- Manual Refresh Button -->
          <button 
            on:click={manualRefresh}
            class="px-3 py-1 bg-blue-500  rounded-md hover:bg-blue-600 transition-colors text-sm"
            disabled={isLoading}
          >
            {#if isLoading}
              <span class="inline-block animate-spin">⟳</span>
            {:else}
              Yenile
            {/if}
          </button>
          
          <select 
            bind:value={selectedPeriod}
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Son 7 Gün</option>
            <option value="30days">Son 30 Gün</option>
            <option value="90days">Son 90 Gün</option>
            <option value="1year">Son 1 Yıl</option>
          </select>
          
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class=" font-semibold">A</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {#each statsData as stat}
        <div class="bg-[#F8F7F4] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 {isLoading ? 'opacity-75' : ''}">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              <p class="text-sm mt-2 {stat.change >= 0 ? 'text-green-600' : 'text-red-600'}">
                {stat.change >= 0 ? '↗' : '↘'} {Math.abs(stat.change)}% bu hafta
              </p>
            </div>
            <div class="w-16 h-16 rounded-xl bg-gradient-to-r {getStatColorClass(stat.color)} flex items-center justify-center">
              <span class="text-3xl">{stat.icon}</span>
            </div>
          </div>
          {#if isLoading}
            <div class="absolute inset-0 flex items-center justify-center bg-[#F8F7F4] bg-opacity-50 rounded-2xl">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Sales Chart -->
      <div class="bg-[#F8F7F4] rounded-2xl shadow-lg p-6 {isLoading ? 'opacity-75' : ''}">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-800">Satış Trendi</h3>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Satışlar</span>
          </div>
        </div>
        <div class="bar-chart">
          <canvas width="400" height="200"></canvas>
        </div>
      </div>

      <!-- Category Distribution -->
      <div class="bg-[#F8F7F4] rounded-2xl shadow-lg p-6 {isLoading ? 'opacity-75' : ''}">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">Kategori Dağılımı</h3>
        <div class="pie-chart flex justify-center">
          <canvas width="200" height="200"></canvas>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-6">
          {#each categoryData as item}
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full" style="background-color: {item.color}"></div>
              <span class="text-sm text-gray-600">{item.name}</span>
              <span class="text-sm font-semibold text-gray-800">{item.value}%</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- User Activity Chart -->
    <div class="bg-[#F8F7F4] rounded-2xl shadow-lg p-6 mb-8 {isLoading ? 'opacity-75' : ''}">
      <h3 class="text-xl font-semibold text-gray-800 mb-6">Kullanıcı Aktivitesi</h3>
      <div class="line-chart">
        <canvas width="800" height="200"></canvas>
      </div>
      <div class="flex justify-center mt-4 space-x-6">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span class="text-sm text-gray-600">Toplam Kullanıcı</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-600">Aktif Kullanıcı</span>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Orders -->
      <div class="bg-[#F8F7F4] rounded-2xl shadow-lg p-6 {isLoading ? 'opacity-75' : ''}">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-800">Son Siparişler</h3>
          <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Tümünü Gör
          </button>
        </div>
        <div class="space-y-4">
          {#each recentOrders as order}
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class=" text-sm font-semibold">
                    {getInitials(order.customer)}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{order.customer}</p>
                  <p class="text-sm text-gray-600">{order.id}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800">{order.amount}</p>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="px-2 py-1 rounded-full text-xs font-medium {getStatusColor(order.status)}">
                    {order.status}
                  </span>
                  <span class="text-xs text-gray-500">{order.time}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-[#F8F7F4] rounded-2xl shadow-lg p-6 {isLoading ? 'opacity-75' : ''}">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-800">En Çok Satan Ürünler</h3>
          <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Detaylar
          </button>
        </div>
        <div class="space-y-4">
          {#each topProducts as product, index}
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div class="flex items-center space-x-4">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span class=" text-sm font-bold">{index + 1}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{product.name}</p>
                  <p class="text-sm text-gray-600">{product.sales} satış</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-green-600">{product.revenue}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8 bg-[#F8F7F4] rounded-2xl shadow-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6">Hızlı İşlemler</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button on:click={() => {goto('/admin/create/')}} class="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-blue-500 to-blue-600  rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
          <span class="text-xl">📦</span>
          <span>Ürün Ekle</span>
        </button>
        <button on:click={() => {goto('/admin/products/')}}  class="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-blue-500 to-blue-600  rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
          <span class="text-xl">📦</span>
          <span>Ürünler</span>
        </button>
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  canvas {
    max-width: 100%;
    height: auto;
  }
</style>