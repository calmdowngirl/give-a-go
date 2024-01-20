export default function Home() {
  return (
    <>
    <div class="px-4 py-8 mx-auto bg-[#F5F4FB]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">give auslan a go</h1>
        <p class="my-4">
          <a target="_blank" href="https://en.wikipedia.org/wiki/Auslan" class="underline decoration-dotted">Auslan</a> (/ˈɒzlæn/) is the sign language used by the majority of the Australian Deaf community.
        </p>
      </div>
    </div>

    <div class="max-w-screen-md mx-auto mt-8 flex flex-col items-center justify-center">
      <ul class="text-3xl font-thin">
        <li><a href="/number" class="underline decoration-[#DAA1F5] italic">give numbers a go</a></li>
        <li><a href="#" class="underline decoration-[#DAA1F5] italic">give letters a go (todo)</a></li>
      </ul>
    </div>
    </>
  );
}
