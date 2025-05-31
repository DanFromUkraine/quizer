import { IconType } from "react-icons";
import { FaApple, FaFacebook, FaLock } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Poppins } from "next/font/google";
import clsx from "clsx";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Button = { text: string; Icon: IconType };

const links: Button[] = [
  {
    Icon: FaGoogle,
    text: "Continue with Google",
  },
  {
    Icon: FaApple,
    text: "Continue with Apple",
  },
  {
    Icon: FaFacebook,
    text: "Continue with Facebook ",
  },
];

function ButtonUI({ text, Icon }: Button) {
  return (
    <button className="flex gap-3 items-center px-13 py-3.5 border border-lightBgV2 max-w-[340px] rounded-md font-medium">
      <Icon className="text-xl" />
      <p>{text}</p>
    </button>
  );
}

function RenderButtons() {
  return (
    <section className="flex flex-col gap-6">
      {links.map((btnProps) => (
        <ButtonUI key={btnProps.text} {...btnProps} />
      ))}
    </section>
  );
}

function Heading() {
  return (
    <section className="flex flex-col items-center justify-center">
      <FaLock className="text-blueAccentV2 text-5xl mb-2" />
      <h1 className="mb-3 font-semibold text-2xl">Sign in to Your Account</h1>
      <p className="font-normal text-secondary">
        Continue with a social account or skip for now
      </p>
    </section>
  );
}

function SkipBtn() {
  return <button className="text-secondary">Skip for now</button>;
}

export default function page() {
  return (
    <main
      className={clsx(
        poppinsFont.className,
        "w-full h-screen flex justify-center items-center"
      )}
    >
      <div className="flex flex-col gap-12">
        <Heading />
        <RenderButtons />
        <SkipBtn />
      </div>
    </main>
  );
}
