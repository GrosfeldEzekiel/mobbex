import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { assert } from "chai";
import checkout from "../src/resources/checkout";

chai.use(chaiAsPromised);

describe("Wallet", () => {
  describe("Sucessfully handle wallet operations", () => {
    it("Should create a checkout with a wallet", () => {
      assert.ok(
        checkout.create({
          total: 5,
          currency: "ARS",
          reference: "2982-2XtPXlgSaWccqUyobuv4sEmLYMV0N6oX6MoridMw",
          description: "Descripción de la Venta",
          customer: {
            uid: "12123123",
            name: "Demo Mobbex",
            identification: "23234234",
            email: "demo@mobbex.com",
          },
          options: {
            domain: "mi.dominio.com",
          },
          wallet: true,
          return_url: "https://localhost:8443/sale/return?session=56789",
          webhook: "https://localhost:8443/sale/webhook?user=1234",
        })
      );
    });
  });
});
