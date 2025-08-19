import request from "supertest";
import app from "../app.js"; // raw app, not listening

export default request(app);
