import { IconContext } from "react-icons";

export default function IconStyle({ style, children }: { style: IconContext; children: React.ReactNode }) {
  return (
    <IconContext.Provider value={style}>
      <div>{children}</div>
    </IconContext.Provider>
  );
}
