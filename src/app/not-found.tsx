import { Logo } from "@/app/thirdweb-logo";

const NotFound = () => {
  return (
    <main className="flex flex-col grow items-center gap-8 justify-center">
      <Logo />
      <span className="text-2xl">Page Not Found</span>
    </main>
  );
}

NotFound.displayName = "NotFound";
export default NotFound;
