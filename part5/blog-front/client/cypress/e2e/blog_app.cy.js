/* eslint-disable cypress/no-unnecessary-waiting */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Domino Jachaś",
      username: "domino",
      password: "JACHAS",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page is displayed", () => {
    cy.contains("blogs");
    cy.contains("Log in to application");
  });
  describe("when logged in", () => {
    it("login succesful", function () {
      cy.get("input:first").type("domino");
      cy.get("input:last").type("JACHAS");
      cy.get("button").click();
      cy.contains("domino logged in");
    });
    it("login unsuccesful", function () {
      cy.get("input:first").type("domino");
      cy.get("input:last").type("wrong");
      cy.get("button").click();
      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Domino Jachaś logged in");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "domino", password: "JACHAS" });
    });
    it("a blog can be created", function () {
      cy.createBlog({
        title: "First random",
        author: "Natalia",
        url: "randomurl.com",
      });

      cy.get(".blog:first")
        .should("contain", "First random")
        .and("have.css", "border-color", "rgb(0, 0, 0)");
    });
    describe("", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "First random",
          author: "Natalia",
          url: "randomurl.com",
        });
        cy.createBlog({
          title: "Second random",
          author: "Natalia",
          url: "randomurl.com",
        });
        cy.createBlog({
          title: "Third random",
          author: "Natalia",
          url: "randomurl.com",
        });
      });

      it("blog can be liked", function () {
        cy.contains("Second random").parent().find("button").click();
        cy.get(".like-btn").click().parent().should("contain", "likes: 1");
      });
      it("blog can be deleted", function () {
        cy.get(".blog").eq(1).find("button").click();
        cy.get(".del-btn").click();
        cy.get(".success")
          .should("contain", "Blog was successfully removed")
          .and("have.css", "color", "rgb(0, 128, 0)");
        cy.get(".blogs").should("not.contain", "Second random");
      });
      it("sorting blogs works", function () {
        cy.get(".blog").eq(0).find("button").click();
        cy.get(".like-btn").click().wait(500).click().wait(500).click();
        cy.get(".blog")
          .eq(2)
          .find("button")
          .click()
          .parent()
          .parent()
          .find(".like-btn")
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click();

        cy.get(".blog").eq(0).should("contain", "Third random");
        cy.get(".blog").eq(1).should("contain", "First random");
        cy.get(".blog").eq(2).should("contain", "Second random");
      });
    });
  });
});
