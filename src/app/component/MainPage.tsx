"use client";

import Keypad from "./Keypad";
import Receipt from "./Reciept";

export default function MainPage() {
  //   useEffect(() => {
  //     document.documentElement.requestFullscreen();
  //   }, []);

  return (
    <main id="main-ref" className="grid grid-cols-3 h-full">
      <section className="bg-green-700 col-span-2 h-[75vh] w-full">
        <Keypad />
      </section>
      <section className="bg-gray-100 row-span-2 h-full w-full">
        <Receipt />
      </section>
      <section className="bg-purple-500 h-[25vh] w-full"></section>
      <section className="bg-green-500 h-[25vh] w-full"></section>
    </main>
  );
}
