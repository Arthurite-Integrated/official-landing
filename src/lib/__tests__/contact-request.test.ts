import {describe, expect, it} from "vite-plus/test";

import {parseContactRequest, parseEnquiryDetails} from "#/lib/contact-request.ts";
import {PHONE_ERROR} from "#/lib/phone.ts";

const completeRequest = {
  companyName: "Acme Logistics",
  companySize: "51-200",
  workEmail: "ada@acme.com",
  firstName: "Ada",
  jobTitle: "CTO",
  lastName: "Okafor",
  message: "We want to migrate our workloads to AWS.",
  phone: "+2348012345678",
};

const blankRequest = {
  companyName: "",
  companySize: "",
  workEmail: "",
  firstName: "",
  jobTitle: "",
  lastName: "",
  message: "",
  phone: "",
};

describe("parseContactRequest", () => {
  it("accepts a complete request", () => {
    expect(parseContactRequest(completeRequest)).toEqual({success: true, data: completeRequest});
  });

  it("trims surrounding whitespace", () => {
    const result = parseContactRequest({...completeRequest, firstName: "  Ada  "});

    expect(result.success && result.data.firstName).toBe("Ada");
  });

  it("asks for a first name when it is only whitespace", () => {
    expect(parseContactRequest({...completeRequest, firstName: "   "})).toEqual({
      success: false,
      errors: {firstName: "Enter your first name"},
    });
  });

  it("asks for a valid work email", () => {
    expect(parseContactRequest({...completeRequest, workEmail: "ada"})).toEqual({
      success: false,
      errors: {workEmail: "Enter a valid work email"},
    });
  });

  it("requires a phone number in E.164 format", () => {
    expect(parseContactRequest({...completeRequest, phone: "08012345678"})).toEqual({
      success: false,
      errors: {phone: PHONE_ERROR},
    });
  });

  it("sends a phone number typed with spaces in E.164 format", () => {
    const result = parseContactRequest({...completeRequest, phone: "+234 801 234 5678"});

    expect(result.success && result.data.phone).toBe("+2348012345678");
  });

  it("rejects a missing phone number", () => {
    const result = parseContactRequest({...completeRequest, phone: ""});

    expect(result.success).toBe(false);
  });

  it("requires a message of at least 10 characters", () => {
    const result = parseContactRequest({...completeRequest, message: "Hi there"});

    expect(result).toEqual({success: false, errors: {message: "Tell us a bit more about what you need"}});
  });

  it("rejects a company size outside the list", () => {
    expect(parseContactRequest({...completeRequest, companySize: "5,000"})).toEqual({
      success: false,
      errors: {companySize: "Select your company size"},
    });
  });

  it("reports every required field at once", () => {
    const result = parseContactRequest(blankRequest);

    expect(result.success ? [] : Object.keys(result.errors).sort()).toEqual([
      "companyName",
      "companySize",
      "firstName",
      "jobTitle",
      "lastName",
      "message",
      "phone",
      "workEmail",
    ]);
  });
});

describe("parseEnquiryDetails", () => {
  it("accepts contact details without a message", () => {
    const {message: _message, ...details} = completeRequest;

    expect(parseEnquiryDetails(details)).toEqual({success: true, data: details});
  });

  it("reports missing details without requiring a message", () => {
    const result = parseEnquiryDetails({...blankRequest, message: undefined});

    expect(result.success ? [] : Object.keys(result.errors).sort()).toEqual([
      "companyName",
      "companySize",
      "firstName",
      "jobTitle",
      "lastName",
      "phone",
      "workEmail",
    ]);
  });
});
