"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const numberClass =
  "text-6xl bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(208,208,208,1)_100%)] text-gray-700";
const gray100Class =
  "bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(208,208,208,1)_100%)] text-gray-700";
const gray400Class =
  "bg-[radial-gradient(circle,rgba(208,208,208,1)_0%,rgba(150,150,150,1)_100%)] text-gray-800";
const gray500Class =
  "bg-[radial-gradient(circle,rgba(140,140,140,1)_0%,rgba(100,100,100,1)_100%)] text-gray-100";
const yellow200Class =
  "bg-[radial-gradient(circle,#f6ff71_0%,#fdf919_100%)] text-gray-800";
const blue800Class =
  "bg-[radial-gradient(circle,#7885ff_0%,#3a2cfd_100%)] text-gray-100";
const red500Class =
  "bg-[radial-gradient(circle,#ff7878_0%,#fc2727_100%)] text-gray-100";
const green500Class =
  "bg-[radial-gradient(circle,#aeff78_0%,#27fc27_100%)] text-gray-700";
const yellow400Class =
  "bg-[radial-gradient(circle,#f6ff71_0%,#fdf919_100%)] text-gray-700";
const textYellow = "text-yellow-400";
const textGreen = "text-lime-500";

type item_Type = {
  I_GRPID: string;
  I_ID: string;
  I_SHPSEL: number;
  I_THAIDESC: string;
  qty: number;
};

export default function MainPage() {
  const [inputText, setInputText] = useState("");
  const [billItems, setBillItems] = useState<item_Type[]>();
  const [selectedItem, setSelectedItem] = useState<item_Type>();

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
    { name: "ชำระเงิน", class: gray400Class, func: handleClick },
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

  function handleClick() {
    console.log("TBD");
  }
  function handleClickNumber(value: string) {
    const newInputText = inputText + value;
    setInputText(newInputText);
  }

  function handleClickDelete() {
    const newInputText = inputText.slice(0, -1);
    setInputText(newInputText);
  }

  async function getProductById() {
    const query = supabase
      .from("_POSINY")
      .select(`*`)
      .eq("I_ID", inputText)
      .limit(1);

    const { data, error } = await query;

    if (error) {
      console.log(error);
      return;
    }

    console.log(data);
    if (data.length === 0) {
      setInputText("");
      alert("รหัสสินค้าไม่ถูกต้อง");
      return;
    }

    addItem(data[0]);
  }

  function addItem(item: item_Type) {
    let newItems;
    if (!!billItems) {
      if (billItems.map((_item) => _item.I_ID).includes(item.I_ID)) {
        newItems = billItems.map((_item) => {
          if (_item.I_ID === item.I_ID) _item.qty++;
          return _item;
        });
      } else {
        item.qty = 1;
        newItems = [...billItems, item];
      }
    } else {
      item.qty = 1;
      newItems = [item];
    }

    setBillItems(newItems);
    setInputText("");
  }

  function removeItem() {
    if (!selectedItem) {
      alert("กรุณาเลือกรายการที่ต้องการลบ");
      return;
    }
    const newItems = billItems?.filter(
      (item) => item.I_ID !== selectedItem.I_ID
    );
    setBillItems(newItems);
    setSelectedItem(undefined);
  }

  function handleClickCancel() {
    removeItem();
  }

  function handleClickEnter() {
    getProductById();
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getProductById();
  }

  function getTotalPrice() {
    return !!billItems
      ? billItems.reduce((acc, bill) => bill.I_SHPSEL * bill.qty + acc, 0)
      : 0.0;
  }

  //   useEffect(() => {
  //     document.documentElement.requestFullscreen();
  //   }, []);

  return (
    <main id="main-ref" className="grid grid-cols-3 h-full">
      <section className="bg-green-700 col-span-2 h-[75vh] w-full">
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
            <span>... ยิง Barcode หรือ กดรหัสสินค้า ...</span>
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
      </section>
      <section className="bg-gray-100 row-span-2 h-full w-full flex flex-col p-4">
        <div className="flex flex-col gap-1 items-center p-2">
          <span className="text-4xl">อาสา เซอร์วิส</span>
          <span className="text-xl">010-เซ็นทรัล (ลาดพร้าว)</span>
          <span className="text-2xl">ใบกำกับภาษีอย่างย่อ</span>
          <span>เลขรหัสประจำเครื่อง F 05300 91 03610</span>
          <span>เลขประจำตัวผู้เสียภาษีอากร 0105543056787</span>
        </div>
        <Separator />
        <div className="flex flex-col">
          <span>เลขที่: </span>
          <span>วันที่: </span>
          <span>พนักงาน: </span>
        </div>
        <Separator />
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>QTY.</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!!billItems &&
                billItems.map((item, index) => (
                  <TableRow
                    onClick={() => setSelectedItem(item)}
                    key={item.I_ID + index}
                    className={`${
                      selectedItem?.I_ID === item.I_ID
                        ? "bg-blue-900 text-white hover:bg-blue-900"
                        : ""
                    }`}
                  >
                    <TableCell>{item.I_THAIDESC}</TableCell>
                    <TableCell className="text-right">
                      {item.I_SHPSEL.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-right">{item.qty}</TableCell>
                    <TableCell className="text-right">
                      {(item.qty * item.I_SHPSEL).toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <Separator />
        <div className="grid grid-cols-2">
          <span className="text-3xl">รวมค่าบริการ</span>
          <span className="text-3xl text-right">
            {getTotalPrice().toLocaleString("th-TH", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="text-3xl">จำนวนชำระ</span>
          <span className="text-3xl text-right">0.00</span>
          <span className="text-3xl">เงินทอน</span>
          <span className="text-3xl text-right">0.00</span>
        </div>
        <Separator />
        <div className="flex justify-center items-center text-2xl p-2">
          <span>***ราคารวมภาษีมูลค่าเพิ่ม***</span>
        </div>
        <Separator />
        <div className="flex flex-col items-center p-2">
          <span className="text-sm">โทรศัพท์ ศูนย์บริการ 02 541 1487</span>
          <span className="text-xl">ขอขอบคุณทุกท่านที่ใช้บริการ</span>
          <span className="text-sm">โทรศัพท์ สำนักงานใหญ่ 0 2285 2905</span>
        </div>
      </section>
      <section className="bg-purple-500 h-[25vh] w-full"></section>
      <section className="bg-green-500 h-[25vh] w-full"></section>
    </main>
  );
}
