export default function CurrentLetterSign(ch: string) {
  if (!ch) return 
  const path = `/letters/${ch}.jpg`
  const imgAltText = `the auslan sign of letter ${ch}`
  return (
    <div class="flex flex-row justify-center w-screen my-4">
      <div class="flex flex-col justify-center my-4">
        <p class="text-3xl mb-4">which letter is this? </p>
        <img src={path} alt={imgAltText}/>
      </div>
    </div>
  )
}
