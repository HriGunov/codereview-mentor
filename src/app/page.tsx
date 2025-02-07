import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col justify-end bg-neutral-800">
        <div className="container flex w-full grow flex-col gap-6">
          <div className="h-screen">Large element</div>{" "}
          <div className="h-screen">Large element</div>
        </div>
        <form className="flex items-center justify-center gap-4 bg-neutral-900 p-8">
          <button type="submit">Submit</button>
        </form>
      </div>
    </HydrateClient>
  );
}
