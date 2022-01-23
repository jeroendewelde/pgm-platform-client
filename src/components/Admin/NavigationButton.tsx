import React, { ReactElement } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { Button } from "@mui/material";

interface NavigationButtonProps {
  path?: string | null;
  title: string;
}

export default function NavigationButton({
  title,
  path = null,
}: NavigationButtonProps): ReactElement {
  const router = useRouter();
  return (
    <Link href={path ? `admin/${path}` : `${router.pathname}/create`}>
      <Button
        variant="outlined"
        sx={{
          textTransform: "capitalize",
          mb: 2,
        }}
      >
        {path ? title : `${title} Toevoegen`}
      </Button>
    </Link>
  );
}
