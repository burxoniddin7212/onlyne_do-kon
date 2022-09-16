import express from "express";
import categoryRouter from "./src/router/category.router.js";
import productRouter from "./src/router/product.router.js";


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(categoryRouter);
app.use(productRouter);





app.use((error, req, res, next) => {
  if (error.status == 500) {
    res.send({
      status: 500,
      message: error.message
    })
  }

  res.send({
    status: error.status,
    message: error.message
  })
})


app.listen(PORT, () => console.log("server ready http://localhost:" + PORT));
