// 'use client'

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { useState } from 'react';

// const NewArticle = () => {
//     const [title, setTitle] = useState('');
//     const [text, setText] = useState('');
//     const [tags, setTags] = useState('');
    
//     async function createArticle(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/articles/new', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     title,
//                     text,
//                     tags: ''
//                 })
//             });
    
//             if (!response.ok) {
//                 throw new Error('Failed to create article');
//             }
    
//             const data = await response.json();
//             console.log('Article created successfully:', data);
//         } catch (error) {
//             console.error('Error creating article:', error);
//         }
//     }
    
//     return (
//         <div className='max-w-4xl w-full flex flex-col gap-8'>
//             <h1 className='text-3xl font-bold'>Create New Article</h1>
//             <form className='flex flex-col gap-4 max-w-xs' onSubmit={createArticle}>
//                 <div>
//                     <Label>Title</Label>
//                     <Input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <Label>Text</Label>
//                     <Textarea
//                         value={text}
//                         onChange={(e) => setText(e.target.value)}
//                     ></Textarea>
//                 </div>
//                 {/* <div>
//                     <label>Tags (comma separated)</label>
//                     <input
//                         type="text"
//                         value={tags}
//                         onChange={(e) => setTags(e.target.value)}
//                         required
//                     />
//                 </div> */}
//                 <Button className='bg-red-600 hover:bg-red-500 w-max' type='submit'>Create Article</Button>
//             </form>
//         </div>
//     );
// }

// export default NewArticle;

