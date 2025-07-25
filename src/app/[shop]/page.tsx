import PosProvider from "../component/PosProvider";
import MainPage from "../component/MainPage";

type ShopParams = {
  params: Promise<{ shop: string }>;
};

export default async function Home({ params }: ShopParams) {
  const shop = (await params).shop;
  return (
    <PosProvider>
      <MainPage shop={shop} />
    </PosProvider>
  );
}
