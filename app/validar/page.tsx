import { Suspense } from "react";
import ValidarClient from "./validar-client";

export default function ValidarPage() {
  return (
    <Suspense fallback={null}>
      <ValidarClient />
    </Suspense>
  );
}
