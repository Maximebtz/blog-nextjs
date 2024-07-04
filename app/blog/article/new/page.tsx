"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  title: z.string(),
  text: z.string(),
  slug: z.string(),
  tags: z.array(z.string()),
})

const ArticleForm = () => {
  
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
      slug: "",
      tags: [],
    },
  })

  // type Tag = {
  //   id: number;
  //   name: string;
  // };

  // const [tags, setTags] = useState<Tag[]>([]);

  // useEffect(() => {
  //   const fetchTags = async () => {
  //     const [ tagsResponse] = await Promise.all([
  //       axios.get('/api/tags')
  //     ]);
  //     setTags(tagsResponse.data);
  //   };

  //   fetchTags();
  // }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form values:", values);
      await axios.post('/api/article/new', values);
      form.reset();
      router.push(`/blog/${values.slug}`);
  
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-8 w-1/2 h-full">
      <h1 className="text-4xl mb-16 w-full font-bold">
        Créez un nouveau post ! 👽
      </h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Titre</FormLabel>
                <FormDescription>
                  Titre de l'article
                </FormDescription>
              </div>
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
              <div>
                <FormLabel>Text</FormLabel>
                <FormDescription>
                  Contenu de l'article
                </FormDescription>
              </div>
              <FormControl>
                <Textarea placeholder="Texte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Tags</FormLabel>
              </div>
              {tags.map((tag) => (
                <FormField
                  key={tag.id}
                  control={form.control}
                  name="tags"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={tag.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(String(tag.id))}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, tag.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== String(tag.id)
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {tag.name}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ArticleForm;
