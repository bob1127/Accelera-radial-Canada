import clsx from "clsx";

function Grid(props: React.ComponentProps<"ul">) {
  return (
    <ul {...props} className={clsx(" flex flex-wrap", props.className)}>
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={clsx(
        "aspect-square my-8 w-[400px] mx-3 transition-opacity",
        props.className
      )}
    >
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;
