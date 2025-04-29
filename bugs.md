# 🐛 Bug Report & Fix Log – Smart Thermostat Project

This document outlines bugs identified and fixed during the development of the Smart Thermostat application.

---

## ✅ Bug 1: Selected Room Option Not Displaying the Right Image

- **File/Section:** Room Dropdown Setup
- **Lines:** Where option.value = room; was used
- **Type:** Logical Error
- **Bug Description:**  
  The room dropdown options were not working correctly because the value attribute was set to the entire room object instead of a string. This caused matching logic like `room.name === selectedRoom` to fail.

- **How I Found It:**  
  Console logging roomSelect.value revealed [object Object] instead of the actual room name.

- **Fix Implemented:**  

  **Original Code:**
  ```js
  option.value = room;
  ```

  **Fixed Code:**
  ```js
  option.value = room.name;
  ```

---

## ✅ Bug 2: Temperature increment and decrement buttons not working

- **File/Section:** Temperature increase and decrease button event listeners
- **Lines:** Inside #increase and #reduce click handlers
- **Type:** Function Invocation Bug 
- **Bug Description:**  
  The `increaseTemp` and `decreaseTemp` methods were being assigned to variables rather than called, and they were never invoked.

- **How I Found It:**  
  The temperature remained static on button clicks. Logging room.currTemp confirmed no change.
- **Fix Implemented:**  

  **Original Code:**
  ```js
  const increaseRoomTemperature = room.increaseTemp;
  ```

  **Fixed Code:**
  ```js
  room.increaseTemp();
  ```

---

> Repeat the format above for each additional bug.