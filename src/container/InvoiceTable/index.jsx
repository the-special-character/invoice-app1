import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useInvoice } from "@/context/invoiceContext";
import { add, format } from "date-fns";

function InvoiceTable() {
  const { invoices, toggleSheet, setCurrentInvoice } = useInvoice();

  const handleRowClick = (invoice) => {
    setCurrentInvoice({
      ...invoice,
      invoiceDate: new Date(invoice.invoiceDate),
    });
    toggleSheet();
  };

  return (
    <Table className="container mx-auto">
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.id}
            onClick={() => handleRowClick(invoice)}
            className="cursor-pointer hover:bg-muted/50"
          >
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              {invoice.invoiceDate
                ? `Due ${format(
                    add(new Date(invoice.invoiceDate), {
                      days: Number(invoice.paymentTerms),
                    }),
                    "dd LLL yyyy"
                  )}`
                : ""}
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
