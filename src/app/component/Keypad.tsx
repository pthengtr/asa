import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { PosContext, PosContextType } from "./PosProvider";
import {
  numberClass,
  yellow200Class,
  gray100Class,
  gray400Class,
  gray500Class,
  yellow400Class,
  textYellow,
  textGreen,
  green500Class,
  blue800Class,
  red500Class,
} from "../lib/constants";
import ModeMsg from "./ModeMsg";

export default function Keypad() {
  const {
    inputText,
    setInputText,
    handleClick,
    handleClickCancel,
    handleClickNumber,
    handleClickDelete,
    handleClickEnter,
    handleSubmitForm,
    handleClickPayamount,
  } = useContext(PosContext) as PosContextType;

  const buttonArray = [
    { name: "MAIN MENU", class: yellow200Class, func: handleClick },
    { name: "1", class: numberClass, func: handleClickNumber },
    { name: "2", class: numberClass, func: handleClickNumber },
    { name: "3", class: numberClass, func: handleClickNumber },
    { name: "แก้ไข", class: gray500Class, func: handleClickDelete },
    {
      name: "ยกเลิกรายการ",
      class: `${gray500Class} ${textYellow}`,
      func: handleClickCancel,
    },
    { name: "รายงาน X", class: yellow400Class, func: handleClick },
    { name: "ปรับปรุงข้อมูล", class: gray400Class, func: handleClick },
    { name: "เวลา เข้า-ออก", class: blue800Class, func: handleClick },
    { name: "4", class: numberClass, func: handleClickNumber },
    { name: "5", class: numberClass, func: handleClickNumber },
    { name: "6", class: numberClass, func: handleClickNumber },
    { name: "เวลาพัก", class: gray500Class, func: handleClick },
    {
      name: "คืนเงิน",
      class: `${gray500Class} ${textYellow}`,
      func: handleClick,
    },
    { name: "รายงาน Z", class: yellow400Class, func: handleClick },
    { name: "จำนวน", class: gray400Class, func: handleClick },
    { name: "รับข้อมูล", class: green500Class, func: handleClick },
    { name: "7", class: numberClass, func: handleClickNumber },
    { name: "8", class: numberClass, func: handleClickNumber },
    { name: "9", class: numberClass, func: handleClickNumber },
    { name: "TARGET", class: gray500Class, func: handleClick },
    {
      name: "ของเสีย",
      class: `${gray500Class} ${textYellow}`,
      func: handleClick,
    },
    { name: "รายงานระบุวัน", class: yellow400Class, func: handleClick },
    { name: "ชำระเงิน", class: gray400Class, func: handleClickPayamount },
    { name: "SHUT DOWN", class: red500Class, func: handleClick },
    { name: "รับของเพื่อซ่อม", class: gray100Class, func: handleClick },
    { name: "0", class: numberClass, func: handleClickNumber },
    { name: ". Edit", class: gray100Class, func: handleClick },
    {
      name: "ตกลง",
      class: `${gray500Class} ${textGreen}`,
      func: handleClickEnter,
    },
    { name: "X", class: `${gray500Class} ${textYellow}`, func: handleClick },
    { name: "รายงานสต๊อก", class: yellow400Class, func: handleClick },
    { name: "พิมใบเสร็จ", class: gray400Class, func: handleClick },
  ];

  return (
    <div className="grid grid-cols-8 border gap-2 p-2">
      <div className="col-span-8">
        <form onSubmit={(e) => handleSubmitForm(e)}>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            type="number"
            autoFocus
            onBlur={({ target }) => target.focus()}
            className="md:text-6xl bg-white text-right p-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          ></Input>
        </form>
      </div>
      <div className="col-span-8  text-white p-4 font-semibold grid place-content-center text-4xl">
        <ModeMsg />
      </div>
      {buttonArray.map((button) => (
        <Button
          key={button.name}
          className={`text-2xl shadow-lg text-wrap h-24 active:scale-[98%] hover:scale-[103%] ${button.class}`}
          onClick={() => button.func(button.name)}
        >
          {button.name}
        </Button>
      ))}
    </div>
  );
}
