"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { uniqueNamesGenerator } from 'unique-names-generator';

import {
  Dictionary,
  FormValues,
} from './types';

import NameGenerator from './NameGenerator';
import Dictionaries from './Dictionaries';

export default function Home() {
  const methods = useForm<FormValues>({
    defaultValues: {
      separator: '-',
      suffix: '',
      prefix: '',
      numberOfNames: 5,
      names: [],
      dictionaries: [
        {
          words: [
            'apple',
            'banana',
            'cherry',
            'date',
            'elderberry',
            'fig',
            'grape',
            'honeydew',
            'kiwi',
            'lemon',
            'mango',
            'nectarine',
            'orange',
            'pear',
            'quince',
            'raspberry',
            'strawberry',
            'tangerine',
            'watermelon',
          ],
          type: 'custom',
        }
      ]
    }
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: any) => {
    const numberOfNames = methods.watch("numberOfNames");
    const separator = methods.watch("separator");
    const suffix = methods.watch("suffix");
    const prefix = methods.watch("prefix");
    const dictionaries = methods.watch("dictionaries");

    const allDictionaries: string[][] = dictionaries.map((dictionary: Dictionary) => [dictionary.words]).flat();

    const newNames = [...Array(numberOfNames)].map(() => {
      const uniqueName = uniqueNamesGenerator({
        dictionaries: allDictionaries,
        separator,
        length,
      });

      return `${prefix ? `${prefix}${separator}` : ''}${uniqueName}${suffix ? `${separator}${suffix}` : ''}`;
    });

    methods.setValue("names", newNames);
  };

  return (
    <FormProvider {...methods}>
      <main className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <NameGenerator
              dictionaries={methods.watch("dictionaries").map((dictionary) => dictionary.words)}
            />

            <Dictionaries />
          </div>
        </form>
      </main>
    </FormProvider>
  );
}
