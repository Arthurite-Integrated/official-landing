import {describe, expect, it} from "vitest";

import {parseContactRequest} from "#/lib/contact-request.ts";

const completeRequest = {
  company: "Acme Logistics",
  companySize: "51-200",
  email: "ada@acme.com",
  firstName: "Ada",
  jobTitle: "CTO",
  lastName: "Okafor",
  message: "We want to migrate our workloads to AWS.",
  phone: "",
};

const blankRequest = {
  company: "",
  companySize: "",
  email: "",
  firstName: "",
  jobTitle: "",
  lastName: "",
  message: "",
  phone: "",
};

describe("parseContactRequest", () => {
  it("accepts a complete request without a phone number", () => {
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
    expect(parseContactRequest({...completeRequest, email: "ada"})).toEqual({
      success: false,
      errors: {email: "Enter a valid work email"},
    });
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
      "company",
      "companySize",
      "email",
      "firstName",
      "jobTitle",
      "lastName",
      "message",
    ]);
  });
});
