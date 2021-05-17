const createOne = async (model, modelObj) => {
    return await model.create(modelObj);
}

const findOne = async (model, modelObj) => {
    return await model.findOne(modelObj)
}

const updateOne = async (model, filter, update) => {
    return await model.findOneAndUpdate(filter, update)
}

const deleteOne = async (model, modelObj) => {
  return await model.findOneAndDelete(modelObj);
};

export const dbUtils = {
    createOne,
    findOne,
    updateOne,
    deleteOne
}