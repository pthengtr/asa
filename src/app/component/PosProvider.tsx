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
  handleClickNumber: (value: string) => void;
  handleClick: () => void;
  handleClickDelete: () => void;
  handleClickCancel: () => void;
  handleClickEnter: () => void;
  handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClickPayamount: () => void;
  getTotalPrice: () => number;
};

export const PosContext = createContext<PosContextType | null>(null);

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
    handleClick,
    handleClickNumber,
    handleClickDelete,
    handleClickCancel,
    handleClickEnter,
    handleSubmitForm,
    handleClickPayamount,
    getTotalPrice,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
}
