import { SVGProps } from "react";

export default function TechnologyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="21"
      viewBox="0 0 16 21"
      // fill="none"
      {...props}
    >
      <path d="M2.08668 19.1652C1.25068 19.1652 0.566681 19.8492 0.566681 20.6852H15.7667C15.7667 19.8492 15.0827 19.1652 14.2467 19.1652H8.16668V16.1252H12.7267C13.5627 16.1252 14.2467 15.4412 14.2467 14.6052H5.84108C3.77388 14.5748 2.08668 12.8876 2.08668 10.8052C2.08668 9.39155 2.86188 8.17555 4.00188 7.52195C3.75868 7.15715 3.60668 6.71635 3.60668 6.24515C3.60668 6.16915 3.62188 6.07795 3.63708 6.00195C1.82828 6.85315 0.566681 8.67715 0.566681 10.8052C0.566681 13.4804 2.55788 15.6692 5.12668 16.0492V19.1652H2.08668Z" />
      <path d="M5.35467 4.02619C5.52187 3.99579 5.70427 3.96539 5.88667 3.96539C7.14827 3.96539 8.16667 4.98379 8.16667 6.24539C8.16667 7.14219 7.64987 7.90219 6.90507 8.28219L7.80187 10.7446L9.23067 10.2278L9.71707 11.5654L11.1459 11.0486L10.6595 9.71099L12.0883 9.19419L9.29147 1.50299L7.86267 2.00459L7.36107 0.666992L5.93227 1.18379L6.41867 2.52139L5.00507 3.03819L5.35467 4.02619Z" />
      <path d="M5.88667 7.38547C6.51628 7.38547 7.02668 6.87507 7.02668 6.24547C7.02668 5.61586 6.51628 5.10547 5.88667 5.10547C5.25707 5.10547 4.74667 5.61586 4.74667 6.24547C4.74667 6.87507 5.25707 7.38547 5.88667 7.38547Z" />
    </svg>
  );
}
