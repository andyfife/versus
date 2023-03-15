import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Typto Social</title>
        <meta name="description" content="Typto Social App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#1b1c1d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Typto
          </h1>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!isSignedIn },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          {" "}
          <div className="absolute top-5 right-5 flex items-center justify-end">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "3rem",
                    height: "3rem",
                  },
                },
              }}
            />
          </div>
          <p className="text-1xl text-center text-white">
            {secretMessage && (
              <span>
                {" "}
                {secretMessage}
                <br />
              </span>
            )}
          </p>
        </>
      )}
      {!isSignedIn && (
        <p className="absolute top-5 right-5 flex items-center justify-end">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </div>
  );
};
