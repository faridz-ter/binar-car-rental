import { PropsWithChildren, useEffect, useState } from "react";

export default function PublicProvider({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = "/management";
    } else {
      setShow(true);
    }
  }, [token]);

  if (show) {
    return children;
  }

  return <></>;
}
