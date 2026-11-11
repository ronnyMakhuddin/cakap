/* CAKAP — pulau 3D: tiap arena punya pulau melayang yang disusun dari model low-poly Polyfork (polyfork.dev).
   Model dimuat langsung dari CDN Polyfork; tidak ada berkas model di repo ini.
   Jika three.js, WebGL, atau model gagal dimuat — atau perangkat terlalu lambat — lapisan ini mati sendiri
   dan latar SVG tetap tampil. Posisi dalam meter (x, z) dari pusat pulau; ry dalam derajat. */
const CDN = 'https://polyfork.dev/cdn/';
const R = 7.2; // jari-jari pulau (meter)
const RAPAT = 0.62, BESAR = 1.3; // posisi dirapatkan dan model sedikit diperbesar agar pulau terasa penuh
const SIANG = { hemi: ['#ffffff', '#8892b0', 2.4], dir: ['#fff1d6', 2.6] };
const PULAU = {
  beranda: {
    atas: '#7cc36a', sisi: '#8a5a36', cahaya: SIANG,
    isi: [
      { id: 'classroom-globe-16a96e', h: 4.5, x: -3, z: 1.5, putar: true },
      { id: 'toy-rocket-e51241', h: 6.5, x: 3.5, z: -2 },
      { id: 'exercise-book-stack-266d9d', h: 1.8, x: 1, z: 4.5, ry: 25 },
      { id: 'plum-tree-565179', x: -6, z: -3, s: 1.6 }, { id: 'plum-tree-565179', x: 6.5, z: 3, s: 1.3, ry: 90 },
      { id: 'sunflower-80ce15', x: -2, z: 6, s: 1.4 }, { id: 'sunflower-80ce15', x: -5, z: 4.8, s: 1.2, ry: 40 },
      { id: 'red-barn-d41683', x: -1.5, z: -5.5, ry: 15, s: 0.8 }
    ],
    terbang: [{ id: 'hot-air-balloon-a2a511', h: 6, r: 13, y: 9, v: 0.22 }]
  },
  angka: {
    atas: '#ecd9a0', sisi: '#b08a57', cahaya: { hemi: ['#fff3e0', '#a4623f', 2.2], dir: ['#ffd9a0', 2.8] },
    isi: [
      { id: 'lookout-watchtower-f1a5ce', x: -1.5, z: -5.5 },
      { id: 'palm-tree-a307da', x: -6, z: -2.5 }, { id: 'palm-tree-a307da', x: 5.8, z: -4, ry: 120, s: 0.85 },
      { id: 'fisherman-shack-ea9b2b', x: 4, z: 1, ry: -30 },
      { id: 'treasure-chest-c2ac4f', x: -1, z: 3.5, s: 2.6, ry: 20 },
      { id: 'jolly-roger-pole-803c5a', x: 1.8, z: 5.5 },
      { id: 'rowboat-c42d85', x: -5.8, z: 4, ry: 40 },
      { id: 'deck-cannon-17849e', x: 6.2, z: 5, ry: 150, s: 1.4 },
      { id: 'palm-sapling-ef7ae4', x: -3.5, z: 6.5 }
    ],
    terbang: [{ id: 'cove-parrot-17850c', s: 2.2, r: 12.5, y: 8, v: 0.5 }]
  },
  kata: {
    atas: '#7cc36a', sisi: '#8a5a36', cahaya: SIANG,
    isi: [
      { id: 'red-barn-d41683', x: -3.5, z: -3.8, ry: 20 },
      { id: 'windpump-tower-1633a9', x: 4.8, z: -4.5 },
      { id: 'plum-tree-565179', x: 6.8, z: 1, s: 1.5 }, { id: 'plum-tree-565179', x: -7, z: 2, s: 1.3, ry: 70 },
      { id: 'cow-c61a66', x: 1.5, z: 2.5, ry: 60, s: 1.3 },
      { id: 'sheep-7b0187', x: 4, z: 5, ry: -40, s: 1.3 },
      { id: 'scarecrow-334079', x: -2.2, z: 4.8, s: 1.3 },
      { id: 'hay-bale-079e8c', x: -5, z: 5.6, s: 1.6 }, { id: 'hay-bale-079e8c', x: -3.9, z: 6.6, ry: 60, s: 1.6 },
      { id: 'sunflower-80ce15', x: 0.5, z: 6.8, s: 1.3 }, { id: 'sunflower-80ce15', x: 1.6, z: 7.2, s: 1.1, ry: 30 }
    ],
    terbang: [{ id: 'hot-air-balloon-a2a511', h: 5.5, r: 13, y: 10, v: 0.2 }]
  },
  akal: {
    atas: '#c9a27e', sisi: '#7d5a45', cahaya: { hemi: ['#dfe6ff', '#4a3a55', 2], dir: ['#ffffff', 3] },
    isi: [
      { id: 'habitat-dome-8d3499', x: -3.2, z: -3.2 },
      { id: 'observation-tower-69b692', x: 4.5, z: -4.8, s: 0.8 },
      { id: 'cargo-shuttle-7907d0', x: 2.8, z: 3.6, ry: 35 },
      { id: 'exploration-rover-7afd91', x: -4.8, z: 4.2, ry: -50 },
      { id: 'solar-array-rack-789c93', x: 7, z: 0.5, ry: 90 },
      { id: 'antenna-mast-0954b0', x: -7.4, z: -0.2 },
      { id: 'survey-flag-fa500f', x: -1.2, z: 6.8, s: 1.5 },
      { id: 'regolith-boulder-1f1f14', x: 0.2, z: 1, s: 1.2 }, { id: 'meteorite-c400d9', x: 6, z: 5.6, s: 1.4 }
    ],
    terbang: [{ id: 'survey-drone-7c71f9', s: 2.2, r: 12, y: 7, v: 0.6 }, { id: 'comm-satellite-fdc2cd', h: 3.5, r: 14, y: 12, v: -0.25 }]
  },
  pola: {
    atas: '#e8d9b5', sisi: '#8d7a5c', cahaya: { hemi: ['#c8fff4', '#2a6f8f', 2.3], dir: ['#e6fffb', 2.2] },
    isi: [
      { id: 'underwater-research-habitat-5d9100', x: -2.5, z: -3.5, s: 0.8 },
      { id: 'coral-bommie-772b22', x: 5.2, z: -3 },
      { id: 'coral-pinnacle-0d9756', x: 6.6, z: 2.2 },
      { id: 'staghorn-coral-422d23', x: -6.2, z: 2.6, s: 1.5 },
      { id: 'pillar-coral-b6deba', x: -4.4, z: 5.4, s: 1.4 },
      { id: 'table-coral-193fa6', x: 2.2, z: 5.6, s: 1.4 },
      { id: 'brain-coral-head-7db21a', x: 4.8, z: 5.8, s: 1.3 },
      { id: 'barrel-sponge-ab460c', x: 0, z: 3.4, s: 1.4 },
      { id: 'tube-sponge-df576b', x: -1.8, z: 6.8, s: 1.5 }
    ],
    terbang: [{ id: 'sea-turtle-fbd874', s: 2, r: 12.5, y: 7, v: 0.3 }, { id: 'one-person-submarine-0b9d14', r: 14, y: 11, v: -0.2 }]
  },
  ingatan: {
    atas: '#3f7a45', sisi: '#4a3528', cahaya: { hemi: ['#9db4ff', '#1b1436', 1.3], dir: ['#b9c8ff', 1.1] }, api: [0.3, 1.3, 4],
    isi: [
      { id: 'porch-log-cabin-d2f3ef', x: -3, z: -3.6, ry: 10, s: 0.9 },
      { id: 'campground-pine-stand-0bf4f2', x: 5, z: -5 }, { id: 'campground-pine-stand-0bf4f2', x: 7.2, z: 0.4, ry: 80, s: 0.8 }, { id: 'campground-pine-stand-0bf4f2', x: -7.4, z: 1.6, ry: 200, s: 0.9 },
      { id: 'dome-tent-9ee59d', x: 3.6, z: 2.6, ry: 30, s: 1.2 },
      { id: 'stone-ring-campfire-8a0c6f', x: 0.3, z: 4, s: 1.4 },
      { id: 'split-log-bench-289780', x: -1.6, z: 6, ry: 20, s: 1.3 },
      { id: 'teardrop-trailer-580e25', x: -5.2, z: 5, ry: 60 },
      { id: 'camping-lantern-21d14b', h: 1.1, x: 2.2, z: 5.6 }
    ],
    terbang: []
  },
  kilat: {
    atas: '#6d5bd0', sisi: '#3b2a7a', cahaya: { hemi: ['#ffffff', '#5b3fb3', 2.2], dir: ['#fff3b0', 2.8] },
    isi: [
      { id: 'crystal-cluster-624138', h: 5, x: -3.5, z: -2 }, { id: 'crystal-cluster-624138', h: 3, x: 4.5, z: -3.5, ry: 90 }, { id: 'crystal-cluster-624138', h: 2.2, x: 5, z: 4, ry: 200 },
      { id: 'an-hourglass-with-sand-ec9f11', h: 5, x: 0.5, z: 2.5, putar: true },
      { id: 'gold-coin-29afc1', h: 1.6, x: -4.5, z: 4.5, putar: true }
    ],
    terbang: [{ id: 'power-gem-e28c25', h: 2.4, r: 12, y: 8, v: 0.7, putar: true }, { id: 'loose-faceted-gem-d88a5b', h: 2, r: 13, y: 10, v: -0.5, putar: true }]
  }
};

const TENANG = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FOV = 30, ELEV = 28 * Math.PI / 180;
let THREE, loader, renderer, scene, camera, hemi, dir, akar, pulau = null, kini = null, tl = 0;
const gltfCache = new Map(), pulauCache = new Map(), dipakai = new Set();
let sampel = [], mati = false;

function muat(id) {
  if (!gltfCache.has(id)) gltfCache.set(id, loader.loadAsync(CDN + id + '.glb').then((g) => g.scene).catch(() => null));
  return gltfCache.get(id);
}
function ambil(id) { // model pertama dipakai langsung; pemakaian berikutnya memakai salinan
  return muat(id).then((obj) => { if (!obj) return null; if (dipakai.has(id)) return obj.clone(true); dipakai.add(id); return obj; });
}
function bungkus(it, obj) {
  const w = new THREE.Group(); let s = (it.s || 1) * BESAR;
  if (it.h) { // model di luar kit: samakan tinggi dan dudukkan di tanah
    const b = new THREE.Box3().setFromObject(obj), sz = b.getSize(new THREE.Vector3());
    s = it.h * BESAR / Math.max(sz.y, 0.001);
    obj.position.set(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2);
  }
  w.add(obj); w.userData.s = s; w.scale.setScalar(0.001);
  w.position.set((it.x || 0) * RAPAT, it.y || 0, (it.z || 0) * RAPAT); w.rotation.y = (it.ry || 0) * Math.PI / 180;
  return w;
}
function bangun(k) {
  const c = PULAU[k], g = new THREE.Group();
  g.userData = { tumbuh: [], terbang: [], putar: [], api: null, c: c };
  const atas = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.97, 0.8, 40), new THREE.MeshLambertMaterial({ color: c.atas, flatShading: true }));
  atas.position.y = -0.4;
  const geo = new THREE.CylinderGeometry(R * 0.97, R * 0.22, 8, 16, 4), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { // batu bawah pulau dibuat tak beraturan
    if (p.getY(i) > 3.9) continue;
    const f = 0.82 + Math.random() * 0.36; p.setX(i, p.getX(i) * f); p.setZ(i, p.getZ(i) * f); p.setY(i, p.getY(i) + (Math.random() - 0.5) * 0.8);
  }
  geo.computeVertexNormals();
  const bawah = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: c.sisi, flatShading: true }));
  bawah.position.y = -4.8;
  g.add(atas, bawah);
  c.isi.forEach((it) => ambil(it.id).then((obj) => {
    if (!obj) return; const w = bungkus(it, obj); g.add(w); g.userData.tumbuh.push(w); if (it.putar) g.userData.putar.push(w);
  }));
  (c.terbang || []).forEach((it, i) => ambil(it.id).then((obj) => {
    if (!obj) return; const w = bungkus(it, obj); g.add(w); g.userData.tumbuh.push(w);
    g.userData.terbang.push({ w: w, r: it.r * RAPAT + 1.5, y: it.y * 0.75, v: it.v, f: i * 2.4, putar: it.putar });
  }));
  if (c.api) { const l = new THREE.PointLight('#ff9a3c', 160, 40, 1.6); l.position.set(c.api[0] * RAPAT, c.api[1], c.api[2] * RAPAT); g.add(l); g.userData.api = l; }
  return g;
}
function pasang(k) {
  if (!PULAU[k]) k = 'beranda';
  kini = k;
  if (pulau) akar.remove(pulau);
  if (!pulauCache.has(k)) pulauCache.set(k, bangun(k));
  pulau = pulauCache.get(k);
  pulau.userData.tumbuh.forEach((w) => { w.scale.setScalar(0.001); w.userData.t0 = undefined; }); // tumbuh lagi tiap kali arena dibuka
  const c = pulau.userData.c.cahaya;
  hemi.color.set(c.hemi[0]); hemi.groundColor.set(c.hemi[1]); hemi.intensity = c.hemi[2];
  dir.color.set(c.dir[0]); dir.intensity = c.dir[1];
  akar.add(pulau);
  if (TENANG) { pulau.userData.tumbuh.forEach((w) => w.scale.setScalar(w.userData.s)); gambar(0); }
}
function ukur() {
  const w = window.innerWidth, h = window.innerHeight, a = w / h;
  renderer.setSize(w, h, false);
  // Pulau memenuhi sebagian lebar layar dan digeser ke bawah agar tidak menutupi soal.
  const porsi = a > 1.2 ? 0.42 : a > 0.8 ? 0.66 : 0.96, geser = a > 1.2 ? 0.25 : 0.27;
  const D = (2 * R + 7) / (porsi * 2 * Math.tan(FOV * Math.PI / 360) * a);
  camera.aspect = a; camera.position.set(0, D * Math.sin(ELEV) + 2, D * Math.cos(ELEV)); camera.lookAt(0, 2, 0);
  camera.setViewOffset(w, h, 0, -geser * h, w, h); camera.updateProjectionMatrix();
  if (TENANG) gambar(0);
}
function gambar(ms) {
  const t = ms / 1000, asli = Math.max(0, t - tl), dt = Math.min(0.05, asli); tl = t;
  if (pulau) {
    const u = pulau.userData;
    pulau.rotation.y = t * 0.1; pulau.position.y = Math.sin(t * 0.6) * 0.35;
    for (const w of u.tumbuh) { // muncul membesar selama 0,6 detik (berbasis waktu, bukan jumlah frame)
      const s = w.userData.s; if (w.scale.x >= s) continue;
      if (w.userData.t0 === undefined) w.userData.t0 = t;
      const q = Math.min(1, (t - w.userData.t0) / 0.6); w.scale.setScalar(Math.max(0.001, s * (1 - Math.pow(1 - q, 3))));
    }
    for (const w of u.putar) w.rotation.y += dt * 1.1;
    for (const f of u.terbang) {
      const a = t * f.v + f.f;
      f.w.position.set(Math.cos(a) * f.r, f.y + Math.sin(t * 1.1 + f.f) * 0.7, Math.sin(a) * f.r);
      if (f.putar) f.w.rotation.y += dt * 1.6; else f.w.rotation.y = -a + (f.v > 0 ? Math.PI : 0);
    }
    if (u.api) u.api.intensity = 150 + Math.sin(t * 9) * 25 + Math.sin(t * 23) * 15;
  }
  renderer.render(scene, camera);
  // Penjaga kinerja: jika rata-rata di bawah ~20 fps, matikan lapisan 3D.
  if (!mati && ms > 6000 && asli > 0 && asli < 0.25 && !document.hidden) { // lewati frame saat tab di latar belakang
    sampel.push(asli);
    if (sampel.length >= 120) {
      const rata = sampel.reduce((x, y) => x + y, 0) / sampel.length; sampel = [];
      if (rata > 0.048) { mati = true; renderer.setAnimationLoop(null); renderer.domElement.style.display = 'none'; window.CAKAP_TIGA = null; }
    }
  }
}

(async function mulai() {
  try {
    THREE = await import('three');
    loader = new (await import('three/addons/loaders/GLTFLoader.js')).GLTFLoader();
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('tiga'), alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    scene = new THREE.Scene();
    hemi = new THREE.HemisphereLight('#ffffff', '#8892b0', 2.4); scene.add(hemi);
    dir = new THREE.DirectionalLight('#fff1d6', 2.6); dir.position.set(30, 50, 25); scene.add(dir);
    camera = new THREE.PerspectiveCamera(FOV, 1, 1, 600);
    akar = new THREE.Group(); scene.add(akar);
    ukur(); window.addEventListener('resize', ukur);
    window.CAKAP_TIGA = (k) => { if (k !== kini) pasang(k); };
    pasang(window.CAKAP_TIGA_K || 'beranda');
    if (!TENANG) renderer.setAnimationLoop(gambar);
  } catch (e) { /* tanpa 3D */ }
})();
