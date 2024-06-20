import Chat1 from "../../../assets/know-now/chat1.svg";
import Chat2 from "../../../assets/know-now/chat2.svg";
import Chat3 from "../../../assets/know-now/chat3.svg";
import Chat4 from "../../../assets/know-now/chat4.svg";

const knowNowChat = [
  {
    icon: Chat1,
    desc: "See who else is innovating and assess your competitive landscape.",
  },
  {
    icon: Chat2,
    desc: "Identify potential IP roadblocks before you invest time and resources.",
  },
  {
    icon: Chat3,
    desc: "Uncover the latest patents and see what's trending in your field.",
  },
  {
    icon: Chat4,
    desc: "Research similar patents and validate your market potential.",
  },
];

const KnowNowdefault = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full xl:w-[700px] mx-auto ">
        <div className="font-helvetica primary-gradient-text text-[54px] font-[800] leading-[64px] flex">
          Hi!
          <br />
          Ready to get started?
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {knowNowChat.map((l, idx) => (
            <div
              key={idx * 23}
              className="border-2 rounded-full rounded-br-none border-primary-900 flex items-center justify-center px-2 py-2 gap-2 relative"
            >
              <img src={l.icon} alt={l.desc} className="w-[32px] h-[32px]" />
              <div className="text-sm text-secondary-800">{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowNowdefault;
