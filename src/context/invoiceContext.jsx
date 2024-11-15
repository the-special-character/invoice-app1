import React, {
  PureComponent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const InvoiceContext = createContext();

export const useInvoice = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);

  const toggleSheet = useCallback(() => setOpenSheet((val) => !val), []);

  const loadInvoices = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/invoices");
      const json = await res.json();
      setInvoices(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createInvoice = useCallback(
    async (data) => {
      try {
        const updatedData = {
          ...data,
          total: data.itemList.reduce((p, c) => {
            return p + c.quantity * c.price;
          }, 0),
        };

        const res = await fetch("http://localhost:3000/invoices", {
          method: "POST",
          body: JSON.stringify(updatedData),
          headers: {
            "content-type": "application/json",
          },
        });
        const json = await res.json();
        setInvoices((val) => [json, ...val]);
        toggleSheet();
      } catch (error) {
        console.log(error.message);
      }
    },
    [toggleSheet]
  );

  const deleteInvoice = useCallback(() => {}, []);

  const updateInvoice = useCallback(() => {}, []);

  const value = useMemo(
    () => ({
      invoices,
      openSheet,
      createInvoice,
      deleteInvoice,
      updateInvoice,
      toggleSheet,
    }),
    [
      invoices,
      openSheet,
      createInvoice,
      deleteInvoice,
      updateInvoice,
      toggleSheet,
    ]
  );

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};
