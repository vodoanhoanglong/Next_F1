import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, SxProps, Theme } from "@mui/material";

export default function Breadcrumb({
  breadcrumbs,
  style,
}: {
  breadcrumbs: React.JSX.Element[];
  style: SxProps<Theme>;
}) {
  return (
    <Breadcrumbs sx={style} separator={<NavigateNextIcon fontSize="medium" />} aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}
