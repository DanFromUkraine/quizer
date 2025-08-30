export default function CardIndexUI({ index }: { index: number }) {
  return (
    <p className="px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal">
      Картка №{index + 1}
    </p>
  );
}
