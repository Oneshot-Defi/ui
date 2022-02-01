type OneshotModalHeaderProps = {
  oneshotAddress: string
  toggle: () => void
}

export default function OneshotModalHeader({
  oneshotAddress,
  toggle,
}: OneshotModalHeaderProps) {
  return (
    <div className="flex flex-row items-center mb-10 justify-between">
      <div></div>
      <div className="text-white text-2xl">{oneshotAddress}</div>
      <div>
        <div
          onClick={() => toggle()}
          className="ml-8 w-10 transform rotate-45 text-5xl cursor-pointer align-right"
        >
          +
        </div>
      </div>
    </div>
  )
}
