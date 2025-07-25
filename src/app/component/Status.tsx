import { useEffect, useState } from "react";

export default function Status() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();

      const currentDate = date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const currentTime = date.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDate(currentDate);
      setTime(currentTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-4xl text-gray-100 gap-4">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
}
