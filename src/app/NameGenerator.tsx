import { useFormContext, Controller } from 'react-hook-form';

export interface NameGeneratorProps {
  dictionaries: string[][];
}

const NameGenerator = ({
  dictionaries,
}: NameGeneratorProps) => {
  const { control, watch } = useFormContext();

  const numberOfNames = watch("numberOfNames");

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Unique Name Generator</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <label className="mr-2 font-medium">Separator:</label>
          <Controller
            name="separator"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="border border-gray-300 rounded px-2 py-1"
              />
            )}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-medium">Suffix:</label>
          <Controller
            name="suffix"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="border border-gray-300 rounded px-2 py-1"
              />
            )}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-medium">Prefix:</label>
          <Controller
            name="prefix"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="border border-gray-300 rounded px-2 py-1"
              />
            )}
          />
        </div>

        <div className="flex items-center">
          <label className="mr-2 font-medium">Number of names:</label>
          <Controller
            name="numberOfNames"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className="border border-gray-300 rounded px-2 py-1"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          disabled={dictionaries.length === 0}
        >
          Generate Name{numberOfNames > 1 ? "s" : ""}
        </button>
      </div>

      {watch("names").length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Generated Names:</h3>
          <ul className="list-disc list-inside">
            {watch("names").map((name: string, index: number) => (
              <li key={index} className="text-gray-700">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NameGenerator;
