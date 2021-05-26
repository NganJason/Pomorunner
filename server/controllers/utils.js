const getReorderedObjs = async (model, updatedOrder) => {
    try {
        let initialOrder = model.order

        let selfAndSiblingObjs = await model.getSelfAndSiblingObjs()
        selfAndSiblingObjs.sort((a,b) => a.order - b.order)

        let reorderedObjs = rearrangeObjsOrder(selfAndSiblingObjs, initialOrder - 1, updatedOrder - 1)

        return reorderedObjs
    } catch(err) {
        return err
    }
}

const rearrangeObjsOrder = (objList, initialOrder, updatedOrder) => {
  let removedObj = objList[initialOrder];

  objList.splice(initialOrder, 1);
  objList.splice(updatedOrder, 0, removedObj);

  return objList;
};

export const utils = {
    getReorderedObjs
}