import { Button } from "./button";
import { Sentence } from "./sentence-cards";

interface ExampleSentencesProps {
  onAdd: (sentence: string) => void;
  sentences: Sentence[];
}

const wittySentences = [
  "I'm not arguing, I'm just explaining why I'm right.",
  "I'm not lazy, I'm on energy-saving mode.",
  "I'm not short, I'm just concentrated awesome.",
  "I'm not bossy, I just have better ideas.",
];

export function ExampleSentences({ onAdd, sentences }: ExampleSentencesProps) {
  console.log(sentences);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Example Sentences (click one to add it to your list)
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {wittySentences.map((exampleSentence, index) => (
          // if it exists, strike through it and disable
          <Button
            key={index}
            variant="outline"
            className={
              sentences.some((s) => s.text === exampleSentence)
                ? "line-through"
                : ""
            }
            onClick={() => onAdd(exampleSentence)}
            disabled={sentences.some((s) => s.text === exampleSentence)}
          >
            {exampleSentence}
          </Button>
        ))}
      </div>
    </div>
  );
}
