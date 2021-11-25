import { expect, test, jest, describe, beforeEach, afterEach } from "@jest/globals";
import { BaseBusiness } from "../src/business/base/baseBusiness";
import { NotImplementedException } from "../src/util/exceptions";

describe("#BaseBusiness", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should throw an error when child class doesnt implement _validateRequiredFields function", () => {
    class ConcreteClass extends BaseBusiness {}

    const concreteClass = new ConcreteClass();

    const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name);

    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  test("should throw an error when _validateRequiredFields return false", () => {
    const VALIDATION_DOEST_SUCCESSED = false;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOEST_SUCCESSED);
    }

    const concreteClass = new ConcreteClass();
    const validationError = new Error("Invalid data");

    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  test("should throw an error when child class doesnt implement _create function", () => {
    const VALIDATION_SUCCESSED = true;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCESSED);
    }

    const concreteClass = new ConcreteClass();

    const validationError = new NotImplementedException(concreteClass._create.name);

    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  test("should call _validateRequiredFields and _create on create", () => {
    const VALIDATION_SUCCESSED = true;
    const CREATED_SUCCESSED = true;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCESSED);
      _create = jest.fn().mockReturnValue(CREATED_SUCCESSED);
    }

    const concreteClass = new ConcreteClass();

    const baseClassFn = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name);

    const result = concreteClass.create({});
    expect(result).toBeTruthy();
    expect(baseClassFn).toHaveBeenCalled();
    expect(concreteClass._create).toHaveBeenCalled();
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
  });
});
