import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormDatePicker from "@/components/form/FormDatePicker";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, { message: "" }).max(16, { message: "" }),
  email: z.string().email({ message: "select valid data" }),
  birthDate: z.date(),
});

const InvoiceCreate = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      birthDate: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
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
              {...props}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default InvoiceCreate;
