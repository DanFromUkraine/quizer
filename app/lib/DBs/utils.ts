"use client";

import { error } from "console";
import { PrimitiveAtom, useSetAtom } from "jotai";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type GeneralDB<T extends {}> = PouchDB.Database<T>;

export function returnDumbObjIfDbNotInited<DbContentType extends {}>({
  db,
  dumbObj,
}: {
  db: PouchDB.Database | undefined;
  dumbObj: DbContentType;
}) {
  if (!db) {
    console.warn("make sure you initialized DB");
    return dumbObj;
  }
}

export function getOrAndInit<
  DbContentType extends {},
  ID extends keyof DbContentType & string
>({
  db,
  id,
  initVal,
}: {
  db: GeneralDB<DbContentType> | undefined;
  id: ID;
  initVal: DbContentType[ID];
}) {
  const onSuccess = (
    data: DbContentType & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta
  ) => data;

  const onRejected = (error: PouchDB.Core.Error) => {
    console.log(error);
  };

  return db?.get(id).then(onSuccess).catch(onRejected);
}
