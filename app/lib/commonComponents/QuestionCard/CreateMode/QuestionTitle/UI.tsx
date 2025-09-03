import clsx from 'clsx';
import { ChangeEvent, FormEventHandler, RefObject } from 'react';
import { Control, Controller } from 'react-hook-form';

export default function QuestionTitleUI({
        control,
        textareaRef,
        onInput
}: {
        control: Control;
        textareaRef: RefObject<HTMLTextAreaElement | null>;

        onInput: FormEventHandler<HTMLTextAreaElement>;
}) {
        return (
                <Controller
                        name='questionTitle'
                        control={control}
                        render={({ field: { value, ref, onChange } }) => (
                                <textarea
                                        ref={(e) => {
                                                ref(e);

                                                textareaRef.current = e;
                                        }}
                                        defaultValue={value}
                                        placeholder='Enter text'
                                        onChange={onChange}
                                        className={clsx(
                                                'resize-none overflow-hidden w-full rounded-lg bg-transparent  outline-1 outline-alternateBorder px-6 box-border leading-5 py-3 text-sm text-defaultText h-12'
                                        )}
                                        onInput={onInput}
                                />
                        )}
                />
        );
}
