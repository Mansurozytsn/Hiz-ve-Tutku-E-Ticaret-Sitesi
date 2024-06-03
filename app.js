let ürünList = [];

const toggleModal = () => {
    const basketModalEl = document.querySelector(".basket__modal");
    basketModalEl.classList.toggle("active");
}

const getUrunler = () => {
    fetch("./urun.json")    
     .then(res => res.json())
     .then((ürünler) => (ürünList = ürünler));
}

getUrunler();

const createÜrünStars = (starRate) => {
    let starRateHtml = "";
    for(let i = 1; i < 5; i++){
        if(Math.round(starRate) >= i) 
            starRateHtml += `<i class="bi bi-star-fill active"></i>`;
        else starRateHtml += `<i class="bi bi-star-fill"></i>`;
    }
    
    return starRateHtml;
}

const createÜrünItemsHtml = () => {
    const ürünListEl = document.querySelector(".ürün__list");
    let ürünlistHtml = "";
    ürünList.forEach((ürün, index) => {
        ürünlistHtml += `
        <div class="col-5 ${index%2 == 0 ? "offset-2" : ""} my-5">
            <div class="row ürün__card">
                <div class="col-6">
                    <img
                       class="img-fluid shadow"
                       src="${ürün.imgSource}"
                       width="258"
                       height="400"
                    /> 
                </div>
                <div class="col-6 d-flex flex-column justify-content-between">
                    <div class="ürün__detail">
                        <span class="fos gray fs-5"> ${ürün.name}</span><br />
                        <span class="fs-4 fw-bold"> ${ürün.renk}</span><br />
                        <span class="ürün__star">
                          ${createÜrünStars(ürün.reviewCount)}
                          <span class="gray"> ${ürün.reviewCount} </span>
                        </span>
                    </div>
                    <p class="ürün__description fos gray">
                        ${ürün.description}
                    </p>
                    <div>
                        <span class="black fw-bold fs-4 me-2"> ${ürün.price}₺</span>
                        ${ürün.oldPrice ? `<span class="fs-4 fw-bold old__price">${ürün.oldPrice}₺</span>` : ""}
                    </div>
                    <button class="btn__purple">ADD BASKET</button>
                </div>
            </div>
        </div>`;
    });

    ürünListEl.innerHTML = ürünlistHtml;
}

const ÜRÜN_TYPES  = {
    ALL: "Tümü",
    ELDİVENLER:"Eldivenler",
    KIYAFETLER:"Montlar",
    DİZLİKLER:"Dizlikler",
    KASKLAR:"Kasklar"
}

const createÜrünTypeHtml = () => {
    const filterEl = document.querySelector(".filter");
    let filterHtml = "";
    let filterTypes = ["Tümü"];
    ürünList.forEach(ürün => {
        if (filterTypes.findIndex(filter => filter == ürün.type) == -1) filterTypes.push(ürün.type);
    });

    filterTypes.forEach((type, index) => {
        filterHtml += `<li class="${index == 0 ? "active" : ""}" onclick="filterÜrün(this)" data-type="${ÜRÜN_TYPES[type] || type}">${type}</li>`;
    });

    filterEl.innerHTML = filterHtml;
};


const filterÜrün = (filterEl) => {
    const selectedType = filterEl.dataset.type;

    // Aktif sınıfı kaldır
    document.querySelector(".filter .active").classList.remove("active");

    // Seçilen filtreye aktif sınıf ekle
    filterEl.classList.add("active");

    // Tüm ürünleri göster
    if (selectedType === "Tümü") {
        createÜrünItemsHtml(ürünList);
        return;
    }

    // Seçilen kategoriye göre ürünleri filtrele ve HTML içeriğini güncelle
    const filteredList = ürünList.filter(ürün => ürün.type === selectedType);
    createÜrünItemsHtml(filteredList);
};


    

setTimeout(() => {
    createÜrünItemsHtml();
    createÜrünTypeHtml();
}, 100);

