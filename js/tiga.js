/* CAKAP — lapisan 3D: model low-poly gratis dari Polyfork (polyfork.dev), dimuat langsung dari CDN mereka.
   Tidak ada berkas model yang disimpan di repo ini. Jika three.js, WebGL, atau model gagal dimuat,
   lapisan ini diam saja dan latar SVG tetap tampil. */
const CDN = 'https://polyfork.dev/cdn/';
// putar: true = berputar penuh (benda); false = menoleh pelan (makhluk/kendaraan)
const MODEL = {
  beranda: [{ id: 'classroom-globe-16a96e', putar: true }, { id: 'toy-rocket-e51241' }, { id: 'hot-air-balloon-a2a511' }],
  angka: [{ id: 'hot-air-balloon-a2a511' }, { id: 'gold-coin-29afc1', putar: true }, { id: 'towering-cloud-2e00f1' }],
  kata: [{ id: 'exercise-book-stack-266d9d', putar: true }, { id: 'owl-base' }, { id: 'windmill-3aad49' }],
  akal: [{ id: 'toy-rocket-e51241' }, { id: 'comm-satellite-fdc2cd', putar: true }, { id: 'astronaut-explorer-323482' }],
  pola: [{ id: 'sea-turtle-base' }, { id: 'moon-jellyfish-0fa43c' }, { id: 'octopus-base' }],
  ingatan: [{ id: 'an-hourglass-with-sand-ec9f11', putar: true }, { id: 'camping-lantern-21d14b' }, { id: 'crystal-cluster-624138', putar: true }],
  kilat: [{ id: 'power-gem-e28c25', putar: true }, { id: 'loose-faceted-gem-d88a5b', putar: true }, { id: 'gold-coin-29afc1', putar: true }]
};
const TENANG = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const JARAK = 10, FOV = 35;
let THREE, loader, renderer, scene, camera, panggung, items = [], kini = null, lebar = 1, tinggi = 1;
const cache = new Map();

function muat(id) {
  if (!cache.has(id)) {
    cache.set(id, loader.loadAsync(CDN + id + '.glb').then((gltf) => {
      // Pusatkan dan samakan ukuran: sisi terpanjang = 1 satuan
      const obj = gltf.scene, box = new THREE.Box3().setFromObject(obj);
      const size = box.getSize(new THREE.Vector3()), tengah = box.getCenter(new THREE.Vector3());
      const poros = new THREE.Group();
      obj.position.sub(tengah); poros.add(obj);
      poros.scale.setScalar(1 / Math.max(size.x, size.y, size.z, 0.0001));
      return poros;
    }).catch(() => null));
  }
  return cache.get(id);
}

function slot(i) {
  // Posisi di tepi layar agar tidak menutupi soal; layar sempit hanya memakai bagian bawah.
  const sempit = lebar / tinggi < 0.8;
  const t = sempit
    ? [[-0.27, -0.36, 0.95], [0.27, -0.41, 0.85], [0, -0.44, 0]]
    : [[-0.39, -0.26, 1.5], [0.4, -0.3, 1.25], [0.38, 0.27, 1.1]];
  return t[i % t.length];
}
function letak() {
  items.forEach((it) => { const s = slot(it.i); it.g.visible = s[2] > 0; it.x = s[0] * lebar; it.y = s[1] * tinggi; it.g.position.set(it.x, it.y, 0); it.g.scale.setScalar(s[2] || 1); });
}
function ukur() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  tinggi = 2 * JARAK * Math.tan(FOV * Math.PI / 360); lebar = tinggi * camera.aspect;
  letak(); if (TENANG) gambar(0);
}
function pasang(k) {
  kini = k;
  items.forEach((it) => panggung.remove(it.g)); items = [];
  (MODEL[k] || []).forEach((m, i) => {
    muat(m.id).then((poros) => {
      if (!poros || kini !== k) return;
      const g = new THREE.Group(); g.add(poros); g.rotation.x = 0.18;
      panggung.add(g); items.push({ g: g, i: i, putar: !!m.putar, f: i * 2.1, x: 0, y: 0 });
      letak(); if (TENANG) gambar(0);
    });
  });
}
function gambar(ms) {
  const t = ms / 1000;
  for (const it of items) {
    it.g.position.y = it.y + Math.sin(t * 0.9 + it.f) * 0.14;
    it.g.position.x = it.x + Math.cos(t * 0.5 + it.f) * 0.06;
    it.g.rotation.y = it.putar ? t * 0.7 + it.f : Math.sin(t * 0.45 + it.f) * 0.7;
    it.g.rotation.z = Math.sin(t * 0.7 + it.f) * 0.05;
  }
  renderer.render(scene, camera);
}

(async function mulai() {
  try {
    THREE = await import('three');
    loader = new (await import('three/addons/loaders/GLTFLoader.js')).GLTFLoader();
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('tiga'), alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight('#ffffff', '#6b7ba6', 2.6));
    const matahari = new THREE.DirectionalLight('#fff4d6', 2.2); matahari.position.set(4, 8, 6); scene.add(matahari);
    camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100); camera.position.set(0, 0, JARAK);
    panggung = new THREE.Group(); scene.add(panggung);
    ukur(); window.addEventListener('resize', ukur);
    window.CAKAP_TIGA = (k) => { if (k !== kini) pasang(k); };
    pasang(window.CAKAP_TIGA_K || 'beranda');
    if (!TENANG) renderer.setAnimationLoop(gambar);
  } catch (e) { /* tanpa 3D */ }
})();
