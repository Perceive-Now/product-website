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
}: // profile_photo
Props) {
  const last = last_name.charAt(0);
  const first = first_name.charAt(0);

  // const arrayBuffer = Uint8Array.from(atob(profile_photo), c => c.charCodeAt(0));

  // Create a Blob object from the Uint8Array
  // const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

  // Create a URL from the Blob object
  // const imageUrl = URL.createObjectURL(blob);

  // Now imageUrl contains a URL that can be used as the src attribute of an <img> tag
  // const authUser = useAppSelector((state) => state.auth.user);

  // const username = authUser?.name;
  // const base64WithoutPrefix = profile_photo.replace("dataimage/jpegbase64/", "");

  // const dataUrl = `data:image/png;base64,${base64WithoutPrefix}`;

  // console.log(dataUrl)
  //
  return (
    <div className="flex items-center">
      <p className="text-primary-900 text-xl">
        {first}
        {last}
      </p>
      {/* <img
        src={dataUrl}
        alt={first_name}
        className="w-4 h-4 ml-1 rounded-full bg-primary-50"
      /> */}
      <div className="w-4 h-4 ml-1 rounded-full bg-primary-50" />
    </div>
  );
}
