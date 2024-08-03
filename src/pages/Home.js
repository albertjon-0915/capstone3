import Banner from "../components/Banner";

export default function () {
     const prop = {
          title: "Welcome to our Store!",
          description:
               "Indulge in the finest selection of organic fruits with our Gourmet Organic Fruit Basket. This beautifully curated basket includes a variety of fresh, hand-picked fruits that are perfect for any occasion. Each fruit is chosen for its exceptional quality, flavor, and nutritional value, ensuring a delightful and healthy treat for you and your loved ones.",
          destination: "/products",
     };
     return (
          <>
               <Banner prop={prop} />
          </>
     );
}
