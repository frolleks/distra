import { SignUpForm } from "@/components/sign-up-form";
import { auth } from "@/lib/auth/lucia";

import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const authRequest = auth.handleRequest("GET", context);
  const cookieSession = await authRequest.validate();
  const bearerSession = await authRequest.validateBearerToken();

  if (!cookieSession || bearerSession) {
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
