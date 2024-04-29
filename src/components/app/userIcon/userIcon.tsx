// import { useAppSelector } from "../../../hooks/redux";

interface Props {
  first_name: string;
  last_name: string;
  profile_photo?: string;
}
/**
 *
 */
export default function UserIcon({
  first_name,
  last_name,
}: // profile_photo,
// profile_photo
Props) {
  const last = last_name.charAt(0);
  const first = first_name.charAt(0);

  return (
    <div className="flex items-center">
      <p className="text-primary-900 text-xl">
        {first}
        {last}
      </p>
      {/* <img
        src={standardBase64String}
        alt={first_name}
        className="w-4 h-4 ml-1 rounded-full bg-primary-50"
      /> */}
      <div className="w-4 h-4 ml-1 rounded-full bg-primary-50" />
    </div>
  );
}
