const User = require("../Models/userSchema");
const Product = require("../Models/productSchema");

async function fetchNumberOfItemsSoldPerProduct(req, res) {
  var records = await Product.aggregate([
    {
      $lookup: {
        localField: "_id",
        from: "users",
        foreignField: "product",
        as: "BoughtBy",
      },
    },
    {
      $addFields: {
        numberOfOrder: {
          $size: "$BoughtBy",
        },
      },
    },
    {
      $project: {
        name: 1,
        numberOfOrder: 1,
      },
    },
  ]);

  if (records) {
    res.status(200).send(records);
  } else {
    res.status(401).send("Some Error Occured");
  }
}

/*async function fetchNumberOfItemsSoldPerProduct(req, res) {
  var records = await User.aggregate([
    {
      $lookup: {
        localField: "product",
        from: "products",
        foreignField: "_id",
        as: "productsBought",
      },
    },
    {
      $unwind: "$productsBought",
    },
    {
      $group: {
        _id: "$productsBought.name",
        count: {
          $count: {},
        },
      },
    },
  ]);
  if (records) {
    res.status(200).send(records);
  } else {
    res.status(401).send("Some Error Occured");
  }
}*/

async function fetchNumberOfProductPerCategory(req, res) {
  var records = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryName",
      },
    },
    {
      $group: {
        _id: "$categoryName.category",
        count: {
          $count: {},
        },
      },
    },
  ]);

  if (records) {
    res.status(200).send(records);
  } else {
    res.status(401).send("Some Error Occured");
  }
}

module.exports = {
  fetchNumberOfItemsSoldPerProduct,
  fetchNumberOfProductPerCategory,
};
