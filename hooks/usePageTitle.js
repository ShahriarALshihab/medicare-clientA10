"use client";

import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | MediCare Connect` : "MediCare Connect";
  }, [title]);
};

export default usePageTitle;
