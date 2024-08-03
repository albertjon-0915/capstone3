import Banner from "../components/Banner";

export default function () {
     const prop = {
          title: "404 Not Found",
          description: "Something went wrong!",
     };
     return <Banner prop={prop} />;
}
