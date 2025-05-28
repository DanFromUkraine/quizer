export default function UnfilteredCard({
  questionText,
  options,
}: {
  questionText: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col w-full m-6 p-6 rounded-md border border-lightGray">
      <h3>{questionText}</h3>
      <fieldset className="flex flex-col">
        {options.map((text) => (
          <Option optionText={text} />
        ))}
      </fieldset>
    </div>
  );
}

function Option({ optionText }: { optionText: string }) {
  return (
    <div className="relative">
      <input
        type="radio"
        className="absolute top-0 left-0 w-full h-full z-10"
      />
      <p className="peer-checked:bg-green-400">{optionText}</p>
    </div>
  );
}

/*

[
    {
        questionText: string;
        options: [
            string
        ]
    }
]

[
{
    questionText: string;
    options: [
        {
            optionText: string;
            isCorrect: boolean;
        },
        
    ]
}
]



*/
