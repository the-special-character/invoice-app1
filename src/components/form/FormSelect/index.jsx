import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSelect = ({ field, label, desc, placeholder, options }) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((x) => (
          <SelectItem key={x.value} value={x.value}>
            {x.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {desc && <FormDescription>{desc}</FormDescription>}
    <FormMessage />
  </FormItem>
);

export default FormSelect;
