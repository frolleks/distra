import { SignInForm } from "@/components/sign-in-form";
import { getSession } from "@/lib/auth/utils";

import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession(context);

  if (!session) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-96">
          <SignInForm />
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}
