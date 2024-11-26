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
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const toggleSheet = useCallback(() => {
    setOpenSheet((val) => {
      const newVal = !val;
      if (!newVal) setCurrentInvoice(null);
      return newVal;
    });
  }, []);

  const loadInvoices = useCallback(async (filter) => {
    try {
      console.log(filter);
      console.log(`http://localhost:3000/invoices${filter || ""}`);

      const res = await fetch(`http://localhost:3000/invoices${filter || ""}`);
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
        if (data.id) {
          const res = await fetch(`http://localhost:3000/invoices/${data.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: {
              "content-type": "application/json",
            },
          });
          const json = await res.json();
          setInvoices((val) => {
            const index = val.findIndex((x) => x.id === json.id);
            return [...val.slice(0, index), json, ...val.slice(index + 1)];
          });
        } else {
          const { id, ...rest } = updatedData;
          const res = await fetch("http://localhost:3000/invoices", {
            method: "POST",
            body: JSON.stringify(rest),
            headers: {
              "content-type": "application/json",
            },
          });
          const json = await res.json();
          setInvoices((val) => [json, ...val]);
        }

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
      currentInvoice,
      loadInvoices,
      createInvoice,
      deleteInvoice,
      updateInvoice,
      toggleSheet,
      setCurrentInvoice,
    }),
    [
      invoices,
      openSheet,
      currentInvoice,
      loadInvoices,
      createInvoice,
      deleteInvoice,
      updateInvoice,
      toggleSheet,
      setCurrentInvoice,
    ]
  );

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};
