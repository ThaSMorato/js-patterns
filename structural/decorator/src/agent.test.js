import { describe, expect, test, jest, beforeEach, afterEach } from "@jest/globals";
import { Server } from "http";
import { InjectHttpDecorator } from "./agent";

const originalHttp = jest.createMockFromModule("http");

describe("#HTTp decorator", () => {
  const eventName = "request";
  const request = null;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should not change header", () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled();
  });

  test("Should activate header interceptor", () => {
    InjectHttpDecorator();
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toHaveBeenCalledWith("X-Instrumented-By", "Thales Morato");
  });
});
