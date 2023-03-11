import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { authenticator, Strategies } from "~/authenticator.server";

export async function loader() {
  return redirect("/login");
}

export async function action({ request, params }: ActionArgs) {
  invariant(params.provider, "Provider is not found which is pretty weird");
  const provider = Strategies.parse(params.provider);
  return authenticator.authenticate(provider, request);
}
