import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { assert } from "chai";
import checkout from "../src/resources/checkout";
import configurations from "../src/configurations";

chai.use(chaiAsPromised);

before(() => {
  configurations.configure({
    apiKey: "zJ8LFTBX6Ba8D611e9io13fDZAwj0QmKO1Hn1yIj",
    accessToken: "d31f0721-2f85-44e7-bcc6-15e19d1a53cc",
  });
});

describe("Checkout Module", () => {
  describe("Successfully handle checkouts", () => {
    it("Should create a Checkout", () => {
      return assert.isFulfilled(
        checkout.create({
          total: 100.2,
          currency: "ARS",
          reference: "2982-2XtPXlgSaWccqUyobuv4sEmLYMV0N6oX6MoridMw",
          description: "Descripción de la Venta",
          items: [
            {
              image:
                "https://www.mobbex.com/wp-content/uploads/2019/03/web_logo.png",
              quantity: 2,
              description: "Mi Producto",
              total: 50,
            },
            {
              image:
                "https://www.mobbex.com/wp-content/uploads/2019/03/web_logo.png",
              quantity: 1,
              description: "Mi otro producto",
              total: 50.2,
            },
          ],
          options: {
            domain: "midominio.com",
            theme: {
              type: "light",
              background: "#0000FF",
              showHeader: false,
              header: {
                name: "Pepito el pistolero",
                logo: "https://res.mobbex.com/images/icons/def_store.png",
              },
              colors: {
                primary: "#FF0000",
              },
            },
          },
          return_url: "https://mobbex.com/sale/return?session=56789",
          webhook: "https://mobbex.com/sale/webhook?user=1234",
        })
      );
    });

    it("Should delete the checkout", () => {
      return assert.isFulfilled(checkout.delete("checkoutID"));
    });
  });

  describe("Error in Model", () => {
    it("Expect error in background not hex", () => {
      return assert.isRejected(
        checkout.create({
          total: 100.2,
          currency: "ARS",
          reference: "2982-2XtPXlgSaWccqUyobuv4sEmLYMV0N6oX6MoridMw",
          description: "Descripción de la Venta",
          items: [
            {
              image:
                "https://www.mobbex.com/wp-content/uploads/2019/03/web_logo.png",
              quantity: 2,
              description: "Mi Producto",
              total: 50,
            },
            {
              image:
                "https://www.mobbex.com/wp-content/uploads/2019/03/web_logo.png",
              quantity: 1,
              description: "Mi otro producto",
              total: 50.2,
            },
          ],
          options: {
            theme: {
              type: "light",
              background: "notHex",
            },
          },
          return_url: "https://mobbex.com/sale/return?session=56789",
          webhook: "https://mobbex.com/sale/webhook?user=1234",
        })
      );
    });
  });
});
