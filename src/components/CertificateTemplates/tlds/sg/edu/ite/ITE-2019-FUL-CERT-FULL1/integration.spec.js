import { Selector } from "testcafe";

fixture("Institute of Technical Education").page`http://localhost:3000`;

const Certificate = "./ITE_TEST-2019-CERT-FULL1.opencert";

// Only Certficate, No Transcript
// const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("ITE-2019-CERT-FULL1 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate rendered
  // await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate content
  await validateTextContent(t, RenderedCertificate, [
    "STUDENT NAME CERT FULL",
    "Higher National ITE Certificate",
    "in",
    "Aerospace Maintenance",
    "(Aircraft Maintenance-Mechanical)",
    "1 April 2019",
    "Designation One",
    "Designation Two",
    "ABCD201912345/S1234567A"
  ]);
});
