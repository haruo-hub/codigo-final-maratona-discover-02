const express = require("express");
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile-edit/:id", ProfileController.show);
routes.get("/profiles", ProfileController.index);
routes.get("/profile", ProfileController.create);
routes.post("/profile", ProfileController.save);
routes.post("/profile/select/:id", ProfileController.select);
routes.post("/profile/:id", ProfileController.update);
routes.post("/profile/delete/:id", ProfileController.delete);

module.exports = routes;