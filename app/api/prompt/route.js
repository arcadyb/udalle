import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async (request) => {
  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    //To dynamically get the path


    return NextResponse.json(prompts);
  } catch (error) {
    return new Response("Failed to fetch all prompts "+error, { status: 500 });
  }
};