import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col justify-end bg-neutral-800 text-white">
        <div className="container flex w-full grow flex-col gap-6"></div>
        <form className="flex items-center justify-center gap-4 bg-neutral-900 p-8">
          <button type="submit">Submit</button>
        </form>
      </main>
    </HydrateClient>
  );
}
