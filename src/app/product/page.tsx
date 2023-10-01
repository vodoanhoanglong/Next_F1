import { getDataProductPage } from "../../apis";
import { Product } from "../../components";
import { IPageProps, IProductFilterProps } from "../../shared";

export default async function ProductPage({ searchParams }: IPageProps) {
  try {
    const { products, totalProduct, categories } = await getDataProductPage(searchParams as IProductFilterProps);

    return (
      <main className="overflow-hidden common-background">
        <Product products={products} categories={categories} totalProduct={totalProduct} />
      </main>
    );
  } catch (error) {
    return (
      <main>
        <p>Errors Something</p>
      </main>
    );
  }
}
