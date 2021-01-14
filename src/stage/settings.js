// Coffin Dimensions
module.exports.dimension = {x: 80, y: 50, z: 200}

// Street of Coffins
module.exports.street = {
  left: -200,
  right: 200
}

// Padding between Coffins
module.exports.padding = {y: 0, z: -50};

// Camera walking default
module.exports.cameraMoving = {x: 0, y: 150}

// Effect Controller
module.exports.effectControllerDefault = {
  focus: 500.0,
  aperture: 0,
  maxblur: 0.01
};

// Position of Stapel at the end
module.exports.stapelPos = {x: -1000, y: 0, z: -3000};

// Some Helper functions
module.exports.zByDay = day => (module.exports.dimension.z  + module.exports.padding.z) * -(day) + 2 * module.exports.dimension.z;
module.exports.DayByZ = z => (z - 2 * module.exports.dimension.z) / (module.exports.dimension.z  + module.exports.padding.z) * -1;