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
  profile_photo,
}: // profile_photo,
Props) {
  const last = last_name.charAt(0);
  const first = first_name.charAt(0);
  return (
    <>
      {profile_photo ? (
        <img
          src={profile_photo}
          alt={first_name}
          className="w-4 h-4 rounded-full bg-primary-50 object-cover"
        />
      ) : (
        <div className="text-primary-900 w-4 h-4 rounded-full bg-appGray-100 flex justify-center items-center uppercase">
          {first}
          {last}
        </div>
      )}
    </>
  );
}
