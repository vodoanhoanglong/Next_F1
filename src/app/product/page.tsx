import { getDataProductPage } from "../../apis";
import { Footer, NavBar, Product } from "../../components";
import { IPageProps, IProductFilterProps } from "../../shared";

export default async function ProductPage({ searchParams }: IPageProps) {
  try {
    const { products, totalProduct, categories } = await getDataProductPage(searchParams as IProductFilterProps);

    return (
      <section>
        <NavBar isProduct={true} />
        <main className="overflow-hidden common-background">
          <Product products={products} categories={categories} totalProduct={totalProduct} />
        </main>
        <Footer />
      </section>
    );
  } catch (error) {
    return (
      <main>
        <p>Errors Something</p>
      </main>
    );
  }
}
