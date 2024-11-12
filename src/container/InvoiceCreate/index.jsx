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

const FormSchema = z.object({
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
  invoiceDate: z.string().min(1, "Invoice Date is required"),
  paymentTerms: z.string().min(1, "Payment Terms are required"),
  projectDescription: z.string().optional(),
  itemList: z
    .array(
      z.object({
        itemName: z.string().min(1, "Item Name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        price: z.number().min(0, "Price must be at least 0"),
      })
    )
    .optional(),
});

const InvoiceCreate = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itemList",
  });

  const { itemList } = form.watch();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="billFrom.address.street"
          render={(props) => (
            <FormInput
              label="Username"
              placeholder="Enter Username"
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="billFrom.address.city"
          render={(props) => (
            <FormInput
              label="Username"
              placeholder="Enter Username"
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="billFrom.address.street"
          render={(props) => (
            <FormInput
              label="Username"
              placeholder="Enter Username"
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="billFrom.address.postCode"
          render={(props) => (
            <FormInput
              label="Username"
              placeholder="Enter Username"
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={(props) => (
            <FormInput
              label="Password"
              placeholder="Enter Password"
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={(props) => (
            <FormSelect
              label="Email"
              placeholder="Enter Password"
              options={[
                { value: "a@example.com", text: "a@example.com" },
                { value: "b@example.com", text: "b@example.com" },
                { value: "c@example.com", text: "c@example.com" },
              ]}
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={(props) => (
            <FormDatePicker
              label="Birth Date"
              placeholder="Select Your Birthdate"
              disabled={(date) => date > new Date()}
              {...props}
            />
          )}
        />
        <FormField
          control={form.control}
          name="joiningDate"
          render={(props) => (
            <FormDatePicker
              label="Joining Date"
              placeholder="Select Your Joining Date"
              disabled={(date) => date < new Date()}
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
                  {(itemList[index]?.quantity || 0) *
                    (itemList[index].price || 0)}
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default InvoiceCreate;
