import { describe, expect, it } from "vitest";
import {
  formatDeadline,
  isHttpUrl,
  resolveEnrollment,
  splitRemaining,
} from "./enrollment";

const windowConfig = {
  opensAt: null as string | null,
  closesAt: "2026-11-11T23:11:00-05:00",
  timeZone: "America/New_York",
  checkoutUrl: "https://stan.store/itsyunmei/p/example",
};

const closesAt = Date.parse("2026-11-11T23:11:00-05:00");

describe("resolveEnrollment", () => {
  it("stays unconfigured without a deadline, zone, or checkout", () => {
    expect(
      resolveEnrollment(closesAt - 1000, {
        ...windowConfig,
        closesAt: null,
      }).status,
    ).toBe("unconfigured");
    expect(
      resolveEnrollment(closesAt - 1000, {
        ...windowConfig,
        timeZone: null,
      }).status,
    ).toBe("unconfigured");
    expect(
      resolveEnrollment(closesAt - 1000, {
        ...windowConfig,
        checkoutUrl: null,
      }).status,
    ).toBe("unconfigured");
    expect(
      resolveEnrollment(closesAt - 1000, {
        ...windowConfig,
        timeZone: "Not/AZone",
      }).status,
    ).toBe("unconfigured");
    expect(
      resolveEnrollment(closesAt - 1000, {
        ...windowConfig,
        closesAt: "not-a-date",
      }).status,
    ).toBe("unconfigured");
  });

  it("rejects an opening time that is not before the close", () => {
    expect(
      resolveEnrollment(closesAt - 1000, {
        ...windowConfig,
        opensAt: "2026-11-12T00:00:00-05:00",
      }).status,
    ).toBe("unconfigured");
  });

  it("is upcoming, open, then closed around one shared deadline", () => {
    const opensAt = "2026-11-01T09:00:00-05:00";
    const config = { ...windowConfig, opensAt };
    expect(resolveEnrollment(Date.parse(opensAt) - 1, config).status).toBe(
      "upcoming",
    );
    const open = resolveEnrollment(Date.parse(opensAt), config);
    expect(open.status).toBe("open");
    expect(open.remainingMs).toBe(closesAt - Date.parse(opensAt));
    expect(resolveEnrollment(closesAt - 1, config).status).toBe("open");
    const closed = resolveEnrollment(closesAt, config);
    expect(closed.status).toBe("closed");
    expect(closed.remainingMs).toBe(0);
  });

  it("never reports negative time for the same instant", () => {
    const now = closesAt + 90_000;
    const a = resolveEnrollment(now, windowConfig);
    const b = resolveEnrollment(now, windowConfig);
    expect(a.remainingMs).toBe(0);
    expect(b.remainingMs).toBe(a.remainingMs);
    expect(splitRemaining(-5000)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("prints the closing instant in the configured time zone", () => {
    const label = formatDeadline(closesAt, "America/New_York");
    expect(label).toContain("November 11, 2026");
    expect(label).toContain("11:11");
    expect(label).toMatch(/EST|GMT-5/);
    expect(label).not.toContain("10:11");
  });
});

describe("isHttpUrl", () => {
  it("allows http(s) only", () => {
    expect(isHttpUrl("https://stan.store/itsyunmei")).toBe(true);
    expect(isHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isHttpUrl("")).toBe(false);
    expect(isHttpUrl(null)).toBe(false);
  });
});
