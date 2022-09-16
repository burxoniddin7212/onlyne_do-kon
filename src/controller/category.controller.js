import sha256 from "sha256";
import { ForbiddineError, InternalServerError } from "../utilis/errorr.js";
import { read, write } from "../utilis/modul.mjs";
import jwt from "../utilis/jwt.js"



const LOGIN = (req, res, next) => {
  try {
    let admins = read('admin');
    let { username, password } = req.body;
    let admin = admins.find(data => data.username == username && data.password == sha256(password))

    if (admin) {
      res.send({
        status: 200,
        message: "ok",
        token: jwt.sign({ userId: admin.user_id })
      })
    }


  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}



const GETCATEGORIES = (req, res, next) => {
  try {
    let categories = read('categories');
    let subCategories = read('subCategories');
    let arry1 = [];
    let { id } = req.params;

    for (let i = 0; i < categories.length; i++) {
      let abj = {};
      let arry = [];
      abj.category_id = categories[i].category_id;
      abj.category_name = categories[i].category_name;
      if (subCategories) {
        for (let j = 0; j < subCategories.length; j++) {
          if (categories[i].category_id == subCategories[j].category_id) {
            let abj = {};
            abj.subCategoryId = subCategories[j].sub_category_id;
            abj.subCategoryName = subCategories[j].sub_category_name;
            arry.push(abj);
          }
        }
      }

      if (arry.length != 0) {
        abj.subCategoris = arry;
      }
      arry1.push(abj);
    }

    if (id) {
      return res.send({
        status: 200,
        message: "ok",
        data: arry1.find(data => data.category_id == id)
      })
    }

    return res.send({
      status: 200,
      message: "ok",
      data: arry1
    })
  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}


const POSTCATEGORIES = (req, res, next) => {
  try {

    let { category_name } = req.body;
    let categories = read('categories');
    let subCategories = read('subCategories');

    let category_name1 = categories.find(data => data.category_name == category_name)
    if (category_name1) {
      return res.send({
        status: 400,
        message: "bu nom band"
      })
    } else {
      let newCategory = {
        category_id: categories.at(-1)?.category_id + 1 || 1,
        category_name
      }
      categories.push(newCategory);
      write('categories', categories);
      return res.send({
        status: 200,
        message: "added",
        data: newCategory
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}


const UPDATECATEGORIES = (req, res, next) => {
  try {

    let { category_name, category_id } = req.body;
    let categories = read('categories');

    let category = categories.find(data => data.category_id == category_id)
    if (category) {
      category.category_name = category_name;
      write('categories', categories);
      return res.send({
        status: 200,
        message: "updated",
        data: category
      })
    } else {
      return res.send({
        status: 400,
        message: "bunday category topilmadi"
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}


const DELETECATEGORIES = (req, res, next) => {
  try {

    let { id } = req.params;
    let categories = read('categories');
    let category = categories.find(data => data.category_id == id)
    if (category) {
      categories = categories.filter(data => data.category_id != id)
      write('categories', categories);
      return res.send({
        status: 200,
        message: "deleted",
        data: category
      })
    } else {
      return res.send({
        status: 400,
        message: "bunday category topilmadi"
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}

const POSTSUBCATEGORIES = (req, res, next) => {
  try {

    let { sub_category_name, category_id } = req.body;
    let categories = read('categories');
    let subCategories = read('subCategories');

    let sub_category_name1 = subCategories.find(data => data.sub_category_name == sub_category_name)
    if (sub_category_name1) {
      return res.send({
        status: 400,
        message: "bu nom band"
      })
    } else {
      let newSubCategory = {
        sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1,
         category_id,sub_category_name
      }
      subCategories.push(newSubCategory);
      write('subCategories', subCategories);
      return res.send({
        status: 200,
        message: "added",
        data: newSubCategory
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}

const UPDATESUBCATEGORIES = (req, res, next) => {
  try {

    let { sub_category_name, sub_category_id } = req.body;
    let subCategories = read('subCategories');

    let subCategory = subCategories.find(data => data.sub_category_id == sub_category_id)
    if (subCategory) {
      subCategory.sub_category_name = sub_category_name;
      write('subCategories', subCategories);
      return res.send({
        status: 200,
        message: "updated",
        data: subCategory
      })
    } else {
      return res.send({
        status: 400,
        message: "bunday subCategory topilmadi"
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}


const DELETESUBCATEGORIES = (req, res, next) => {
  try {

    let { id } = req.params;
    let subCategories = read('subCategories');
    let subCategory = subCategories.find(data => data.sub_category_id == id)
    if (subCategory) {
      subCategories = subCategories.filter(data => data.sub_category_id != id)
      write('subCategories', subCategories);
      return res.send({
        status: 200,
        message: "deleted",
        data: subCategory
      })
    } else {
      return res.send({
        status: 400,
        message: "bunday subCategory topilmadi"
      })
    }

  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}



const GETSUBCATEGORYS = (req, res, next) => {
  try {
    let categories = read('categories');
    let subCategories = read('subCategories');
    let products = read('products');

    subCategories.forEach(element => {
      element.products = products.filter(data => data.sub_category_id == element.sub_category_id);
      element.products.forEach(data => delete data.sub_category_id)
    });

    let { id } = req.params;
    if (id) {
      return res.send({
        status: 200,
        message: "ok",
        data: subCategories.find(data => data.sub_category_id = id)
      })
    }

    return res.send({
      status: 200,
      message: "ok",
      data: subCategories
    })
  } catch (error) {
    next(new InternalServerError(500, "InternalServerError"))
  }
}




export {
  GETCATEGORIES, GETSUBCATEGORYS, LOGIN, POSTCATEGORIES, UPDATECATEGORIES, DELETECATEGORIES, POSTSUBCATEGORIES,UPDATESUBCATEGORIES,DELETESUBCATEGORIES
}