import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./profile";
import Links from "./links";
import Preview from "./preview";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export function Linksharing() {
  const methods = useForm();

  return (
    <Tabs defaultValue="account" className="container mx-auto">
      <header className="flex items-center justify-between">
        <a href="#">Logo</a>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <Button variant="outline">Preview</Button>
      </header>

      <FormProvider {...methods}>
        <div className="flex">
          <div className="flex-1">
            <Preview />
          </div>
          <div className="flex-1">
            <TabsContent value="account">
              <Links />
            </TabsContent>
            <TabsContent value="password">
              <Profile />
            </TabsContent>
          </div>
        </div>
      </FormProvider>
    </Tabs>
  );
}
