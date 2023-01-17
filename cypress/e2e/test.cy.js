import data from "../../submissionData.json"; // do not create this file
import mock from "../fixtures/db.json";
// const data = [
//   {
//     submission_link: "http://localhost:3000",
//     id: "manish-local",
//     json_server_link: "http://localhost:8080/",
//   },
// ];

const getCurrentState = (win) => win.store.getState().AppReducer;

data.forEach(({ submission_link: url, id, json_server_link: server_url }) => {
  describe("Evaluation RCT-211-B120-E2", function () {
    let acc_score = 1;
    beforeEach(() => {
      cy.visit(url);
      cy.window().its("store").should("exist");
      if (url.charAt(url.length - 1) != "/") {
        url = url + "/";
      }
      cy.writeFile("db.json", mock, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    it(`Check Initial Redux Store Structure`, () => {
      cy.visit(url);
      cy.window()
        .then(getCurrentState)
        .should("deep.equal", {
          userData: {},
          isLoading: false,
          isAuth: false,
          meetupsData: [],
          errorText: null,
        })
        .then(() => {
          acc_score += 2;
        });
    });

    it(`Check if error text is visible if user doesn't exists`, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.get(".name").type("Saket");
      cy.get(".password").type("secret-2");
      cy.get(".submit").click();

      cy.wait("@users");
      cy.window().then(getCurrentState).its("isAuth").should("equal", false);
      cy.get(".error-container").should("have.text", "User does not exists");

      cy.then(() => (acc_score += 2));
    });
    it(`Check if error text is visible if wrong paswword is entered`, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.get(".name").type("Rohan");
      cy.get(".password").type("secret-2");
      cy.get(".submit").click();

      cy.wait("@users");
      cy.window().then(getCurrentState).its("isAuth").should("equal", false);
      cy.get(".error-container").should("have.text", "Incorrect Password");

      cy.then(() => (acc_score += 2));
    });

    it(`Check if the get request made and the authentaication status is getting updated after the user logs in with correct credentials`, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.window().then(getCurrentState).its("isLoading").should("equal", false);
      cy.window().then(getCurrentState).its("isAuth").should("equal", false);

      cy.get(".name").type("Samuel");
      cy.get(".password").type("secret");
      cy.get(".submit").click();

      cy.wait("@users");

      cy.window().then(getCurrentState).its("isAuth").should("equal", true);

      cy.then(() => (acc_score += 3));
    });

    it(`Check if current user data gets updated in ths store when the user logs in`, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.get(".name").type("Samuel");
      cy.get(".password").type("secret");
      cy.get(".submit").click();
      cy.wait("@users");

      cy.window()
        .then(getCurrentState)
        .its("userData.name")
        .should("equal", "Samuel");
      cy.window()
        .then(getCurrentState)
        .its("userData.password")
        .should("equal", "secret");
      cy.window()
        .then(getCurrentState)
        .its("userData.location")
        .should("equal", "bangalore");
      cy.window()
        .then(getCurrentState)
        .its("userData.interests")
        .should("deep.equal", [
          "technology",
          "food",
          "movies",
          "culture",
          "art",
          "drama",
        ]);
      cy.window()
        .then(getCurrentState)
        .its("userData.subscribed")
        .should("deep.equal", [1, 3]);

      cy.then(() => (acc_score += 2));
    });

    it(`Check if all events are displayed on dashboard`, () => {
      cy.intercept("GET", `**/meetups`).as("meetupData");
      cy.visit(url);

      cy.wait("@meetupData");
      cy.get(".meetups_wrapper").children().should("have.length", 5);

      cy.then(() => (acc_score += 2));
    });

    it(`Check if home is accessible only after login`, () => {
      cy.visit(url);

      cy.get(".my-events").click();

      cy.url().should("eq", url + "login");

      cy.then(() => (acc_score += 2));
    });

    it(`Check if the subscribed events are displayed correctly on home page`, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.get(".name").type("Rohan");
      cy.get(".password").type("secret");
      cy.get(".submit").click();
      cy.wait("@users");
      cy.get(".my-events").click();
      cy.url().should("eq", url + "home");

      cy.get(".subscribed-events").children().should("have.length", 2);
      cy.get(".title").eq(0).should("contain", "Saunter Strech");
      cy.get(".title").eq(1).should("contain", "Dinner date");

      cy.then(() => (acc_score += 2));
    });

    it(`Check if the recommended events are displayed correctly on home page`, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.get(".name").type("Rohan");
      cy.get(".password").type("secret");
      cy.get(".submit").click();
      cy.wait("@users");
      cy.get(".my-events").click();

      cy.get(".recommended-events").children().should("have.length", 3);

      cy.then(() => (acc_score += 2));
    });

    it(`Check if user is able to subscribe to events`, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.get(".name").type("Rohan");
      cy.get(".password").type("secret");
      cy.get(".submit").click();
      cy.wait("@users");
      cy.get(".my-events").click();
      cy.get(".subscribed-events").children().should("have.length", 2);

      cy.get(".subscribe")
        .eq(0)
        .click()
        .then(() => {
          cy.get(".subscribed-events").children().should("have.length", 3);
          cy.get(".recommended-events").children().should("have.length", 2);
        });

      cy.then(() => (acc_score += 2));
    });

    it(`Check if log out is working `, () => {
      cy.intercept("GET", "**/users").as("users");
      cy.visit(url + "login");

      cy.get(".name").type("Rohan");
      cy.get(".password").type("secret");
      cy.get(".submit").click();
      cy.wait("@users");

      cy.get(".logout-btn").click();

      cy.window().then(getCurrentState).its("isAuth").should("equal", false);

      cy.then(() => (acc_score += 1));
    });

    it(`Check if register is working properly`, () => {
      cy.intercept("POST", "**/users").as("registerUsers");
      cy.intercept("GET", "**/users").as("loginUsers");

      cy.visit(url);

      cy.get(".register").click();

      cy.get(".name").type("New User");
      cy.get(".location").type("Bangalore");
      cy.get(".interests").type("food, technology, swimming");
      cy.get(".password").type("secret-2");
      cy.get(".submit").click();
      cy.wait("@registerUsers");

      cy.visit(url + "login");

      cy.get(".name").type("New User");
      cy.get(".password").type("secret-2");
      cy.get(".submit").click();
      cy.wait("@loginUsers");
      cy.window().then(getCurrentState).its("isAuth").should("equal", true);

      cy.then(() => (acc_score += 2));
    });

    it(`generate score`, () => {
      console.log("final score:", acc_score);
      ////////////// this should not be chnages
      let result = {
        id,
        marks: Math.ceil(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
