import { fetchGraphQL } from '@/lib/graphql';
import { Course } from '@/types/types';

interface CoursePageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const query = `
    query($slug: String!) {
      course(slug: $slug) {
        title
      }
    }
  `;
  const variables = { slug: courseSlug };
  const data: { course: Course } = await fetchGraphQL(query, variables);
  const course = data.course;
  return {
    title: course.title ? `${course.title} | LudoCode` : 'Course | LudoCode',
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const query = `
    query($slug: String!) {
      course(slug: $slug) {
        title
        description
      }
    }
  `;
  const variables = { slug: courseSlug };
  const data: { course: Course } = await fetchGraphQL(query, variables);
  const course = data.course;

  return (
    <div>
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
      <p>Select a topic from the sidebar to view its content.</p>
    </div>
  );
}
