import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";

const Profile = () => {
  const form = useFormContext();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={(props) => (
                <FormInput
                  label="First Name"
                  placeholder="Enter First Name"
                  autoComplete="given-name"
                  {...props}
                />
              )}
            />
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="lastName"
                render={(props) => (
                  <FormInput
                    label="Last Name"
                    placeholder="Enter Last Name"
                    autoComplete="family-name"
                    {...props}
                  />
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="email"
                render={(props) => (
                  <FormInput
                    label="Email"
                    placeholder="Enter Email"
                    type="email"
                    autoComplete="email"
                    {...props}
                  />
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Profile;
