import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { type IDraft } from "src/stores/draft";
import { setUploadAttachmentsStateFromDraft } from "src/stores/upload-attachments";
import { setQuickPromtsStateFromDraft } from "src/stores/upload-quick-prompt";
import { setUseCaseStateFromDraft } from "src/stores/use-case";

export default function DraftReports() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { draftsArray } = useAppSelector((state) => state.draft);

  const handleDraftItemClick = (draft: IDraft) => {
    // update slices with the selected draft
    dispatch(setUseCaseStateFromDraft(draft.other_data.useCasesSliceState));
    dispatch(setQuickPromtsStateFromDraft(draft.other_data.uploadQuickPromptsSliceState));
    dispatch(setUploadAttachmentsStateFromDraft(draft.other_data.uploadAttachmentsSliceState));

    // navigate to the relevent page
    navigate(`/${draft.current_page}`);
  };

  if (draftsArray.length === 0) {
    return <div>No drafts available</div>;
  }

  return (
    <ul>
      {draftsArray.map((draft) => {
        return (
          <li key={draft.requirement_gathering_id} onClick={() => handleDraftItemClick(draft)}>
            {draft.requirement_gathering_id}
          </li>
        );
      })}
    </ul>
  );
}
