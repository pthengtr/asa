import { useContext } from "react";
import { PosContext, PosContextType } from "./PosProvider";

export default function ModeMsg() {
  const { mode } = useContext(PosContext) as PosContextType;

  let outputMsg = "";

  switch (mode) {
    case "search":
      outputMsg = "... ยิง Barcode หรือ กดรหัสสินค้า ...";
      break;
    case "payamount":
      outputMsg = "... บันทึกจำนวนเงินที่ชำระ ...";
      break;
  }

  return <span>{outputMsg}</span>;
}
