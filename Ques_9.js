// Device Constructor
function Device(name, type) {
  this.name = name;
  this.type = type;
  this.status = "off";
}

Device.prototype.turnOn = function () {
  this.status = "on";
  console.log(`${this.name} is now ON.`);
};

Device.prototype.turnOff = function () {
  this.status = "off";
  console.log(`${this.name} is now OFF.`);
};

Device.prototype.getStatus = function () {
  console.log(`${this.name} is currently ${this.status}.`);
};

// SmartDevice Constructor (inherits from Device)
function SmartDevice(name, type, brand, connectivity) {
  Device.call(this, name, type);
  this.brand = brand;
  this.connectivity = connectivity;
}

SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

// Check Connectivity
SmartDevice.prototype.checkConnectivity = function () {
  console.log(`${this.name} is connected via ${this.connectivity}.`);
};

// Firmware Update (Simulated Async Fetch)
SmartDevice.prototype.updateFirmware = async function () {
  console.log(`Checking for firmware updates for ${this.name}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Firmware updated successfully for ${this.name}.`);
      resolve();
    }, 2000);
  });
};

// SmartLight Constructor (inherits from SmartDevice)
function SmartLight(name, brand, connectivity, brightness, color) {
  SmartDevice.call(this, name, "SmartLight", brand, connectivity);
  this.brightness = brightness;
  this.color = color;
}

SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

SmartLight.prototype.setBrightness = function (level) {
  this.brightness = level;
  console.log(`${this.name} brightness set to ${level}%.`);
};

SmartLight.prototype.setColor = function (color) {
  this.color = color;
  console.log(`${this.name} color changed to ${color}.`);
};

// SmartThermostat Constructor (inherits from SmartDevice)
function SmartThermostat(name, brand, connectivity, temperature, mode) {
  SmartDevice.call(this, name, "SmartThermostat", brand, connectivity);
  this.temperature = temperature;
  this.mode = mode;
}

SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

SmartThermostat.prototype.setTemperature = function (temp) {
  this.temperature = temp;
  console.log(`${this.name} temperature set to ${temp}°C.`);
};

SmartThermostat.prototype.setMode = function (mode) {
  this.mode = mode;
  console.log(`${this.name} mode changed to ${mode}.`);
};

// SmartHome Constructor
function SmartHome(owner) {
  this.owner = owner;
  this.devices = [];
}

SmartHome.prototype.addDevice = function (device) {
  this.devices.push(device);
  console.log(`${device.name} added to ${this.owner}'s smart home.`);
};

SmartHome.prototype.removeDevice = function (deviceName) {
  this.devices = this.devices.filter((device) => device.name !== deviceName);
  console.log(`${deviceName} removed from ${this.owner}'s smart home.`);
};

SmartHome.prototype.listDevices = function () {
  console.log(`Devices in ${this.owner}'s smart home:`);
  this.devices.forEach((device) => console.log(`- ${device.name} (${device.type})`));
};

// User Constructor
function User(username, password) {
  this.username = username;
  this.password = password;
  this.smartHome = new SmartHome(username);
}

// Simulated User Authentication (Async)
User.prototype.authenticate = async function () {
  console.log(`Authenticating user: ${this.username}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${this.username} authenticated successfully.`);
      resolve();
    }, 1500);
  });
};

// User adds/removes devices
User.prototype.addDeviceToHome = function (device) {
  this.smartHome.addDevice(device);
};

User.prototype.removeDeviceFromHome = function (deviceName) {
  this.smartHome.removeDevice(deviceName);
};

// Demonstration
(async function () {
  // Create Users
  const user1 = new User("Alice", "password123");

  // Authenticate User
  await user1.authenticate();

  // Create Smart Devices
  const light1 = new SmartLight("Living Room Light", "Philips", "WiFi", 75, "Warm White");
  const thermostat1 = new SmartThermostat("Home Thermostat", "Nest", "WiFi", 22, "Cool");

  // Add Devices to User's Smart Home
  user1.addDeviceToHome(light1);
  user1.addDeviceToHome(thermostat1);

  // List Devices
  user1.smartHome.listDevices();

  // Device Operations
  light1.turnOn();
  light1.setBrightness(50);
  light1.setColor("Blue");

  thermostat1.setTemperature(24);
  thermostat1.setMode("Heat");

  // Check Connectivity
  light1.checkConnectivity();
  thermostat1.checkConnectivity();

  // Firmware Update
  await light1.updateFirmware();

  // Remove Device
  user1.removeDeviceFromHome("Living Room Light");

  // List Devices Again
  user1.smartHome.listDevices();
})();
