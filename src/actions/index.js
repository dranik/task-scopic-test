import moment from 'moment';
export const DELETE_PRODUCT = 'delete_product';
export const UPDATE_PRODUCT = 'update_product';
export const INITIAL_FETCH_PRODUCTS = 'initial_fetch_products';

export function deleteProduct(id, callback) {
  callback();
  return {
    type: DELETE_PRODUCT,
    payload: id
  };
}

export function updateProduct(product, callback) {
  callback();
  return {
    type: UPDATE_PRODUCT,
    payload: product
  };
}

export function initialFetchProducts() {
  return {
    type: INITIAL_FETCH_PRODUCTS,
    payload: [
      { id: 1, price: 90.53, name: 'Gazelle', description: "Lorem Ipsum", created: moment("20111031", "YYYYMMDD") },
      { id: 23, price: 140.00, name: 'Giraffe', description: "Foo bar: baar", created: moment("20010201", "YYYYMMDD") },
      { id: 43, price: 84.33, name: 'Aktaudyn kyzdary', description: "Tash tashtashtash tatash", created: moment("20170915", "YYYYMMDD") },
      { id: 67, price: 45.70, name: 'Runaround Sue', description: "That's my story, it's sad but true.", created: moment("19991110", "YYYYMMDD") },
      { id: 89, price: 1090.50, name: 'Suspicious mind', description: "We caught in a trap I cant walk out", created: moment("20160626", "YYYYMMDD") }
    ]
  };
}
