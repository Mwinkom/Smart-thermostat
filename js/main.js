// Room objects
const rooms = [
  new Room("Living Room", 32, 20, 32, "./assets/living-room.jpg", '16:30', '20:00'),
  new Room("Kitchen", 29, 20, 32, "./assets/kitchen.jpg", '16:30', '20:00'),
  new Room("Bathroom", 30, 20, 32, "./assets/bathroom.jpg", '16:30', '20:00'),
  new Room("Bedroom", 31, 20, 32, "./assets/bedroom.jpg", '16:30', '20:00'),
];

const warmOverlay= `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;
const coolOverlay = `linear-gradient(to bottom,rgba(141, 158, 247, 0.2),rgba(194, 197, 215, 0.1))`;
// const warmOverlay= `linear-gradient(to bottom,rgba(141, 158, 247, 0.2),rgba(194, 197, 215, 0.1))`;
// const coolOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;
//Bug Fix 4: The overlay colors were swapped. The warm overlay was set to the cool overlay and vice versa.

const setInitialOverlay = () => {
  document.querySelector(
    ".room"
  ).style.backgroundImage = `url('${rooms[0].image}')`;

  document.querySelector(".room").style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${rooms[0].image}')`;
};

const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};

// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;
const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

let selectedRoom = rooms[0].name;

// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

setInitialOverlay();

document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array
rooms.forEach((room) => {
  const option = document.createElement("option");
  option.value = room.name; // Bug Fix 1: Set the value of the option to the room name instead of the room object
  // option.value = room;
  option.textContent = room.name;
  roomSelect.appendChild(option);
});

// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;

  setSelectedRoom(selectedRoom);
});


// Set preset temperatures
const defaultSettings = document.querySelector(".default-settings");
// Event Delegation for Cool and Warm Buttons
defaultSettings.addEventListener("click", (e) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  if (!room) return;

  // Check which button was clicked
  if (e.target.closest("#cool")) {
    // Apply cool preset
    room.setCurrTemp(room.coldPreset);
    setOverlay(room);
  } else if (e.target.closest("#warm")) {
    // Apply warm preset
    room.setCurrTemp(room.warmPreset);
    setOverlay(room);
  } else {
    return; // Ignore clicks outside the buttons
  }

  // Common UI update after preset
  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;
  generateRooms();

  // Update mini card
  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});


// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  //const increaseRoomTemperature = room.increaseTemp;
  //Bug Fix 3: the increase temperature method was not being called correctly and it was assigned to a variable when there is no return value
  
  //Temperature should not increase past 32 degrees
  if (room.currTemp < 32) {
    room.increaseTemp();
  }else if (room.currTemp > 32) {
    room.currTemp = 32;
  }

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  //const decreaseRoomTemperature = room.decreaseTemp;
  //Bug Fix 3: the decrease temperature method was not being called correctly and it was assigned to a variable when there is no return value

  //Temperature should not decrease past 10 degrees
  if (room.currTemp > 10) {
    room.decreaseTemp();
  } else if (room.currTemp < 10) {
    room.currTemp = 10;
  }

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");


const inputsDiv = document.querySelector(".inputs");
// Toggle preset inputs
document.getElementById("newPreset").addEventListener("click", () => {
  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  }

  if (schedulePreset.classList.contains("hidden")) {
    schedulePreset.classList.remove("hidden");
  }
});

const schedulePreset = document.getElementById("schedule-preset");


// close inputs
document.getElementById("close").addEventListener("click", () => {
  inputsDiv.classList.add("hidden");
});

//close set schedule
document.getElementById("close-schedule").addEventListener("click", () => {
  schedulePreset.classList.add("hidden");
});

// handle preset input data
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");

  //if (coolInput.value && warmInput.value) {
    //Validate the data
    // if (coolInput.value < 10 || coolInput.value > 25) {
    //   errorSpan.style.display = "block";
    //   errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
    // }

    // if (warmInput.value < 25 || warmInput.value > 32) {
    //   errorSpan.style.display = "block";
    //   errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
    // }
    
    const coolValue = parseInt(coolInput.value);
    const warmValue = parseInt(warmInput.value);
  
    // Clear any previous error
    errorSpan.style.display = "none";
    errorSpan.innerText = "";
  
    // Validate inputs one at a time
    if (isNaN(coolValue) || coolValue < 10 || coolValue > 24) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid cool temperature (10° - 24°)";
      return; 
    }
  
    if (isNaN(warmValue) || warmValue < 25 || warmValue > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid warm temperature (25° - 32°)";
      return;
    }
    
    // Validation passed
    // Set current room's presets
    const currRoom = rooms.find((room) => room.name === selectedRoom);

    currRoom.setColdPreset(coolInput.value);
    currRoom.setWarmPreset(warmInput.value);

    coolInput.value = "";
    warmInput.value = "";
  
    // Give feedback or close config section if needed
    errorSpan.style.display = "none";
    errorSpan.innerText = "";
  });  

  //Bug Fix 4: The error message was vague and not specific to the input that was invalid. Error messages did not clear when the user entered valid data. 
  

// Toggle all ACs
document.getElementById("toggle-all-ac").addEventListener("click", () => {
  const turningOn = !rooms.every(room => room.airConditionerOn);
  rooms.forEach(room => {
    room.airConditionerOn = turningOn;
  });

  // Update label
  const label = document.getElementById("ac-toggle-label");
  label.textContent = turningOn ? "Turn Off All ACs" : "Turn On All ACs";

  generateRooms();
});

//Set schedule
document.getElementById("set-schedule").addEventListener("click", () => {
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;

  if (!startTime || !endTime) {
    alert("Please select both start and end times.");
    return;
  }

  const room = rooms.find((room) => room.name === selectedRoom);
  room.startTime = startTime;
  room.endTime = endTime;

  alert(`Schedule set for ${room.name}: ${startTime} - ${endTime}`);

  document.getElementById("start-time").value = "";
  document.getElementById("end-time").value = "";
});

// Automatic AC control based on schedule
setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // Format as HH:MM

  rooms.forEach((room) => {
    if (!room.startTime || !room.endTime) return;

    // Turn AC on at start time
    if (room.startTime === currentTime && !room.airConditionerOn) {
      room.airConditionerOn = true;
      console.log(`AC turned ON for ${room.name}`);
    }

    // Turn AC off at end time
    if (room.endTime === currentTime && room.airConditionerOn) {
      room.airConditionerOn = false;
      console.log(`AC turned OFF for ${room.name}`);
    }
  });

  generateRooms(); 
}, 1000);

document.getElementById("close-room-modal").addEventListener("click", () => {
  document.getElementById("room-modal").classList.add("hidden");
  clearRoomForm();
});

//Dropdown for adding new room
function generateDropdownOptions() {
  roomSelect.innerHTML = "";

  // Add new options from rooms array
  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.name; // Bug Fix 1: Set the value of the option to the room name instead of the room object
    // option.value = room;
    option.textContent = room.name;
    roomSelect.appendChild(option);
  });

  // Add "+ Add Room" as the last option
  const addOption = document.createElement("option");
  addOption.value = "__addRoom__";
  addOption.textContent = "+ Add Room";
  addOption.style.color = "#4458c3";
  roomSelect.appendChild(addOption);
}

generateDropdownOptions();

// Add new room
document.getElementById("save-room").addEventListener("click", () => {
  const name = document.getElementById("room-name").value.trim();
  const temp = parseInt(document.getElementById("room-temp").value);
  const cold = parseInt(document.getElementById("cold-preset").value);
  const warm = parseInt(document.getElementById("warm-preset").value);
  const imageInput = document.getElementById("room-image");
  const errorBox = document.querySelector(".room-error");

  errorBox.textContent = "";

  if (!name || isNaN(temp) || isNaN(cold) || isNaN(warm)) {
    errorBox.textContent = "Please fill out all fields.";
    return;
  }

  if (cold < 10 || cold > 24 || warm < 25 || warm > 32 || temp < 10 || temp > 32) {
    errorBox.textContent = "Enter valid temperature ranges.";
    return;
  }

  if (rooms.some(r => r.name.toLowerCase() === name.toLowerCase())) {
    errorBox.textContent = "Room already exists.";
    return;
  }

  let imageUrl = "./assets/default.jpg";
  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageUrl = e.target.result;
      addRoom(name, temp, cold, warm, imageUrl);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    addRoom(name, temp, cold, warm, imageUrl);
  }
});

function addRoom(name, temp, cold, warm, imageUrl) {
  rooms.push({
    name,
    currTemp: temp,
    coldPreset: cold,
    warmPreset: warm,
    image: imageUrl,
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',
    setCurrTemp(temp) { this.currTemp = temp; },
    setColdPreset(val) { this.coldPreset = parseInt(val); },
    setWarmPreset(val) { this.warmPreset = parseInt(val); },
    decreaseTemp() { this.currTemp--; },
    increaseTemp() { this.currTemp++; },
    toggleAircon() {
      this.airConditionerOn = !this.airConditionerOn;
    },
  });

  generateRooms();
  updateRoomDropdown();
  document.getElementById("room-modal").classList.add("hidden");
  clearRoomForm();
};

// Update the room dropdown with the new room
function updateRoomDropdown() {
  generateDropdownOptions();
}

// Clear the room form
function clearRoomForm() {
  document.getElementById("room-name").value = "";
  document.getElementById("room-temp").value = "";
  document.getElementById("cold-preset").value = "";
  document.getElementById("warm-preset").value = "";
  document.getElementById("room-image").value = "";
  document.querySelector(".room-error").textContent = "";
}

// Event listener for room selection
roomSelect.addEventListener("change", function () {
  if (this.value === "__addRoom__") {
    document.getElementById("room-modal").classList.remove("hidden");
    this.selectedIndex = 0; 
    return;
  }

  selectedRoom = this.value;
  setSelectedRoom(selectedRoom);
});


// Rooms Control
// Generate rooms
const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch">
              <ion-icon name="power-outline" class="${
                room.airConditionerOn ? "powerOn" : ""
              }"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
          // }">${room.currTemp > 24 ? "Cooling room to: " : "Warming room to: "}${
          }">${room.currTemp > 24 ? "Warming room to: " : "Cooling room to: "}${
          //Bug Fix 5: The values in the ternary operator were swapped. The cooling and warming messages were not being displayed correctly.
      room.currTemp
    }°</span>
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;
};
const displayTime = (room) => {
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `
}

generateRooms();

document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.toggleAircon();
    generateRooms();
  }

  if (e.target.classList.contains("room-name")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
  }
});
