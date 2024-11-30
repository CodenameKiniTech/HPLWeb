import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to HPLWeb</h1>
      <Link href="./auth/login" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Login
      </Link>
      <Link href="/auth/signup" className="bg-green-500 text-white px-4 py-2 rounded">
        Sign Up
      </Link>
    </div>
  );
}
