
//==============================KATEGORİ İÇİ MENÜLER==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    const categoryTitle = document.getElementById('category-title');
    const containerMenu = document.querySelector('.container-menu');

    // URL parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Kategorilere göre içerik verilerini tanımla
    const menuItems = {
        HotDrinks: [
            { img: 'images/turkish-cofee.jpg', title: 'Türk Kahvesi', price: '₺50,00' },
            { img: 'images/coffee-1.jpg', title: 'Espresso', price: '₺40,00' },
            { img: 'images/latte.jpg', title: 'Latte', price: '₺60,00' }
        ],
        ColdDrinks: [
            { img: 'images/cool.jpg', title: 'Soğuk Çay', price: '₺45,00' },
            { img: 'images/ice-cream.png', title: 'Buzlu Kahve', price: '₺55,00' }
        ],
        Teas: [
            { img: 'images/cay.jpg', title: 'Yeşil Çay', price: '₺35,00' },
            { img: 'images/cay.jpg', title: 'Siyah Çay', price: '₺30,00' }
        ],
        IceCream: [
            { img: 'images/ice-cream.png', title: 'Vanilyalı Dondurma', price: '₺70,00' },
            { img: 'images/ice-cream.png', title: 'Çikolatalı Dondurma', price: '₺75,00' }
        ],
        Juices: [
            { img: 'images/meyve-suyu.jpg', title: 'Portakal Suyu', price: '₺40,00' },
            { img: 'images/meyve-suyu.jpg', title: 'Elma Suyu', price: '₺35,00' }
        ]
    };

    // Kategori başlığını ayarla
    function setCategoryTitle(category) {
        let title = ' ~ Menü ~ ';
        switch (category) {
            case 'HotDrinks':
                title = ' ~ Sıcak İçecekler ~ ';
                break;
            case 'ColdDrinks':
                title = ' ~ Soğuk İçecekler ~ ';
                break;
            case 'Teas':
                title = ' ~ Çaylar ~ ';
                break;
            case 'IceCream':
                title = ' ~ Dondurmalar ~ ';
                break;
            case 'Juices':
                title = ' ~ Meyve Suları ~ ';
                break;
            default:
                title = ' ~ Menü ~ ';
                break;
        }
        categoryTitle.innerText = title;
    }

    // Menü içeriğini ayarla
    function setMenuItems(category) {
        containerMenu.innerHTML = ''; // Temizle mevcut içerik
        const items = menuItems[category] || [];
        items.forEach(item => {
            const link = document.createElement('a');
            link.href = '#';
            link.classList.add('popup-trigger');
            link.innerHTML = `
                <div class="card-menu">
                    <div class="menu-title">
                        <img src="${item.img}" alt="">
                        <h2>${item.title}</h2>
                    </div>
                </div>
                <div class="iconBox"><i class="fa-solid fa-angle-right"></i></div>
            `;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openPopup(item.img, item.title, item.price);
            });
            containerMenu.appendChild(link);
        });
    }


    // Sayfa yüklendiğinde kategori başlığını ve menüyü ayarla
    setCategoryTitle(category);
    setMenuItems(category);
});

//===============================KATEGORİ SAYFALARININ AÇILMASI======================================

document.addEventListener('DOMContentLoaded', () => {
    // URL parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // <h2> elemanını seç
    const categoryTitle = document.getElementById('category-title');

    // Kategoriye göre başlığı ayarla
    let titleText = ' ~ Default Title ~ ';
    switch (category) {
        case 'HotDrinks':
            titleText = ' ~ Sıcak İçecekler ~ ';
            break;
        case 'ColdDrinks':
            titleText = ' ~ Soğuk İçecekler ~ ';
            break;
        case 'Teas':
            titleText = ' ~ Çaylar ~ ';
            break;
        case 'IceCream':
            titleText = ' ~ Dondurmalar ~ ';
            break;
        case 'Juices':
            titleText = ' ~ Meyve Suları ~ ';
            break;
        default:
            titleText = ' ~ Menü ~ ';
            break;
    }
    categoryTitle.innerText = titleText;
});

//===================================POP-UP=================================================

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const popupContent = popup.querySelector('.popup-content');
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const closeBtn = document.querySelector('.close-btn');
    const triggers = document.querySelectorAll('.popup-trigger');

    function openPopup(imgSrc, title) {
        popupImg.src = imgSrc;
        popupTitle.textContent = title;
        popup.style.display = 'flex';
        // Bir sonraki render döngüsünde sınıfları değiştirme
        setTimeout(() => {
            popupContent.classList.remove('hide');
            popupContent.classList.add('show');
        }, 10); // Kısa bir gecikme, animasyonun düzgün çalışmasını sağlar
    }

    function closePopup() {
        // Kapanma animasyonunu başlat
        popupContent.classList.remove('show');
        popupContent.classList.add('hide');

        // Animasyon tamamlandıktan sonra pop-up'ı gizle
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300); // Animasyon süresi
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const img = trigger.querySelector('img').src;
            const title = trigger.querySelector('h2').textContent;
            openPopup(img, title);
        });
    });

    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
});

//==========================BUTONA BASINCA NAVBAR'I AÇMA==================================
const button = document.getElementById('toggleButton');
const body = document.body;

// Butona tıklama olayını ekliyoruz
toggleButton.addEventListener('click', function() {
    // Body'de "opened" sınıfı var mı diye kontrol ederiz
    if (body.classList.contains('opened')) {
        // Eğer varsa, "opened" sınıfını kaldır ve butonu eski yerine taşı
        body.classList.remove('opened');
    } else {
        // Yoksa, "opened" sınıfını ekle ve butonu yeni konuma taşı
        body.classList.add('opened');
    }
});


