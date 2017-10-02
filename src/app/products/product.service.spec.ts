import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

import { ItemContainer } from './item-container';
import { ProductService } from './product.service';
import { Product } from './product';

describe('ProductService', function () {

  let http, result, logService;

  let productService: ProductService;

  beforeEach(() => {
    http = jasmine.createSpyObj('authHttp', ['get', 'delete', 'post', 'put']);
    result = jasmine.createSpyObj('result', ['json']);
    http.get.and.returnValue(Observable.of(result));
    http.delete.and.returnValue(Observable.of(result));
    http.post.and.returnValue(Observable.of(result));
    http.put.and.returnValue(Observable.of(result));

    logService = jasmine.createSpyObj('logService', ['logError']);

    productService = new ProductService(http, logService);
  });

  it('getProducts', () => {
    const expectedUrl = '/api/products?page=1&perpage=10&sortkey=name&sortorder=asc';

    const productContainer = new ItemContainer<Product>();
    result.json.and.returnValue(productContainer);

    productService.getProducts(1, 10, 'name', 'asc').subscribe(container => {
      expect(container).toEqual(productContainer);
    }, fail);

    expect(http.get).toHaveBeenCalledWith(expectedUrl);
    expect(result.json).toHaveBeenCalled();
  });

  it('deleteProduct', () => {
    const expectedUrl = '/api/products/123abc';

    const productId = '123abc';

    productService.deleteProduct(productId).subscribe(id => {
      expect(id).toEqual(productId);
    }, fail);

    expect(http.delete).toHaveBeenCalledWith(expectedUrl);
    expect(result.json).not.toHaveBeenCalled();
  });

  it('addProduct', () => {
    const expectedUrl = '/api/products';

    const productToAdd = new Product();

    const addedProduct = new Product();
    addedProduct._id = '123abc';

    result.json.and.returnValue(addedProduct);

    productService.addProduct(productToAdd).subscribe(product => {
      expect(product).toBe(addedProduct);
    }, fail);

    const args = http.post.calls.argsFor(0);
    expect(args[0]).toEqual(expectedUrl);
    expect(args[1]).toEqual(JSON.stringify(productToAdd));
    const headers: Headers = args[2].headers;
    expect(headers.get('Content-Type')).toEqual('application/json');

    expect(result.json).toHaveBeenCalled();
  });

  it('editProduct', () => {
    const expectedUrl = '/api/products/123abc';

    const productToEdit = new Product();
    productToEdit._id = '123abc';

    productService.editProduct(productToEdit).subscribe(editedProduct => {
      expect(editedProduct).toBe(productToEdit);
    }, fail);

    const args = http.put.calls.argsFor(0);
    expect(args[0]).toEqual(expectedUrl);
    expect(args[1]).toEqual(JSON.stringify(productToEdit));
    const headers: Headers = args[2].headers;
    expect(headers.get('Content-Type')).toEqual('application/json');

    expect(result.json).not.toHaveBeenCalled();
  });

});
