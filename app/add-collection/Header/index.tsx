"use client";

import { useFormContext, UseFormRegister } from "react-hook-form";
import { Data } from "../page";
import HeaderUI from "./UI";

export default function Header() {
  const { register } = useFormContext();

  return <HeaderUI register={register} />;
}
