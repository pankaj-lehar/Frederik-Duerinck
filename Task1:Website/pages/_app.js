import "../styles/globals.css";
import "../Navbar/Navbar.css";
import Header from "../Navbar/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
