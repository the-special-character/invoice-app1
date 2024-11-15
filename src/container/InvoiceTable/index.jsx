import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useInvoice } from "@/context/invoiceContext";
import { add, format } from "date-fns";

function InvoiceTable() {
  const { invoices } = useInvoice();
  return (
    <Table className="container mx-auto">
      {/* <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Invoice Date</TableHead>
          <TableHead>Bill To</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              {`Due ${format(
                add(new Date(invoice.invoiceDate), {
                  days: Number(invoice.paymentTerms),
                }),
                "dd LLL yyyy"
              )}`}
            </TableCell>
            <TableCell>{invoice.billTo.name}</TableCell>
            <TableCell className="text-right">{invoice.total}</TableCell>
            <TableCell className="text-right">{invoice.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default InvoiceTable;
