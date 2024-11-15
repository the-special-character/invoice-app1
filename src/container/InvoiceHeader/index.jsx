import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Mail } from "lucide-react";
import InvoiceCreate from "../InvoiceCreate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInvoice } from "@/context/invoiceContext";

const InvoiceHeader = () => {
  const { openSheet, toggleSheet, invoices } = useInvoice();
  return (
    <div className="flex justify-between container mx-auto items-center">
      <div>
        <h1>Invoices</h1>
        <p>{`There are ${invoices.length} invoices`}</p>
      </div>
      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Sheet open={openSheet} onOpenChange={toggleSheet}>
          <SheetTrigger asChild>
            <Button>
              <Mail /> New Invoice
            </Button>
          </SheetTrigger>
          <SheetContent className="!max-w-2xl p-0">
            <ScrollArea className="w-full h-full p-6">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>

              <InvoiceCreate />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default InvoiceHeader;
