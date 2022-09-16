import { AuthorizatsionError, ForbiddineError, InternalServerError } from "../utilis/errorr.js";
import { read, write } from "../utilis/modul.mjs";


const POSTPRODUCT = (req, res, next) => {
  try {

    let { sub_category_id, product_name, model, color, price } = req.body;
    let products = read('products');
    let subCategories = read('subCategories');

    let subCategory = subCategories.find(data => data.sub_category_id == sub_category_id)
    if (!subCategory) {
      return res.send({
        status: 400,
        message: "bu mahsulotga subCategory mavjud emas"
      })
    } else {
      let newProduct = {
        product_id: products.at(-1)?.product_id + 1 || 1,
        sub_category_id, product_name, model, color, price
      }
      products.push(newProduct);
      write('products', products);
      return res.send({
        status: 200,
        message: "added",
        data: newProduct
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}

const UPDATEPRODUCT = (req, res, next) => {
  try {

    let { product_id, product_name, model, color, price } = req.body;
    let products = read('products');

    let product = products.find(data => data.product_id == product_id)
    if (!product) {
      return res.send({
        status: 400,
        message: "bunday mahsulot mavjud emas"
      })
    } else {
      product_name ? product.product_name = product_name : false;
      model ? product.model = model : false;
      color ? product.color = color : false;
      price ? product.price = price : false;

      write('products', products);
      return res.send({
        status: 200,
        message: "updated",
        data: product
      })

    }
  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}


const DELETEPRODUCT = (req, res, next) => {
  try {
    let { id } = req.params;
    let products = read('products');

    let product = products.find(data => data.product_id == id);
    console.log(product);
    if (product) {
      console.log(products);
      let products1 = products.filter((data) => {
        return data.product_id != id;
      })
      write('products', products1);
      return res.send({
        status: 200,
        message: "deleted",
        data: product
      })
    } else {
      return res.send({
        status: 400,
        message: "bunday tavar mavjud emas"
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}


const GETQUERY = (req, res, next) => {
  try {
    let products = read('products');
    let categories = read('categories');
    let subCategories = read('subCategories');
    let { categoryId, subCategoryId, model, color, price } = req.query;
    let { id } = req.params;
    if (id) {
      products = products.find(data => data.product_id == id);
      if (products) {
        return res.send({
          status: 200,
          message: "ok",
          data: products
        })
      } else {
        return res.send({
          status: 400,
          message: "bunday product topilmadi"
        })
      }

    }

    if (!categoryId && !subCategoryId && !model && !color) {
      return res.send({
        status: 200,
        data: []
      })
    }

    products.forEach(element => {
      subCategories.forEach(data => {
        if (element.sub_category_id == data.sub_category_id) {
          element.category_id = data.category_id;
        }
      });
    });

    if (subCategoryId && model) {
      products = products.filter(data => data.sub_category_id == subCategoryId && data.model == model)
      return res.send({
        status: 200,
        message: "ok",
        data: products
      })
    }

    if (color && model) {
      products = products.filter(data => data.color == color && data.model == model)
      return res.send({
        status: 200,
        message: "ok",
        data: products
      })
    }

    if (price && model) {
      products = products.filter(data => data.price == price && data.model == model)
      return res.send({
        status: 200,
        message: "ok",
        data: products
      })
    }

    if (model) {
      products = products.filter(data => data.model == model)
      return res.send({
        status: 200,
        message: "ok",
        data: products
      })
    }

    if (categoryId) {
      products = products.filter(data => data.category_id == categoryId)
      return res.send({
        status: 200,
        message: "ok",
        data: products
      })
    }


    if (subCategoryId) {
      products = products.filter(data => data.sub_category_id == subCategoryId)
      return res.send({
        status: 200,
        message: "ok",
        data: products
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}


export {
  POSTPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, GETQUERY
}