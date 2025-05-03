class Room {
    constructor(name, currTemp, coldPreset, warmPreset, image, startTime, endTime) {
        this.name = name;
        this.currTemp = currTemp;
        this.coldPreset = coldPreset;
        this.warmPreset = warmPreset;
        this.image = image;
        this.airConditionerOn = false;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    setCurrTemp(temp) {
        this.currTemp = temp;
    }

    setColdPreset(newCold) {
        this.coldPreset = newCold;
    }

    setWarmPreset(newWarm) {
        this.warmPreset = newWarm;
    }

    increaseTemp() {
        this.currTemp++;
    }

    decreaseTemp() {
        this.currTemp--;
    }

    toggleAircon() {
        this.airConditionerOn = !this.airConditionerOn;
    }
  }

module.exports = Room;