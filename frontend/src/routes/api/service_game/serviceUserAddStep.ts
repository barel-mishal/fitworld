import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import {
  serverDatabaseUserSession,
  serverInitDatabase,
} from "~/routes/seedDatabase";
import { type StepText } from "./serviceGPTPrompts";
import { serverGPTSTexts } from "./serviceGPTResult";
import { type Step } from "./types";

export const serverUserAddStep = server$(async function (
  data: Partial<StepText>,
) {
  try {
    const openDBConnection = await serverDatabaseUserSession();
    if (!openDBConnection.success || !openDBConnection.value)
      throw new Error("Unauthorized");
    const steps = await serverGPTCreateSteps(data as StepText);
    const result = await openDBConnection.value.query<[null, Step[], Step[]]>(
      `
      LET $step = SELECT * FROM step WHERE unit = $unit AND section = $section ORDER BY section, unit, index, level;
      IF (array::len($step) > 0) THEN 
        $step
      ELSE
        (INSERT INTO step $steps)
      END;

      `,
      { unit: data.unit, section: data.section, steps, level: data.level },
    );

    await openDBConnection.value.close();

    return {
      success: true,
      value: result[1],
      error: null,
    };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, error: error.message, value: null };
  }
});

export const serverGPTCreateSteps = server$(async function (data: StepText) {
  const session: ExtendSession | null = this.sharedMap.get("session");
  const token = session?.database.token;
  if (!token) throw new Error("No token");
  const gptResult = await serverGPTSTexts();
  return gptResult[
    data.level === 1
      ? "section 1 unit 1 level 1"
      : data.level === 2
        ? "section 1 unit 1 level 2"
        : "section 1 unit 1 level 3"
  ];
});

export const serverGetUserStepsByIndex = server$(async function (data: {
  unit: number;
  section: number;
  index: number;
}) {
  const session: ExtendSession | null = this.sharedMap.get("session");
  const token = session?.database.token;
  if (!token) throw new Error("No token");
  // nutrition unit, section, index
  const db = await serverInitDatabase();
  await db.authenticate(token);

  const steps = await db.query<Step[][]>(
    "SELECT * FROM step WHERE (unit = $unit AND section = $section) ORDER BY index ASC;",
    {
      unit: data.unit,
      section: data.section,
    },
  );

  return {
    steps: steps[0],
  };
});

export const serverUpdateUserStep = server$(async function (data: Step) {
  const session: ExtendSession | null = this.sharedMap.get("session");
  const token = session?.database.token;
  if (!token) throw new Error("No token");
  // nutrition unit, section, index
  const db = await serverInitDatabase();
  await db.authenticate(token);

  const recordId = data.id;
  if (!recordId) throw new Error("No record id");

  const updated = await db.update(recordId, data);

  return {
    step: updated,
  };
});

export const serverRemoveUserStep = server$(async function (data: {
  unit: number;
  section: number;
}) {
  try {
    const openDBConnection = await serverDatabaseUserSession();
    if (!openDBConnection.success || !openDBConnection.value)
      throw new Error("Unauthorized");
    const result = await openDBConnection.value.query<[null, Step[]]>(
      `
    DELETE step WHERE unit = $unit AND section = $section;
    `,
      { unit: data.unit, section: data.section },
    );
    await openDBConnection.value.close();
    return {
      success: true,
      value: result[1],
      error: null,
    };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, error: error.message, value: null };
    else return { success: false, error: "Unknown error", value: null };
  }
});
