const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const multer = requier("multer");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const multer = require('multer'); 
const bodyParser = require('body-parser');

module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;

  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }

  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(bodyParser.urlencoded({extended : true}));
    this.#app.use(bodyParser.json());
    // this.#app.use(multer.json(''));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              title: "Felora Store",
              version: "2.0.0",
              description: "اولین سایت فروش گل با امکان شخصی‌سازی",
              contact: {
                name: "mustyounani va aghaye MALEKI",
                url: "https://freerealapi.com",
                email: "mustyounani.co@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:5000",
              },
            ],
          },
          apis: ["./app/router/**/*.js"],
        })
      )
    );
  }

  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT);
  }

  connectToMongoDB() {
    console.log("Salam");
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connected to MongoDB");
      return console.log(error.message);
    });
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose connection is disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");
      process.exit(0);
    });
  }

  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("ادرس مورد نظر یافت نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};



