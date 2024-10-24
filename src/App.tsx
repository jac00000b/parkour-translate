import { useEffect, useState } from "react";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function App() {
  const [isSwitched, setIsSwitched] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const textToBinary = (text: string) => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ")
      .replace(/0/g, "_")
      .replace(/1/g, "[]");
  };

  const binaryToText = (binary: string) => {
    const normalized = binary.replace(/\[]/g, "1").replace(/_/g, "0");
    const bytes = normalized.split(" ");
    return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join("");
  };

  const handleSwitch = () => {
    setFrom(to);
    setTo(from);
    setIsSwitched(!isSwitched);
  };

  useEffect(() => {
    if (isSwitched) {
      try {
        setTo(binaryToText(from));
      } catch {
        setTo("Failed to convert");
      }
    } else {
      setTo(textToBinary(from));
    }
  }, [from, isSwitched]);

  return (
    <main className="container lg:p-16 p-8 min-h-screen">
      <h1 className="text-4xl font-bold">Parkour Translate</h1>
      <div className="flex lg:flex-row flex-col lg:gap-2 gap-4 my-4">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="from">{isSwitched ? "Parkour" : "Text"}</Label>
          <Textarea
            id="from"
            className="h-32"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center">
          <Button onClick={handleSwitch} className="lg:p-3">
            <ArrowLeftRight />
          </Button>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="to">{isSwitched ? "Text" : "Parkour"}</Label>
          <Textarea
            id="to"
            className="h-32 cursor-not-allowed opacity-50 focus-visible:ring-0"
            value={to}
            onClick={() => {
              navigator.clipboard.writeText(to);
              toast.success("Copied to clipboard");
            }}
          />
        </div>
      </div>
    </main>
  );
}
