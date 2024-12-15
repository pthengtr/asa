import MainPage from "./component/MainPage";
import PosProvider from "./component/PosProvider";

export default function Home() {
  return (
    <PosProvider>
      <MainPage />
    </PosProvider>
  );
}
