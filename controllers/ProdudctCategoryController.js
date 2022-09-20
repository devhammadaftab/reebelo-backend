const ProductCategory = require("../models/product.category.model");
const {
  productCategoryValidation,
} = require("../validations/productCategory.validation");
const apiResponse = require("../helpers/response.helper");
const { errorMessage } = require("../helpers/message.helper");
const ObjectId = require("mongoose").Types.ObjectId;
const _ = require("underscore");

//index
exports.index = async (req, res, next) => {
  try {
    const productCategories = await ProductCategory.find({
      isDeleted: false,
    }).select(["-isDeleted", "-__v", "-deletedAt"]);
    return apiResponse.successData(
      res,
      "request processed successfully",
      productCategories
    );
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//show
exports.find = async (req, res, next) => {
  try {
    const productCategory = await ProductCategory.findOne({
      _id: ObjectId(req.params.id),
      isDeleted: false,
    }).select(["-isDeleted", "-__v", "-deletedAt"]);

    if (!productCategory) {
      return apiResponse.notFound(res, "no record found");
    }
    return apiResponse.successData(
      res,
      "request processed successfully",
      productCategory
    );
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//add productCategory
exports.store = async (req, res, next) => {
  try {
    const validationResult = productCategoryValidation.validate(req.body, {
      abortEarly: false,
    });
    if (!_.isEmpty(validationResult.error)) {
      let _errors = [];
      validationResult.error.details.forEach((element) => {
        _errors.push(element.message);
      });
      return apiResponse.validationErrorWithData(res, _errors);
    } else {
      //unique-constraint
      const isExists = await ProductCategory.findOne({ title: req.body.title });
      if (isExists) {
        return apiResponse.validationError(
          res,
          `record already exist with this ${req.body.title}`
        );
      }
      //saving
      const productCategory = await ProductCategory.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      });

      return apiResponse.successData(
        res,
        "record has been created",
        productCategory
      );
    }
  } catch (error) {
    return apiResponse.Error(res, error.message);
  }
};

//update productCategory
exports.update = async (req, res, next) => {
  try {
    const validationResult = productCategoryValidation.validate(req.body, {
      abortEarly: false,
    });

    if (!_.isEmpty(validationResult.error)) {
      let _errors = [];
      validationResult.error.details.forEach((element) => {
        _errors.push(element.message);
      });
      return apiResponse.validationErrorWithData(res, _errors);
    }

    //querying productCategory
    const productCategoryExists = await ProductCategory.findOne({
      _id: ObjectId(req.params.id),
    });

    if (!productCategoryExists) {
      return apiResponse.notFound(res, "no record found");
    }

    //updating productCategory
    const updateRequest = req.body;

    const productCategoryUpdate = await productCategoryExists.updateOne(
      updateRequest
    );

    //update aknowledgement
    if (productCategoryUpdate) {
      return apiResponse.successData(res, "The record has been updated");
    } else return apiResponse.Error(res, "The record has not been updated");
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//delete productCategory
exports.delete = async (req, res, next) => {
  try {
    //soft deleting to have consistency across
    const productCategory = await ProductCategory.softDelete({
      _id: ObjectId(req.params.id),
    });

    if (!productCategory) {
      return apiResponse.notFound(res, "no record found");
    }
    return apiResponse.success(res, "record has been soft deleted");
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//restore
exports.restore = async (req, res, next) => {
  try {
    //restore soft deleted record
    const productCategory = await ProductCategory.restore({
      _id: req.params.id,
    });

    if (!productCategory) {
      return apiResponse.notFound(res, "no record found");
    }

    return apiResponse.success(res, "record has been restored ");
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};
