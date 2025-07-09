import { Router } from "express";
import userController from "../modules/user/user.controller"
import productController from "../modules/product/product.controller";
import { authenticateToken, isAdmin } from "../middleware/authentication";
import paymentController from "../modules/payment/payment.controller";
import productModel from "../modules/product/product.model";
import userModel from "../modules/user/user.model";
import paymentModel from "../modules/payment/payment.model";
const router = Router();
router.get('/', async (req, res) => {
  try {
    const totalPayment = (await paymentModel.find({})).length
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Top 5 ürün (son 7 gün)
    const topProducts = await paymentModel.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productTitle",
          sales: { $sum: 1 },
          revenue: { $sum: "$items.price" }
        }
      },
      { $sort: { sales: -1 } },
      { $limit: 5 }
    ]);

    const formattedTopProducts = topProducts.map(p => ({
      name: p._id,
      sales: p.sales,
      revenue: `₺${p.revenue.toFixed(2)}`
    }));
    console.log(formattedTopProducts)
    // Haftalık satış ve sipariş sayısı (hafta günü bazında)
    const salesData = await paymentModel.aggregate([
      {
        $match: { createdAt: { $gte: sevenDaysAgo } }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          sales: { $sum: "$totalPrice" },
          orders: { $sum: 1 }
        }
      }
    ]);

    const dayMap = {
      1: 'Paz', 2: 'Pzt', 3: 'Sal', 4: 'Çar',
      5: 'Per', 6: 'Cum', 7: 'Cmt'
    };
    const allDays = [1, 2, 3, 4, 5, 6, 7];

    const formattedSalesData = allDays.map(dayNum => {
      const found = salesData.find(d => d._id === dayNum);
      return {
        name: dayMap[dayNum],
        sales: found ? found.sales : 0,
        orders: found ? found.orders : 0
      };
    });

    // Günlük toplam gelir ve sipariş sayısı (son 7 gün)
    const stats = await paymentModel.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Genel ürün ve kullanıcı sayıları
    const productLength = await productModel.countDocuments();
    const userLength = await userModel.countDocuments();

    // Son 5 ödeme (son 7 gün veya tümünden)
    const recentPaymentsRaw = await paymentModel.find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'firstName lastName')  // Kullanıcı adı ve soyadını çekiyoruz
      .select('userId basketId totalPrice status createdAt items');

    const recentPayments = recentPaymentsRaw.map(payment => {
      const timeAgo = getTimeAgo(payment.createdAt); // zaman farkını hesaplayan fonksiyon
      return {
        id: payment.basketId || '#' + payment._id.toString().slice(-5),
        customer: payment.userId ? `${payment.userId.firstName} ${payment.userId.lastName}` : 'Bilinmeyen',
        amount: '₺' + payment.totalPrice.toLocaleString('tr-TR'),
        status: payment.status || 'Tamamlandı',
        time: timeAgo
      };
    });

    // getTimeAgo fonksiyonu
    function getTimeAgo(date) {
      const diffMs = Date.now() - new Date(date).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Şimdi';
      if (diffMins < 60) return `${diffMins} dk önce`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} saat önce`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} gün önce`;
    }
    const totalRevenue = await paymentModel.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);
    const totalEarning = totalRevenue[0]?.total || 0;
    res.send({
      productLength,
      userLength,
      totalPayment,
      totalEarning, 
      lastSevenDayStats: stats,
      formattedSalesData,
      formattedTopProducts,
      recentPayments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bir hata oluştu." });
  }
});



router.post('/auth/register', userController.Register); // 165 ms
router.post('/auth/login', userController.Login); // 107 ms
router.post('/api/v1/user/settings', authenticateToken, userController.Settings); // 150ms
router.get('/api/v1/userDetails', authenticateToken, userController.userDetails); // 47ms
router.post('/api/v1/user/sendverifycode', authenticateToken, userController.sendPhoneVerifyCode);
router.post('/api/v1/user/verifycode', authenticateToken, userController.verifyPhoneNumber);


router.get('/api/v1/getAllProducts', productController.getAllProducts);
router.get('/api/v1/getProductInfo/:id', productController.getProduct)


router.post('/api/v1/createProduct', isAdmin, productController.createProduct);
router.get('/api/v1/getProduct/:id', isAdmin, productController.getProduct);
router.post('/api/v1/updateProduct/:id', isAdmin, productController.updateProduct);
router.post('/api/v1/deleteProduct/:id', isAdmin, productController.deleteProduct); 


router.post('/api/v1/payment',authenticateToken ,paymentController.startPayment)

router.post('/api/v1/payment/savePurchase',authenticateToken ,paymentController.savePurchase)

export default router;  