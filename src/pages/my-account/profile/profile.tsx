import EditIcon from "../../../components/icons/miscs/Edit";

interface Props {
  children: any;
  title: string;
  onEdit?: () => void;
  showEdit?: boolean;
}

const ProfileComponent = ({ children, title, onEdit, showEdit = true }: Props) => {
  return (
    <div className="rounded-lg border border-primary-900 w-full">
      <div className="rounded-t-lg bg-primary-900 px-[20px] py-[12px] text-white font-semibold flex items-center justify-between">
        <span>{title}</span>
        {showEdit && (
          <button type="button" className="flex items-center gap-0.5" onClick={onEdit}>
            <EditIcon className="text-white" />
            <span className="text-sm">Edit</span>
          </button>
        )}
      </div>
      <div className="">
        {/* {
          ProfilesData.map((profile, idx) =>
            <div key={idx * 79} className="flex items-center gap-[60px] text-secondary-800">
              <div className="w-[80px]">
                {profile.label}
              </div>
              <div>
                aa
                {profile.value}
              </div>
            </div>
          )
        } */}
        {children}
      </div>
    </div>
  );
};

export default ProfileComponent;
