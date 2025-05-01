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
  The `increaseTemp` and `decreaseTemp` methods were being assigned to variables rather than called, and they were never invoked.  Instead of executing the method, it was assigned to a variable (e.g., `const increaseRoomTemperature = room.increaseTemp;`), which does nothing because `increaseTemp()` has no return value and relies on side effects.

- **How I Found It:**  
  The temperature remained static on button clicks. Logging room.currTemp confirmed no change. Upon inspection, I realized the methods were assigned but not invoked.
- **Fix Implemented:**  
  Replaced the assignment with a direct method call.

  **Original Code:**
  ```js
  const increaseRoomTemperature = room.increaseTemp;
  ```

  **Fixed Code:**
  ```js
  if (room.currTemp < 32) {
    room.increaseTemp();
  }else if (room.currTemp > 32) {
    room.currTemp = 32;
  }
  ```

---

## ✅ Bug 3: Incorrect Error Message Handling for Preset Temperature Ranges

- **File/Section:** `save` button click handler (Cool/Warm input validation)
- **Lines:** Where if (coolInput.value && warmInput.value) is checked and error message logic is handled
- **Type:** Logic/Validation Bug 
- **Bug Description:**  
  The input validation for cool and warm preset temperatures was incorrect:
  - It displayed a generic message instead of context-specific feedback.
  - It didn’t properly restrict warm presets from going below 25 or cool presets from going above 24.

- **How I Found It:**  
  Testing edge cases like:
  - Setting `Cool to 30°`
  - Setting `Warm to 15°` revealed that either:

  No error message was shown, or the message was vague or inconsistent.

- **Fix Implemented:**  
  Additionally, added logic to reset the error message (`errorSpan.innerText = ""` and `style.display = "none"`) before re-validating new input values. This ensures errors disappear when the user fixes their input.

  **Original Code:**
  ```js
   if (coolInput.value < 10 || coolInput.value > 25) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
    }

    if (warmInput.value < 25 || warmInput.value > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
    }
  ```

  **Fixed Code:**
  ```js
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
  ```

---
## ✅ Bug 4: Swapped Overlay Gradient Colors
- **File/Section:** Overlay background definitions for warm and cool modes
- **Lines:** Where `warmOverlay` and `coolOverlay` gradient variables are defined
- **Type:** Visual/UI Bug
- **Bug Description:**  
  The overlay colors for warm and cool modes were mistakenly reversed. This resulted in an incorrect visual feedback for the selected temperature mode.

  - The `warmOverlay` was assigned the blue-toned gradient meant for cool mode.
  - The `coolOverlay` was assigned the red-toned gradient meant for warm mode.

- **How I Found It:**  
  Manually switching between warm and cool presets showed blue overlays for warm mode and red overlays for cool mode, which clearly contradicted expected UI behavior. I referenced the code after and identified the mismatch in values.

- **Fix**  
  Swapped the gradient values so warmOverlay now has the red color and coolOverlay has the blue color as expected.

  **Fixed Code:**
  ```js
  const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

  const coolOverlay = `linear-gradient(to bottom, rgba(141, 158, 247, 0.2), rgba(194, 197, 215, 0.1))`;
  ```

---
## ✅ Bug 5: Incorrect Ternary Condition for Room Status Message
- **File/Section:** Dynamic Room Status Display
- **Lines:** Inline ternary inside .innerHTML for .room-status message
- **Type:** Logical Error
- **Bug Description:**  
  The ternary operator used to determine whether the message should say `Warming room to:` or `Cooling room to:` had its conditions swapped. As a result, the UI displayed "Cooling" when the temperature was high, and "Warming" when it was low; the opposite of what users expect.

- **How I Found It:**  
  While testing, I observed that high temperatures triggered a "Cooling" message, but the message was showing "Warming", and vice versa. I traced it back to the ternary logic in the message rendering.

- **Fix**  
  Swapped the values in the ternary operator so that the message now matches the actual room condition.

  **Fixed Code:**
  ```js
  ${room.currTemp > 24 ? "Warming room to: " : "Cooling room to: "}
  ```

---

