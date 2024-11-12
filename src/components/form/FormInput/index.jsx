import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormInput = ({ field, fieldState, formState, label, desc, ...props }) => (
  <FormItem>
    {label && <FormLabel>{label}</FormLabel>}
    <FormControl>
      <Input placeholder="shadcn" {...field} {...props} />
    </FormControl>
    {desc && <FormDescription>{desc}</FormDescription>}
    <FormMessage />
  </FormItem>
);

export default FormInput;
