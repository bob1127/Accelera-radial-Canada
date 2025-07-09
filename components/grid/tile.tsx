import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group relative flex w-full items-center flex-col justify-center overflow-hidden h-[420px] rounded-lg bg-white transition-all",
        {
          "ring-2 ring-black": active,
          "border border-neutral-200 dark:border-neutral-800": !active,
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx("!w-[90%] mx-auto h-[80px]", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
          {...props}
        />
      ) : null}

      {/* 文字區塊（Label + Buy Now） */}
      {label && (
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ease-in-out group-hover:-translate-y-12"
          )}
        >
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position="bottom"
          />
        </div>
      )}

      {/* Buy Now 按鈕（可視需要啟用） */}
      {/* <button
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 bottom-[-48px] opacity-0 group-hover:bottom-3 group-hover:opacity-100 transition-all duration-300 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg"
        )}
      >
        Buy Now
      </button> */}
    </div>
  );
}
