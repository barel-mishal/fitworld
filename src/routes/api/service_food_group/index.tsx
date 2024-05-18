import { type RequestHandler } from '@builder.io/qwik-city';
import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/express";
import { ExtendSession } from '~/routes/plugin@auth';

export const onPost: RequestHandler = async ({ json, request, parseBody, sharedMap }) => {
    const session = await sharedMap.get("session") as ExtendSession | undefined;
    if (!session) {
      throw new Error("No session found");
    }

    const body = await parseBody();

    const f = createUploadthing();

    const uploadRouter = {
      profileImage: f({
        image: {
          maxFileSize: "1MB",
        },
      })
        .middleware(async ({ req }) => {
          const user = { id: session.database.profile.id }

          if (!user) throw new UploadThingError("Unauthorized");

          return { userId: user.id };
        })
        .onUploadComplete(({ file, metadata }) => {
          console.log("Upload complete for userId:", metadata.userId);
          console.log("file url", file.url);

          return { uploadedBy: metadata.userId };
        }),
    } satisfies FileRouter;

    // Create a handler for the specific route
    const { POST } = createRouteHandler({
      router: uploadRouter,
    });

    // Call the handler to process the upload
    await POST({
      request,
      json,
      parseBody,
      sharedMap,
    });

    json(200, { message: 'Upload complete' });
};
