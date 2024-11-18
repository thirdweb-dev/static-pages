import { Logo } from "@/app/thirdweb-logo";

const CompletePage = () => {
  return (
    <main className="flex flex-col grow items-center gap-8 justify-center p-8">
      <Logo />
      <div className="flex flex-col text-center gap-4">
        <h1>Authentication Complete!</h1>
        <h2>You can close this tab now and return to the app</h2>
      </div>
    </main>
  );
};

CompletePage.displayName = "CompletePage";

export default CompletePage;
