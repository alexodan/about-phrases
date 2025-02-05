import { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { ExampleSentences } from "./example-sentences";

export default function SentenceCards() {
  const [sentences, setSentences] = useState<
    Array<{ text: string; timestamp: number }>
  >(() => {
    const saved = localStorage.getItem("sentences");
    return saved ? JSON.parse(saved) : [];
  });
  const [newSentence, setNewSentence] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addSentence = useCallback((sentence: string) => {
    if (sentence.trim() !== "") {
      setSentences((prev) => [
        ...prev,
        {
          text: sentence.trim(),
          timestamp: Date.now(),
        },
      ]);
      setNewSentence("");
    }
  }, []);

  const deleteSentence = useCallback((index: number) => {
    setSentences((prev) => prev.filter((_, i) => i !== index));
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
        />
        <Button onClick={() => addSentence(newSentence)}>Add Sentence</Button>
      </div>

      <ExampleSentences onAdd={addSentence} />

      <Input
        type="text"
        placeholder="Search sentences"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSentences.map((sentence, index) => (
          <Card
            key={index}
            className="relative transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
          >
            <CardContent className="p-4">
              <p className="mb-2">{sentence.text}</p>
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
                className="absolute top-2 right-2"
                onClick={() => deleteSentence(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
