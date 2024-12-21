// app/page.js or pages/index.js

import SubmitForm from "../components/SubmitForm";

export default function Home() {
  return (
    <div className="mx-auto w-full">
      <h1 className="text-3xl mt-6 font-bold text-center">Login</h1>
      <SubmitForm />
    </div>
  );
}
