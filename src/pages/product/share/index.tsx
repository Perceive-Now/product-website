import { Link } from "react-router-dom";

import PerceiveLogo from "../../../assets/images/logo.svg";

const ShareKnowNowPage = () => {
  // useEffect(() => {
  //   dispatch(
  //     getIPChatById({
  //       user_id: userId || "",
  //       conversation_id: id,
  //     }),
  //   )
  // }, [dispatch])

  return (
    <div className="h-screen w-full flex flex-col items-center gap-5 justify-center text-2xl font-bold bg-white-gradient ">
      <Link to="/" className="border-b border-black">
        <img src={PerceiveLogo} alt="PerceiveNow logo" className="h-[100px] w-[400px]" />
      </Link>
      <div>In Progress</div>
    </div>
  );
};

export default ShareKnowNowPage;
