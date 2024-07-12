

Kullanılan Kütüphaneler
React Native: Uygulamanın temel geliştirme platformu.
axios: HTTP istekleri göndermek ve API'lerle iletişim kurmak için kullanıldı.
@expo/vector-icons: İkonları uygulamaya dahil etmek için kullanıldı.
react-navigation: Sayfa yönlendirme ve navigasyon işlemleri için kullanıldı.
redux-toolkit ve AsyncStorage: Favori karakterlerin yönetimi için yerel durum yönetimi ve veri depolama işlemleri için kullanıldı.
Performans Optimizasyonu
1. İmaj Yönetimi ve Önbellekleme
Projede, özellikle karakter resimlerinin çekilmesi ve gösterilmesi sırasında performans sorunları yaşandığı belirtilmişti. Performansı artırmak için şu adımlar atıldı:

Önbellekleme Stratejisi: İmajların tekrar tekrar ağdan çekilip gösterilmesini önlemek için AsyncStorage kullanılarak önbellekleme yapıldı. Favori karakterlerin resimleri yerel depolamada tutuldu ve tekrar gösterildiği zaman yeniden indirilmeden önce önbellekten yüklendi.

Optimize Edilmiş İmaj Yükleme: İmajların boyutları ve sıkıştırılması optimize edildi. Bu, hem indirme sürelerini azalttı hem de uygulama performansını artırdı.

2. Veri Yönetimi ve Depolama
Redux Toolkit: Favori karakterlerin durumu gibi uygulama genelindeki durum yönetimi için Redux Toolkit kullanıldı. Bu, bileşenler arası veri iletişimini ve güncelleme işlemlerini optimize etti.

AsyncStorage: Favori karakterlerin yerel depolama işlemleri için AsyncStorage kullanıldı. Bu, veri alışverişi ve depolama süreçlerini asenkron olarak yönetmeyi sağladı.
Scan with expo 
![WhatsApp Görsel 2024-07-13 saat 01 06 54_9bc791be](https://github.com/user-attachments/assets/b30a75fe-7f9c-484b-9e6f-4daa24415bed)
