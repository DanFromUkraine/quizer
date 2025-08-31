import { Fragment } from "react";

export default function RenderShorcutKeys({
  shortcutKeys,
}: {
  shortcutKeys: string[];
}) {
  return shortcutKeys.map((stortkey, i) => (
    <Fragment key={i}>
      {i !== 0 && "+"}
      <p className="border text-xs text-lightGray border-gray-500 rounded-normal p-1">
        {stortkey}
      </p>
    </Fragment>
  ));
}
