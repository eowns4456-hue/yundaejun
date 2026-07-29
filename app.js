const places = [
  {
    name: "다정중학교",
    category: "학교",
    description: "세종 다정동에서 보낸 소중한 중학교 시절, 추억이 가득한 곳.",
    emoji: "🏫",
    lat: 36.4943076,
    lng: 127.2459159,
  },
  {
    name: "도담짬뽕집",
    category: "맛집",
    description: "불향 가득한 짬뽕과 탕수육이 일품인, 언제 가도 반가운 중국집.",
    emoji: "🍜",
    lat: 36.4921075,
    lng: 127.2553108,
  },
  {
    name: "산울마을 8단지",
    category: "집",
    description: "편안한 일상이 시작되는, 나의 보금자리.",
    emoji: "🏠",
    lat: 36.5326425,
    lng: 127.2667417,
  },
  {
    name: "아트밸리",
    category: "문화·예술",
    description: "음악과 공연이 살아 숨 쉬는, 세종의 밴드 연습실 & 공연장.",
    emoji: "🎸",
    lat: 36.490518,
    lng: 127.2576567,
  },
];

const map = L.map("map").setView([36.505, 127.255], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19,
}).addTo(map);

const markers = [];

function createEmojiIcon(emoji) {
  return L.divIcon({
    className: "emoji-marker",
    html: `<span>${emoji}</span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

function createPopupContent(place) {
  return `
    <div class="popup-content">
      <div class="popup-emoji">${place.emoji}</div>
      <h3>${place.name}</h3>
      <span class="popup-category">${place.category}</span>
      <p>${place.description}</p>
    </div>
  `;
}

places.forEach((place) => {
  const marker = L.marker([place.lat, place.lng], {
    icon: createEmojiIcon(place.emoji),
  })
    .addTo(map)
    .bindPopup(createPopupContent(place));

  markers.push({ place, marker });
});

const listEl = document.getElementById("place-list");

places.forEach((place, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="emoji">${place.emoji}</span>
    <div class="info">
      <strong>${place.name}</strong>
      <div class="category">${place.category}</div>
      <div class="desc">${place.description}</div>
    </div>
  `;

  li.addEventListener("click", () => {
    map.setView([place.lat, place.lng], 15, { animate: true });
    markers[index].marker.openPopup();
  });

  listEl.appendChild(li);
});

const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
map.fitBounds(bounds, { padding: [60, 60] });
