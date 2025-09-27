self["webpackHotUpdatepandemic_globe"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three_globe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three-globe */ "./node_modules/three-globe/dist/three-globe.module.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_glow_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three-glow-mesh */ "./node_modules/three-glow-mesh/dist/index.module.js");
/* harmony import */ var _files_globe_data_min_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./files/globe-data-min.json */ "./src/files/globe-data-min.json");
/* harmony import */ var _files_my_flights_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./files/my-flights.json */ "./src/files/my-flights.json");
/* harmony import */ var _files_my_airports_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./files/my-airports.json */ "./src/files/my-airports.json");








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
  renderer = new three__WEBPACK_IMPORTED_MODULE_5__.WebGLRenderer({ antialias: true, alpha: true });
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
  scene = new three__WEBPACK_IMPORTED_MODULE_5__.Scene();
  scene.add(new three__WEBPACK_IMPORTED_MODULE_5__.AmbientLight(0xbbbbbb, 0.3));
  // Remove background for transparency
  // scene.background = new Color(0x040d21);

  // Initialize camera, light
  camera = new three__WEBPACK_IMPORTED_MODULE_5__.PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new three__WEBPACK_IMPORTED_MODULE_5__.DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new three__WEBPACK_IMPORTED_MODULE_5__.DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new three__WEBPACK_IMPORTED_MODULE_5__.PointLight(0x8566cc, 0.5);
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
  controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_6__.OrbitControls(camera, renderer.domElement);
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
  Globe = new three_globe__WEBPACK_IMPORTED_MODULE_0__.default({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .hexPolygonsData(_files_globe_data_min_json__WEBPACK_IMPORTED_MODULE_2__.features)
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
      .pointsData(indianHubs)
      .pointColor((d) => {
        // Color code by industry
        if (d.industry && d.industry.includes('Textiles')) return '#ff6b6b';
        if (d.industry && d.industry.includes('Electronics')) return '#4ecdc4';
        if (d.industry && d.industry.includes('Automotive')) return '#45b7d1';
        if (d.industry && d.industry.includes('Pharmaceuticals')) return '#96ceb4';
        if (d.industry && d.industry.includes('Chemicals')) return '#ffeaa7';
        return '#dda0dd';
      })
      .pointsMerge(false)
      .pointAltitude(0.05)
      .pointRadius((d) => Math.max(0.02, (d.suppliers || 1000) / 50000)) // Size based on supplier count
      .pointLabel((d) => `
        <div style="background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px; color: white; font-size: 12px;">
          <strong>${d.name || 'Manufacturing Hub'}</strong><br/>
          Industry: ${d.industry || 'Mixed Industries'}<br/>
          Suppliers: ${(d.suppliers || 1000).toLocaleString()}
        </div>
      `);
  }, 1000);

  // Set initial rotation to show India (Z rotation for tilt)
  Globe.rotation.y = indiaBaseRotation;
  Globe.rotateZ(-Math.PI / 6);
  const globeMaterial = Globe.globeMaterial();
  globeMaterial.color = new three__WEBPACK_IMPORTED_MODULE_5__.Color(0x3a228a);
  globeMaterial.emissive = new three__WEBPACK_IMPORTED_MODULE_5__.Color(0x220038);
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

    // Add arc labels for major connections (simplified to avoid errors)
    if (Globe.arcLabel) {
      Globe.arcLabel((d) => {
        if (d.isIndiaConnection && d.name && Math.random() > 0.8) { // Show labels occasionally
          return `
            <div style="background: rgba(0,0,0,0.7); padding: 5px; border-radius: 3px; color: white; font-size: 10px;">
              ${d.name}<br/>
              ${d.volume ? 'Volume: ' + d.volume : ''}
            </div>
          `;
        }
        return '';
      });
    }
  }

  camera.lookAt(scene.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "41bbac6074f4b632da26"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYW5kZW1pYy1nbG9iZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDUTtBQVk5QjtBQUM4RDtBQUM1QjtBQUNHO0FBQ0E7QUFDRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRyx3SEFBd0g7QUFDM0gsR0FBRyxzSEFBc0g7QUFDekgsR0FBRywwSEFBMEg7QUFDN0gsR0FBRywrSEFBK0g7QUFDbEksR0FBRywySEFBMkg7QUFDOUgsR0FBRyw2SEFBNkg7QUFDaEksR0FBRyx1SEFBdUg7QUFDMUgsR0FBRywySEFBMkg7QUFDOUgsR0FBRywwSEFBMEg7O0FBRTdIO0FBQ0EsR0FBRyxvSEFBb0g7QUFDdkgsR0FBRyx3SEFBd0g7QUFDM0gsR0FBRyw4SEFBOEg7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEdBQUcsZ0dBQWdHO0FBQ25HLEdBQUcsNkZBQTZGO0FBQ2hHLEdBQUcsNEZBQTRGO0FBQy9GLEdBQUcsbUdBQW1HO0FBQ3RHLEdBQUcsaUdBQWlHO0FBQ3BHLEdBQUcsMEZBQTBGO0FBQzdGLEdBQUcsbUdBQW1HO0FBQ3RHLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0RBQWEsRUFBRSwrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsY0FBYyx3Q0FBSztBQUNuQixnQkFBZ0IsK0NBQVk7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLGVBQWUsb0RBQWlCO0FBQ2hDO0FBQ0E7O0FBRUEsbUJBQW1CLG1EQUFnQjtBQUNuQztBQUNBOztBQUVBLG9CQUFvQixtREFBZ0I7QUFDcEM7QUFDQTs7QUFFQSxvQkFBb0IsNkNBQVU7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1RkFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0RBQVU7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSCxxQkFBcUIsZ0VBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsZUFBZSxvQkFBb0IsY0FBYyxpQkFBaUI7QUFDbEgsb0JBQW9CLDhCQUE4QjtBQUNsRCxzQkFBc0IsaUNBQWlDO0FBQ3ZELHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3Q0FBSztBQUNqQywrQkFBK0Isd0NBQUs7QUFDcEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5QztBQUN6QyxnQ0FBZ0M7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQSxvREFBb0QsY0FBYyxvQkFBb0IsY0FBYyxpQkFBaUI7QUFDckgsZ0JBQWdCLE9BQU87QUFDdkIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7V0NoU0Esb0QiLCJmaWxlIjoibWFpbi5hZTJmNzU3YmU3YzY2OTM5MzljZC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRocmVlR2xvYmUgZnJvbSBcInRocmVlLWdsb2JlXCI7XG5pbXBvcnQgeyBXZWJHTFJlbmRlcmVyLCBTY2VuZSB9IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHtcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIEFtYmllbnRMaWdodCxcbiAgRGlyZWN0aW9uYWxMaWdodCxcbiAgQ29sb3IsXG4gIEZvZyxcbiAgLy8gQXhlc0hlbHBlcixcbiAgLy8gRGlyZWN0aW9uYWxMaWdodEhlbHBlcixcbiAgLy8gQ2FtZXJhSGVscGVyLFxuICBQb2ludExpZ2h0LFxuICBTcGhlcmVHZW9tZXRyeSxcbn0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVHbG93TWVzaCB9IGZyb20gXCJ0aHJlZS1nbG93LW1lc2hcIjtcbmltcG9ydCBjb3VudHJpZXMgZnJvbSBcIi4vZmlsZXMvZ2xvYmUtZGF0YS1taW4uanNvblwiO1xuaW1wb3J0IHRyYXZlbEhpc3RvcnkgZnJvbSBcIi4vZmlsZXMvbXktZmxpZ2h0cy5qc29uXCI7XG5pbXBvcnQgYWlycG9ydEhpc3RvcnkgZnJvbSBcIi4vZmlsZXMvbXktYWlycG9ydHMuanNvblwiO1xudmFyIHJlbmRlcmVyLCBjYW1lcmEsIHNjZW5lLCBjb250cm9scztcbmxldCBtb3VzZVggPSAwO1xubGV0IG1vdXNlWSA9IDA7XG5sZXQgd2luZG93SGFsZlggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5sZXQgd2luZG93SGFsZlkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xudmFyIEdsb2JlO1xuXG4vLyBHbG9iZSByb3RhdGlvbiB2YXJpYWJsZXNcbmxldCByb3RhdGlvblRpbWUgPSAwO1xuY29uc3Qgcm90YXRpb25TcGVlZCA9IDAuMTsgLy8gRXZlbiBzbG93ZXIgcm90YXRpb25cbmNvbnN0IHJvdGF0aW9uUmFuZ2UgPSAwLjM7IC8vIEhvdyBmYXIgaXQgcm90YXRlcyAoaW4gcmFkaWFucylcbmNvbnN0IGluZGlhQmFzZVJvdGF0aW9uID0gLU1hdGguUEkgKiAoNSAvIDkpOyAvLyBCYXNlIHJvdGF0aW9uIHRvIHNob3cgSW5kaWFcblxuLy8gUHVsc2F0aW5nIGFuaW1hdGlvbiB2YXJpYWJsZXNcbmxldCBwdWxzYXRlVGltZSA9IDA7XG5jb25zdCBwdWxzYXRlU3BlZWQgPSAwLjAyO1xuXG4vLyBFbmhhbmNlZCBuZXR3b3JrIGNvbm5lY3Rpb25zIGRhdGEgd2l0aCBzdXBwbGllciBodWIgaW5mb3JtYXRpb25cbmNvbnN0IG5ldHdvcmtDb25uZWN0aW9ucyA9IFtcbiAgLy8gSW5kaWEgYXMgY2VudHJhbCBodWIgLSBjb25uZWN0aW5nIHRvIG1ham9yIGJ1eWVyIGNvdW50cmllc1xuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiA0MC43MTI4LCBlbmRMbmc6IC03NC4wMDYwLCBvcmRlcjogMCwgbmFtZTogXCJJbmRpYS1VU0FcIiwgdm9sdW1lOiBcIiQ0NTBNXCIgfSwgLy8gSW5kaWEgdG8gVVNBXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDUxLjUwNzQsIGVuZExuZzogLTAuMTI3OCwgb3JkZXI6IDEsIG5hbWU6IFwiSW5kaWEtVUtcIiwgdm9sdW1lOiBcIiQzMjBNXCIgfSwgLy8gSW5kaWEgdG8gVUtcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogMzUuNjc2MiwgZW5kTG5nOiAxMzkuNjUwMywgb3JkZXI6IDIsIG5hbWU6IFwiSW5kaWEtSmFwYW5cIiwgdm9sdW1lOiBcIiQyODBNXCIgfSwgLy8gSW5kaWEgdG8gSmFwYW5cbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogLTMzLjg2ODgsIGVuZExuZzogMTUxLjIwOTMsIG9yZGVyOiAzLCBuYW1lOiBcIkluZGlhLUF1c3RyYWxpYVwiLCB2b2x1bWU6IFwiJDE4ME1cIiB9LCAvLyBJbmRpYSB0byBBdXN0cmFsaWFcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogNTIuNTIwMCwgZW5kTG5nOiAxMy40MDUwLCBvcmRlcjogNCwgbmFtZTogXCJJbmRpYS1HZXJtYW55XCIsIHZvbHVtZTogXCIkMzkwTVwiIH0sIC8vIEluZGlhIHRvIEdlcm1hbnlcbiAgeyBzdGFydExhdDogMjguNjEzOSwgc3RhcnRMbmc6IDc3LjIwOTAsIGVuZExhdDogMS4zNTIxLCBlbmRMbmc6IDEwMy44MTk4LCBvcmRlcjogNSwgbmFtZTogXCJJbmRpYS1TaW5nYXBvcmVcIiwgdm9sdW1lOiBcIiQxNTBNXCIgfSwgLy8gSW5kaWEgdG8gU2luZ2Fwb3JlXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDI1LjIwNDgsIGVuZExuZzogNTUuMjcwOCwgb3JkZXI6IDYsIG5hbWU6IFwiSW5kaWEtVUFFXCIsIHZvbHVtZTogXCIkMjIwTVwiIH0sIC8vIEluZGlhIHRvIFVBRVxuICB7IHN0YXJ0TGF0OiAyOC42MTM5LCBzdGFydExuZzogNzcuMjA5MCwgZW5kTGF0OiA0My42NTMyLCBlbmRMbmc6IC03OS4zODMyLCBvcmRlcjogNywgbmFtZTogXCJJbmRpYS1DYW5hZGFcIiwgdm9sdW1lOiBcIiQxNjBNXCIgfSwgLy8gSW5kaWEgdG8gQ2FuYWRhXG4gIHsgc3RhcnRMYXQ6IDI4LjYxMzksIHN0YXJ0TG5nOiA3Ny4yMDkwLCBlbmRMYXQ6IDU1Ljc1NTgsIGVuZExuZzogMzcuNjE3Niwgb3JkZXI6IDgsIG5hbWU6IFwiSW5kaWEtUnVzc2lhXCIsIHZvbHVtZTogXCIkMTIwTVwiIH0sIC8vIEluZGlhIHRvIFJ1c3NpYVxuXG4gIC8vIFNlY29uZGFyeSBjb25uZWN0aW9ucyBiZXR3ZWVuIGJ1eWVyIGNvdW50cmllc1xuICB7IHN0YXJ0TGF0OiA0MC43MTI4LCBzdGFydExuZzogLTc0LjAwNjAsIGVuZExhdDogNTEuNTA3NCwgZW5kTG5nOiAtMC4xMjc4LCBvcmRlcjogOSwgbmFtZTogXCJVU0EtVUtcIiwgdm9sdW1lOiBcIiQ4ME1cIiB9LCAvLyBVU0EgdG8gVUtcbiAgeyBzdGFydExhdDogNTEuNTA3NCwgc3RhcnRMbmc6IC0wLjEyNzgsIGVuZExhdDogNTIuNTIwMCwgZW5kTG5nOiAxMy40MDUwLCBvcmRlcjogMTAsIG5hbWU6IFwiVUstR2VybWFueVwiLCB2b2x1bWU6IFwiJDYwTVwiIH0sIC8vIFVLIHRvIEdlcm1hbnlcbiAgeyBzdGFydExhdDogMzUuNjc2Miwgc3RhcnRMbmc6IDEzOS42NTAzLCBlbmRMYXQ6IDEuMzUyMSwgZW5kTG5nOiAxMDMuODE5OCwgb3JkZXI6IDExLCBuYW1lOiBcIkphcGFuLVNpbmdhcG9yZVwiLCB2b2x1bWU6IFwiJDQwTVwiIH0sIC8vIEphcGFuIHRvIFNpbmdhcG9yZVxuXS5tYXAoY29ubiA9PiAoe1xuICAuLi5jb25uLFxuICBhcmNBbHQ6IDAuMTUgKyBNYXRoLnJhbmRvbSgpICogMC4yNSwgLy8gUmFuZG9tIGFsdGl0dWRlIGJldHdlZW4gMC4xNS0wLjRcbiAgc3RhdHVzOiBNYXRoLnJhbmRvbSgpID4gMC4xNSwgLy8gODUlIGFjdGl2ZSBjb25uZWN0aW9uc1xuICBpc0luZGlhQ29ubmVjdGlvbjogY29ubi5zdGFydExhdCA9PT0gMjguNjEzOSB8fCBjb25uLmVuZExhdCA9PT0gMjguNjEzOVxufSkpO1xuXG4vLyBJbmRpYW4gbWFudWZhY3R1cmluZyBodWJzIGZvciBlbmhhbmNlZCB2aXN1YWxpemF0aW9uXG5jb25zdCBpbmRpYW5IdWJzID0gW1xuICB7IGxhdDogMTkuMDc2MCwgbG5nOiA3Mi44Nzc3LCBuYW1lOiBcIk11bWJhaVwiLCBpbmR1c3RyeTogXCJUZXh0aWxlcyAmIENoZW1pY2Fsc1wiLCBzdXBwbGllcnM6IDI1MDAgfSxcbiAgeyBsYXQ6IDI4LjcwNDEsIGxuZzogNzcuMTAyNSwgbmFtZTogXCJEZWxoaVwiLCBpbmR1c3RyeTogXCJFbGVjdHJvbmljcyAmIEF1dG9cIiwgc3VwcGxpZXJzOiAxODAwIH0sXG4gIHsgbGF0OiAxMy4wODI3LCBsbmc6IDgwLjI3MDcsIG5hbWU6IFwiQ2hlbm5haVwiLCBpbmR1c3RyeTogXCJBdXRvbW90aXZlICYgSVRcIiwgc3VwcGxpZXJzOiAxMjAwIH0sXG4gIHsgbGF0OiAxMi45NzE2LCBsbmc6IDc3LjU5NDYsIG5hbWU6IFwiQmFuZ2Fsb3JlXCIsIGluZHVzdHJ5OiBcIkVsZWN0cm9uaWNzICYgUGhhcm1hXCIsIHN1cHBsaWVyczogMTUwMCB9LFxuICB7IGxhdDogMTguNTIwNCwgbG5nOiA3My44NTY3LCBuYW1lOiBcIlB1bmVcIiwgaW5kdXN0cnk6IFwiQXV0b21vdGl2ZSAmIEVuZ2luZWVyaW5nXCIsIHN1cHBsaWVyczogOTAwIH0sXG4gIHsgbGF0OiAyMi41NzI2LCBsbmc6IDg4LjM2MzksIG5hbWU6IFwiS29sa2F0YVwiLCBpbmR1c3RyeTogXCJKdXRlICYgTGVhdGhlclwiLCBzdXBwbGllcnM6IDcwMCB9LFxuICB7IGxhdDogMjMuMDIyNSwgbG5nOiA3Mi41NzE0LCBuYW1lOiBcIkFobWVkYWJhZFwiLCBpbmR1c3RyeTogXCJUZXh0aWxlcyAmIENoZW1pY2Fsc1wiLCBzdXBwbGllcnM6IDExMDAgfSxcbiAgeyBsYXQ6IDE3LjM4NTAsIGxuZzogNzguNDg2NywgbmFtZTogXCJIeWRlcmFiYWRcIiwgaW5kdXN0cnk6IFwiUGhhcm1hY2V1dGljYWxzICYgSVRcIiwgc3VwcGxpZXJzOiA4MDAgfVxuXTtcblxuaW5pdCgpO1xuaW5pdEdsb2JlKCk7XG5vbldpbmRvd1Jlc2l6ZSgpO1xuYW5pbWF0ZSgpO1xuXG4vLyBTRUNUSU9OIEluaXRpYWxpemluZyBjb3JlIFRocmVlSlMgZWxlbWVudHNcbmZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIEluaXRpYWxpemUgcmVuZGVyZXJcbiAgcmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSwgYWxwaGE6IHRydWUgfSk7XG4gIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICByZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4MDAwMDAwLCAwKTtcbiAgLy8gcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2Rpbmc7XG5cbiAgLy8gU2V0IG11Y2ggbGFyZ2VyIGZpeGVkIHNpemUgZm9yIGJhY2tncm91bmQgZ2xvYmVcbiAgY29uc3QgZml4ZWRXaWR0aCA9IDE4MDA7XG4gIGNvbnN0IGZpeGVkSGVpZ2h0ID0gMTQwMDtcbiAgcmVuZGVyZXIuc2V0U2l6ZShmaXhlZFdpZHRoLCBmaXhlZEhlaWdodCk7XG5cbiAgY29uc3QgZ2xvYmVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2xvYmUtY29udGFpbmVyJyk7XG4gIGlmIChnbG9iZUNvbnRhaW5lcikge1xuICAgIGdsb2JlQ29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIHNjZW5lLCBsaWdodFxuICBzY2VuZSA9IG5ldyBTY2VuZSgpO1xuICBzY2VuZS5hZGQobmV3IEFtYmllbnRMaWdodCgweGJiYmJiYiwgMC4zKSk7XG4gIC8vIFJlbW92ZSBiYWNrZ3JvdW5kIGZvciB0cmFuc3BhcmVuY3lcbiAgLy8gc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBDb2xvcigweDA0MGQyMSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBjYW1lcmEsIGxpZ2h0XG4gIGNhbWVyYSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYSgpO1xuICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgdmFyIGRMaWdodCA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAwLjgpO1xuICBkTGlnaHQucG9zaXRpb24uc2V0KC04MDAsIDIwMDAsIDQwMCk7XG4gIGNhbWVyYS5hZGQoZExpZ2h0KTtcblxuICB2YXIgZExpZ2h0MSA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KDB4Nzk4MmY2LCAxKTtcbiAgZExpZ2h0MS5wb3NpdGlvbi5zZXQoLTIwMCwgNTAwLCAyMDApO1xuICBjYW1lcmEuYWRkKGRMaWdodDEpO1xuXG4gIHZhciBkTGlnaHQyID0gbmV3IFBvaW50TGlnaHQoMHg4NTY2Y2MsIDAuNSk7XG4gIGRMaWdodDIucG9zaXRpb24uc2V0KC0yMDAsIDUwMCwgMjAwKTtcbiAgY2FtZXJhLmFkZChkTGlnaHQyKTtcblxuICBjYW1lcmEucG9zaXRpb24ueiA9IDI1MDtcbiAgY2FtZXJhLnBvc2l0aW9uLnggPSAwO1xuICBjYW1lcmEucG9zaXRpb24ueSA9IDA7XG5cbiAgc2NlbmUuYWRkKGNhbWVyYSk7XG5cbiAgLy8gQWRkaXRpb25hbCBlZmZlY3RzIC0gcmVtb3ZlIGZvZyBmb3IgY2xlYW5lciBoZXJvIGxvb2tcbiAgLy8gc2NlbmUuZm9nID0gbmV3IEZvZygweDUzNWVmMywgNDAwLCAyMDAwKTtcblxuICAvLyBIZWxwZXJzXG4gIC8vIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgQXhlc0hlbHBlcig4MDApO1xuICAvLyBzY2VuZS5hZGQoYXhlc0hlbHBlcik7XG4gIC8vIHZhciBoZWxwZXIgPSBuZXcgRGlyZWN0aW9uYWxMaWdodEhlbHBlcihkTGlnaHQpO1xuICAvLyBzY2VuZS5hZGQoaGVscGVyKTtcbiAgLy8gdmFyIGhlbHBlckNhbWVyYSA9IG5ldyBDYW1lcmFIZWxwZXIoZExpZ2h0LnNoYWRvdy5jYW1lcmEpO1xuICAvLyBzY2VuZS5hZGQoaGVscGVyQ2FtZXJhKTtcblxuICAvLyBEaXNhYmxlIGNvbnRyb2xzIGZvciBub24tcmVzcG9uc2l2ZSBnbG9iZVxuICBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIGNvbnRyb2xzLmVuYWJsZWQgPSBmYWxzZTtcbiAgY29udHJvbHMuZW5hYmxlRGFtcGluZyA9IGZhbHNlO1xuICBjb250cm9scy5lbmFibGVQYW4gPSBmYWxzZTtcbiAgY29udHJvbHMuZW5hYmxlUm90YXRlID0gZmFsc2U7XG4gIGNvbnRyb2xzLmVuYWJsZVpvb20gPSBmYWxzZTtcbiAgY29udHJvbHMuYXV0b1JvdGF0ZSA9IGZhbHNlO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uV2luZG93UmVzaXplLCBmYWxzZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xufVxuXG4vLyBTRUNUSU9OIEdsb2JlXG5mdW5jdGlvbiBpbml0R2xvYmUoKSB7XG4gIC8vIEluaXRpYWxpemUgdGhlIEdsb2JlXG4gIEdsb2JlID0gbmV3IFRocmVlR2xvYmUoe1xuICAgIHdhaXRGb3JHbG9iZVJlYWR5OiB0cnVlLFxuICAgIGFuaW1hdGVJbjogdHJ1ZSxcbiAgfSlcbiAgICAuaGV4UG9seWdvbnNEYXRhKGNvdW50cmllcy5mZWF0dXJlcylcbiAgICAuaGV4UG9seWdvblJlc29sdXRpb24oMylcbiAgICAuaGV4UG9seWdvbk1hcmdpbigwLjcpXG4gICAgLnNob3dBdG1vc3BoZXJlKHRydWUpXG4gICAgLmF0bW9zcGhlcmVDb2xvcihcIiMzYTIyOGFcIilcbiAgICAuYXRtb3NwaGVyZUFsdGl0dWRlKDAuMjUpXG4gICAgLmhleFBvbHlnb25Db2xvcigoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBbXCJLR1pcIiwgXCJLT1JcIiwgXCJUSEFcIiwgXCJSVVNcIiwgXCJVWkJcIiwgXCJJRE5cIiwgXCJLQVpcIiwgXCJNWVNcIl0uaW5jbHVkZXMoXG4gICAgICAgICAgZS5wcm9wZXJ0aWVzLklTT19BM1xuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIFwicmdiYSgyNTUsMjU1LDI1NSwgMSlcIjtcbiAgICAgIH0gZWxzZSByZXR1cm4gXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjcpXCI7XG4gICAgfSk7XG5cbiAgLy8gTk9URSBBcmMgYW5pbWF0aW9ucyB3aXRoIG5ldHdvcmsgY29ubmVjdGlvbnMgYW5kIHRyYXZlbGluZyBwdWxzZXNcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgR2xvYmUuYXJjc0RhdGEobmV0d29ya0Nvbm5lY3Rpb25zKVxuICAgICAgLmFyY0NvbG9yKChlKSA9PiB7XG4gICAgICAgIHJldHVybiBlLnN0YXR1cyA/IFwiIzAwZmY4OFwiIDogXCIjZmY2YjM1XCI7IC8vIEdyZWVuIGZvciBhY3RpdmUsIG9yYW5nZSBmb3IgaW5hY3RpdmVcbiAgICAgIH0pXG4gICAgICAuYXJjQWx0aXR1ZGUoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUuYXJjQWx0O1xuICAgICAgfSlcbiAgICAgIC5hcmNTdHJva2UoKGUpID0+IHtcbiAgICAgICAgY29uc3QgYmFzZVB1bHNlID0gTWF0aC5zaW4ocHVsc2F0ZVRpbWUgKyBlLm9yZGVyICogMC41KSAqIDAuNCArIDAuNjsgLy8gSW5kaXZpZHVhbCBwdWxzZSB0aW1pbmdcbiAgICAgICAgcmV0dXJuIGUuc3RhdHVzID8gMC44ICogYmFzZVB1bHNlIDogMC40ICogYmFzZVB1bHNlO1xuICAgICAgfSlcbiAgICAgIC5hcmNEYXNoTGVuZ3RoKDAuMykgLy8gU2hvcnRlciBkYXNoZXMgZm9yIHB1bHNlIGVmZmVjdFxuICAgICAgLmFyY0Rhc2hHYXAoMC4xKSAvLyBTbWFsbGVyIGdhcHNcbiAgICAgIC5hcmNEYXNoQW5pbWF0ZVRpbWUoMzAwMCkgLy8gU2xvd2VyIHB1bHNlIHRyYXZlbFxuICAgICAgLmFyY3NUcmFuc2l0aW9uRHVyYXRpb24oMjAwMClcbiAgICAgIC5hcmNEYXNoSW5pdGlhbEdhcCgoZSkgPT4gZS5vcmRlciAqIDAuMikgLy8gU3RhZ2dlcmVkIHB1bHNlIHN0YXJ0c1xuICAgICAgLnBvaW50c0RhdGEoaW5kaWFuSHVicylcbiAgICAgIC5wb2ludENvbG9yKChkKSA9PiB7XG4gICAgICAgIC8vIENvbG9yIGNvZGUgYnkgaW5kdXN0cnlcbiAgICAgICAgaWYgKGQuaW5kdXN0cnkgJiYgZC5pbmR1c3RyeS5pbmNsdWRlcygnVGV4dGlsZXMnKSkgcmV0dXJuICcjZmY2YjZiJztcbiAgICAgICAgaWYgKGQuaW5kdXN0cnkgJiYgZC5pbmR1c3RyeS5pbmNsdWRlcygnRWxlY3Ryb25pY3MnKSkgcmV0dXJuICcjNGVjZGM0JztcbiAgICAgICAgaWYgKGQuaW5kdXN0cnkgJiYgZC5pbmR1c3RyeS5pbmNsdWRlcygnQXV0b21vdGl2ZScpKSByZXR1cm4gJyM0NWI3ZDEnO1xuICAgICAgICBpZiAoZC5pbmR1c3RyeSAmJiBkLmluZHVzdHJ5LmluY2x1ZGVzKCdQaGFybWFjZXV0aWNhbHMnKSkgcmV0dXJuICcjOTZjZWI0JztcbiAgICAgICAgaWYgKGQuaW5kdXN0cnkgJiYgZC5pbmR1c3RyeS5pbmNsdWRlcygnQ2hlbWljYWxzJykpIHJldHVybiAnI2ZmZWFhNyc7XG4gICAgICAgIHJldHVybiAnI2RkYTBkZCc7XG4gICAgICB9KVxuICAgICAgLnBvaW50c01lcmdlKGZhbHNlKVxuICAgICAgLnBvaW50QWx0aXR1ZGUoMC4wNSlcbiAgICAgIC5wb2ludFJhZGl1cygoZCkgPT4gTWF0aC5tYXgoMC4wMiwgKGQuc3VwcGxpZXJzIHx8IDEwMDApIC8gNTAwMDApKSAvLyBTaXplIGJhc2VkIG9uIHN1cHBsaWVyIGNvdW50XG4gICAgICAucG9pbnRMYWJlbCgoZCkgPT4gYFxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjgpOyBwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiAxMnB4O1wiPlxuICAgICAgICAgIDxzdHJvbmc+JHtkLm5hbWUgfHwgJ01hbnVmYWN0dXJpbmcgSHViJ308L3N0cm9uZz48YnIvPlxuICAgICAgICAgIEluZHVzdHJ5OiAke2QuaW5kdXN0cnkgfHwgJ01peGVkIEluZHVzdHJpZXMnfTxici8+XG4gICAgICAgICAgU3VwcGxpZXJzOiAkeyhkLnN1cHBsaWVycyB8fCAxMDAwKS50b0xvY2FsZVN0cmluZygpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIGApO1xuICB9LCAxMDAwKTtcblxuICAvLyBTZXQgaW5pdGlhbCByb3RhdGlvbiB0byBzaG93IEluZGlhIChaIHJvdGF0aW9uIGZvciB0aWx0KVxuICBHbG9iZS5yb3RhdGlvbi55ID0gaW5kaWFCYXNlUm90YXRpb247XG4gIEdsb2JlLnJvdGF0ZVooLU1hdGguUEkgLyA2KTtcbiAgY29uc3QgZ2xvYmVNYXRlcmlhbCA9IEdsb2JlLmdsb2JlTWF0ZXJpYWwoKTtcbiAgZ2xvYmVNYXRlcmlhbC5jb2xvciA9IG5ldyBDb2xvcigweDNhMjI4YSk7XG4gIGdsb2JlTWF0ZXJpYWwuZW1pc3NpdmUgPSBuZXcgQ29sb3IoMHgyMjAwMzgpO1xuICBnbG9iZU1hdGVyaWFsLmVtaXNzaXZlSW50ZW5zaXR5ID0gMC4xO1xuICBnbG9iZU1hdGVyaWFsLnNoaW5pbmVzcyA9IDAuNztcblxuICAvLyBOT1RFIENvb2wgc3R1ZmZcbiAgLy8gZ2xvYmVNYXRlcmlhbC53aXJlZnJhbWUgPSB0cnVlO1xuXG4gIHNjZW5lLmFkZChHbG9iZSk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gIC8vIERpc2FibGUgbW91c2UgbW92ZW1lbnQgZWZmZWN0cyBmb3Igbm9uLXJlc3BvbnNpdmUgZ2xvYmVcbiAgLy8gbW91c2VYID0gZXZlbnQuY2xpZW50WCAtIHdpbmRvd0hhbGZYO1xuICAvLyBtb3VzZVkgPSBldmVudC5jbGllbnRZIC0gd2luZG93SGFsZlk7XG59XG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuICAvLyBLZWVwIGdsb2JlIGF0IG11Y2ggbGFyZ2VyIGZpeGVkIHNpemUsIGRvbid0IG1ha2UgaXQgcmVzcG9uc2l2ZVxuICBjb25zdCBmaXhlZFdpZHRoID0gMTgwMDtcbiAgY29uc3QgZml4ZWRIZWlnaHQgPSAxNDAwO1xuXG4gIGNhbWVyYS5hc3BlY3QgPSBmaXhlZFdpZHRoIC8gZml4ZWRIZWlnaHQ7XG4gIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIHJlbmRlcmVyLnNldFNpemUoZml4ZWRXaWR0aCwgZml4ZWRIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICAvLyBSZW1vdmUgbW91c2UtYmFzZWQgY2FtZXJhIG1vdmVtZW50IGZvciBub24tcmVzcG9uc2l2ZSBnbG9iZVxuICAvLyBLZWVwIGNhbWVyYSBpbiBmaXhlZCBwb3NpdGlvblxuXG4gIC8vIEN1c3RvbSBvc2NpbGxhdGluZyByb3RhdGlvbiBhcm91bmQgSW5kaWFcbiAgaWYgKEdsb2JlKSB7XG4gICAgcm90YXRpb25UaW1lICs9IHJvdGF0aW9uU3BlZWQgKiAwLjAxOyAvLyBWZXJ5IHNsb3cgaW5jcmVtZW50XG4gICAgcHVsc2F0ZVRpbWUgKz0gcHVsc2F0ZVNwZWVkOyAvLyBQdWxzYXRpbmcgaW5jcmVtZW50XG4gICAgY29uc3Qgb3NjaWxsYXRpb24gPSBNYXRoLnNpbihyb3RhdGlvblRpbWUpICogcm90YXRpb25SYW5nZTtcbiAgICBHbG9iZS5yb3RhdGlvbi55ID0gaW5kaWFCYXNlUm90YXRpb24gKyBvc2NpbGxhdGlvbjtcblxuICAgIC8vIFVwZGF0ZSBhcmMgc3Ryb2tlcyBmb3IgdHJhdmVsaW5nIHB1bHNlIGVmZmVjdFxuICAgIEdsb2JlLmFyY1N0cm9rZSgoZSkgPT4ge1xuICAgICAgY29uc3QgaW5kaXZpZHVhbFB1bHNlID0gTWF0aC5zaW4ocHVsc2F0ZVRpbWUgKyBlLm9yZGVyICogMC41KSAqIDAuNCArIDAuNjtcbiAgICAgIHJldHVybiBlLnN0YXR1cyA/IDAuOCAqIGluZGl2aWR1YWxQdWxzZSA6IDAuNCAqIGluZGl2aWR1YWxQdWxzZTtcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSBkYXNoIGFuaW1hdGlvbiBmb3IgdHJhdmVsaW5nIHB1bHNlcyB3aXRoIGVuaGFuY2VkIGVmZmVjdHNcbiAgICBHbG9iZS5hcmNEYXNoSW5pdGlhbEdhcCgoZSkgPT4ge1xuICAgICAgY29uc3Qgc3BlZWQgPSBlLmlzSW5kaWFDb25uZWN0aW9uID8gMC4xNSA6IDAuMDg7IC8vIEZhc3RlciBmb3IgSW5kaWEgY29ubmVjdGlvbnNcbiAgICAgIGNvbnN0IHRyYXZlbGluZ1B1bHNlID0gKHB1bHNhdGVUaW1lICogc3BlZWQgKyBlLm9yZGVyICogMC4yKSAlIDE7XG4gICAgICByZXR1cm4gdHJhdmVsaW5nUHVsc2U7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgYXJjIGxhYmVscyBmb3IgbWFqb3IgY29ubmVjdGlvbnMgKHNpbXBsaWZpZWQgdG8gYXZvaWQgZXJyb3JzKVxuICAgIGlmIChHbG9iZS5hcmNMYWJlbCkge1xuICAgICAgR2xvYmUuYXJjTGFiZWwoKGQpID0+IHtcbiAgICAgICAgaWYgKGQuaXNJbmRpYUNvbm5lY3Rpb24gJiYgZC5uYW1lICYmIE1hdGgucmFuZG9tKCkgPiAwLjgpIHsgLy8gU2hvdyBsYWJlbHMgb2NjYXNpb25hbGx5XG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNyk7IHBhZGRpbmc6IDVweDsgYm9yZGVyLXJhZGl1czogM3B4OyBjb2xvcjogd2hpdGU7IGZvbnQtc2l6ZTogMTBweDtcIj5cbiAgICAgICAgICAgICAgJHtkLm5hbWV9PGJyLz5cbiAgICAgICAgICAgICAgJHtkLnZvbHVtZSA/ICdWb2x1bWU6ICcgKyBkLnZvbHVtZSA6ICcnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjYW1lcmEubG9va0F0KHNjZW5lLnBvc2l0aW9uKTtcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gXCI0MWJiYWM2MDc0ZjRiNjMyZGEyNlwiIl0sInNvdXJjZVJvb3QiOiIifQ==