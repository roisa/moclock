import { describe, it, expect } from "vitest";
import { laneFromTilt, rollOf, TILT_ZONE } from "./tilt";
describe("tilt steering", () => {
  it("maps roll to lanes", () => {
    expect(laneFromTilt(0, 1)).toBe(1);
    expect(laneFromTilt(-(TILT_ZONE + 2), 1)).toBe(0);
    expect(laneFromTilt(TILT_ZONE + 2, 1)).toBe(2);
    expect(laneFromTilt(90, 1)).toBe(2);
  });
  it("has hysteresis so a wobbly hand doesn't flicker", () => {
    expect(laneFromTilt(TILT_ZONE - 1, 2)).toBe(2); // stays right just inside the band
    expect(laneFromTilt(TILT_ZONE - 1, 1)).toBe(1); // but doesn't enter it
    expect(laneFromTilt(2, 2)).toBe(1); // back to straight
  });
  it("reads the right axis for each screen orientation", () => {
    expect(rollOf(10, 20, 0)).toBe(20);
    expect(rollOf(10, 20, 90)).toBe(10);
    expect(rollOf(10, 20, 270)).toBe(-10);
    expect(rollOf(10, 20, -90)).toBe(-10);
  });
});
