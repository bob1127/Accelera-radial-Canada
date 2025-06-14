import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-md p-3 shadow-md">
      <h3 className="text-sm font-medium text-black line-clamp-2 mb-1">
        {title}
      </h3>
      <Price
        className="text-base font-bold text-black"
        amount={amount}
        currencyCode={currencyCode}
        currencyCodeClassName="hidden @[275px]/label:inline"
      />
    </div>
  );
};

export default Label;
