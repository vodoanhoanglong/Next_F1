export function throwSafeError(error: any) {
  return error instanceof Error ? error : new Error(error);
}
