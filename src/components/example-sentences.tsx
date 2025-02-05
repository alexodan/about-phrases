import { Button } from "./button";

interface ExampleSentencesProps {
  onAdd: (sentence: string) => void;
}

const wittySentences = [
  "I'm not arguing, I'm just explaining why I'm right.",
  "I'm not lazy, I'm on energy-saving mode.",
  "I'm not short, I'm just concentrated awesome.",
  "I'm not bossy, I just have better ideas.",
];

export function ExampleSentences({ onAdd }: ExampleSentencesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {wittySentences.map((sentence, index) => (
        <Button key={index} variant="outline" onClick={() => onAdd(sentence)}>
          {sentence}
        </Button>
      ))}
    </div>
  );
}
