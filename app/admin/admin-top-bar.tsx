import Image from "next/image";
import LogoutButton from "./logout-button";

export default function AdminTopBar({ username }: { username: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo_SM_icon_transparente.webp"
            alt=""
            aria-hidden="true"
            width={64}
            height={64}
            className="h-8 w-8 object-contain sm:h-9 sm:w-9"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-navy sm:text-base">
              Panel de colaboradores
            </p>
            <p className="hidden text-xs text-navy/50 sm:block">Soluciones Migratorias SM</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-navy/60 sm:block">
            Sesión: <span className="font-medium text-navy">{username}</span>
          </p>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
