import { FunctionComponent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const Topline: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div className="px-2 pt-2 bg-gray-100">
      <div className="inline-flex">
        <Link href="/"><a className="inline-block w-8 h-[24px]">
          <Image
            src="/ansible.png"
            alt="All hosts"
            width={32}
            height={32}
            layout="fixed"
            />
        </a></Link>

        { router.asPath !== "/" && (
          <div className="inline-block ml-4 leading-[32px]">
            { router.asPath }
          </div>
        )}
      </div>
    </div>
  );
};

export default Topline;
