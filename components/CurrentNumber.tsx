export default function CurrentNumber(n: number) {
  const ariaLabel = `what is the auslan sign of the number ${n}`
  return (
    <div class="flex flex-row justify-center w-screen my-4">
      <h1 class="text-9xl" aria-labelledby={ariaLabel}>{n}</h1>
    </div>
  )
}
