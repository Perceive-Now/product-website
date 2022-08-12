import { useAppSelector } from "../../../hooks/redux";

/**
 *
 */
export default function UserIcon() {
  const authUser = useAppSelector((state) => state.auth.user);

  const username = authUser
    ? [authUser.firstName, authUser.lastName].join(" ")
    : "Jenifer Wells";

  return (
    <div className="flex items-center">
      <p className="text-primary-900">{username}</p>
      <div className="w-4 h-4 ml-1 rounded-full bg-primary-50" />
    </div>
  );
}
