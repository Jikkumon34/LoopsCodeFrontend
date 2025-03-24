import Navbar from "@/components/Navbar";
import { fetchGraphQL } from "@/lib/graphql";
import { ReactNode } from "react";
import HeaderNavbar from "@/components/HeaderNavbar";
import { Course } from "@/types/types";
import Footer from "@/components/Footer";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const query = `
    query {
      courses {
        id
        title
        slug
      }
    }
  `;
  const data: { courses: Course[] } = await fetchGraphQL(query);
  const courses = data.courses;

  return (
    <div className="min-h-screen">
      <HeaderNavbar />
      <Navbar courses={courses} />
      {/* 
        The pt-28 ensures our main content starts 
        below the fixed header & navbar 
      */}
      <main className="pt-22">{children}</main>
      <Footer />
    </div>
  );
}
