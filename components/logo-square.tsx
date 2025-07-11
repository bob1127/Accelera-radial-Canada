import Image from "next/image";
export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div>
      <Image
        src="/images/logo/Accelera-LOGO.png"
        placeholder="empty"
        priority
        alt="logo"
        width={200}
        height={80}
        className="max-w-[220px]"
      ></Image>
    </div>
  );
}
