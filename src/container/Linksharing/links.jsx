import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";

const Links = () => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          {fields.map((item, index) => (
            <div key={item.id}>
              <div>
                <FormField
                  control={form.control}
                  name={`links.${index}.platform`}
                  render={(props) => (
                    <FormSelect
                      label="Change Status"
                      placeholder="Select Status"
                      options={[
                        { value: "github", text: "Github" },
                        { value: "youtube", text: "Youtube" },
                        { value: "linkedin", text: "Linkedin" },
                      ]}
                      {...props}
                    />
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`links.${index}.link`}
                  render={(props) => (
                    <FormInput label="Link" placeholder="Link" {...props} />
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              append({ platform: "", link: "" });
            }}
          >
            Add New Item
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default Links;
