import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { LoadingIcon } from "../../../../../components/icons";

//
import { getDeepSearchInventorPatent } from "../../../../../utils/api/deep-search/inventors";

import { useAppSelector } from "../../../../../hooks/redux";

/**
 *
 */
export default function DeepSearchInventorPage() {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  // Getting patent detail
  const { data, isLoading } = useQuery({
    queryKey: [type, firstName, lastName],
    queryFn: async () => {
      if (!type || !firstName || !lastName) return;

      //
      return await getDeepSearchInventorPatent({
        firstName,
        lastName,
        keywords,
      });
    },
    enabled: !!type || !!firstName || !!lastName,
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center text-primary-600">
        <LoadingIcon width={40} height={40} />
      </div>
    );
  }

  //
  return (
    <div>
      <div></div>
    </div>
  );
}
