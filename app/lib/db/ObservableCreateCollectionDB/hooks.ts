// 'use client';
//
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
//
// import {
//         useAddCard,
//         useRemoveCard
// } from '@/app/books/edit/CardsContext/provider';
// import { useAddCollection } from '../Main';
// import { useObservableContext } from './context';
// import {
//         CollectionResult,
//         CreateCollectionDB,
//         CreateModeQuestionCardType
// } from './types';
// import { deleteThisDB, useInitCollectionTitle } from './utils';
// import { useCardsContext } from '@/app/books/edit/CardsContext/context';
// import { useCollectionTitleState } from '@/app/books/edit/CollectionTitleContext';
// import { Observable } from '@/app/lib/utils/observableLogic';
// import { EMPTY_CARD_TEMPLATE } from '@/app/lib/db/constants';
// import { SetState } from '@/app/lib/types/global';
//
// export function useGetCollectionTitle() {
//         const [loading, setLoading] = useState(true);
//         const [defaultCollectionTitle, setDefaultCollectionTitle] =
//                 useState('');
//
//         useInitCollectionTitle({ setLoading, setDefaultCollectionTitle });
//
//         return { defaultCollectionTitle, loading };
// }
//
// function getUpdateTitle(obs: Observable<CreateCollectionDB> | null) {
//         return (newTitle: string) => {
//                 obs?.requestData('update page title', async (db) => {
//                         await db.put('meta', {
//                                 id: 'collectionTitle',
//                                 value: newTitle
//                         });
//                 });
//         };
// }
//
// export function useUpdateBookTitle() {
//         const obs = useObservableContext();
//
//         const updateTitle = getUpdateTitle(obs);
//
//         return { updateTitle };
// }
//
// function useInitCards(
//         obs: Observable<CreateCollectionDB> | null,
//         setCardsStateOnly: SetState<CreateModeQuestionCardType[]>
// ) {
//         useEffect(() => {
//                 obs?.requestData('get all cards', async (db) => {
//                         const resultCards = await db.getAll('cards');
//                         setCardsStateOnly(resultCards);
//                 });
//         }, []);
// }
//
// export function useCards() {
//         const obs = useObservableContext();
//         const { cards, setCardsStateOnly } = useCardsContext();
//
//         useInitCards(obs, setCardsStateOnly);
//
//         return {
//                 cards,
//                 setCardsStateOnly
//         };
// }
//
// function getAddEmptyCard(
//         obs: Observable<CreateCollectionDB> | null,
//         addCard: (newCard: CreateModeQuestionCardType) => void
// ) {
//         return () => {
//                 obs?.requestData('add empty card', async (db) => {
//                         const newCardID = await db.add(
//                                 'cards',
//                                 EMPTY_CARD_TEMPLATE as CreateModeQuestionCardType
//                         );
//
//                         addCard({
//                                 ...EMPTY_CARD_TEMPLATE,
//                                 id: newCardID
//                         });
//                 });
//         };
// }
//
// export function useAddEmptyCard() {
//         const obs = useObservableContext();
//         const { addCard } = useAddCard();
//
//         return getAddEmptyCard(obs, addCard);
// }
//
// function getUpdateCard(obs: Observable<CreateCollectionDB> | null) {
//         return (newCardData: CreateModeQuestionCardType) => {
//                 obs?.requestData('lazy update card', async (db) => {
//                         db.put('cards', newCardData);
//                 });
//         };
// }
//
// export function useUpdateCard() {
//         const obs = useObservableContext();
//
//         return getUpdateCard(obs);
// }
//
// function getDeleteCard({
//         obs,
//         id,
//         removeCard
// }: {
//         obs: Observable<CreateCollectionDB> | null;
//         id: number;
//         removeCard: (cardId: number) => void;
// }) {
//         return async () => {
//                 obs?.requestData('delete card', async (db) => {
//                         await db.delete('cards', id);
//                         removeCard(id);
//                 });
//         };
// }
//
// export function useDeleteCard(id: number) {
//         const obs = useObservableContext();
//         const { removeCard } = useRemoveCard();
//
//         return getDeleteCard({ obs, removeCard, id });
// }
//
// function getTruthyCardsOnly(cards: CreateModeQuestionCardType[]) {
//         return cards.filter((card) => card.questionTitle.length > 0);
// }
//
// function makeNewBook({
//         collectionTitle,
//         filteredCards
// }: {
//         collectionTitle: string;
//         filteredCards: CreateModeQuestionCardType[];
// }): CollectionResult {
//         return {
//                 id: new URLSearchParams(collectionTitle).toString(),
//                 timestamp: Date.now(),
//                 collectionTitle,
//                 cards: filteredCards
//         };
// }
//
// function getSaveCollection({
//         obs,
//         cards,
//         collectionTitle,
//         addCollection,
//         router
// }: {
//         obs: Observable<CreateCollectionDB> | null;
//         cards: CreateModeQuestionCardType[];
//         collectionTitle: string;
//         addCollection: (newCollection: CollectionResult) => void | undefined;
//         router: ReturnType<typeof useRouter>;
// }) {
//         return async () => {
//                 obs?.requestData('save collection', async (db) => {
//                         const filteredCards = getTruthyCardsOnly(cards);
//                         const newBook = makeNewBook({
//                                 collectionTitle,
//                                 filteredCards
//                         });
//
//                         await addCollection(newBook);
//                         await deleteThisDB(db);
//                         router.replace('/books');
//                 });
//         };
// }
//
// export function useSaveCollection() {
//         const addCollection = useAddCollection();
//         const router = useRouter();
//         const obs = useObservableContext();
//         const { cards } = useCards();
//         const { collectionTitle } = useCollectionTitleState();
//
//         return getSaveCollection({
//                 obs,
//                 router,
//                 addCollection,
//                 collectionTitle,
//                 cards
//         });
// }
