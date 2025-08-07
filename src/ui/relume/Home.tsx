import { Cta13 } from "./components/Cta13";
import { Footer5 } from "./components/Footer5";
import { Header5 } from "./components/Header5";
import { Layout10 } from "./components/Layout10";
import { Layout12 } from "./components/Layout12";
import { Layout241 } from "./components/Layout241";
import { Layout246 } from "./components/Layout246";
import { Layout6 } from "./components/Layout6";
import { Navbar5 } from "./components/NavBar5";

export default function Home() {
  return (
    <div>
      <Navbar5 />
      <Header5 />
      <Layout12 />
      <Layout246 />
      <Layout6 />
      <Layout10 />
      <Layout241 />
      <Cta13 />
      <Footer5 />
    </div>
  );
}
