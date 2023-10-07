"use client";
import { FormControl, InputBase, InputLabel, alpha, styled } from "@mui/material";
import Link from "next/link";
import { NavBarKey, NavBarLink } from "../../components";

const BootstrapInputShort = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const BootstrapInputLong = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "500px",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default async function ContactPage() {
  return (
    <div className="contact common-background">
      <div className="contact__intro">
        <div className="contact__intro-wrapper">
          <h1>Liên hệ với chúng tôi</h1>
          <p>
            Đừng ngần ngại gửi cho chúng tôi một số dòng. Và nếu bạn không thể chờ đợi, hãy gọi cho chúng tôi ngay bây
            giờ. Vâng! Bạn cũng có thể gửi email cho chúng tôi bằng cách sử dụng mẫu dưới đây!
          </p>
        </div>
        <div className="contact__form">
          <div className="contact__form-wrapper">
            <div className="flex justify-center">
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Họ và tên *
                </InputLabel>
                <BootstrapInputLong placeholder="Tien Hung" />
              </FormControl>
            </div>
            <div className="flex justify-between mt-5">
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Email *
                </InputLabel>
                <BootstrapInputShort placeholder="example@gmail.com" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Số điện thoại *
                </InputLabel>
                <BootstrapInputShort placeholder="0932509283" />
              </FormControl>
            </div>
            <div className="flex justify-center mt-5">
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Thông điệp của bạn cho chúng tôi*
                </InputLabel>
                <BootstrapInputLong placeholder="Chúng tôi có thể giúp gì cho bạn" />
              </FormControl>
            </div>
            <div className="mt-5 flex justify-center">
              <button>
                <Link href={`${NavBarLink[NavBarKey.Contact]}`}>Gửi đi</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
