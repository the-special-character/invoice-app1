import InvoiceHeader from "./container/InvoiceHeader";
import InvoiceTable from "./container/InvoiceTable";
import { InvoiceProvider } from "./context/invoiceContext";

function App() {
  return (
    <InvoiceProvider>
      <InvoiceHeader />
      <InvoiceTable />
    </InvoiceProvider>
  );
}

export default App;
