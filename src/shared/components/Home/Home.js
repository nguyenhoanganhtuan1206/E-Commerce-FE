import "./Home.scss";

import { Header } from "../../Layouts";
import SearchNavbar from "../SearchNavbar/SearchNavbar";
import { HomeProductList } from "../../../product/components";

const Home = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* Banner */}
      <section className="banner">
        <div className="banner__container">
          <div className="section-heading primary">
            <h2>Welcome to ClassiGrids</h2>
            <p>
              Buy And Sell Everything From Used Cars To Mobile Phones And
              Computers, Or Search For Property, Jobs And More.
            </p>
          </div>

          <SearchNavbar />
        </div>
      </section>
      {/* Banner */}

      {/* Latest Products */}
      <section className="latest-section">
        <div className="section-heading tertiary">
          <h2>Latest Products</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
        </div>

        <div className="container">
          <div className="latest__product-container">
            <div className="row w-100">
              <HomeProductList />
            </div>
          </div>
        </div>
      </section>
      {/* Latest Products */}
    </>
  );
};

export default Home;
