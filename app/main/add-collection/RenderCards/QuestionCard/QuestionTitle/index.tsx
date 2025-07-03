"use client";

import { createDebounce } from "@/app/lib/other";
import clsx from "clsx";
import {
  ChangeEvent,
  FormEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import QuestionTitleUI from "./UI";

export function QuestionTitle() {
  const { control } = useFormContext();
  const { updateCallback } = useMemo(() => createDebounce(), []);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.nativeEvent.target as HTMLTextAreaElement;

    if (textarea && "style" in textarea) {
      textarea.style.height = "48px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const onDebounceChange = (
    e: ChangeEvent,
    onChange: (e: ChangeEvent) => void
  ) => {
    updateCallback(() => onChange(e), 1000);
  };

  return (
    <QuestionTitleUI {...{ onDebounceChange, onInput, textareaRef, control }} />
  );
}
