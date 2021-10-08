import * as types from "../constants/actionTypes";

export const fetchProductNames =
  () =>
  ({ dispatch, getState }) => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((tableElements) => {
        if (!Array.isArray(tableElements)) tableElements = [];
        tableElements.forEach((element) => {
          productNames.push(element.product_name);
        });
        setAllProductNames(productNames);
      })
      .catch((err) =>
        console.log(
          "InventoryAddForm.componentDidMount: getProductNames: ERROR: ",
          err
        )
      );
  };

export const addInventoryActionCreator = (index) => ({
  type: types.ADD_INVENTORY,
  payload: index,
});
// add more action creators
