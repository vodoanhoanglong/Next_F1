import { getDataAboutPage } from "../../apis";
import { About, Footer, IIntroduction, NavBar } from "../../components";

export default async function AboutPage() {
  const { introduction, partner } = await getDataAboutPage();
  const parseData = JSON.parse(introduction.data) as IIntroduction;

  return (
    <section>
      <NavBar />
      <About introduction={introduction} parseData={parseData} partner={partner} />
      <Footer />
    </section>
  );
}
