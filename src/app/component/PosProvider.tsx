"use client";
import { createContext } from "react";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export type PosContextType = {
  inputText: string;
  setInputText: (discount: string) => void;
  mode: string;
  setMode: (mode: string) => void;
  paid: string;
  setPaid: (paid: string) => void;
  billItems: item_Type[] | undefined;
  setBillItems: (items: item_Type[] | undefined) => void;
  selectedItem: item_Type | undefined;
  setSelectedItem: (item: item_Type | undefined) => void;
  shopId: string;
  setShopId: (id: string) => void;
  handleClickNumber: (value: string) => void;
  handleClick: () => void;
  handleClickDelete: () => void;
  handleClickCancel: () => void;
  handleClickEnter: () => void;
  handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClickPayamount: () => void;
  handleClickPrint: () => void;
  handleClickReportX: () => void;
  getTotalPrice: () => number;
};

export const PosContext = createContext<PosContextType | null>(null);

export type transaction_type = {
  S_TRANS: number;
  S_DATE: string;
  S_TIME: string;
  S_ID: string;
  E_ID: string;
  I_ID: string;
  S_QTY: number;
  S_AMOUNT: number;
};

export type item_Type = {
  I_GRPID: string;
  I_ID: string;
  I_SHPSEL: number;
  I_THAIDESC: string;
  qty: number;
};

type PosProviderProps = {
  children: React.ReactNode;
};

export default function PosProvider({ children }: PosProviderProps) {
  const [inputText, setInputText] = useState("");
  const [billItems, setBillItems] = useState<item_Type[]>();
  const [selectedItem, setSelectedItem] = useState<item_Type>();
  const [mode, setMode] = useState("search");
  const [paid, setPaid] = useState("");
  const [shopId, setShopId] = useState("010");

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

  function handleClickCancel() {
    removeItem();
    if (mode !== "search") setMode("search");
  }

  function handleClickEnter() {
    manageInputSubmitted();
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    manageInputSubmitted();
  }

  function manageInputSubmitted() {
    switch (mode) {
      case "search":
        getProductById();
        break;
      case "payamount":
        setPaid(inputText);
        setMode("search");
        setInputText("");
        break;
    }
  }

  function handleClickPayamount() {
    setMode("payamount");
  }

  async function handleClickPrint() {
    const date = new Date();

    const queryDate = date
      .toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .substring(3);

    const query = supabase
      .from("_SAE")
      .select(`*`)
      .eq("S_ID", shopId)
      .ilike("S_DATE", `%${queryDate}`)
      .order("S_TRANS", { ascending: false })
      .limit(1);

    const { data, error } = await query;

    if (error) {
      console.log(error);
      return;
    }

    const newTranId = data.length === 0 ? 1 : data[0].S_TRANS + 1;

    if (!!billItems) {
      const newTransactions: transaction_type[] = billItems.map((item) => ({
        E_ID: "",
        S_ID: shopId,
        I_ID: item.I_ID,
        S_TRANS: newTranId,
        S_DATE: date.toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        S_TIME: date.toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        S_AMOUNT: item.I_SHPSEL * item.qty,
        S_QTY: item.qty,
      }));

      const { data, error } = await supabase
        .from("_SAE")
        .insert(newTransactions)
        .select();

      if (error) {
        console.log(error);
        return;
      }

      console.log(data);

      setBillItems(undefined);
    }
  }

  function handleClickReportX() {}

  function getTotalPrice() {
    return !!billItems
      ? billItems.reduce((acc, bill) => bill.I_SHPSEL * bill.qty + acc, 0)
      : 0.0;
  }

  const value = {
    inputText,
    setInputText,
    mode,
    setMode,
    billItems,
    paid,
    setPaid,
    setBillItems,
    selectedItem,
    setSelectedItem,
    shopId,
    setShopId,
    handleClick,
    handleClickNumber,
    handleClickDelete,
    handleClickCancel,
    handleClickEnter,
    handleSubmitForm,
    handleClickPayamount,
    handleClickPrint,
    handleClickReportX,
    getTotalPrice,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
}
