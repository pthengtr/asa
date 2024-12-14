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

const numberClass = "text-6xl bg-gray-100 text-gray-700 hover:bg-gray-200";
const gray100Class = "bg-gray-100 text-gray-700 hover:bg-gray-200";
const gray400Class = "bg-gray-300 text-gray-800 hover:bg-gray-400";
const gray500Class = "bg-gray-500 text-gray-100 hover:bg-gray-400";
const yellow200Class = "bg-yellow-200 text-gray-800 hover:bg-yellow-300";
const blue800Class = "bg-blue-800 text-gray-100 hover:bg-blue-700";
const red500Class = "bg-red-700 text-gray-100 hover:bg-red-600";
const green500Class = "bg-lime-500 text-gray-700 hover:bg-lime-400";
const yellow400Class = "bg-yellow-400 text-gray-700 hover:bg-yellow-500";
const textYellow = "text-yellow-500";
const textGreen = "text-lime-500";

export default function MainPage() {
  const buttonArray = [
    { name: "MAIN MENU", class: yellow200Class },
    { name: "1", class: numberClass },
    { name: "2", class: numberClass },
    { name: "3", class: numberClass },
    { name: "แก้ไข", class: gray500Class },
    { name: "ยกเลิกรายการ", class: `${gray500Class} ${textYellow}` },
    { name: "รายงาน X", class: yellow400Class },
    { name: "ปรับปรุงข้อมูล", class: gray400Class },
    { name: "เวลา เข้า-ออก", class: blue800Class },
    { name: "4", class: numberClass },
    { name: "5", class: numberClass },
    { name: "6", class: numberClass },
    { name: "เวลาพัก", class: gray500Class },
    { name: "คืนเงิน", class: `${gray500Class} ${textYellow}` },
    { name: "รายงาน Z", class: yellow400Class },
    { name: "จำนวน", class: gray400Class },
    { name: "รับข้อมูล", class: green500Class },
    { name: "7", class: numberClass },
    { name: "8", class: numberClass },
    { name: "9", class: numberClass },
    { name: "TARGET", class: gray500Class },
    { name: "ของเสีย", class: `${gray500Class} ${textYellow}` },
    { name: "รายงานระบุวัน", class: yellow400Class },
    { name: "ชำระเงิน", class: gray400Class },
    { name: "SHUTDOWN", class: red500Class },
    {
      name: "รับของเพื่อซ่อม",
      class: gray100Class,
    },
    { name: "0", class: numberClass },
    { name: ". Edit", class: gray100Class },
    { name: "ตกลง", class: `${gray500Class} ${textGreen}` },
    { name: "X", class: `${gray500Class} ${textYellow}` },
    { name: "รายงานสต๊อก", class: yellow400Class },
    { name: "พิมใบเสร็จ", class: gray400Class },
  ];
  return (
    <main className="grid grid-cols-3 h-full">
      <section className="bg-green-700 col-span-2 h-[75vh] w-full">
        <div className="grid grid-cols-8 border gap-2 p-2">
          <div className="col-span-8">
            <Input
              type="number"
              className="md:text-6xl bg-white text-right p-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            ></Input>
          </div>
          <div className="col-span-8  text-white p-4 font-semibold grid place-content-center text-4xl">
            <span>... ยิง Barcode หรือ กดรหัสสินค้า ...</span>
          </div>
          {buttonArray.map((button) => (
            <Button
              key={button.name}
              className={`text-2xl p-14 shadow-lg ${button.class}`}
            >
              {button.name}
            </Button>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 row-span-2 h-full w-full flex flex-col">
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
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Separator />
        <div className="grid grid-cols-2 px-8">
          <span className="text-3xl">รวมค่าบริการ</span>
          <span className="text-3xl text-right">0.00</span>
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
