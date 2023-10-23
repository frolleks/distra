import { SignUpForm } from "@/components/sign-up-form";
import { getSession } from "@/lib/auth/utils";

import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getSession(context);

  if (!session) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-96">
          <SignUpForm />
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}
