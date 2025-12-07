import BuilderClient from "@/components/(resumes)/resume/BuilderClient";
import { redirect } from "next/navigation";

export default async function ResumePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) redirect("/resume");

  return <BuilderClient id={id} />;
}
