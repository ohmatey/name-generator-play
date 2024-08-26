import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { adjectives, colors } from 'unique-names-generator';

// Assuming itemsDict and numberDict are defined somewhere in your codebase.
const itemsDict = [
  "falcon", "tiger", "elephant", "dolphin", "lion", "monkey", "rabbit", "panda",
  "owl", "eagle", "cat", "dog", "fox", "fish", "shark", "cactus", "rose", "lotus",
  "bamboo", "cherry", "mango", "jasmine", "sunflower", "mountain", "river", "ocean",
  "forest", "desert", "car", "phone", "house", "book", "pen", "bicycle", "computer",
  "table", "chair", "clock", "pizza", "coffee", "tea", "milk", "ice cream", "bread",
  "apple", "banana", "orange", "water", "rain", "sun", "wind", "storm", "snow", "summer",
  "winter", "autumn", "spring", "cloud", "star", "moon", "fire", "light", "music", "dance",
  "magic", "hero", "story", "dream"
];

const numberDict = Array.from({ length: 100 }, (_, i) => i.toString());

type DictionaryType = 'custom' | 'adjectives' | 'colors' | 'items' | 'numbers';

const Dictionaries = () => {
  // Use the useFormContext hook to access the form context
  const { control } = useFormContext<{
    dictionaries: {
      words: string[];
      type: DictionaryType;
    }[];
  }>();

  // Use useFieldArray to manage the dictionaries dynamically
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: 'dictionaries'
  });

  return (
    <>
      <div className="p-4">
        {/* Dictionaries Editor */}
        <h2 className="text-2xl font-bold mb-4">Dictionaries</h2>
        <p className="mb-4">
          Add dictionaries to generate unique names. Each dictionary is a list of words separated by a comma.
        </p>

        <div className="grid gap-4">
          {fields.map((dict, i) => (
            <div key={dict.id} className="border border-gray-300 rounded p-2">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Dictionary {i + 1}</h3>
                <div className="flex space-x-2">
                  <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="px-2 py-1 bg-gray-200 rounded">Up</button>
                  <button type="button" onClick={() => move(i, i + 1)} disabled={i === fields.length - 1} className="px-2 py-1 bg-gray-200 rounded">Down</button>
                  <button type="button" onClick={() => remove(i)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
              
              <Controller
                name={`dictionaries.${i}.type` as const}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value as DictionaryType;
                      field.onChange(value);

                      let newWords: string[] = [];

                      if (value === "adjectives") newWords = adjectives;
                      else if (value === "colors") newWords = colors;
                      else if (value === "items") newWords = itemsDict;
                      else if (value === "numbers") newWords = numberDict;

                      update(i, { words: newWords, type: value });
                    }}
                    className="mb-2 border border-gray-300 rounded p-2 w-full"
                  >
                    <option value="custom">Custom</option>
                    <option value="adjectives">Adjectives</option>
                    <option value="colors">Colors</option>
                    <option value="items">Items</option>
                    <option value="numbers">Numbers</option>
                  </select>
                )}
              />

              <Controller
                name={`dictionaries.${i}.words` as const}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="border border-gray-300 rounded p-2 w-full"
                    rows={5}
                    onChange={(e) => {
                      const value = e.target.value;
                      const words = value.split(",").map((word) => word.trim());
                      field.onChange(words);
                    }}
                    value={field.value.join(", ")}
                  />
                )}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ words: [], type: "custom" })}
          className="mt-4 px-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Dictionary
        </button>
      </div>
    </>
  );
}

export default Dictionaries;
