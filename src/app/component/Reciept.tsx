import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import { PosContext, PosContextType } from "./PosProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Receipt() {
  const { billItems, selectedItem, setSelectedItem, getTotalPrice, paid } =
    useContext(PosContext) as PosContextType;

  return (
    <div className=" flex flex-col p-4 h-full">
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
        <span className="text-3xl text-right">
          {parseFloat(paid !== "" ? paid : "0").toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="text-3xl">เงินทอน</span>
        <span className="text-3xl text-right">
          {(
            getTotalPrice() - parseFloat(paid !== "" ? paid : "0")
          ).toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
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
    </div>
  );
}
