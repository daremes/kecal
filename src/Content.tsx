import { ReactNode } from "react";
import { createUseStyles } from "react-jss";

interface Props {
  children: ReactNode;
}

const useStyles = createUseStyles({
  content: {
    width: "100%",
    maxWidth: 1192,
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
