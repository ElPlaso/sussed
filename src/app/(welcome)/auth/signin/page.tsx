import { auth } from "@/auth";
import Login from "@/components/login/Login";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <Login />;
}
