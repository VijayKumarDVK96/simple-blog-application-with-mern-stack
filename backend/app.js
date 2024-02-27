import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect("mongodb+srv://admin:mu7n1T2fcaLBvDvZ@cluster0.nw9tdxb.mongodb.net/mern-blog?retryWrites=true&w=majority")
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
