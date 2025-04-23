'use client';

import Image from "next/image";
import { Star } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="w-screen h-14 flex justify-center bg-[#1E2330]">
      <div className="w-[90%] flex justify-between items-center">
        <a href="#">
          <Image
            src="/images/Logo/EduLinkerWhite.png"
            alt="Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </a>

        <p className="text-white">
          Experimente a versão pro e tenha <b>maior controle e crescimento da sua escola!</b>
        </p>

        <a
          href="#"
          className="flex items-center gap-2 bg-[#9FFF64] px-6 py-2 rounded-lg hover:bg-[#74EB2A] transition"
        >
          <Star className="w-5 h-5 mb-1 fill-black" />
          <span className="font-bold">Upgrade!</span>
        </a>
      </div>
    </nav>
  );
}