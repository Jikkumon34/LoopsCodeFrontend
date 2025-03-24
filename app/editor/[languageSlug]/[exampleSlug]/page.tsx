'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CodeEditor from '@/components/CodeEditor';
import { fetchGraphQL } from '@/lib/graphql';

interface GetExampleResponse {
  example: {
    code: string;
  } | null;
}

const GET_EXAMPLE_QUERY = `
  query GetExample($slug: String!) {
    example(slug: $slug) {
      code
    }
  }
`;

export default function EditorExamplePage() {
  // Extract parameters from the URL.
  const params = useParams();
  const languageSlug = params.languageSlug as string | undefined;
  const exampleSlug = params.exampleSlug as string | undefined;

  // Always call hooks at the top.
  const [initialCode, setInitialCode] = useState('// Loading example code...');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchExample() {
      try {
        const data = await fetchGraphQL<GetExampleResponse>(GET_EXAMPLE_QUERY, { slug: exampleSlug });
        if (data && data.example) {
          setInitialCode(data.example.code);
        } else {
          setInitialCode('// No example code found');
        }
      } catch (error) {
        console.error(error);
        setInitialCode('// Error loading example code');
      } finally {
        setLoading(false);
      }
    }
    fetchExample();
  }, [exampleSlug]);

  // If parameters are missing, render an error.
  if (!languageSlug || !exampleSlug) {
    return <div>Error: Missing route parameters.</div>;
  }



  if (loading) {
    return <div>Loading editor...</div>;
  }

  return <CodeEditor initialCode={initialCode} language={languageSlug} />;
}
