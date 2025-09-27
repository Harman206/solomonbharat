import ThreeGlobe from "three-globe";
import { WebGLRenderer, Scene } from "three";
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  // AxesHelper,
  // DirectionalLightHelper,
  // CameraHelper,
  PointLight,
  SphereGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createGlowMesh } from "three-glow-mesh";
import countries from "./files/globe-data-min.json";
import travelHistory from "./files/my-flights.json";
import airportHistory from "./files/my-airports.json";
var renderer, camera, scene, controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var Globe;

// Globe rotation variables
let rotationTime = 0;
const rotationSpeed = 0.1; // Even slower rotation
const rotationRange = 0.3; // How far it rotates (in radians)
const indiaBaseRotation = -Math.PI * (5 / 9); // Base rotation to show India

// Pulsating animation variables
let pulsateTime = 0;
const pulsateSpeed = 0.02;

// Enhanced network connections data with supplier hub information
const networkConnections = [
  // India as central hub - connecting to major buyer countries
  { startLat: 28.6139, startLng: 77.2090, endLat: 40.7128, endLng: -74.0060, order: 0, name: "India-USA", volume: "$450M" }, // India to USA
  { startLat: 28.6139, startLng: 77.2090, endLat: 51.5074, endLng: -0.1278, order: 1, name: "India-UK", volume: "$320M" }, // India to UK
  { startLat: 28.6139, startLng: 77.2090, endLat: 35.6762, endLng: 139.6503, order: 2, name: "India-Japan", volume: "$280M" }, // India to Japan
  { startLat: 28.6139, startLng: 77.2090, endLat: -33.8688, endLng: 151.2093, order: 3, name: "India-Australia", volume: "$180M" }, // India to Australia
  { startLat: 28.6139, startLng: 77.2090, endLat: 52.5200, endLng: 13.4050, order: 4, name: "India-Germany", volume: "$390M" }, // India to Germany
  { startLat: 28.6139, startLng: 77.2090, endLat: 1.3521, endLng: 103.8198, order: 5, name: "India-Singapore", volume: "$150M" }, // India to Singapore
  { startLat: 28.6139, startLng: 77.2090, endLat: 25.2048, endLng: 55.2708, order: 6, name: "India-UAE", volume: "$220M" }, // India to UAE
  { startLat: 28.6139, startLng: 77.2090, endLat: 43.6532, endLng: -79.3832, order: 7, name: "India-Canada", volume: "$160M" }, // India to Canada
  { startLat: 28.6139, startLng: 77.2090, endLat: 55.7558, endLng: 37.6176, order: 8, name: "India-Russia", volume: "$120M" }, // India to Russia

  // Secondary connections between buyer countries
  { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278, order: 9, name: "USA-UK", volume: "$80M" }, // USA to UK
  { startLat: 51.5074, startLng: -0.1278, endLat: 52.5200, endLng: 13.4050, order: 10, name: "UK-Germany", volume: "$60M" }, // UK to Germany
  { startLat: 35.6762, startLng: 139.6503, endLat: 1.3521, endLng: 103.8198, order: 11, name: "Japan-Singapore", volume: "$40M" }, // Japan to Singapore
].map(conn => ({
  ...conn,
  arcAlt: 0.15 + Math.random() * 0.25, // Random altitude between 0.15-0.4
  status: Math.random() > 0.15, // 85% active connections
  isIndiaConnection: conn.startLat === 28.6139 || conn.endLat === 28.6139
}));

// Indian manufacturing hubs for enhanced visualization
const indianHubs = [
  { lat: 19.0760, lng: 72.8777, name: "Mumbai", industry: "Textiles & Chemicals", suppliers: 2500 },
  { lat: 28.7041, lng: 77.1025, name: "Delhi", industry: "Electronics & Auto", suppliers: 1800 },
  { lat: 13.0827, lng: 80.2707, name: "Chennai", industry: "Automotive & IT", suppliers: 1200 },
  { lat: 12.9716, lng: 77.5946, name: "Bangalore", industry: "Electronics & Pharma", suppliers: 1500 },
  { lat: 18.5204, lng: 73.8567, name: "Pune", industry: "Automotive & Engineering", suppliers: 900 },
  { lat: 22.5726, lng: 88.3639, name: "Kolkata", industry: "Jute & Leather", suppliers: 700 },
  { lat: 23.0225, lng: 72.5714, name: "Ahmedabad", industry: "Textiles & Chemicals", suppliers: 1100 },
  { lat: 17.3850, lng: 78.4867, name: "Hyderabad", industry: "Pharmaceuticals & IT", suppliers: 800 }
];

init();
initGlobe();
onWindowResize();
animate();

// SECTION Initializing core ThreeJS elements
function init() {
  // Initialize renderer
  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  // renderer.outputEncoding = THREE.sRGBEncoding;

  // Set much larger fixed size for background globe
  const fixedWidth = 1800;
  const fixedHeight = 1400;
  renderer.setSize(fixedWidth, fixedHeight);

  const globeContainer = document.getElementById('globe-container');
  if (globeContainer) {
    globeContainer.appendChild(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }

  // Initialize scene, light
  scene = new Scene();
  scene.add(new AmbientLight(0xbbbbbb, 0.3));
  // Remove background for transparency
  // scene.background = new Color(0x040d21);

  // Initialize camera, light
  camera = new PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new PointLight(0x8566cc, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  camera.position.z = 250;
  camera.position.x = 0;
  camera.position.y = 0;

  scene.add(camera);

  // Additional effects - remove fog for cleaner hero look
  // scene.fog = new Fog(0x535ef3, 400, 2000);

  // Helpers
  // const axesHelper = new AxesHelper(800);
  // scene.add(axesHelper);
  // var helper = new DirectionalLightHelper(dLight);
  // scene.add(helper);
  // var helperCamera = new CameraHelper(dLight.shadow.camera);
  // scene.add(helperCamera);

  // Disable controls for non-responsive globe
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.enableDamping = false;
  controls.enablePan = false;
  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.autoRotate = false;

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove);
}

// SECTION Globe
function initGlobe() {
  // Initialize the Globe
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#3a228a")
    .atmosphereAltitude(0.25)
    .hexPolygonColor((e) => {
      if (
        ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
          e.properties.ISO_A3
        )
      ) {
        return "rgba(255,255,255, 1)";
      } else return "rgba(255,255,255, 0.7)";
    });

  // NOTE Arc animations with network connections and traveling pulses
  setTimeout(() => {
    Globe.arcsData(networkConnections)
      .arcColor((e) => {
        return e.status ? "#00ff88" : "#ff6b35"; // Green for active, orange for inactive
      })
      .arcAltitude((e) => {
        return e.arcAlt;
      })
      .arcStroke((e) => {
        const basePulse = Math.sin(pulsateTime + e.order * 0.5) * 0.4 + 0.6; // Individual pulse timing
        return e.status ? 0.8 * basePulse : 0.4 * basePulse;
      })
      .arcDashLength(0.3) // Shorter dashes for pulse effect
      .arcDashGap(0.1) // Smaller gaps
      .arcDashAnimateTime(3000) // Slower pulse travel
      .arcsTransitionDuration(2000)
      .arcDashInitialGap((e) => e.order * 0.2) // Staggered pulse starts
      .pointsData(airportHistory.airports)
      .pointColor(() => "#ffffff")
      .pointsMerge(true)
      .pointAltitude(0.07)
      .pointRadius(0.05);
  }, 1000);

  // Set initial rotation to show India (Z rotation for tilt)
  Globe.rotation.y = indiaBaseRotation;
  Globe.rotateZ(-Math.PI / 6);
  const globeMaterial = Globe.globeMaterial();
  globeMaterial.color = new Color(0x3a228a);
  globeMaterial.emissive = new Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  // NOTE Cool stuff
  // globeMaterial.wireframe = true;

  scene.add(Globe);
}

function onMouseMove(event) {
  // Disable mouse movement effects for non-responsive globe
  // mouseX = event.clientX - windowHalfX;
  // mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
  // Keep globe at much larger fixed size, don't make it responsive
  const fixedWidth = 1800;
  const fixedHeight = 1400;

  camera.aspect = fixedWidth / fixedHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(fixedWidth, fixedHeight);
}

function animate() {
  // Remove mouse-based camera movement for non-responsive globe
  // Keep camera in fixed position

  // Custom oscillating rotation around India
  if (Globe) {
    rotationTime += rotationSpeed * 0.01; // Very slow increment
    pulsateTime += pulsateSpeed; // Pulsating increment
    const oscillation = Math.sin(rotationTime) * rotationRange;
    Globe.rotation.y = indiaBaseRotation + oscillation;

    // Update arc strokes for traveling pulse effect
    Globe.arcStroke((e) => {
      const individualPulse = Math.sin(pulsateTime + e.order * 0.5) * 0.4 + 0.6;
      return e.status ? 0.8 * individualPulse : 0.4 * individualPulse;
    });

    // Update dash animation for traveling pulses with enhanced effects
    Globe.arcDashInitialGap((e) => {
      const speed = e.isIndiaConnection ? 0.15 : 0.08; // Faster for India connections
      const travelingPulse = (pulsateTime * speed + e.order * 0.2) % 1;
      return travelingPulse;
    });

    // Simplified - remove complex arc labels for now
  }

  camera.lookAt(scene.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
