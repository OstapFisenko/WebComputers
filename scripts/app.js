var vh = window.innerHeight / 100;

var vw = window.innerWidth / 100;

var swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    watchSlidesProgress: true,
    rewind: true,
    spaceBetween: vw*2,
    grabCursor: true,
    observer: true,
    observeParents: true,
    speed: 800,
    keyboard: {
        enabled: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
})

let reviewList = gsap.utils.toArray('.review_text')

reviewList.forEach(element => {
    $clamp(element, {
        clamp: 6,
        useNativeClamp: true,
    })
});

initMap();

async function initMap() {
    const LOCATION = {center: [30.268942, 59.873741], zoom: 15};

    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;

    const map = new YMap(document.getElementById('map'),{location: {
                center: [30.263207250721152,59.873306475640995],
                zoom: 15
            }});

    map.addChild((scheme = new YMapDefaultSchemeLayer()));
    map.addChild(new YMapDefaultFeaturesLayer());

    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    const el = document.createElement('img');
    el.className = 'my-marker';
    el.src = '../img/marker.png';
    map.addChild(new YMapMarker({coordinates: LOCATION.center, title: 'Tehc Secret', onClick: () => window.open('https://yandex.ru/maps/org/tech_secret/170868117843/?ll=30.269047%2C59.873706&z=19.38')}, el));

}