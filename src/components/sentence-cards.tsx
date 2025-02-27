import { useState, useCallback, useEffect } from "react";
import { Trash } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Card } from "./card";
import { ExampleSentences } from "./example-sentences";

export type Sentence = {
  text: string;
  timestamp: number;
};

const MAX_SENTENCE_LENGTH = 280;

export default function SentenceCards() {
  const [sentences, setSentences] = useState<Sentence[]>(() => {
    const saved = localStorage.getItem("sentences");
    return saved ? JSON.parse(saved) : [];
  });
  const [newSentence, setNewSentence] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addSentence = useCallback((sentence: string) => {
    const trimmedSentence = sentence.trim();
    if (
      trimmedSentence !== "" &&
      trimmedSentence.length <= MAX_SENTENCE_LENGTH
    ) {
      setSentences((prev) => {
        const existing = prev.find((s) => s.text === trimmedSentence);
        if (existing) {
          setError("That sentence was already added!");
          return prev;
        }
        setError(null);
        setNewSentence("");
        return [
          ...prev,
          {
            text: trimmedSentence,
            timestamp: Date.now(),
          },
        ];
      });
    } else if (trimmedSentence.length > MAX_SENTENCE_LENGTH) {
      setError(
        `Sentence is too long (maximum ${MAX_SENTENCE_LENGTH} characters)`
      );
    } else if (trimmedSentence === "") {
      setError("Please enter a sentence");
    }
  }, []);

  const deleteSentence = useCallback((index: number) => {
    setSentences((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredSentences = sentences.filter((sentence) =>
    sentence.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("sentences", JSON.stringify(sentences));
  }, [sentences]);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Sentence Cards</h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Add a new sentence"
          value={newSentence}
          onChange={(e) => setNewSentence(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSentence(newSentence);
            }
          }}
          className="mb-2"
          aria-label="Add a new sentence"
          id="new-sentence-input"
        />
        <div className="flex justify-between">
          <Button onClick={() => addSentence(newSentence)}>Add Sentence</Button>
          <span
            className={
              newSentence.length > MAX_SENTENCE_LENGTH ? "text-red-500" : ""
            }
          >
            {MAX_SENTENCE_LENGTH - newSentence.length} characters left
          </span>
        </div>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <ExampleSentences onAdd={addSentence} sentences={sentences} />

      <Input
        type="text"
        placeholder="Search sentences"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4"
        aria-label="Search sentences"
        id="search-sentences-input"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSentences.map((sentence, index) => (
          <Card
            key={index}
            className="relative transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
          >
            <div className="py-4 pl-4 pr-10">
              <p className="mb-2 overflow-hidden">{sentence.text}</p>
              <p className="text-sm text-gray-500">
                {new Date(sentence.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <Button
                aria-label="Delete sentence"
                className="absolute top-2 right-2"
                onClick={() => deleteSentence(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
