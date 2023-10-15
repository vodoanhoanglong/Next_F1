export function throwSafeError(error: any) {
  return error instanceof Error ? error : new Error(error);
}

export enum ErrorType {
  ProductCodeUnique = 'Uniqueness violation. duplicate key value violates unique constraint "products_code_key"',
}

export const ErrorMessage = {
  [ErrorType.ProductCodeUnique]: "Mã sản phẩm đã tồn tại",
};
