import { NextPage } from "next";
import { InteractiveArea } from "~/components/interactive-area";
import { api } from "~/trpc/server";

type SubmissionType = Awaited<ReturnType<typeof api.submissions.getById>>;

const OpenSubmissionPage = async (props: {
  params: Promise<{ submissionId: string }>;
}) => {
  const params = await props.params;

  let matchedSubmission: SubmissionType | undefined;

  try {
    const res = await api.submissions.getById({
      id: params.submissionId,
    });

    matchedSubmission = res;
  } catch (error) {}

  return (
    <div className="flex min-h-screen flex-col justify-end bg-neutral-800">
      <InteractiveArea solution={matchedSubmission || undefined} />
    </div>
  );
};

export default OpenSubmissionPage;
