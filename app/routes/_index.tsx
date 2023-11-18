import type { MetaFunction } from "@remix-run/node";
import { Input } from "~/@/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Input type="email" placeholder="Email" />
    </div>
  );
}
