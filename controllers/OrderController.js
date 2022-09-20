const ProductCategory = require("../models/product.category.model");
const Order = require("../models/order.model");
const {
  orderValidation,
  orderStatusValidation,
  orderAddressValidation,
} = require("../validations/order.validation");
const apiResponse = require("../helpers/response.helper");
const { errorMessage } = require("../helpers/message.helper");
const ObjectId = require("mongoose").Types.ObjectId;
const { uid } = require("../helpers/uid.helper");
const orderHelpers = require("../helpers/order.helper");
require("dotenv").config();
const _ = require("underscore");

//index
exports.index = async (req, res, next) => {
  //pagination variables
  const perPageCount = parseInt(process.env.PAGINATION_COUNT) || 12;
  let currentPage = parseInt(req.query.page) || 1;
  const skipRecord = (currentPage - 1) * perPageCount;
  const totalRecords = await Order.countDocuments({
    isDeleted: false,
  });
  const pagination = {
    total: totalRecords,
    currentPage: currentPage,
    perPage: perPageCount,
  };
  const searchOpions = {
    isDeleted: false,
  };

  try {
    const orders = await Order.aggregate([
      {
        $match: { ...searchOpions },
      },
      {
        $lookup: {
          from: "orderdetails",
          let: {
            orderId: "$_id",
          },
          pipeline: [
            { $match: { $expr: { $eq: ["$orderId", "$$orderId"] } } },
            {
              $lookup: {
                from: "products",
                let: { productId: "$productId" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$productId"] } } },
                ],
                as: "product",
              },
            },
          ],
          as: "orderDetails",
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $lookup: {
          from: "orderaddresses",
          localField: "addressId",
          foreignField: "_id",
          as: "address",
          pipeline: [
            {
              $project: {
                _id: 1,
                address: 1,
                city: 1,
                zipCode: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$address",
      },
      {
        $skip: skipRecord,
      },
      {
        $limit: perPageCount,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return apiResponse.successData(
      res,
      "request processed successfully",
      orders,
      pagination
    );
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//order store
exports.store = async (req, res, next) => {
  try {
    const validationResult = orderValidation.validate(req.body, {
      abortEarly: false,
    });
    if (!_.isEmpty(validationResult.error)) {
      let _errors = [];
      validationResult.error.details.forEach((element) => {
        _errors.push(element.message);
      });
      return apiResponse.validationErrorWithData(res, _errors);
    } else {
      //initial steps
      const orderTrackingId = uid(process.env.ORDER_TR_KEY);
      const cart = req.body.cart;
      const address = req.body.address;

      const [totalPrice, orderAddress] = await Promise.all([
        orderHelpers.calculatePrice(cart),
        orderHelpers.storingOrderAddress(address),
      ]);
      //order processing
      const order = await Order.create({
        orderTrackingId: orderTrackingId,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contact: req.body.contact,
        totalAmount: totalPrice,
        addressId: orderAddress.id,
      });
      //processing orderDetails
      const orderDetails = await orderHelpers.storingCartItems(cart, order._id);
      const orderResponse = {
        trackingNo: order.orderTrackingId,
        status: order.status,
      };
      return apiResponse.successData(
        res,
        "record has been created",
        orderResponse
      );
    }
  } catch (error) {
    return apiResponse.Error(res, error.message);
  }
};

//order update
exports.update = async (req, res, next) => {
  try {
    const validationResult = orderAddressValidation.validate(req.body, {
      abortEarly: false,
    });

    if (!_.isEmpty(validationResult.error)) {
      let _errors = [];
      validationResult.error.details.forEach((element) => {
        _errors.push(element.message);
      });
      return apiResponse.validationErrorWithData(res, _errors);
    }

    //querying order
    const orderExists = await Order.findOne({
      _id: ObjectId(req.params.id),
    });

    if (!orderExists) {
      return apiResponse.notFound(res, "no record found");
    }

    //updating order
    const updateRequest = req.body;

    const orderUpdate = await orderExists.updateOne(updateRequest);
    //update aknowledgement
    if (orderUpdate) {
      return apiResponse.successData(res, "The record has been updated");
    } else return apiResponse.Error(res, "The record has not been updated");
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//order status update
exports.statusUpdate = async (req, res, next) => {
  try {
    const validationResult = orderStatusValidation.validate(req.body, {
      abortEarly: false,
    });

    if (!_.isEmpty(validationResult.error)) {
      let _errors = [];
      validationResult.error.details.forEach((element) => {
        _errors.push(element.message);
      });
      return apiResponse.validationErrorWithData(res, _errors);
    }

    const orderStatus = ["processing", "cancelled", "delivered"];

    //querying order
    const orderExists = await Order.findOne({
      _id: ObjectId(req.params.id),
    });

    if (!orderExists) {
      return apiResponse.notFound(res, "no record found");
    }

    //updating order
    const updateRequest = req.body;

    const orderUpdate = await orderExists.updateOne(updateRequest);
    //update aknowledgement
    if (orderUpdate) {
      return apiResponse.successData(res, "The record has been updated");
    } else return apiResponse.Error(res, "The record has not been updated");
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};
