"use client";

import { ChangeEvent, FormEventHandler, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import QuestionTitleUI from "./UI";
import { useChangeStatusBarColor } from "@/app/lib/jotai/userState";
import { createDebounce } from "@/app/lib/debounce";
import { useDebounceInputAndUpdateStatusBar } from "@/app/lib/debounceInput";

export function QuestionTitle() {
  const { control } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.nativeEvent.target as HTMLTextAreaElement;

    if (textarea && "style" in textarea) {
      textarea.style.height = "48px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const onDebounceChange = useDebounceInputAndUpdateStatusBar();

  return (
    <QuestionTitleUI {...{ onDebounceChange, onInput, textareaRef, control }} />
  );
}
