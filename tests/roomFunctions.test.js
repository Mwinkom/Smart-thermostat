//Tests for roomFunctions.js
const Room = require('../js/roomFunctions');

describe('Room class behaviour and method functionality', () => {
    let room;

    beforeEach(() => {
        room = new Room('Living Room', 22, 18, 26, 'livingroom.jpg', '08:00', '22:00');
    });

    test('Should initialize properties correctly', () => {
        expect(room.name).toBe('Living Room');
        expect(room.currTemp).toBe(22);
        expect(room.coldPreset).toBe(18);
        expect(room.warmPreset).toBe(26);
        expect(room.image).toBe('livingroom.jpg');
        expect(room.airConditionerOn).toBe(false);
        expect(room.startTime).toBe('08:00');
        expect(room.endTime).toBe('22:00');
    });

    test('setCurrTemp updates temperature', () => {
        room.setCurrTemp(25);
        expect(room.currTemp).toBe(25);
    });

    test('setColdPreset updates cold preset', () => {
        room.setColdPreset(17);
        expect(room.coldPreset).toBe(17);
    });

    test('setWarmPreset updates warm preset', () => {
        room.setWarmPreset(28);
        expect(room.warmPreset).toBe(28);
    });

    test('increaseTemp increases current temperature by 1', () => {
        room.increaseTemp();
        expect(room.currTemp).toBe(23);
    });

    test('decreaseTemp decreases current temperature by 1', () => {
        room.decreaseTemp();
        expect(room.currTemp).toBe(21);
    });

    test('toggleAircon toggles airConditionerOn state', () => {
        room.toggleAircon();
        expect(room.airConditionerOn).toBe(true);
        room.toggleAircon();
        expect(room.airConditionerOn).toBe(false);
    });
});