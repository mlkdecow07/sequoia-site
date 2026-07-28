import { BiBible } from "react-icons/bi";
import { IoBook } from "react-icons/io5";
import { PiChalkboardTeacherFill, PiTreeFill } from "react-icons/pi";
import { RiStarHalfFill } from "react-icons/ri";

type ProvideIconProps = {
  type: "biblical" | "curriculum" | "teachers" | "environment" | "dreamers";
  className?: string;
  iconClassName?: string;
};

export default function ProvideIcon({
  type,
  className = "mx-auto mb-4 flex h-12 w-12 items-center justify-center text-teal",
  iconClassName = "h-10 w-10",
}: ProvideIconProps) {
  return (
    <div className={className} aria-hidden="true">
      {type === "biblical" && <BiBible className={iconClassName} />}
      {type === "curriculum" && <IoBook className={iconClassName} />}
      {type === "teachers" && <PiChalkboardTeacherFill className={iconClassName} />}
      {type === "environment" && <PiTreeFill className={iconClassName} />}
      {type === "dreamers" && <RiStarHalfFill className={iconClassName} />}
    </div>
  );
}
