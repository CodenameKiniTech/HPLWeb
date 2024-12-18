import Link from "next/link";
import Image from "next/image";
import { Righteous } from "next/font/google";

// Import the Righteous font
const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main
      className={`min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#FBAD26] to-white px-4 ${righteous.className}`}
    >
      {/* Top Section */}
      <div className="text-center space-y-20 pt-12 md:pt-16">
        <h1 className="text-8xl md:text-15lx font-bold text-white drop-shadow-lg tracking-wider">
          HENERAL PRINTING LAB
        </h1>

        {/* Add larger spacing above the button */}
        <div className="mt-32">
          <Link
            href="/auth/login"
            className="inline-block px-6 py-2 text-l text-white border-2 border-white rounded-full transition-transform hover:scale-105 hover:bg-white/10"
          >
            GET STARTED
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full px-4 md:px-12 mt-16 md:mt-24">
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="/assets/DiplaysLP.png?height=400&width=1200"
            alt="T-shirt designs showcase"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}
