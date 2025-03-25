import "../styles/global.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;