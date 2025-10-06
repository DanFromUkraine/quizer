// 'use client';
//
// There's fundamental problem, that with sync atoms you cannot now, whether atom it just empty, or it hasn't just been updated yet
// I need to rewrite all main atom families into async style, but I think that currently I have higher priorities, that that
//
// import { useDeferredValue, useEffect, useRef, useState } from 'react';
// import { useAtom, useAtomValue } from 'jotai';
// import { StringAdapterAtom } from '@/src/types/jotaiGlobal';
// import { updateCardViaTextAtomFamily } from '@/src/jotai/cardAtoms';
//
// export default function useJotaiDeferredUpdateAdapter({
//         adapterAtom,
//         cardId
// }: {
//         adapterAtom: StringAdapterAtom;
//         cardId: string;
// }) {
//         /* This hook should only be used in components, that can be updated via text */
//         const prevUpdateCountNum = useRef(0);
//         const initPerformed = useRef(false);
//         const updateCount = useAtomValue(updateCardViaTextAtomFamily(cardId));
//         const [inputValue, setInputValue] = useState('');
//         const [jotaiValue, setJotaiValue] = useAtom(adapterAtom);
//         const deferredValue = useDeferredValue(inputValue);
//
//         useEffect(() => {
//                 if (!initPerformed.current && jotaiValue.length > 0) {
//                         setInputValue(jotaiValue);
//                         initPerformed.current = true;
//                 }
//         }, [jotaiValue]);
//
//         useEffect(() => {
//                 /* Update local value, if card was updated via text */
//                 if (updateCount > prevUpdateCountNum.current && jotaiValue) {
//                         setInputValue(jotaiValue);
//                         prevUpdateCountNum.current = updateCount;
//                 }
//         }, [updateCount, jotaiValue]);
//
//
//
//         useEffect(() => {
//                 /* Update idb, if local value has been changed */
//                 if (
//                         updateCount === prevUpdateCountNum.current &&
//                         jotaiValue.length > 0
//                 ) {
//                         setJotaiValue(deferredValue);
//                 }
//         }, [deferredValue, jotaiValue, updateCount]);
//
//         return [inputValue, setInputValue] as const;
// }
