import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormDatePicker from "@/components/form/FormDatePicker";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useInvoice } from "@/context/invoiceContext";

const FormSchema = z.object({
  id: z.string().nullable(),
  billFrom: z.object({
    address: z.object({
      street: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      postCode: z.string().min(1, "Post Code is required"),
      country: z.string().min(1, "Country is required"),
    }),
  }),
  billTo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    address: z.object({
      street: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      postCode: z.string().min(1, "Post Code is required"),
      country: z.string().min(1, "Country is required"),
    }),
  }),
  invoiceDate: z.date().refine((date) => date >= new Date(), {
    message: "Invoice Date must be today or later",
  }),
  paymentTerms: z.string().min(1, "Payment Terms are required"),
  projectDescription: z.string().optional(),
  itemList: z
    .array(
      z.object({
        itemName: z.string().min(1, "Item Name is required"),
        quantity: z.preprocess((val) => {
          const num = Number(val);
          return isNaN(num) ? undefined : num;
        }, z.number().min(1, "Quantity must be at least 1")),
        price: z.preprocess((val) => {
          const num = Number(val);
          return isNaN(num) ? undefined : num;
        }, z.number().min(0, "Quantity must be at least 0")),
      })
    )
    .optional(),
  status: z.enum(["pending", "paid", "partially paid"]),
});

const InvoiceCreate = () => {
  const { createInvoice, currentInvoice } = useInvoice();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: currentInvoice || {
      id: null,
      billFrom: {
        address: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
      },
      billTo: {
        name: "",
        email: "",
        address: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
      },
      invoiceDate: "",
      paymentTerms: "",
      projectDescription: "",
      itemList: [],
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itemList",
  });

  const { itemList } = form.watch();

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createInvoice)}
        className="flex flex-col gap-4"
      >
        {currentInvoice && (
          <FormField
            control={form.control}
            name="status"
            render={(props) => (
              <FormSelect
                label="Change Status"
                placeholder="Select Status"
                options={[
                  { value: "pending", text: "Pending" },
                  { value: "paid", text: "Paid" },
                  { value: "draft", text: "Draft" },
                ]}
                {...props}
              />
            )}
          />
        )}
        <FormField
          control={form.control}
          name="billFrom.address.street"
          render={(props) => (
            <FormInput label="Street" placeholder="Enter Street" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="billFrom.address.city"
          render={(props) => (
            <FormInput label="City" placeholder="Enter City" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="billFrom.address.postCode"
          render={(props) => (
            <FormInput
              label="PostCode"
              placeholder="Enter PostCode"
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="billFrom.address.country"
          render={(props) => (
            <FormInput label="Country" placeholder="Enter Country" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="billTo.name"
          render={(props) => (
            <FormInput label="Name" placeholder="Enter Name" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="billTo.email"
          render={(props) => (
            <FormInput label="Email" placeholder="Enter Email" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="billTo.address.street"
          render={(props) => (
            <FormInput label="Street" placeholder="Enter Street" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="billTo.address.city"
          render={(props) => (
            <FormInput label="City" placeholder="Enter City" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="billTo.address.postCode"
          render={(props) => (
            <FormInput
              label="PostCode"
              placeholder="Enter PostCode"
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="billTo.address.country"
          render={(props) => (
            <FormInput label="Country" placeholder="Enter Country" {...props} />
          )}
        />
        <FormField
          control={form.control}
          name="invoiceDate"
          render={(props) => (
            <FormDatePicker
              label="Invoice Date"
              placeholder="Select Invoice Date"
              disabled={(date) => date <= new Date()}
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="paymentTerms"
          render={(props) => (
            <FormSelect
              label="Payment Terms"
              placeholder="Select Payment Terms"
              options={[
                { value: "15", text: "Next 15 Days" },
                { value: "30", text: "Next 30 Days" },
                { value: "60", text: "Next 60 Days" },
              ]}
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={(props) => (
            <FormInput
              label="Project Description"
              placeholder="Enter Project Description"
              {...props}
            />
          )}
        />
        <Table>
          {fields.length > 0 && (
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead className="w-[100px]">Qty.</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <FormField
                    control={form.control}
                    name={`itemList.${index}.itemName`}
                    render={(props) => (
                      <FormInput placeholder="Enter Item Name" {...props} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`itemList.${index}.quantity`}
                    rules={{ valueAsNumber: true }}
                    render={(props) => (
                      <FormInput placeholder="Qty." type="number" {...props} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`itemList.${index}.price`}
                    render={(props) => (
                      <FormInput placeholder="Price" type="number" {...props} />
                    )}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency",
                  }).format(
                    (itemList[index]?.quantity || 0) *
                      (itemList[index].price || 0)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" onClick={() => remove(index)}>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    append({ itemName: "", quantity: "", price: "" });
                  }}
                >
                  Add New Item
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <Button
          type="button"
          onClick={() =>
            createInvoice({ ...form.getValues(), status: "draft" })
          }
        >
          Draft
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default InvoiceCreate;
