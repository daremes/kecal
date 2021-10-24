import { ReactNode } from "react";
import { createUseStyles } from "react-jss";

interface Props {
  children: ReactNode;
}

const useStyles = createUseStyles({
  content: {
    width: "100%",
    height: "100%",
    maxWidth: 1192,
    overflowY: "hidden",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default function Content({ children }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
