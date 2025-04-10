import { SVGProps } from "react";

export default function LandingMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={80} height={92} fill="none" {...props}>
      <path
        fill="#FFB531"
        d="M1.23 84h.085c2.272-.157 55.794-3.86 69.153-18.574 6.59-7.264 9.96-16.672 9.489-26.467-.472-9.81-4.73-18.832-11.989-25.438C52.98-.09 29.706 1.024 16.103 16.023 2.787 30.694.101 80.584.001 82.7c-.014.358.115.7.372.958.214.215.528.343.857.343Z"
      />
      <path
        fill="#442873"
        d="M8.717 92h.069c1.817-.124 44.637-3.054 55.333-14.817 5.276-5.807 7.978-13.332 7.606-21.168-.37-7.848-3.771-15.068-9.575-20.357-11.982-10.9-30.602-10.021-41.493 1.97C9.995 49.358 7.817 89.267 7.735 90.96c-.012.286.091.56.297.767a.977.977 0 0 0 .685.275Z"
      />
    </svg>
  );
}
