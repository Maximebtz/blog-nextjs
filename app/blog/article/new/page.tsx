"use client"

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  text: z.string(),
  tagIds: z.array(z.string()).optional(),
});

const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Remplace les espaces et les caractères non-alphanumériques par des tirets
    .replace(/^-+|-+$/g, ''); // Supprime les tirets de début ou de fin de chaîne
};

const ArticleForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "", 
      tagIds: [],
    },
  });

  type Tag = {
    id: string;
    name: string;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const slug = slugify(values.title);
      const data = { ...values, slug, tagIds: values.tagIds || [] }; // Assurer que tagIds est défini
      console.log('data : ' + JSON.stringify(data)); // Pour déboguer
      await axios.post('/api/article/create', data);
      form.reset();
      router.push(`/blog/${slug}`);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tagsResponse = await axios.get<Tag[]>('/api/tags');
      setTags(tagsResponse.data);
    };
    fetchTags();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-8 w-1/2 h-full mb-20">
        <h1 className="text-4xl mb-16 w-full font-bold">
          Créez un nouveau post ! 👽
        </h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Titre</FormLabel>
              <FormDescription>
                Titre de l'article
              </FormDescription>
              <FormControl>
                <Input placeholder="Titre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Texte</FormLabel>
              <FormDescription>
                Contenu de l'article
              </FormDescription>
              <FormControl>
                <Textarea placeholder="Texte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Article Tags */}
        <FormField
          control={form.control}
          name="tagIds"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Tags</FormLabel>
                <FormDescription>
                  Sélectionner un ou plusieurs tags
                </FormDescription>
              </div>
              <div className='sm:columns-2 md:columns-3'>
                {tags.map((tag) => (
                  <FormField
                    key={tag.id}
                    control={form.control}
                    name="tagIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={tag.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              className="border-zinc-950 checked:bg-zinc-950"
                              checked={Array.isArray(field.value) && field.value.includes(tag.id)}
                              onCheckedChange={(checked: boolean) => {
                                const newValue = checked
                                  ? [...(Array.isArray(field.value) ? field.value : []), tag.id]
                                  : (Array.isArray(field.value) ? field.value : []).filter(
                                      (value) => value !== tag.id
                                    );
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {tag.name}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ArticleForm;
